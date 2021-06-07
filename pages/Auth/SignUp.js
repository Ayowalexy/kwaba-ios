import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images, icons} from '../../util/index';
import designs from './style';
import {signUp} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      {name.toLowerCase() === 'password' ||
      name.toLowerCase() === 'confirmpassword' ? (
        <View
          style={[
            designs.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && designs.errorInput,
          ]}>
          <TextInput
            style={[
              {
                width: '100%',
                paddingVertical: 15,
                paddingRight: 50,
                paddingLeft: 20,
              },
            ]}
            value={value}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            onChangeText={(text) => onChange(name)(text)}
            {...inputProps}
            secureTextEntry={secureTextEntry}
          />
          <Icon
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            color="#D6D6D6"
            size={20}
            style={{
              position: 'absolute',
              top: 10,
              right: 5,
              padding: 10,
              // borderWidth: 1,
            }}
          />
        </View>
      ) : (
        <TextInput
          style={[
            designs.textField,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && designs.errorInput,
          ]}
          placeholder="First Name"
          // placeholderTextColor="#BFBFBF"
          value={value}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          onChangeText={(text) => onChange(name)(text)}
          {...inputProps}
        />
      )}

      {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
    </>
  );
};

const signUpValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export default function SignUp({navigation}) {
  const [spinner, setSpinner] = useState(false);

  const handleSubmit = async (values, setValues, setErrors) => {
    const data = {
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      password: values.password,
      gender: values.gender,
    };

    setSpinner(true);
    const res = await signUp(data);

    console.log(res);

    if (res == 'Request failed with status code 409') setSpinner(false);
    // if (res.status == 201) {
    //   setSpinner(false);
    //   await AsyncStorage.setItem('authData', res.data.authData);
    //   setValues({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //   });
    //   navigation.navigate('GetCode');
    // } else {
    //   setSpinner(false);
    //   if (res == 'Request failed with status code 409') {
    //     // console.log('Email is already taken');
    //     setErrors({email: 'Email is already taken'});
    //   } else {
    //     let errorMsg =
    //       'An error occurred, please check you internet connection or try again';

    //     // setValues({...values, error: errorMsg});
    //     console.log(errorMsg);
    //   }
    // }
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

        <Text
          style={[
            designs.heading,
            {
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: 'CircularStd',
              textAlign: 'center',
              color: '#465969',
            },
          ]}>
          Welcome, let's set you up!
        </Text>

        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            // firstName: 'Joshua',
            // lastName: 'Nwosu',
            // email: 'joshuanwosu@gmail.com',
            // password: 'joshuaA1',
            // confirmPassword: 'joshuaA1',
            // gender: 'male',

            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: 'female',
          }}
          onSubmit={(values, {setValues, setErrors}) => {
            handleSubmit(values, setValues, setErrors);
          }}>
          {({handleSubmit, isValid, values, setValues}) => (
            <>
              <Field
                component={CustomInput}
                name="firstName"
                placeholder="First Name"
              />

              <Field
                component={CustomInput}
                name="lastName"
                placeholder="Last Name"
              />

              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />

              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
              />

              <Field
                component={CustomInput}
                name="confirmPassword"
                placeholder="Confirm Password"
              />

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 20,
                }}>
                {['Male', 'Female'].map((value, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setValues({...values, gender: value});
                    }}
                    key={index}
                    style={{
                      backgroundColor:
                        values.gender.toLowerCase() == value.toLowerCase()
                          ? '#9D98EC'
                          : '#FFFFFF',
                      width: '48%',
                      padding: 16,
                      borderRadius: 5,
                      fontSize: 14,
                      fontFamily: 'CircularStd-Medium',
                      fontWeight: '600',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#EFEFEF',
                      borderWidth: 1,
                    }}>
                    <Text
                      style={{
                        color:
                          values.gender.toLowerCase() == value.toLowerCase()
                            ? '#FFFFFF'
                            : '#BFBFBF',
                      }}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* <Text
                style={{
                  marginTop: 10,
                  fontSize: 10,
                  color: 'blue',
                }}>
                Gender: {values.gender}
              </Text> */}

              <Spinner visible={spinner} animation="fade" size="large" />

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid}
                style={[designs.btn, {backgroundColor: '#00DC99'}]}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    lineHeight: 30,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
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
      </ScrollView>
    </View>
  );
}
