import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatNumber} from '../../../util/numberFormatter';
import CreditCardModalBuddy from '../../../components/CreditCard/CreditCardModalBuddy';
import {Paystack, paystackProps} from 'react-native-paystack-webview';

export default function BuddyPaymentScreen(props) {
  const {navigation, route} = props;
  const [showCardModal, setShowCardModal] = useState(false);

  // useEffect(() => {
  //   console.log('Payment Amount: ', route?.params?.data?.payment?.amount);
  // }, []);

  const paystackWebViewRef = useRef();

  const handlePayment = async () => {
    const resData = route?.params?.data;

    console.log('IDDDDDD: ', resData);

    const buddyRes = resData?.buddy_savings;
    const paymentRes = resData?.payment;
    console.log('Response Data: ', paymentRes);
    setShowCardModal(true);
  };

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.headline]}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={20}
            color={COLORS.white}
          />
          <Text
            style={{
              fontSize: 14,
              marginLeft: 20,
              fontWeight: 'bold',
              color: COLORS.white,
            }}>
            Payment
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Paystack
            paystackKey="pk_live_a985cb2ee00d4727671240dc7d3db5d8dab2d4bb"
            billingEmail="joshuanwosu078@gmail.com"
            amount={route?.params?.data?.payment?.amount || '100.00'}
            channels={['card', 'bank', 'ussd', 'qr']}
            onCancel={(e) => {
              // handle response here
              console.log('Cancel: ', e);
            }}
            onSuccess={(res) => {
              // handle response here
              console.log('Success: ', res);
            }}
            ref={paystackWebViewRef}
            refNumber={route?.params?.data?.payment?.reference}
          />

          {/* <TouchableOpacity
            onPress={() => paystackWebViewRef.current.startTransaction()}>
            <Text>Pay Now</Text>
          </TouchableOpacity> */}

          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <TouchableOpacity
              // onPress={handlePayment}
              onPress={() => paystackWebViewRef.current.startTransaction()}
              style={[
                {
                  width: '100%',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#00DC99',
                  paddingVertical: 10,
                  marginBottom: 0,
                  backgroundColor: '#00DC99',
                },
              ]}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 14,
                  lineHeight: 30,
                }}>
                PAY NOW{'  '}
                {route?.params?.data?.payment?.amount &&
                  '₦' + formatNumber(route?.params?.data?.payment?.amount)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headline: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
});
