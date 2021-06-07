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

import {Formik, Field} from 'formik';
import * as yup from 'yup';

const CustomInput = (props) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <>
      <View
        style={[
          designs.customInput,
          props.multiline && {height: props.numberOfLines * 40},
          hasError && designs.errorInput,
        ]}>
        <Icon
          name={
            name.toLowerCase() == 'email'
              ? 'mail-outline'
              : 'lock-closed-outline'
          }
          size={20}
          color="#D6D6D6"
          style={{
            position: 'absolute',
            top: 18,
            left: 10,
          }}
        />
        <TextInput
          style={{
            width: '100%',
            paddingVertical: 15,
            paddingHorizontal: 50,
          }}
          value={value}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          onChangeText={(text) => onChange(name)(text)}
          {...inputProps}
          secureTextEntry={name.toLowerCase() == 'password' && secureTextEntry}
        />
        {name.toLowerCase() == 'password' && (
          <Icon
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            color="#D6D6D6"
            size={20}
            style={{
              position: 'absolute',
              top: 15,
              right: 10,
              padding: 5,
            }}
          />
        )}
      </View>
      {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
    </>
  );
};

const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const saveLoginToStorage = async (data) => {
    console.log(data);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {}
  };

  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      setSpinner(true);
      const res = await login(data);

      console.log(res);

      if (res.status == 200) {
        setSpinner(false);
        setErrorMsg('');
        saveLoginToStorage({
          ...res.data.authData,
          username: res.data.authData.user.firstname,
          isLoggedIn: true,
        });
        dispatch(
          setLoginState({
            ...res.data.authData,
            username: res.data.authData.user.firstname,
            isLoggedIn: true,
          }),
        );
        navigation.navigate('Home');
      } else {
        setSpinner(false);
        console.log('Invalid, please provide a valid email and password');
        setErrorMsg('Please provide valid email and password');
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error, An error occured, please retry');
      setErrorMsg('An error occured, please retry');
    }

    // console.log('DATA:', data);
    // console.log(res);
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

        <Formik
          validationSchema={LoginValidationSchema}
          initialValues={{email: 'joshnwosu01@gmail.com', password: 'janedoe'}}
          // initialValues={{email: '', password: ''}}
          onSubmit={(values) => {
            handleSubmit(values);
          }}>
          {({handleSubmit, isValid, values, setValues}) => (
            <>
              {errorMsg != '' && (
                <Text
                  style={{
                    fontSize: 10,
                    color: '#f00',
                    marginTop: 20,
                    backgroundColor: '#EDCDC250',
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    borderRadius: 5,
                  }}>
                  {errorMsg}
                </Text>
              )}
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
              />
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
              />

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

              <Spinner visible={spinner} animation="fade" size="large" />

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid}
                style={[
                  designs.btn,
                  {
                    backgroundColor: '#00DC99',
                    width: '100%',
                    borderRadius: 10,
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
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
