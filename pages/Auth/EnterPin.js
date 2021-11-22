import React, {useEffect, useState} from 'react';
import {View, Text, Animated, TouchableOpacity, StyleSheet} from 'react-native';
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
import analytics from '@segment/analytics-react-native';

const {Value, Text: AnimatedText} = Animated;
const CELL_COUNT = 4;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};
const CELL_SIZE = 55;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = COLORS.white;
const NOT_EMPTY_CELL_BG_COLOR = COLORS.dark;
const ACTIVE_CELL_BG_COLOR = '#f7fafe';

export default function EnterPin({navigation, route}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');

  const [invalidPin, setInvalidPin] = useState(false);

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[
          styles.cell,
          animatedCellStyle,
          // {
          //   backgroundColor: invalidPin ? COLORS.red : '#fff',
          // },
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  useEffect(() => {
    console.log('**********');
    console.log('Hello Joshua', route);

    (async () => {
      if (route?.params) {
        setEmail(route?.params?.email);
        console.log('Email: ', route?.params?.email);
      } else {
        const e = await AsyncStorage.getItem('loginEmail');
        console.log('Na im be dissss: ', JSON.parse(e));
        setEmail(JSON.parse(e));
      }
    })();
  }, [route?.params?.email]);

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

        await analytics.track('Enter-Pin', {
          email: email,
        });
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

          {/* <View
            style={{
              marginTop: 20,
              backgroundColor: '#00DC9900',
              paddingVertical: 15,
              // display: 'none',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.dark,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              {email}
            </Text>
          </View> */}

          <View style={{marginTop: 40, alignItems: 'center'}}>
            <Text style={[designs.subtitle, {fontWeight: 'bold'}]}>
              ENTER PIN
            </Text>

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
              // renderCell={({index, symbol, isFocused}) => (
              //   <View
              //     key={index}
              //     style={[
              //       designs.codeInput,
              //       isFocused && designs.focusCell,
              //       {borderColor: invalidPin ? COLORS.red : '#46596950'},
              //     ]}
              //     onLayout={getCellLayoutHandler(index)}>
              //     <Text style={designs.cellText}>
              //       {symbol || (isFocused ? <Cursor /> : null)}
              //     </Text>
              //   </View>
              // )}
              renderCell={renderCell}
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
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPin')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#465969',
                  fontSize: 12,
                  lineHeight: 30,
                  fontWeight: 'bold',
                }}>
                Forgot your PIN? <Text style={{color: '#00DC99'}}>Reset</Text>
              </Text>
            </TouchableOpacity>
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

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#465969',
                fontSize: 14,
                lineHeight: 30,
                fontWeight: 'bold',
              }}>
              Log in with a different{' '}
              <Text style={{color: '#00DC99'}}>Account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: COLORS.dark,
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
});
