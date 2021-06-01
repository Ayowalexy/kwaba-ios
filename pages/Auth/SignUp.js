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
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images, icons} from '../../util/index';
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
  const [valid, setValid] = useState([false, '']);

  // const toastConfig = {
  //   success: ({text1, props, ...rest}) => (
  //     <View style={{height: 60, width: '100%', backgroundColor: 'pink'}}>
  //       <Text>{text1}</Text>
  //       <Text>{props.guid}</Text>
  //     </View>
  //   ),
  //   error: () => {},
  //   info: () => {},
  //   any_custom_type: () => {},
  // };

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

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const handleSubmit = async () => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      gender: gender,
    };
    if (isError()) {
      ToastAndroid.showWithGravity(
        'Missing inputs, please fill out all fields',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      setValid([false, 'All fields are required']);
      console.log(valid[0]);
    } else {
      //start spinner
      setValid(true, '');
      console.log(valid);
      setSpinner(true);
      const res = await signUp(data);
      if (res.status == 201) {
        //stop spinner
        setValid(true, '');
        setSpinner(false);

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
          setValid([false, 'Email is already taken']);
        } else if (password !== confirmPassword)
          setValid([false, 'Password do not match']);
        else if (reg.test(email) === false) {
          // console.log('Email is Not Correct');
          // this.setState({email: text});
          // return false;
          setValid([false, 'Email is invalid']);
        } else setValid([false, 'Invalid input value']);
      }
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
    <View style={[designs.container]}>
      <Image
        style={{
          width: 200,
          height: 200,
          zIndex: 0,
          position: 'absolute',
          top: -20,
          right: -50,
          opacity: 0.8,
        }}
        resizeMode="stretch"
        source={require('../../assets/shapes/shape1.png')}
      />

      <Image
        style={{
          width: 100,
          height: 100,
          zIndex: 0,
          position: 'absolute',
          top: '80%',
          left: -50,
          opacity: 0.8,
        }}
        resizeMode="stretch"
        source={require('../../assets/shapes/shape1.png')}
      />

      <Image
        style={{
          width: 60,
          height: 60,
          zIndex: 0,
          position: 'absolute',
          top: '80%',
          right: 0,
        }}
        // resizeMode="stretch"
        source={require('../../assets/shapes/shape2.png')}
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View style={{alignItems: 'center', marginBottom: 0, marginTop: 20}}>
          <Image
            style={[designs.image, {marginTop: 0}]}
            source={icons.kwabalogocol}
            resizeMode="contain"
          />
        </View>
        {/* <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 50,
          }}>
          <Image
            style={[designs.image, {marginTop: 0}]}
            source={icons.kwabalogocol}
            resizeMode="contain"
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
        </View> */}

        <View>
          <Text
            style={[
              designs.heading,
              {
                // marginLeft: 16,
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'CircularStd',
                textAlign: 'center',
                color: '#465969',
              },
            ]}>
            Hi, let's set you up
          </Text>
          {!valid[0] && (
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 5,
              }}>
              <Text style={{color: 'pink'}}>{valid[1]}</Text>
            </View>
          )}
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
                paddingVertical: 15,
                paddingRight: 50,
                paddingLeft: 20,
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
                // borderWidth: 1,
                padding: 5,
              }}
            />
          </View>
          <Spinner
            visible={spinner}
            // textContent={'Setting up'}
            animation="fade"
            // textStyle={{
            //   color: '#2A286A',
            //   fontSize: 20,
            //   fontWeight: 'bold',
            //   lineHeight: 30,
            // }}
            size="large"
          />
          <View style={[designs.customInput]}>
            <TextInput
              style={{
                width: '100%',
                paddingVertical: 15,
                paddingRight: 50,
                paddingLeft: 20,
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
                // borderWidth: 1,
                padding: 5,
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
                  width: '48%',
                  padding: 18,
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
                  width: '48%',
                  padding: 18,
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
            // disabled={isError()}
            style={[
              designs.btn,
              {
                // backgroundColor: !isError() ? '#00DC99' : '#EAEAEA',
                backgroundColor: '#00DC99',
                // marginRight: 16,
                // marginLeft: 16,
                // marginBottom: 20,
              },
            ]}>
            <Text
              style={{
                // color: !isError() ? 'white' : '#D6D6D6',
                color: '#FFFFFF',
                // fontSize: 14,
                // lineHeight: 32,
                fontSize: 12,
                lineHeight: 30,
                fontWeight: 'bold',
              }}>
              SIGN UP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text
              style={{
                color: '#465969',
                fontSize: 14,
                lineHeight: 30,
                fontWeight: 'bold',
              }}>
              Already have an account?{' '}
              <Text style={{color: '#00DC99'}}>Log In</Text>
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
