import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import {View} from 'react-native';
import {Paystack} from 'react-native-paystack-webview';

const userData = async () => {
  const userData = await AsyncStorage.getItem('userData');
  return JSON.parse(userData).user;
};

export default function PaystackPayment(props) {
  const [user, setUser] = useState({email: '', phone: ''});
  const paystackWebViewRef = useRef();
  const {data, channel, onRequestClose, paymentSuccessful, paymentCanceled} =
    props;

  useEffect(() => {
    paystackWebViewRef.current.startTransaction();
    (async () => {
      const user = await userData();
      setUser({email: user.email, phone: user.telephone});
    })();
    console.log('Data: ', data);
  }, []);
  return (
    <View style={{flex: 1}}>
      <Paystack
        paystackKey="pk_test_803016ab92dcf40caa934ef5fd891e0808b258ef"
        // paystackKey="  pk_live_a985cb2ee00d4727671240dc7d3db5d8dab2d4b"
        billingEmail={user?.email}
        billingMobile={user?.phone}
        amount={data?.amount}
        channels={[channel]} // channels={['card', 'bank_transfer']} // card, bank_transfer
        onCancel={(e) => {
          onRequestClose();
          paymentCanceled(e);
        }}
        onSuccess={async (res) => {
          onRequestClose();
          paymentSuccessful(res);
        }}
        ref={paystackWebViewRef}
        // refNumber={data?.paymentReference}
        refNumber={data?.reference}
      />
    </View>
  );
}
