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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../../util/index';
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
    if (email.trim().length == 0 || password == '' || !toggleCheckBox) {
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
      <ScrollView>
        <Image
          style={[designs.image, {marginTop: 0}]}
          source={images.kwabaLogoWithName}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#2A286A',
            lineHeight: 23,
            marginTop: 42,
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
              top: 15,
              left: 10,
              // transform: [{translateY: 50}],
            }}
          />
          <TextInput
            style={{
              width: '100%',
              paddingLeft: 50,
              paddingRight: 50,
              paddingTop: 12,
              paddingBottom: 12,
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
              top: 15,
              left: 10,
              // transform: [{translateY: 50}],
            }}
          />
          <TextInput
            style={{
              width: '100%',
              paddingLeft: 50,
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
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop: 10,
              }}>
              <CheckBox
                style={{
                  height: 15,
                  width: 15,
                  marginRight: 15,
                  borderColor: '#f00',
                  // borderWidth: 1,
                  // marginLeft: 16,
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
                  // marginRight: widthTouse * 0.25,
                }}>
                Remember me
              </Text>
            </View>
            <Text
              style={{
                color: '#00DC99',
                fontSize: 12,
                lineHeight: 30,
                fontWeight: '900',
                alignSelf: 'flex-end',
                // marginTop: 10,
              }}>
              Forgot Password ?
            </Text>
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
            disabled={isError()}
            style={[
              designs.btn,
              {
                backgroundColor: !isError() ? '#00DC99' : '#EAEAEA',
                width: '100%',
                borderRadius: 10,
              },
            ]}>
            <Text
              style={{
                color: !isError() ? 'white' : 'black',
                fontSize: 14,
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
              fontWeight: 'bold',
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
      </ScrollView>
    </View>
  );
}
