import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images, icons} from '../../util/index';
import designs from './style';
import CheckBox from '@react-native-community/checkbox';
import {useSelector, useDispatch} from 'react-redux';
import {setLoginState} from '../../redux/actions/userActions';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../services/network';

const widthTouse = Dimensions.get('window').width;

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const isError = () => {
    if (email.trim().length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const saveLoginToStorage = async (data) => {
    console.log(data);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {}
  };

  const handleLogin = async () => {
    if (isError()) {
      // Alert.alert('Required', 'All fields are required.');
      ToastAndroid.show(
        'Please enter your email address',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } else {
      setSpinner(true);
      const data = {email: email};
      try {
        const response = await login(data);
        if (response.status == 200) {
          setSpinner(false);
          console.log('here is auth data', response.data.authData);
          saveLoginToStorage({
            ...response.data.authData,
            username: response.data.authData.user.firstname,
            isLoggedIn: true,
          });
          dispatch(
            setLoginState({
              ...response.data.authData,
              username: response.data.authData.user.firstname,
              isLoggedIn: true,
            }),
          );
          navigation.navigate('Home');
        } else {
          setSpinner(false);
          Alert.alert(
            'INVALID CREDENTIALS',
            'Please provide valid email and password',
          );
        }
      } catch (error) {
        setSpinner(false);
        Alert.alert('ERROR', 'An error occurred, please retry');
      }
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} />
    </TouchableWithoutFeedback>
  );

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
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Image
            style={[designs.image, {marginTop: 0}]}
            source={icons.kwabalogocol}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#465969',
            lineHeight: 23,
            marginTop: 10,
            textAlign: 'center',
            // marginLeft: 16,
          }}>
          Forgot Password
        </Text>
        <Text
          style={{
            fontSize: 14,
            // fontWeight: 'bold',
            color: '#465969',
            lineHeight: 23,
            marginTop: 10,
            textAlign: 'center',
          }}>
          Enter your registered email below to receive password reset
          instructions
        </Text>
        <View style={[designs.customInput]}>
          <Icon
            name="mail-outline"
            size={20}
            color="#D6D6D6"
            style={{
              position: 'absolute',
              top: 18,
              left: 10,
              // transform: [{translateY: 50}],
            }}
          />
          <TextInput
            style={{
              width: '100%',
              // paddingLeft: 50,
              // paddingRight: 50,
              // paddingTop: 12,
              // paddingBottom: 12,
              paddingVertical: 15,
              paddingHorizontal: 50,
            }}
            placeholder="Email"
            placeholderTextColor="#BFBFBF"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={handleLogin}
            // disabled={!isError()}
            style={[
              designs.btn,
              {
                backgroundColor: '#00DC99',
                width: '100%',
                borderRadius: 10,
                // opacity: isError() ? 0 : 1,
              },
            ]}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                lineHeight: 30,
                fontWeight: 'bold',
              }}>
              SEND
            </Text>
          </TouchableOpacity>
          {/* <View style={designs.fingerPrint}>
          <Image
            style={{width: 38, height: 38, tintColor: '#BFBFBF'}}
            source={images.fingerPrint}
          />
        </View> */}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#465969',
              fontSize: 14,
              lineHeight: 30,
              fontWeight: 'bold',
            }}>
            Remember password? <Text style={{color: '#00DC99'}}>Login</Text>
          </Text>
        </TouchableOpacity>
        <Spinner
          visible={spinner}
          textContent={'Authenticating...'}
          animation="fade"
          textStyle={{
            color: '#2A286A',
            fontSize: 20,
            fontWeight: 'bold',
            lineHeight: 30,
          }}
          size="large"
        />
      </ScrollView>
    </View>
  );
}
