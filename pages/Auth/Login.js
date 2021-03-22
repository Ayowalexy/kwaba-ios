import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../../util/index';
import designs from './style';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {setLoginState} from '../../redux/actions/userActions';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../services/network';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isError = () => {
    if (email.trim().length == 0 || password == '' || !toggleCheckBox) {
      return true;
    } else {
      return false;
    }
  };

  const saveLoginToStorage = async (data) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {}
  };

  const handleLogin = async () => {
    setSpinner(true);
    const data = {email: email, password: password};
    try {
      const response = await login(data);
      if (response.status == 200) {
        setSpinner(false);
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
        navigation.navigate('Welcome');
      } else {
        Alert.alert(
          'INVALID CREDENTIALS',
          'Please provide valid email and password',
        );
      }
    } catch (error) {
      Alert.alert('ERROR', 'An error occurred, please retry');
    }
  };

  return (
    <View
      style={[
        designs.container,
        {paddingTop: 106, paddingLeft: 33, paddingRight: 33},
      ]}>
      <Image
        style={[designs.image, {marginTop: 0, marginLeft: -30}]}
        source={images.kwabaLogo}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#2A286A',
          lineHeight: 23,
          marginTop: 42,
        }}>
        Login to your account
      </Text>
      <View style={[designs.customInput, {width: 360}]}>
        <Icon name="mail-outline" size={30} color="#D6D6D6" />
        <TextInput
          style={{flex: 1}}
          placeholder="Email"
          placeholderTextColor="#BFBFBF"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={[designs.customInput, {width: 360}]}>
        <Icon name="lock-closed-outline" size={30} color="#D6D6D6" />
        <TextInput
          style={{flex: 1}}
          placeholder="Password"
          placeholderTextColor="#BFBFBF"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Icon name="eye-off-outline" color="#D6D6D6" size={20} />
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
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CheckBox
            style={{
              height: 14,
              width: 14,
              marginRight: 8,
              borderColor: '#D6D6D6',
            }}
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
            }}>
            Remember me
          </Text>
        </View>
        <Text
          style={{
            color: '#00DC99',
            fontSize: 14,
            lineHeight: 30,
            fontWeight: '900',
          }}>
          Forgot Password?
        </Text>
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
          disabled={isError()}
          style={[
            designs.btn,
            {
              backgroundColor: !isError() ? '#00DC99' : '#EAEAEA',
              width: 246,
              borderRadius: 10,
            },
          ]}>
          <Text
            style={{
              color: !isError() ? 'white' : 'black',
              fontSize: 14,
              lineHeight: 30,
              fontWeight: '900',
            }}>
            LOG IN
          </Text>
        </TouchableOpacity>
        <View style={designs.fingerPrint}>
          <Image
            style={{width: 38, height: 38, tintColor: '#BFBFBF'}}
            source={images.fingerPrint}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 23,
        }}>
        <Text
          style={{
            color: '#465969',
            fontSize: 14,
            lineHeight: 30,
            fontWeight: '900',
          }}>
          Don't have an account?{' '}
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={{color: '#00DC99'}}>
            Sign up
          </Text>
        </Text>
      </View>
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
    </View>
  );
}
