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

  const handlePaymentRoute = async (value) => {
    console.log('The Value: ', value);
    console.log('The Data Value: ', dataValue);

    setSpinner(true);
    try {
      const res = await joinSavingsChallenge(dataValue);
      if (res.status == 200) {
        setSpinner(false);
        if (value == 'wallet') {
          const data = {
            payment_channel: value,
            reference: res?.data?.data?.reference,
          };

          console.log('Na am:', data);

          setSpinner(true);
          // const verify = await verifySavingsPayment(data);
          const verify = await verifyWalletTransaction(data);
          if (verify.status == 200) {
            onRequestClose(); // close the modal
            setSpinner(false);
            console.log('Verify Successful');
            navigation.navigate('PaymentSuccessful', {
              name: 'JoinChallengeDashboard',
              id: props?.data?.id,
              content: 'Payment Successful',
              subText: 'Awesome! You have successfully joined the challenge',
            });
          } else {
            setSpinner(false);
            console.log(
              'Verify Error: ',
              verify?.response?.data?.response_message,
            );
            console.log('Verify Error 2: ', verify);
            setMessage({
              visible: true,
              body:
                verify?.response?.data?.response_message ||
                'An error occurred, please try again later.',
              success: false,
            });
            // Alert.alert('Oops', verify?.response?.data?.response_message);
          }
        } else {
          setChannel(value);
          setResData(res?.data?.data);
          setShowPaystackPayment(true);
        }
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
    }
  };

  const handleSubmit = async () => {
    const joinData = {
      savings_challenge_id: data?.id,
      savings_amount: unFormatNumber(amount),
      savings_method: savingsType ? 'auto' : 'manual',
    };

    // console.log('The Dats: ', joinData);

    // setJoinData(joinData);
    setDataValue(joinData);
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
                    <Text style={styles.value}>₦{formatNumber(amount)}</Text>
                  </View>
                  <View style={[styles.dataInfo, {alignItems: 'flex-end'}]}>
                    <Text style={styles.key}>Target Amount</Text>
                    <Text style={styles.value}>
                      ₦{formatNumber(data.tartget_per_member)}
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
                    <Text style={styles.value}>{data.fequency}</Text>
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
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
          // disable="bank_transfer"
        />
      )}

      {showPaystackPayment && (
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
