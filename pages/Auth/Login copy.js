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
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const isError = () => {
    if (email.trim().length == 0 || password == '') {
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
        'All fields are required',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } else {
      setSpinner(true);
      const data = {email: email, password: password};
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
        <View style={{alignItems: 'center', marginBottom: 0}}>
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
          Login to your account
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
        <View style={[designs.customInput]}>
          <Icon
            name="lock-closed-outline"
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
              // transform: [{translateY: 50}],
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // borderWidth: 1,
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',

                // marginTop: 10,
                // borderWidth: 1,
              }}>
              <CheckBox
                style={{padding: 0, marginLeft: -8}}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text
                style={{
                  color: '#465969',
                  fontSize: 14,
                  lineHeight: 30,
                  fontWeight: '900',
                  marginLeft: 8,
                  // marginRight: widthTouse * 0.25,
                }}>
                Remember me
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                style={{
                  color: '#00DC99',
                  fontSize: 12,
                  // lineHeight: 30,
                  fontWeight: '900',
                  alignSelf: 'flex-end',
                  // marginTop: 10,
                  // borderWidth: 1,
                  paddingVertical: 5,
                }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
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
              LOG IN
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
          onPress={() => navigation.navigate('SignUp')}
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
            Don't have an account?{' '}
            <Text style={{color: '#00DC99'}}>Sign up</Text>
          </Text>
        </TouchableOpacity>
        <Spinner
          visible={spinner}
          // textContent={'Authenticating...'}
          animation="fade"
          // textStyle={{
          //   color: '#2A286A',
          //   fontSize: 20,
          //   fontWeight: 'bold',
          //   lineHeight: 30,
          // }}
          size="large"
        />
      </ScrollView>
    </View>
  );
}
