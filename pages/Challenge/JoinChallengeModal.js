import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
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

const {width, height} = Dimensions.get('screen');

const img = require('../../assets/images/dart.png');
const snowflake = require('../../assets/images/snowflake.png');

export default function JoinChallengeModal(props) {
  const {onRequestClose, visible, navigation, data} = props;
  const [spinner, setSpinner] = useState(false);

  const [showPreferenceModal, setShowPreferenceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [dataValue, setDataValue] = useState('');

  const [resData, setResData] = useState('');
  const [channel, setChannel] = useState('');

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [message, setMessage] = useState({
    title: 'Title',
    body: 'Body',
    visible: false,
    success: false,
  });

  useEffect(() => {
    console.log('The Data: ', data);
  }, []);

  const handleNavigate = () => {
    // onRequestClose();
    // navigation.navigate('JoinChallengeDashboard');
    setShowPreferenceModal(true);
  };

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
              id: data?.id,
              content: 'Payment Successful',
              subText: 'Joined! You have successfully join the challenge',
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
          <Image
            source={snowflake}
            style={{
              width: 100,
              height: 100,
              position: 'absolute',
              right: 10,
              top: 10,
              opacity: 0.2,
              zIndex: 0,
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              // paddingVertical: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              color: COLORS.white,
              fontWeight: 'bold',
              lineHeight: 30,
              width: width / 1.5,
              marginVertical: 10,
            }}>
            {data?.name}
          </Text>
          <View style={styles.modalView}>
            <View
              style={{
                flex: 1,
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 40,
              }}>
              <Image
                source={img}
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.dark,
                  textAlign: 'center',
                  lineHeight: 25,
                  marginTop: 20,
                }}>
                {data.description}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.btn, {elevation: 0}]}
              onPress={handleNavigate}>
              <Text style={[styles.btnText]}>JOIN CHALLENGE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, {backgroundColor: 'transparent'}]}
              onPress={onRequestClose}>
              <Text style={[styles.btnText, {color: '#5A4CB1'}]}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {message.visible && (
        <ModalMessage
          message={message}
          navigation={navigation}
          onClose={() => setMessage(!message.visible)}
        />
      )}

      {showPreferenceModal && (
        <PreferenceModal
          onRequestClose={() => setShowPreferenceModal(!showPreferenceModal)}
          visible={showPreferenceModal}
          navigation={navigation}
          onSubmit={() => {
            // onRequestClose();
            setShowPaymentModal(true);
          }}
          data={data}
          setJoinData={(value) => setDataValue(value)}
        />
      )}

      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
          disable="bank_transfer"
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
  btn: {
    backgroundColor: '#5A4CB1',
    // backgroundColor: COLORS.white,
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
});
