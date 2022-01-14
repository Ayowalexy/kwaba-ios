import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Platform,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../util';
import designs from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {enterPinToLogin} from '../../services/network';
import {useSelector, useDispatch} from 'react-redux';
import {setLoginState} from '../../redux/actions/userActions';
import analytics from '@segment/analytics-react-native';

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 4;
const source = {
  uri:
    'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

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

export default function WelcomeBack({navigation, route}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [invalidPin, setInvalidPin] = useState(false);

  const [message, setMessage] = useState('');

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

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
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

  const getUserDetial = async () => {
    const e = await AsyncStorage.getItem('loginEmail');
    const loginInfo = await AsyncStorage.getItem('loginInfo');

    if (loginInfo) {
      // console.log('Na im be dissss: ', JSON.parse(e));
      const parsedData = JSON.parse(loginInfo);
      setEmail(JSON.parse(e));
      setFirstname(parsedData.firstname);
      setLastname(parsedData.lastname);
      console.log('LoginInfo: ', loginInfo);
    }
  };

  useEffect(() => {
    getUserDetial();
  }, []);

  useEffect(() => {
    console.log('Na the route: ', route?.params);
    if (route?.params) {
      // setEmail(route?.params?.email);
      console.log('Email: ', route?.params?.data);
      const data = route?.params?.data;
      setEmail(data.email);
      setFirstname(data.firstname);
      setLastname(data.lastname);
    }
  }, [route?.params]);

  const saveLoginToStorage = async (data) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {}
  };

  const handleSubmit = async () => {
    const data = {
      email: email,
      pin: value,
    };
    console.log('The Data: ', data);
    setSpinner(true);
    setInvalidPin(false);
    try {
      const res = await enterPinToLogin(data);
      console.log('The Res: ', res);
      if (res.status == 200) {
        setSpinner(false);
        saveLoginToStorage({
          ...res.data.data,
          username: res.data.data.user.firstname,
          isLoggedIn: true,
        });
        dispatch(
          setLoginState({
            ...res.data.data,
            username: res.data.data.user.firstname,
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
        // console.log('Something went wrong...');
        console.log('Error', res.response.data.statusMsg);
        setMessage(res.response.data.statusMsg);
      }
    } catch (error) {
      setSpinner(false);
      setInvalidPin(true);
      console.log('Error: ', error.response);
      setMessage(error.response.data.statusMsg);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={25}
            style={{color: COLORS.dark}}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: COLORS.dark,
              marginLeft: 20,
            }}>
            Enter Pin
          </Text>
        </View>
        <ScrollView
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 20,
              marginTop: 20,
            }}>
            <View style={styles.profile}>
              <View style={styles.profile_img}>
                <Icon
                  name="person"
                  style={{fontSize: 50, color: COLORS.dark, opacity: 0.2}}
                />
              </View>
              <View style={styles.profile_content}>
                <View style={styles.profile_welcome}>
                  <Text
                    style={[styles.profile_text, styles.profile_text_welcome]}>
                    Welcome Back
                  </Text>
                </View>
                <View style={styles.profile_user}>
                  <Text style={[styles.profile_text, styles.profile_text_user]}>
                    {firstname} {lastname}
                  </Text>
                  {/* <Text style={[styles.profile_text, styles.profile_text_user]}>
                    {email}
                  </Text> */}
                </View>
              </View>
            </View>

            {/* Pin */}
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
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
                  {/* Incorrect Pin */}
                  {message}
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
                {spinner ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  'CONFIRM'
                )}
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
        </ScrollView>
      </View>

      {/* <Spinner visible={spinner} size="large" /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
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
    elevation: 1,
  },

  // =======================

  root: {
    minHeight: 800,
    padding: 20,
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },

  // profile

  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_img: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#46596920',

    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_content: {
    marginTop: 20,
  },
  profile_text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.dark,
  },
  profile_text_welcome: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  profile_text_user: {
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 5,
    // opacity: 0.5,
  },
});
