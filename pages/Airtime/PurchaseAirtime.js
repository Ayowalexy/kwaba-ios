import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images, icons} from '../../util/index';
import {
  formatNumber,
  unFormatNumber,
  numberWithCommas,
} from '../../util/numberFormatter';
import ChooseNetworkModal from './chooseNetworkModal';
import ConfirmModal from './ConfirmModal';
import NumberFormat from '../../components/NumberFormat';
import {
  BuyPurchaseAirtime,
  completeSavingsPayment,
  verifyBillsTransactions,
  verifyPayment,
  verifySavingsPayment,
  verifyWalletTransaction,
} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import PaymentTypeModalForBills from '../../components/paymentTypeModalForBills';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CreditCardModalBills from '../../components/CreditCard/CreditCardModalBills';
import PaymentTypeModal from '../../components/PaymentType/PaymentTypeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import ModalMessage from '../../components/MessageModals/ModalMessage';
import PushNotification from 'react-native-push-notification';

const PurchaseAirtime = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState(route.params.name);
  const [spinner, setSpinner] = useState(false);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [resData, setResData] = useState('');
  const [airtimeData, setAirtimeData] = useState('');

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [channel, setChannel] = useState('');

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [verifyBillsData, setVerifyBillsData] = useState({});

  const [message, setMessage] = useState({
    title: 'Title',
    body: 'Body',
    visible: false,
    success: false,
  });

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const airtimeSchema = yup.object().shape({
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    amount: yup.string().required('Please provide saving amount'),
  });

  useEffect(() => {
    console.log('Params: ', route.params);
    const val = route?.params?.data?.filter((item) => item?.name == name);
    // console.log('The Value: ', val);
    setAirtimeData(val);
  }, [name]);

  const buyAirtimeHandler = async () => {
    setConfirmModalVisible(false);
    setShowPaymentModal(true);
  };

  const showSuccess = async () => {
    navigation.navigate('PaymentSuccessful', {
      name: 'AirtimeHome',
      content: 'Recharge Successful',
      subText: 'Sent! You have successfully recharged the number',
    });
  };

  const billsPayment = async (data) => {
    setSpinner(true);

    console.log('Airtime payload: ', data);

    try {
      if (data.channel !== 'wallet') {
        setSpinner(false);
        return await showSuccess();
      }
      const res = await completeSavingsPayment(data);

      if (res.status == 200) {
        setSpinner(false);
        console.log('The Res: ', res);

        await showSuccess();
      } else {
        setSpinner(false);
        console.log('Not Okay Res: ', res.response.data);
        Alert.alert('Oops ', 'An error occured');
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error.response);
    }
  };

  const verifyBillsPayment = async (data, paymentChannel) => {
    setSpinner(true);
    const res = await verifySavingsPayment({
      ...data,
      billsData: {
        amount: unFormatNumber(amount),
        recepient: phoneNumber, //08011111111 for test
        serviceId: airtimeData[0]?.serviceID, // e.g mtn, airtel, glo, 9mobile
      },
    });

    if (!res) {
      return [];
    }

    if (res.status == 200) {
      setSpinner(false);
      setVerifyBillsData(res?.data?.data);
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: unFormatNumber(amount),
          channel: 'wallet',
          // reference: res?.data?.data?.paymentReference, // from verifyBillsPayment
          reference: res?.data?.data?.reference,
          purpose: 'bills',
          billsMethod: 'billsWithoutBillersCode',
          billsData: {
            amount: unFormatNumber(amount),
            recepient: phoneNumber, //08011111111 for test
            serviceId: airtimeData[0]?.serviceID, // e.g mtn, airtel, glo, 9mobile
          },
        };

        console.log('Billsssss: ', payload);
        await billsPayment(payload);
      } else {
        setShowPaystackPayment(true);
      }
    } else {
      setSpinner(false);
      Alert.alert('Error', 'something went wrong.');
    }
  };

  const handlePaymentRoute = async (value) => {
    if (value == 'wallet') {
      const data = {
        amount: unFormatNumber(amount),
        channel: 'wallet',
        purpose: 'bills',
        billsMethod: 'billsWithoutBillersCode',
      };

      setChannel(value); //wallet

      await verifyBillsPayment(data, value);
    } else {
      const data = {
        amount: unFormatNumber(amount),
        channel: 'paystack',
        purpose: 'bills',
        billsMethod: 'billsWithoutBillersCode',
      };

      setChannel(value);

      await verifyBillsPayment(data, value);
    }
  };

  const handlePaymentRoute2 = async (value) => {
    try {
      const data = {
        serviceID: airtimeData[0]?.serviceID, // e.g mtn, airtel, glo, 9mobile
        amount: unFormatNumber(amount), // e.g 100
        recepient: phoneNumber, // e.g 08011111111
      };

      setSpinner(true);
      const response = await BuyPurchaseAirtime(data);

      if (response.status == 200) {
        setSpinner(false);
        if (value == 'wallet') {
          const data = {
            payment_channel: value,
            reference: response?.data?.data?.reference,
          };

          console.log('Airtime Data: ', data);

          setSpinner(true);
          // const verify = await verifyBillsTransactions(data);
          const verify = await verifyWalletTransaction(data);

          if (verify.status == 200) {
            setSpinner(false);
            navigation.navigate('PaymentSuccessful', {
              name: 'AirtimeHome',
              content: 'Recharge Successful',
              subText: 'Sent! You have successfully recharged the number',
              onNotify: () => {
                PushNotification.localNotification({
                  channelId: 'test-channel',
                  title: 'Airtime Recharge',
                  message: 'You just recharged',
                });
              },
            });
          } else {
            setSpinner(false);

            setMessage({
              visible: true,
              body:
                verify?.response?.data?.response_message ||
                'An error occurred, please try again later.',
              success: false,
            });
            console.log('Verify Error: ', verify?.response);
          }
        } else {
          setChannel(value);
          setResData(response?.data?.data);
          setShowPaystackPayment(true); // show paystack
        }
      } else {
        setSpinner(false);
        console.log('Response Error: ', response?.response?.data);
        setMessage({
          visible: true,
          body: response?.response?.data?.statusMsg,
          success: false,
        });
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error?.response);
      setMessage({
        visible: true,
        body: error?.response?.data?.response_message,
        success: false,
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#EFEFEF'}}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingHorizontal: 20, paddingVertical: 20}}
        color={COLORS.primary}
      />

      <ScrollView style={{paddingHorizontal: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: COLORS.primary,
            marginLeft: 5,
          }}>
          Airtime Purchase
        </Text>

        <TouchableOpacity
          style={styles.customInput}
          onPress={() => {
            setVisible(!visible);
          }}>
          <Text style={{fontWeight: 'bold', color: COLORS.primary}}>
            {name}
          </Text>
          <Icon
            name="chevron-down-outline"
            size={20}
            style={{fontWeight: 'bold'}}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <View style={[styles.customInput, {padding: 0}]}>
          <TextInput
            style={{
              width: '100%',
              paddingLeft: 20,
              paddingVertical: 16,
            }}
            placeholder="Phone Number"
            placeholderTextColor="#BFBFBF"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <Icon
            onPress={() => navigation.goBack()}
            name="card-sharp"
            size={20}
            style={{fontWeight: 'bold', position: 'absolute', right: 20}}
            color={COLORS.primary}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 10,
              marginLeft: 2,
              color: COLORS.dark,
            }}>
            Select amount
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {['100', '200', '500', '1000', '1500', '2000']?.map(
              (value, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.amount,
                    {
                      backgroundColor:
                        unFormatNumber(amount) === value
                          ? '#9D98EC'
                          : '#9D98EC50',
                    },
                  ]}
                  onPress={() => setAmount(value)}>
                  <Text style={styles.amountText}>
                    ₦{numberWithCommas(value)}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#BFBFBF50',
            marginVertical: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#EFEFEF',
              width: 40,
              height: 40,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#BFBFBF50',
            }}>
            <Text
              style={{
                color: COLORS.dark,
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              OR
            </Text>
          </View>
        </View>

        <NumberFormat value={amount} onChangeText={(text) => setAmount(text)} />

        {/* <View style={styles.btnContainer}> */}
        <TouchableOpacity
          onPress={() => {
            setConfirmModalVisible(!confirmModalVisible);
          }}
          disabled={amount < 100}
          style={[
            styles.btn,
            {
              backgroundColor:
                phoneNumber.length < 10 || amount < 100
                  ? '#00DC9950'
                  : '#00DC99',
              width: '100%',
              borderRadius: 10,
              marginTop: 20,
              // opacity: isError() ? 0 : 1,
            },
          ]}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              lineHeight: 30,
              fontWeight: 'bold',
            }}>
            NEXT
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </ScrollView>

      {visible && (
        <ChooseNetworkModal
          visible={visible}
          onRequestClose={() => setVisible(!visible)}
          selectedNetwork={name}
          onClick={(value) => setName(value.name)}
          chooseNetwork={route?.params?.data}
        />
      )}

      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            console.log('Hello', data);
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
          // disable="wallet"
        />
      )}

      {confirmModalVisible && (
        <ConfirmModal
          visible={confirmModalVisible}
          onRequestClose={() => setConfirmModalVisible(!confirmModalVisible)}
          selectedNetwork={name}
          selectedPhoneNumber={phoneNumber}
          selectedAmount={formatNumber(amount)}
          onClickBuyAirtime={buyAirtimeHandler}
        />
      )}

      {showCardModal && (
        <CreditCardModalBills
          onRequestClose={() => setShowCardModal(!showCardModal)}
          visible={showCardModal}
          info={resData}
          navigation={navigation}
          redirectTo="AirtimeHome"
          channel={channel}
        />
      )}

      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={verifyBillsData}
          channel={channel}
          paymentCanceled={(e) => {
            console.log('Pay cancel', e);
            setSpinner(false);
            // Do something
          }}
          paymentSuccessful={async (res) => {
            setSpinner(false);
            const data = {
              amount: unFormatNumber(amount),
              channel: 'paystack',
              // reference: verifyBillsData?.paymentReference, // from verifyBillsPayment
              reference: verifyBillsData?.reference,
              purpose: 'bills',
              billsMethod: 'billsWithoutBillersCode',
              billsData: {
                amount: unFormatNumber(amount),
                recepient: phoneNumber, //08011111111 for test
                serviceId: airtimeData[0]?.serviceID, // e.g mtn, airtel, glo, 9mobile
              },
            };

            console.log('We here: ', data);

            await billsPayment(data);
          }}
        />
      )}

      {message.visible && (
        <ModalMessage
          message={message}
          navigation={navigation}
          onClose={() => setMessage(!message.visible)}
        />
      )}
      <Spinner visible={spinner} size="large" />
    </View>
  );
};

export default PurchaseAirtime;

const styles = StyleSheet.create({
  customInput: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  amount: {
    width: '32%',
    padding: 15,
    // paddingHorizontal: 10,
    backgroundColor: '#9D98EC',
    backgroundColor: '#EDECFC',
    borderRadius: 5,
    marginTop: 10,
    borderColor: '#ADADAD50',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },

  btnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    // borderWidth: 1,
  },

  btn: {
    padding: 15,
    borderRadius: 10,
    // marginTop: 20,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 1,
  },
});
