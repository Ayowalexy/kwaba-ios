import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import Toast from 'react-native-toast-message';

import {images, icons, COLORS} from '../../util/index';
import designs from './style';
import {verifyPhone} from '../../services/network';
import {sendVerificationCode} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import SuccessModal from '../../components/SuccessModal';

export default function VerifyNumber({navigation, route}) {
  const [successModal, setSuccessModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [time, setTime] = useState(45);
  const [code, setCode] = useState({num1: '', num2: '', num3: '', num4: ''});
  // For keeping a track on the Timer
  const [timerEnd, setTimerEnd] = useState(false);
  const [timestamp, setTimestamp] = useState(45);

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
    const data = {code: `${code.num1}${code.num2}${code.num3}${code.num4}`};

    setSpinner(true);
    const res = await verifyPhone(data);
    if (res.status == 200) {
      setSpinner(false);
      setSuccessModal(true);
      setCode({num1: '', num2: '', num3: '', num4: ''});
    } else {
      Alert.alert('VERIFICATION FAILED', res, [{text: 'Ok'}]);
    }
  };

  const resendOTP = async () => {
    const phoneNumber = route.params.phone_number;
    const data = {telephone: phoneNumber};
    const response = await sendVerificationCode(data);
    console.log(data);
    if (response.status == 200) {
      setTimerEnd(false);
      setTimestamp(45);
      Toast.show({
        text1: 'Code Resent',
        text2: response.data.statusMsg + ' 👋',
        visibilityTime: 2000,
        position: 'top',
        topOffset: 30,
      });

      setSpinner(false);
    } else {
      setSpinner(false);
      Alert.alert('Request Failed', response, [{text: 'Ok'}]);
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
      <View style={{alignItems: 'center', marginBottom: 20, marginTop: 50}}>
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
        Please enter verification code sent {'\n'} to your number
      </Text>
      <View style={designs.codeInputContainer}>
        <TextInput
          keyboardType="number-pad"
          value={code.num1}
          onChangeText={(text) => setCode({...code, num1: text})}
          style={designs.codeInput}
        />
        <TextInput
          keyboardType="number-pad"
          value={code.num2}
          onChangeText={(text) => setCode({...code, num2: text})}
          style={designs.codeInput}
        />
        <TextInput
          keyboardType="number-pad"
          value={code.num3}
          onChangeText={(text) => setCode({...code, num3: text})}
          style={designs.codeInput}
        />
        <TextInput
          keyboardType="number-pad"
          value={code.num4}
          onChangeText={(text) => setCode({...code, num4: text})}
          style={designs.codeInput}
        />
      </View>
      <Spinner
        visible={spinner}
        // textContent={'Sending...'}
        animation="fade"
        // textStyle={{
        //   color: '#2A286A',
        //   fontSize: 20,
        //   fontWeight: 'bold',
        //   lineHeight: 30,
        // }}
        size="large"
      />
      <TouchableOpacity
        onPress={verify}
        style={[designs.btn, {backgroundColor: '#00DC99'}]}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            lineHeight: 32,
            fontWeight: 'bold',
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
