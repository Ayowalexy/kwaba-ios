import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import Toast from 'react-native-toast-message';

import {images, icons, COLORS} from '../../util/index';
import designs from './style';
import {verifyPhone} from '../../services/network';
import {sendVerificationCode} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import SuccessModal from '../../components/SuccessModal';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

export default function VerifyNumber({navigation, route}) {
  const [successModal, setSuccessModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  // For keeping a track on the Timer
  const [timerEnd, setTimerEnd] = useState(false);
  const [timestamp, setTimestamp] = useState(90);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Timer References
  const refTimer = useRef();

  const timerCallbackFunc = (timerFlag) => {
    // Setting timer flag to finished
    setTimerEnd(timerFlag);
    // console.warn(
    //   'You can alert the user by letting him know that Timer is out.',
    // );
  };

  const DisplayCountDownTimer = () => {
    return (
      <>
        <View style={designs.counter}>
          {/* <Text>{time}sec</Text> */}
          <CountDownTimer
            ref={refTimer}
            timestamp={timestamp}
            timerCallback={timerCallbackFunc}
            containerStyle={
              {
                // height: 56,
                // width: 120,
                // justifyContent: 'center',
                // alignItems: 'center',
                // borderRadius: 35,
                // backgroundColor: '#2196f3',
                // marginTop: 2,
              }
            }
            textStyle={{
              fontSize: 12,
              color: '#FFFFFF',
              fontWeight: '500',
              letterSpacing: 0.25,
            }}
          />
          <Text style={{color: '#fff', marginLeft: 5, marginTop: -2}}>sec</Text>
        </View>
      </>
    );
  };

  const DisplayResentOTP = () => {
    return (
      <>
        <TouchableOpacity
          onPress={resendOTP}
          style={{
            alignText: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 52,
          }}>
          <Text
            style={[
              {
                alignText: 'center',
                color: '#2A286A',
                fontFamily: 'CircularStd',
              },
            ]}>
            Didn't receive OTP or it expired
          </Text>
          <Text style={[{color: COLORS.light, fontFamily: 'CircularStd'}]}>
            {' '}
            Resend
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const verify = async () => {
    setSpinner(true);
    const res = await verifyPhone({code: value});
    console.log('VALUE:', value);
    console.log('RES:', res);

    if (res.status == 200) {
      navigation.navigate('Login');
      setSpinner(false);
      // setSuccessModal(true);
      setValue('');
      setError(false);
    } else {
      setSpinner(false);
      setError(true);
      // Alert.alert('VERIFICATION FAILED', res, [{text: 'Ok'}]);
    }
    console.log(value);
  };

  const resendOTP = async () => {
    const phoneNumber = route.params.phone_number;
    const data = {telephone: phoneNumber};
    const response = await sendVerificationCode(data);
    if (response.status == 200) {
      setTimerEnd(false);
      setTimestamp(90);

      setSpinner(false);
    } else {
      setSpinner(false);
      // Alert.alert('Request Failed', response, [{text: 'Ok'}]);
    }
  };

  const handleNavigation = () => {
    setSuccessModal(false);
    navigation.navigate('Login');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F7F8FD',
        fontFamily: 'CircularStd',
        padding: 15,
        // justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center', marginBottom: 0, marginTop: 50}}>
        <Image
          style={[designs.image, {marginTop: 0}]}
          source={icons.kwabalogocol}
          resizeMode="contain"
        />
      </View>
      <Text style={[designs.heading, {textAlign: 'center'}]}>
        Verify your phone number
      </Text>
      <Text style={[designs.body, {textAlign: 'center', marginTop: 10}]}>
        Please enter verification code sent to {'\n'} your number
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={designs.codeInputContainer}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={[designs.codeInput, isFocused && styles.focusCell]}
            onLayout={getCellLayoutHandler(index)}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      {/* {value.length != 4 && (
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 5,
          }}>
          <Text style={{color: 'pink'}}>All fields are required</Text>
        </View>
      )} */}

      {error && (
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 5,
          }}>
          <Text style={{color: 'pink'}}>Invalid verification code</Text>
        </View>
      )}

      <Spinner visible={spinner} animation="fade" size="large" />
      <TouchableOpacity
        onPress={verify}
        disabled={value.length != 4}
        style={[designs.btn, {backgroundColor: '#00DC99'}]}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            lineHeight: 32,
            fontWeight: 'bold',
            // fontSize: value.length == 4 ? 18 : 5,
          }}>
          VERIFY
        </Text>
      </TouchableOpacity>
      {/* {<DisplayResentOTP/>} */}
      {timerEnd ? <DisplayResentOTP /> : <DisplayCountDownTimer />}
      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
        handlePress={handleNavigation}
        successHeading="SUCCESS"
        successText="Your phone number has been verified. You can now login"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cellText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#465969',
  },
  focusCell: {
    borderColor: '#00DC99',
  },
});
