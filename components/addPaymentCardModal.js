import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../util';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getTokenizeCards,
  tokenizeCard,
  tokenizePayment,
  verifyPayment,
} from '../services/network';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import Spinner from 'react-native-loading-spinner-overlay';
import PaystackPayment from './Paystack/PaystackPayment';

export default function AddPaymentCardModal(props) {
  const {onRequestClose, visible, onConfirm, setDisplayAllPaymentCards} = props;

  const [paymentCards, setPaymentCards] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [resData, setResData] = useState('');
  const [channel, setChannel] = useState('');

  const addAccount = async () => {
    const data = {
      amount: 50,
    };

    setSpinner(true);
    try {
      const res = await tokenizePayment(data);
      console.log('RES: ', res);
      setSpinner(false);
      if (res.status == 200) {
        setSpinner(false);
        console.log('The Response: ', res.data.data);
        setShowPaystackPayment(true);
        setResData(res.data.data);
        setChannel('card');

        // const verify =
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setDisplayAllPaymentCards(paymentCards);
  }, [paymentCards]);

  useEffect(() => {
    const getAllCards = async () => {
      try {
        const res = await getTokenizeCards();
        setPaymentCards(res.data.cards);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCards();
  }, []);

  return (
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onRequestClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: COLORS.dark,
                    fontFamily: 'CircularStd',
                    fontWeight: 'bold',
                    fontSize: 18,
                    lineHeight: 19,
                  }}>
                  Payment Card
                </Text>
                <Icon
                  onPress={onRequestClose}
                  name="close-outline"
                  size={30}
                  color="#465969"
                />
              </View>

              <View style={{marginVertical: 20}}>
                <Text
                  style={{
                    fontSize: 15,
                    width: '100%',
                    color: COLORS.dark,
                    lineHeight: 25,
                    paddingRight: 40,
                  }}>
                  To verify your card you will be charged{' '}
                  <Text style={{color: '#00DC99', fontWeight: 'bold'}}>
                    ₦50.
                  </Text>{' '}
                  This money goes towards your wallet.
                </Text>
              </View>

              <TouchableOpacity
                onPress={addAccount}
                style={[
                  styles.btn,
                  {
                    backgroundColor: COLORS.secondary,
                  },
                ]}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                  CONTINUE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

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
            const data = {
              // channel: 'paystack',
              reference: res.data.transactionRef.reference,
            };

            console.log('the dataatatta: ', data);

            setSpinner(true);
            const verify = await tokenizeCard(data);

            console.log('the verifyyyyy: ', verify);

            if (verify.status == 200) {
              navigation.navigate('PaymentSuccessful', {
                name: 'Home',
                content: 'Card Tokenized',
                subText:
                  'Awesome! You have successfully tokenized your card for payments.',
              });
              setSpinner(false);
            } else {
              setSpinner(false);
            }
          }}
        />
      )}

      <Spinner visible={spinner} size="small" cancelable={true} />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 25,
  },
  btn: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 13,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  customInput: {
    borderRadius: 5,
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
});
