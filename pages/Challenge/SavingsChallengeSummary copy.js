import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import PreferenceModal from './PreferenceModal';
import PaymentTypeModal from '../../components/PaymentType/PaymentTypeModal';
import {
  joinSavingsChallenge,
  verifySavingsPayment,
  verifyWalletTransaction,
} from '../../services/network';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import ModalMessage from '../../components/MessageModals/ModalMessage';
import {ScrollView} from 'react-native-gesture-handler';
import {formatNumber, unFormatNumber} from '../../util/numberFormatter';
import moment from 'moment';

const {width, height} = Dimensions.get('screen');

const img = require('../../assets/images/dart.png');
const snowflake = require('../../assets/images/snowflake.png');
const naira = require('../../assets/images/piggy-bank.png');

export default function SavingsChallengeSummary(props) {
  const {onRequestClose, visible, navigation, data} = props;
  const [spinner, setSpinner] = useState(false);

  // const [joinData, setJoinData] = useState('');

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [dataValue, setDataValue] = useState('');

  const [resData, setResData] = useState('');
  const [verifyData, setVerifyData] = useState('');
  const [channel, setChannel] = useState('');

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [amount, setAmount] = useState('');

  const [amountAtMaturity, setAmountAtMaturity] = useState(0);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [message, setMessage] = useState({
    title: 'Title',
    body: 'Body',
    visible: false,
    success: false,
  });

  const [savingsType, setSavingsType] = useState(true);

  const toggleSwitch = () => {
    setSavingsType((previousState) => !previousState);
  };

  useEffect(() => {
    console.log('The Data: ', data);

    // Amount at Maturity Calculation

    // let targetAmount = data?.tartget_per_member;
    // let annualInterestRate = 11;
    // let dailyInteresRate = annualInterestRate;

    var challenge_start = moment(data?.start_date, 'YYYY-MM-DD');
    var challenge_end = moment(data?.end_date, 'YYYY-MM-DD');

    var diff = challenge_end.diff(challenge_start, 'days');

    var savingsStartDate = moment(); // today's date
    var savingsEndDate = moment(savingsStartDate, 'DD-MM-YYYY').add(
      diff,
      'days',
    ); // 25 days from today's date

    var amountToSavePerDay =
      Number(unFormatNumber(data?.tartget_per_member)) / diff;

    // console.log('The S Data: ', savingsStartDate);
    // console.log('The E Data: ', savingsEndDate);
    // console.log('The Diff: ', diff);

    setStartDate(savingsStartDate);
    setEndDate(savingsEndDate);
    setAmount(amountToSavePerDay.toFixed(2));
  }, []);

  // const handlePaymentRoute = async (value) => {
  //   console.log('The Value: ', value);
  //   console.log('The Data Value: ', dataValue);

  //   setSpinner(true);
  //   try {
  //     const res = await joinSavingsChallenge(dataValue);
  //     if (res.status == 200) {
  //       setSpinner(false);
  //       if (value == 'wallet') {
  //         const data = {
  //           payment_channel: value,
  //           reference: res?.data?.data?.reference,
  //         };

  //         console.log('Na am:', data);

  //         setSpinner(true);
  //         // const verify = await verifySavingsPayment(data);
  //         const verify = await verifyWalletTransaction(data);
  //         if (verify.status == 200) {
  //           onRequestClose(); // close the modal
  //           setSpinner(false);
  //           console.log('Verify Successful');
  //           navigation.navigate('PaymentSuccessful', {
  //             name: 'JoinChallengeDashboard',
  //             id: props?.data?.id,
  //             content: 'Payment Successful',
  //             subText: 'Awesome! You have successfully joined the challenge',
  //           });
  //         } else {
  //           setSpinner(false);
  //           console.log(
  //             'Verify Error: ',
  //             verify?.response?.data?.response_message,
  //           );
  //           console.log('Verify Error 2: ', verify);
  //           setMessage({
  //             visible: true,
  //             body:
  //               verify?.response?.data?.response_message ||
  //               'An error occurred, please try again later.',
  //             success: false,
  //           });
  //           // Alert.alert('Oops', verify?.response?.data?.response_message);
  //         }
  //       } else {
  //         setChannel(value);
  //         setResData(res?.data?.data);
  //         setShowPaystackPayment(true);
  //       }
  //     } else {
  //       setSpinner(false);
  //     }
  //   } catch (error) {
  //     setSpinner(false);
  //   }
  // };

  const showSuccess = async () => {
    navigation.navigate('PaymentSuccessful', {
      content: 'Payment Successful',
      subText: 'You have successfully funded your savings',
      name: 'SoloSavingDashBoard',
      id: verifyData.id,
    });
  };

  const savingsPayment = async (data) => {
    setSpinner(true);

    try {
      const res = await completeSavingsPayment(data);

      if (res.status == 201) {
        setSpinner(false);

        console.log('Complete Paymentttttttttt: ', res.data.data);
        await showSuccess();
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error.response.data);
    }
  };

  const verifyPaymentRequest = async (data, paymentChannel) => {
    console.log('The Data: ', data);

    setSpinner(true);
    const res = await verifySavingsPayment(data);

    setSpinner(false);
    if (!res) {
      return [];
    }

    if (res.status == 200) {
      const verifyData = res?.data?.data;
      console.log('Verifying data....: ', verifyData);
      setVerifyData({...verifyData, id: data.savings_id});
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: verifyData.amount,
          channel: 'wallet',
          // reference: verifyData.paymentReference,
          reference: verifyData.reference,
          purpose: 'savings_challenge',
        };

        console.log('Payload Data: ', payload);

        await savingsPayment(payload);
      } else {
        setShowPaystackPayment(true);
      }
    } else {
      console.log('Errorrr: ', res.response.data);
      // Alert.alert('Oops', res?.response?.data?.meta?.error);
      Alert.alert(
        'Oops',
        'This challenge is not active yet. Please try again on the challenge start date',
      );

      // if (
      //   res.response?.data?.meta?.error ==
      //   'The maximum savings amount for this savings is execeded'
      // ) {
      //   Alert.alert(
      //     'Payment unsuccessful',
      //     `You've exceeded the target amount for this savings plan`,
      //   );
      // } else if (
      //   res.response?.data?.meta?.error == 'Insufficient wallet balance'
      // ) {
      //   Alert.alert(
      //     'Payment unsuccessful',
      //     'You do not have enough money in your wallet',
      //   );
      // }
    }
  };

  const handleJoinChallenge = async (paymentChannel) => {
    const payload = {
      challenge_id: data?.id,
      auto_save: savingsType,
      locked: true, // this is locked by default
    };
    console.log(payload);
    // console.log(paymentChannel);

    setSpinner(true);
    const response = await joinSavingsChallenge(payload);

    try {
      // console.log(response.response);

      setSpinner(false);
      if (
        response.status == 201 ||
        response.response.data.meta.error == 'User has already joined challenge'
      ) {
        const payloadData = {
          amount: data?.periodic_savings_amount,
          savings_id: data?.id,
          channel: paymentChannel,
          purpose: 'savings_challenge',
          savingsChallengeData: {
            savings_id: data.savings_id,
            challenge_id: data?.id,
          },
        };

        console.log('Data: ', payloadData);

        // await verifyPaymentRequest(payloadData, paymentChannel);
      } else {
        console.log('Error Response: ', response.response.data);
      }
    } catch (error) {
      setSpinner(false);
      console.log('error: ', error);
    }
  };

  const handlePaymentRoute = async (value) => {
    if (value == 'wallet') {
      handleJoinChallenge(value);
    } else {
      handleJoinChallenge(value);
    }
  };

  const handleSubmit = async () => {
    setShowPaymentModal(true);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <Icon
            onPress={onRequestClose}
            name="arrow-back-outline"
            size={25}
            style={{fontWeight: '900'}}
            color={COLORS.white}
          />

          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
              <View style={[styles.title]}>
                <Text style={[styles.titleText]}>Challenge Breakdown</Text>
              </View>
              <View style={[styles.card]}>
                <View style={[styles.banner]}>
                  <View style={{flex: 1, paddingRight: 30}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: COLORS.dark,
                        lineHeight: 25,
                      }}>
                      {data?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 20,
                        marginTop: 10,
                        color: COLORS.dark,
                      }}>
                      {data?.description}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={naira}
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <View style={[styles.preset]}>
                  <View style={styles.dataInfo}>
                    <Text style={styles.key}>Amount to Save Daily</Text>
                    <Text style={styles.value}>
                      ₦{formatNumber(data?.periodic_savings_amount)}
                    </Text>
                  </View>
                  <View style={[styles.dataInfo, {alignItems: 'flex-end'}]}>
                    <Text style={styles.key}>Target Amount</Text>
                    <Text style={styles.value}>
                      ₦{formatNumber(data.target_amount)}
                    </Text>
                  </View>
                  <View style={styles.dataInfo}>
                    <Text style={styles.key}>Start Date</Text>
                    <Text style={styles.value}>
                      {/* {moment(startDate).format('Do MMM YYYY')} */}
                      {moment(startDate).format('MMM D, YYYY')}
                    </Text>
                  </View>
                  <View style={[styles.dataInfo, {alignItems: 'flex-end'}]}>
                    <Text style={styles.key}>End Date</Text>
                    <Text style={styles.value}>
                      {/* {moment(endDate).format('Do MMM YYYY')} */}
                      {moment(endDate).format('MMM D, YYYY')}
                    </Text>
                  </View>

                  <View style={[styles.dataInfo]}>
                    <Text style={styles.key}>Frequency</Text>
                    <Text style={styles.value}>
                      {data.frequency == 1 ? 'Daily' : ''}
                    </Text>
                  </View>

                  {/* <View style={[styles.dataInfo, {alignItems: 'flex-end'}]}>
                  <Text style={styles.key}>Amount at Maturity</Text>
                  <Text style={styles.value}>₦{amountAtMaturity}</Text>
                </View> */}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    paddingHorizontal: 20,
                    backgroundColor: '#5A4CB110',
                    paddingVertical: 5,
                    borderRadius: 0,
                  }}>
                  <Text
                    style={{
                      color: COLORS.dark,
                      fontSize: 13,
                      lineHeight: 15,
                      marginRight: 23,
                    }}>
                    Switch to {savingsType ? 'Manual' : 'Automatic'} Savings
                  </Text>
                  <Switch
                    trackColor={{false: '#ddd', true: '#ddd'}}
                    thumbColor={savingsType ? COLORS.secondary : '#ADADAD'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={savingsType}
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    // height: 26,
                    borderRadius: 5,
                    backgroundColor: '#00000022',
                    // backgroundColor: '#5A4CB110',
                    padding: 5,
                    paddingVertical: 10,
                    marginTop: 15,
                    // marginBottom: -20,
                  }}>
                  <Text
                    style={{
                      color: COLORS.dark,
                      fontSize: 10,
                      lineHeight: 13,
                      fontWeight: 'bold',
                      fontFamily: 'Circular Std',
                      textAlign: 'center',
                    }}>
                    To help you reach your rent goal, upon completion of this
                    challenge, you will have to move your money to a savings
                    plan
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.btn, {elevation: 0}]}>
              <Text style={[styles.btnText]}>JOIN CHALLENGE</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {message.visible && (
        <ModalMessage
          message={message}
          navigation={navigation}
          onClose={() => setMessage(!message.visible)}
        />
      )}

      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            // console.log('DFDF: ', data);
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
        />
      )}

      {/* {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={resData}
          channel={channel}
          paymentCanceled={(e) => {
            console.log('Pay cancel', e);
            // Do something
          }}
          paymentSuccessful={async (res) => {
            console.log('Pay done', res);

            const data = {
              channel: 'paystack',
              reference: res.data.transactionRef.reference,
            };

            console.log('the dataatatta: ', data);
          }}
        />
      )} */}

      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={verifyData}
          channel={channel}
          paymentCanceled={(e) => {
            setSpinner(false);
            Alert.alert('Payment cancelled');
          }}
          paymentSuccessful={async (res) => {
            const data = {
              amount: verifyData.amount,
              savings_id: verifyData.id,
              channel: 'paystack',
              // reference: verifyData.paymentReference,
              reference: verifyData.reference,
              purpose: 'savings',
            };

            console.log('the dataatatta: ', data);
            console.log('This complete data: ', data);

            await savingsPayment(data);
          }}
        />
      )}

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#5A4CB1',
    padding: 20,
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    padding: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
  card: {
    marginTop: 20,
    padding: 20,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 8,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    flexDirection: 'column',
    minHeight: 200,
  },
  banner: {
    // backgroundColor: '#5A4CB1',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  title: {
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  btn: {
    // backgroundColor: '#5A4CB1',
    backgroundColor: COLORS.secondary,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    color: COLORS.white,
    // color: '#5A4CB1',
    fontSize: 12,
    fontWeight: 'bold',
  },
  preset: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dataInfo: {
    width: '50%',
    marginTop: 20,
  },
  key: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15,
    color: COLORS.dark,
    // backgroundColor: 'red',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    color: COLORS.dark,
    marginTop: 2,
    textTransform: 'capitalize',
  },
});
