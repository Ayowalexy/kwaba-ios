import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images, icons} from '../../util/index';
import designs from './style';
import {signUp} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import analytics from '@segment/analytics-react-native';

import PhoneInput from 'react-native-phone-number-input';

import {COLORS} from '../../util';
import SelectWhereDoYouHearAboutUsModal from '../../components/SelectWhereDoYouHearAboutUsModal';
import SignUpSuccessfulModal from '../../components/SignUpSuccessfulModal';

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
    .matches(/\d/, 'Password must have a number')
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  // confirmPassword: yup
  //   .string()
  //   .test('passwords-match', 'Passwords must match', function (value) {
  //     return this.parent.password === value;
  //   }),
});

export default function SignUp({navigation}) {
  const [spinner, setSpinner] = useState(false);
  const phoneInput = useRef(null);
  const [telePhone, setTelePhone] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [showSignUpSuccessfulModal, setShowSignUpSuccessfulModal] = useState(
    false,
  );

  const SelectHandles = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <TouchableOpacity
          style={[
            {
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              borderColor: '#EFEFEF',
              borderWidth: 1,
              marginTop: 10,
              width: '100%',
              position: 'relative',

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
            },
          ]}
          onPress={() => {
            setShowModal(true);
          }}>
          {value != '' ? (
            <Text
              style={{
                // fontWeight: 'bold',
                color: '#000000',
              }}>
              {value}
            </Text>
          ) : (
            <Text
              style={{
                // fontWeight: 'bold',
                color: '#999',
              }}>
              How did you hear about us? (optional)
            </Text>
          )}

          <Icon
            name="chevron-down-outline"
            size={20}
            style={{fontWeight: 'bold'}}
            color="#BABABA"
          />
        </TouchableOpacity>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const handleSubmit = async (values, setValues, setErrors) => {
    const data = {
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      password: values.password,
      gender: values.gender,
      telephone: formattedValue,
      referral_code: values.referral_code,
      where_did_you_hear_about_us: values.selectHandle,
    };

    // console.log('The Data: ', data);

    setSpinner(true);
    const res = await signUp(data);

    console.log('The Responseeeeee: ', res);

    if (res.status == 201) {
      setSpinner(false);
      // await AsyncStorage.setItem('authData', res.data.data);
      // navigation.navigate('Login');
      setShowSignUpSuccessfulModal(true);

      await analytics.track('User-Signup', {
        email: values.email,
      });
    } else {
      setSpinner(false);
      if (res == 'Request failed with status code 409') {
        setErrors({email: 'Email is already taken'});
      } else {
        let errorMsg =
          'An error occurred, please check you internet connection or try again';
        console.log(errorMsg);
      }
    }

    // setSpinner(true);
    // const res = await signUp(data);

    // try {
    //   if (res.status == 201) {
    //     setSpinner(false);
    //     console.log('Res: ', res);
    //   }
    // } catch (error) {
    //   setSpinner(false);
    //   console.log('The Error: ', error);
    // }

    // if (res.status == 201) {
    //   setSpinner(false);
    //   await AsyncStorage.setItem('authData', res.data.authData);
    //   navigation.navigate('Login');

    //   await analytics.track('User-Signup', {
    //     email: values.email,
    //   });
    // } else {
    //   setSpinner(false);
    //   if (res == 'Request failed with status code 409') {
    //     setErrors({email: 'Email is already taken'});
    //   } else {
    //     let errorMsg =
    //       'An error occurred, please check you internet connection or try again';
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
            // email: 'joshuanwosu117@gmail.com',
            // password: 'joshuaA1',
            // confirmPassword: 'joshuaA1',
            // gender: 'Male',

            firstName: '',
            lastName: '',
            email: '',
            password: '',
            telePhone: '',
            selectHandle: '',
            gender: 'Female',
            referral_code: '',
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

              {/* <Field
                component={CustomInput}
                name="confirmPassword"
                placeholder="Confirm Password"
              /> */}
              <PhoneInput
                ref={phoneInput}
                defaultValue={telePhone}
                defaultCode="NG"
                layout="first"
                placeholder="Phone number"
                onChangeText={setTelePhone}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
                renderDropdownImage={<Icon name="chevron-down" />}
                // autoFocus
                containerStyle={{
                  width: '100%',
                  height: 60,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#EFEFEF',
                  backgroundColor: 'white',
                  marginTop: 10,
                }}
                flagButtonStyle={{
                  backgroundColor: 'transparent',
                }}
                codeTextStyle={{
                  backgroundColor: 'transparent',
                  fontSize: 14,
                }}
                textContainerStyle={{
                  backgroundColor: 'transparent',
                }}
                textInputStyle={{
                  fontSize: 14,
                  padding: 0,
                  margin: 0,
                }}
              />

              <Field component={SelectHandles} name="selectHandle" />

              <Field
                component={CustomInput}
                name="referral_code"
                placeholder="Referral Code (optional)"
                keyboardType="default"
              />

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 10,
                }}>
                {['Male', 'Female'].map((value, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setValues({...values, gender: value});
                    }}
                    key={index}
                    style={{
                      backgroundColor:
                        values.gender == value ? '#9D98EC' : '#FFFFFF',
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
                        color: values.gender == value ? '#FFFFFF' : '#BFBFBF',
                      }}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* <Spinner visible={spinner} animation="fade" size="large" /> */}

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={spinner}
                style={[designs.btn, {backgroundColor: '#00DC99'}]}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    lineHeight: 30,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  {spinner ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    'Sign Up'
                  )}
                </Text>
              </TouchableOpacity>

              <SelectWhereDoYouHearAboutUsModal
                onRequestClose={() => setShowModal(!showModal)}
                visible={showModal}
                onClick={(value) => {
                  setValues({...values, selectHandle: value});
                }}
              />
            </>
          )}
        </Formik>
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
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

      <SignUpSuccessfulModal
        visible={showSignUpSuccessfulModal}
        onRequestClose={() =>
          setShowSignUpSuccessfulModal(!showSignUpSuccessfulModal)
        }
        navigate={() => navigation.navigate('Login')}
      />
    </View>
  );
}
