import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../../util/index';
import designs from './style';
import {signUp} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import SuccessModal from '../../components/SuccessModal';
import ErrorModal from '../../components/ErrorModal';

const widthTouse = Dimensions.get('window').width;

export default function SignUp({navigation}) {
  const [successModal, setSuccessModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('female');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  const toastConfig = {
    success: ({text1, props, ...rest}) => (
      <View style={{height: 60, width: '100%', backgroundColor: 'pink'}}>
        <Text>{text1}</Text>
        <Text>{props.guid}</Text>
      </View>
    ),
    error: () => {},
    info: () => {},
    any_custom_type: () => {},
  };

  const handlePasswordCheck = (text) => {
    // if (text !== password) {
    //   return Alert.alert('Unmatched passwords', 'Your passwords do not match', [
    //     {text: 'Close'},
    //   ]);
    // }

    setConfirmPassword(text);
  };

  React.useEffect(() => {
    // Toast.show({
    //   text1: 'Hello',
    //   text2: 'This is some something 👋',
    //   visibilityTime: 2000,
    //   position: 'top',
    //   topOffset: 30,
    // });
  }, []);

  const isError = () => {
    if (
      (firstname.trim().length == 0 ||
        lastname.trim().length == 0 ||
        email.trim().length == 0,
      password == '' || gender.length == 0)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = async () => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      gender: gender,
    };
    if (isError()) {
      return Alert.alert('Missing inputs', 'Please Fill out all fields', [
        {text: 'Close'},
      ]);
    }

    //start spinner
    setSpinner(true);
    const res = await signUp(data);
    if (res.status == 201) {
      //stop spinner
      setSpinner(false);

      //show success alert
      //setSuccessModal(true);
      Toast.show({
        text1: 'Registration Successful',
        text2:
          'You have successfully signed up. You can now proceed to verify your identity. 👋',
        visibilityTime: 2000,
        position: 'top',
        topOffset: 30,
      });
      await AsyncStorage.setItem('authData', res.data.authData);
      //Clear the input fields
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('GetCode');
    } else {
      setSpinner(false);
      if (res == 'Request failed with status code 409') {
        Alert.alert('Request Failed', 'Email is already taken', [{text: 'Ok'}]);
      } else
        Alert.alert('Request Failed', 'An error occurred, please retry', [
          {text: 'Ok'},
        ]);
    }
  };

  const handleNavigation = () => {
    setSuccessModal(false);
    navigation.navigate('GetCode');
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureEntry2 = () => {
    setSecureTextEntry2(!secureTextEntry2);
  };

  return (
    <View
      style={[
        designs.container,
        // { paddingTop: 59},
      ]}>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 50,
          }}>
          <Image
            style={[designs.image, {marginTop: 0, marginLeft: 0}]}
            source={images.kwabaLogoWithName}
          />
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: '#00DC99',
              fontFamily: 'Circular Std',
              fontSize: 14,
              lineHeight: 30,
              fontWeight: 'bold',
              marginRight: 20,
            }}>
            Log in
          </Text>
        </View>

        <View>
          <Text
            style={[
              designs.heading,
              {
                marginLeft: 16,
                fontSize: 25,
                fontWeight: '700',
                fontFamily: 'CircularStd',
              },
            ]}>
            Let's set you up
          </Text>
          <TextInput
            style={designs.textField}
            placeholder="First Name"
            placeholderTextColor="#BFBFBF"
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
          />
          <TextInput
            style={designs.textField}
            placeholder="Last Name"
            placeholderTextColor="#BFBFBF"
            value={lastname}
            onChangeText={(text) => setLastname(text)}
          />
          <TextInput
            style={designs.textField}
            placeholder="Email"
            placeholderTextColor="#BFBFBF"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={[designs.customInput]}>
            <TextInput
              style={{
                width: '100%',
                paddingLeft: 20,
                paddingRight: 50,
                paddingTop: 12,
                paddingBottom: 12,
              }}
              placeholder="Password"
              placeholderTextColor="#BFBFBF"
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Icon
              name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
              color="#D6D6D6"
              size={20}
              onPress={toggleSecureEntry}
              style={{
                position: 'absolute',
                top: 15,
                right: 10,
              }}
            />
          </View>
          <Spinner
            visible={spinner}
            textContent={'Setting up...'}
            animation="fade"
            textStyle={{
              color: '#2A286A',
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 30,
            }}
            size="large"
          />
          <View style={[designs.customInput]}>
            <TextInput
              style={{
                width: '100%',
                paddingLeft: 20,
                paddingRight: 50,
                paddingTop: 12,
                paddingBottom: 12,
              }}
              placeholder="Confirm Password"
              placeholderTextColor="#BFBFBF"
              secureTextEntry={secureTextEntry2}
              value={confirmPassword}
              onChangeText={(text) => handlePasswordCheck(text)}
            />
            <Icon
              name={secureTextEntry2 ? 'eye-off-outline' : 'eye-outline'}
              color="#D6D6D6"
              size={20}
              onPress={toggleSecureEntry2}
              style={{
                position: 'absolute',
                top: 15,
                right: 10,
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // marginLeft: 'auto',
              // marginRight: 'auto',
              width: '100%',
              // borderWidth: 1,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => setGender('male')}
              style={[
                // designs.btn,

                {
                  backgroundColor: gender == 'male' ? '#9D98EC' : '#FFFFFF',
                  width: '45%',
                  padding: 15,
                  borderRadius: 5,
                  fontSize: 14,
                  fontFamily: 'CircularStd-Medium',
                  fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#EFEFEF',
                  borderWidth: 1,
                },
              ]}>
              <Text style={{color: gender == 'male' ? 'white' : '#465969'}}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('female')}
              style={[
                // designs.btn,
                {
                  backgroundColor: gender == 'female' ? '#9D98EC' : '#FFFFFF',
                  width: '45%',
                  padding: 15,
                  borderRadius: 5,
                  fontSize: 14,
                  fontFamily: 'CircularStd-Medium',
                  fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#EFEFEF',
                  borderWidth: 1,
                },
              ]}>
              <Text style={{color: gender == 'female' ? 'white' : '#465969'}}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isError()}
            style={[
              designs.btn,
              {
                backgroundColor: !isError() ? '#00DC99' : '#EAEAEA',
                // marginRight: 16,
                // marginLeft: 16,
                marginBottom: 20,
              },
            ]}>
            <Text
              style={{
                color: !isError() ? 'white' : '#D6D6D6',
                fontSize: 14,
                // lineHeight: 32,
                fontSize: 14,
                lineHeight: 30,
                fontWeight: 'bold',
              }}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
        handlePress={handleNavigation}
        successHeading="Registration Successful"
        successText="You have successfully signed up. You can now proceed to verify your identity."
      />
    </View>
  );
}
