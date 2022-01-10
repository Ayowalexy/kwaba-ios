import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import {View} from 'react-native';
import {Paystack} from 'react-native-paystack-webview';
import {verifyBillsTransactions} from '../../services/network';

// 'card',
// 'bank',
// 'ussd',
// 'qr',
// 'bank_transfer',
// 'mobile_money',

const userData = async () => {
  const userData = await AsyncStorage.getItem('userData');
  return JSON.parse(userData).user;
};

export default function PaystackPaymentCobble(props) {
  const [user, setUser] = useState({email: '', phone: ''});
  const paystackWebViewRef = useRef();
  const {
    data,
    channel,
    onRequestClose,
    paymentSuccessful,
    paymentCanceled,
  } = props;

  useEffect(() => {
    // console.log('The Effect: ', data);
    paystackWebViewRef.current.startTransaction();
    (async () => {
      const user = await userData();
      // console.log('The User: ', user);
      setUser({email: user.email, phone: user.telephone});
    })();
    console.log('Data: ', data);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Paystack
        // paystackKey="pk_live_c0696f831843dd83db93fb594c62c2d10be73f0b"
        paystackKey="pk_test_bed6df47476940d982adbde8d69c2a3c0bdf4060"
        billingEmail={data?.email}
        billingMobile={user?.phone}
        amount={data?.amount}
        // channels={[channel]} // card, bank_transfer
        channels={[
          'card',
          'bank',
          'ussd',
          'qr',
          'mobile_money',
          'bank_transfer',
        ]}
        onCancel={(e) => {
          onRequestClose();
          paymentCanceled(e);
        }}
        onSuccess={async (res) => {
          onRequestClose();
          paymentSuccessful(res);
        }}
        ref={paystackWebViewRef}
        refNumber={data?.reference}
      />
    </View>
  );
}
