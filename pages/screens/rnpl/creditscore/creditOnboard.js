import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CreditForm, CreditAwaiting} from '.';
import {COLORS, images} from '../../../../util';
import CreditDashboard from './creditDashboard';
import CreditAccept from './creditAccept';
import PaystackPayment from '../../../../components/Paystack/PaystackPayment';
import PaymentTypeModal from '../../../../components/PaymentType/PaymentTypeModal';
import { verifySavingsPayment } from '../../../../services/network';
import { completeSavingsPayment } from '../../../../services/network';
import Preloader from '../../../../components/Preloader'

export default function CreditOnboard({navigation}) {
  const [formData, setFormData] = useState({});
  const [channel, setChannel] = useState('')
  const [spinner, setSpinner] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [showCreditAwaiting, setShowCreditAwaiting] = useState(false);
  const [showCreditDashboard, setShowCreditDashboard] = useState(false);
  const [verifyData, setVerifyData] = useState('')


  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'creditOnboarding');
    })();
  }, []);

  const savingsPayment = async (data) => {
    setSpinner(true);
    console.log('The data', data)

    try {
      const res = await completeSavingsPayment(data);
      console.log('Hello: ', res);
      if (res.status == 200) {
      
        setSpinner(false);

        console.log('Complete Paymentttttttttt: ', res.data.data);
        // await showSuccess();
        // setShowAcceptModal(true);
        navigation.navigate('CreditAwaiting');
        // console.log('Form Value: ', formValue);
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error.response.data);
    }
  };

  const verifyPaymentRequest = async (data, paymentChannel) => {
    console.log('The Data: ', data, paymentChannel);

    setSpinner(true);
    const res = await verifySavingsPayment(data);

    setSpinner(false);
    if (!res) {
      return [];
    }

    if (res.status == 200) {
      const verifyData = res?.data?.data;
      console.log('Verifying data....: ', verifyData);
      setVerifyData(verifyData);
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: verifyData.amount,
          channel: 'wallet',
          // reference: verifyData.paymentReference,
          reference: verifyData.reference,
          purpose: 'creditScoring',
        };

        await savingsPayment(payload);
      } else {
        setShowPaystackPayment(true);
      }
    } else {
      console.log('Errorrr: ', res.response.data.meta.error);
      Alert.alert('Oops', res.response.data.meta.error);
    }
  };

  const handlePaymentRoute = async (value) => {
    console.log('Value: ', value);

    if (value == 'wallet') {
      const verifyPayload = {
        amount: 2000,
        channel: 'wallet',
        purpose: 'creditScoring',
      };

      setChannel(value); // wallet
      await verifyPaymentRequest(verifyPayload, value);
    } else {
      const verifyPayload = {
        amount: 2000,
        channel: 'paystack',
        purpose: 'creditScoring',
      };

      setChannel(value); // card or bank_transfer
      await verifyPaymentRequest(verifyPayload, value);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     const user = await getUser();
  //     const checkIfAwaiting = await AsyncStorage.getItem(
  //       `creditScoreDetail-${user.id}`,
  //     );

  //     console.log('DA: ', checkIfAwaiting);
  //     if (checkIfAwaiting != null && checkIfAwaiting != 'false') {
  //       console.log('loading up...');
  //       setShowCreditAwaiting(true);
  //     } else {
  //       AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'false');
  //       console.log('no load up');
  //     }
  //   })();
  // }, []);

  return (
    <>
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="arrow-back-outline"
            color={COLORS.dark}
            size={25}
            onPress={() => navigation.navigate('Rent')}
          />
        </View>

        <View style={[styles.content]}>
          <Image source={images.speedometer} style={styles.image} />

          <View style={styles.textWrapper}>
            <Text style={styles.title}>Check Your Credit Report</Text>
            <Text style={styles.subText}>
              To successfully apply to rent now-pay later, we need to check your
              credit report to get to know you a little bit more.
            </Text>
          </View>

          <TouchableOpacity onPress={() => {
            // navigation.navigate('CreditForm')
            setShowAcceptModal(true)
          }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Check credit report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {showAcceptModal && (
        <CreditAccept
          onRequestClose={() => setShowAcceptModal(!showAcceptModal)}
          visible={showAcceptModal}
          // onConfirm={() => setShowPaystackPayment(true)}
          onConfirm={() => {
            setShowPaymentModal(true);
          }}
        />
      )}

      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
        />
      )}

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
            const getUser = async () => {
              const userData = await AsyncStorage.getItem('userData');
              const user = JSON.parse(userData).user;
              return user;
            };
            const user = await getUser();
            AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'creditForm');
            // AsyncStorage.setItem(`userEmailAndBvn-${user.id}`, JSON.stringify(formValue));
            navigation.navigate('CreditAwaiting');
          }}
        />
      )}

      {spinner && (
        <Preloader />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8FD',
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  textWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subText: {
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  button: {
    width: '100%',
    backgroundColor: '#212a33',
    backgroundColor: COLORS.primary,
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: 'capitalize',
  },
});
