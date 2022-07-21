import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../util';

import Spinner from 'react-native-loading-spinner-overlay';
import analytics from '@segment/analytics-react-native';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {setPin} from '../../../services/network';

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
          autoCompleteType="off"
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

export default function ChangePinModal(props) {
  const {onRequestClose, visible} = props;
  const [spinner, setSpinner] = useState(false);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [cellProps, getCellLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSubmit = async (values) => {
    const data = {
      pin: value,
      email: values.email,
      password: values.password,
    };
    console.log('The Reset Data: ', data);

    setSpinner(true);

    const resp = await setPin(data);
    // console.log('resp: ', resp?.response);

    try {
      if (resp.status == 201) {
        // console.log('The RESP: ', resp.data);
        // navigation.navigate('Home');
        // onRequestClose();
        setSpinner(false);
        Alert.alert('Pin Updated', 'Your Pin has been reset Successfully');
      } else {
        setSpinner(false);
      }
    } catch (error) {
      Alert.alert('Error', error?.response?.data?.meta?.error);
      // console.log('The Error: ', error);
      setSpinner(false);
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
              onRequestClose={onRequestClose}
              style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
              <View style={designs.centeredView}>
                <View style={designs.modalView}>
                  <Icon
                    onPress={onRequestClose}
                    name="arrow-back-outline"
                    size={25}
                    style={{color: COLORS.primary}}
                  />
                  <View
                    style={{
                      width: '100%',
                      flex: 1,
                      backgroundColor: '#f7f8fd',
                      paddingVertical: 20,
                      // paddingHorizontal: 20,
                    }}>
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
                                  {symbol || (!isFocused ? '•' : null)}
                                </Text>
                              </View>
                            )}
                          />
                        </View>

                        <View style={{marginTop: 40}}>
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

                          <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={value.toString().length <= 3}
                            style={[
                              designs.btn,
                              {
                                backgroundColor:
                                  value.toString().length <= 3
                                    ? '#00DC9980'
                                    : '#00DC99',
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
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )}
      </Formik>

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({});
