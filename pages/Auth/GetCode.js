import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {images, icons} from '../../util/index';
import designs from './style';
import {sendVerificationCode} from '../../services/network';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import SuccessModal from '../../components/SuccessModal';

export default function GetCode({navigation}) {
  const [successModal, setSuccessModal] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [telephone, setTelePhone] = useState('');

  const handleSubmit = async () => {
    if (telephone.trim().length == 0) {
      return Alert.alert(
        'Validation Error',
        'Telephone number cannot be empty',
      );
    }
    const data = {telephone: '+234' + telephone};
    setSpinner(true);
    const response = await sendVerificationCode(data);

    if (response.status == 200) {
      setSuccessMessage(response.data.statusMsg);
      Toast.show({
        text1: 'Code Sent',
        text2: response.data.statusMsg + ' 👋',
        visibilityTime: 2000,
        position: 'top',
        topOffset: 30,
      });

      setSpinner(false);
      navigation.navigate('VerifyNumber', {
        phone_number: '+234' + telephone,
      });
      //setSuccessModal(true);
    } else {
      setSpinner(false);
      Alert.alert('Request Failed', response, [{text: 'Ok'}]);
    }
  };

  const handleNavigation = () => {
    setSuccessModal(false);
    navigation.navigate('VerifyNumber');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F7F8FD',
        fontFamily: 'CircularStd',
        padding: 15,
        justifyContent: 'center',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <View style={{alignItems: 'center', marginBottom: 50, marginTop: 20}}>
        <Image
          style={[designs.image, {marginTop: 0}]}
          source={icons.kwabalogocol}
          resizeMode="contain"
        />
      </View>
      <Text style={[designs.heading, {textAlign: 'center', color: '#465969'}]}>
        Enter your number
      </Text>
      <Text style={[designs.body, {textAlign: 'center', marginTop: 10}]}>
        We will send a code to verify {'\n'} your number
      </Text>
      <View style={designs.customInput}>
        <Image
          style={{
            width: 27,
            height: 18,
            position: 'absolute',
            top: 18,
            left: 10,
          }}
          source={icons.naijaFlag}
        />
        <Text
          style={{
            color: '#465969',
            fontSize: 16,
            fontWeight: '600',
            // lineHeight: 30,
            position: 'absolute',
            top: 15,
            left: 50,
          }}>
          +234
        </Text>
        <TextInput
          placeholder="Phone Number"
          style={{
            width: '100%',
            paddingLeft: 100,
            paddingRight: 50,
            paddingTop: 12,
            paddingBottom: 12,
          }}
          keyboardType="number-pad"
          value={telephone}
          onChangeText={(text) => setTelePhone(text)}
        />
      </View>
      <Spinner
        visible={spinner}
        textContent={'Sending...'}
        animation="fade"
        textStyle={{
          color: '#2A286A',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 30,
        }}
        size="large"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={telephone.trim().length == 0}
        style={[
          designs.btn,
          {
            // backgroundColor:
            //   !telephone.trim().length == 0 ? '#00DC99' : '#EAEAEA',
            backgroundColor: '#00DC99',
          },
        ]}>
        <Text
          style={{
            // color: !telephone.trim().length == 0 ? 'white' : '#D6D6D6',
            color: 'white',
            fontSize: 12,
            lineHeight: 32,
            fontWeight: 'bold',
          }}>
          GET CODE
        </Text>
      </TouchableOpacity>
      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
        handlePress={handleNavigation}
        successHeading="Message sent!"
        successText={successMessage}
      />
    </View>
  );
}
