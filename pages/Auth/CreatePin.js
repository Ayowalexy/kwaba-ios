import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../util';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios';
import {setPin} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';

import analytics from '@segment/analytics-react-native';

const CELL_COUNT = 4;

export default function CreatePin({navigation, route}) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [cellProps, getCellLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [spinner, setSpinner] = useState(false);

  const [fromLogin, setFromLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (route?.params) {
      const login = route?.params?.login;
      console.log(login);
      // console.log('Email: ', route?.params?.email);
      setEmail(login.email);
      setPassword(login.password);
      setFromLogin(true);
    } else {
      console.log('Not from login');
      setFromLogin(false);
    }
  }, []);

  const handleSubmit = async () => {
    const data = {
      pin: value,
      email: email,
      password: password,
    };
    setSpinner(true);
    console.log('The Data: ', data);
    console.log('The Data 2: ', route?.params?.data);
    try {
      const resp = await setPin(data);
      console.log('The Res: ', resp);
      // if(resp.status )r
      if (resp.status == 201) {
        console.log('The RESP: ', resp.data);
        // navigation.navigate('EnterPin');
        navigation.navigate('WelcomeBack', {data: route?.params?.data});
        setSpinner(false);
        await analytics.track('Create-Pin', {
          email: email,
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
            <Text style={[designs.headline]}>Set your Kwaba PIN</Text>
            <Text style={[designs.subtitle]}>
              Your Kwaba PIN Protects your account from{'\n'}unauthorized access
            </Text>
          </View>

          <View style={{marginTop: 50, alignItems: 'center'}}>
            <Text style={[designs.subtitle]}>
              Secure your account with a 4-digit pin
            </Text>

            <CodeField
              ref={ref}
              {...cellProps}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={designs.codeInputContainer}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={[designs.codeInput, isFocused && designs.focusCell]}
                  onLayout={getCellLayoutHandler(index)}>
                  <Text style={designs.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={value.length != 4}
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
            {spinner ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              'SET PIN'
            )}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Spinner visible={spinner} size="large" /> */}
    </>
  );
}
