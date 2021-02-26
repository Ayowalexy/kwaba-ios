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
import Spinner from 'react-native-loading-spinner-overlay';

export default function GetCode({navigation}) {
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
      setSpinner(false);
      Alert.alert('Message sent!', response.data.statusMsg, [
        {text: 'Ok', onPress: () => navigation.navigate('VerifyNumber')},
      ]);
    } else {
      setSpinner(false);
      Alert.alert('Request Failed', response, [{text: 'Ok'}]);
    }
  };
  return (
    <View style={designs.container}>
      <Image
        style={[designs.image, {marginLeft: 10}]}
        source={images.kwabaLogoWithName}
      />
      <Text style={[designs.heading, {marginLeft: 30}]}>Enter your number</Text>
      <Text style={designs.body}>
        We will send a code to verify your number
      </Text>
      <View style={designs.customInput}>
        <Image
          style={{width: 27, height: 18, marginRight: 10}}
          source={icons.naijaFlag}
        />
        <Text
          style={{
            color: '#465969',
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 30,
          }}>
          +234
        </Text>
        <TextInput
          placeholder="Phone Number"
          style={{flex: 1, paddingLeft: 10}}
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
            backgroundColor:
              !telephone.trim().length == 0 ? '#00DC99' : '#EAEAEA',
          },
        ]}>
        <Text
          style={{
            color: !telephone.trim().length == 0 ? 'white' : '#D6D6D6',
            fontSize: 14,
            lineHeight: 32,
          }}>
          GET CODE
        </Text>
      </TouchableOpacity>
    </View>
  );
}
