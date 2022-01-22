import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../util';

import Spinner from 'react-native-loading-spinner-overlay';
import analytics from '@segment/analytics-react-native';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {setPin} from '../../services/network';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const ResetPinValidationSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const CELL_COUNT = 4;

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

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [cellProps, getCellLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (values) => {
    const data = {
      pin: value,
      email: values.email,
      password: values.password,
    };
    // console.log('The Reset Data: ', data);

    setSpinner(true);
    const resp = await setPin(data);
    console.log('The Outside RESP: ', resp);

    try {
      if (resp.status == 201) {
        console.log('The RESP: ', resp.data);
        navigation.navigate('WelcomeBack');
        setSpinner(false);
        setErrorMsg('');
        await analytics.track('Reset-Pin', {
          email: values.email,
        });
      } else {
        setSpinner(false);
        setErrorMsg('Please provide a valid email or password');
      }
    } catch (error) {
      console.log('The Error: ', error);
      setSpinner(false);
      setErrorMsg('An error occured, please retry');
    }
  };

  return (
    <>
      <Formik
        validationSchema={ResetPinValidationSchema}
        initialValues={{email: '', password: ''}}
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

                <View style={{paddingHorizontal: 20}}>
                  {/* <Field
                    component={CustomInput}
                    name="pin"
                    placeholder="New Pin"
                  /> */}
                  <View style={{marginTop: 40}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.dark,
                        textAlign: 'center',
                        opacity: 0.5,
                      }}>
                      Enter new PIN
                    </Text>
                    <CodeField
                      ref={ref}
                      {...cellProps}
                      value={value}
                      onChangeText={setValue}
                      cellCount={CELL_COUNT}
                      rootStyle={[
                        designs.codeInputContainer,
                        {paddingHorizontal: 10},
                      ]}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({index, symbol, isFocused}) => (
                        <View
                          key={index}
                          style={[
                            designs.codeInput,
                            isFocused && designs.focusCell,
                          ]}
                          onLayout={getCellLayoutHandler(index)}>
                          <Text style={designs.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </Text>
                        </View>
                      )}
                    />
                  </View>

                  <View style={{marginTop: 40}}>
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
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={value.toString().length <= 3 || spinner}
                style={[
                  designs.btn,
                  {
                    backgroundColor:
                      value.toString().length <= 3 ? '#00DC9980' : '#00DC99',
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
                  {spinner ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    'UPDATE PIN'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      {/* <Spinner visible={spinner} size="large" /> */}
    </>
  );
}
