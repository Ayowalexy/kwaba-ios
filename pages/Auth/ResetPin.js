import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../util';

import Spinner from 'react-native-loading-spinner-overlay';
import analytics from '@segment/analytics-react-native';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {setPin} from '../../services/network';

const ResetPinValidationSchema = yup.object().shape({
  pin: yup.string().required('Password is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

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
              : name.toLowerCase() == 'pin'
              ? 'keypad-outline'
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
          keyboardType={
            name.toLowerCase() == 'password' ? 'default' : 'email-address'
          }
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

export default function ResetPin({navigation, route}) {
  const [spinner, setSpinner] = useState(false);

  const handleSubmit = async (values) => {
    const data = {
      pin: values.pin,
      email: values.email,
      password: values.password,
    };
    // console.log('The Reset Data: ', data);

    setSpinner(true);
    try {
      const resp = await setPin(data);
      // if(resp.status )
      if (resp.status == 200) {
        console.log('The RESP: ', resp.data);
        navigation.navigate('EnterPin');
        setSpinner(false);
        await analytics.track('Reset-Pin', {
          email: values.email,
        });
      } else {
        setSpinner(false);
      }
    } catch (error) {
      console.log('The Error: ', error);
      setSpinner(false);
    }
  };

  return (
    <>
      <Formik
        validationSchema={ResetPinValidationSchema}
        initialValues={{pin: '', email: '', password: ''}}
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {({handleSubmit, isValid, values, setValues}) => (
          <>
            <View
              style={{
                width: '100%',
                flex: 1,
                backgroundColor: '#f7f8fd',
                paddingVertical: 20,
                paddingHorizontal: 20,
              }}>
              <Icon
                onPress={() => navigation.goBack()}
                name="arrow-back-outline"
                size={25}
                style={{color: COLORS.primary}}
              />
              <View style={{flex: 1}}>
                <View style={[designs.contentText]}>
                  <Text style={[designs.headline]}>Reset PIN</Text>
                </View>

                <View style={{paddingHorizontal: 0}}>
                  <Field
                    component={CustomInput}
                    name="pin"
                    placeholder="New Pin"
                  />
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
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
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
                  UPDATE PIN
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <Spinner visible={spinner} size="large" />
    </>
  );
}
