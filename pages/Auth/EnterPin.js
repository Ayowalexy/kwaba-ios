import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../util';
import {useSelector, useDispatch} from 'react-redux';
import {setLoginState} from '../../redux/actions/userActions';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {enterPinToLogin} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CELL_COUNT = 4;

export default function EnterPin({navigation, route}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [cellProps, getCellLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');

  const [invalidPin, setInvalidPin] = useState(false);

  useEffect(() => {
    (async () => {
      const e = await AsyncStorage.getItem('loginEmail');
      console.log('Na im be dis: ', JSON.parse(e));
      setEmail(JSON.parse(e));
    })();
  }, []);

  const saveLoginToStorage = async (data) => {
    // console.log(data);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {}
  };

  const handleSubmit = async () => {
    // console.log(value);
    const data = {
      email: email,
      pin: value,
    };
    setSpinner(true);
    setInvalidPin(false);
    try {
      const res = await enterPinToLogin(data);
      console.log('The Res: ', res);
      if (res.status == 200) {
        setSpinner(false);
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
        console.log('Give am');
        navigation.navigate('Home');
        setInvalidPin(false);
      } else {
        setSpinner(false);
        setInvalidPin(true);
        console.log('Something went wrong...');
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error);
      setInvalidPin(true);
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
            <Text style={[designs.headline]}>Enter PIN to Login</Text>
            <Text style={[designs.subtitle]}>
              Your Kwaba PIN Protects your account from{'\n'}unauthorized access
            </Text>
          </View>

          <View style={{marginTop: 50, alignItems: 'center'}}>
            <Text style={[designs.subtitle]}>ENTER PIN</Text>

            <CodeField
              ref={ref}
              {...cellProps}
              value={value}
              onChangeText={setValue}
              onTextInput={() => setInvalidPin(false)}
              cellCount={CELL_COUNT}
              rootStyle={designs.codeInputContainer}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={[
                    designs.codeInput,
                    isFocused && designs.focusCell,
                    {borderColor: invalidPin ? COLORS.red : '#EFEFEF'},
                  ]}
                  onLayout={getCellLayoutHandler(index)}>
                  <Text style={designs.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {invalidPin && (
              <Text
                style={[
                  designs.subtitle,
                  {
                    color: COLORS.red,
                    marginTop: 20,
                  },
                ]}>
                Incorrect Pin
              </Text>
            )}
          </View>
        </View>

        <View>
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
              CONFIRM
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Spinner visible={spinner} size="large" />
    </>
  );
}
