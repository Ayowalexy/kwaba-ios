import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatNumber} from '../../../util/numberFormatter';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';
import PaystackPayment from '../../../components/Paystack/PaystackPayment';
import {
  completeSavingsPayment,
  verifySavingsPayment,
} from '../../../services/network';

export default function BuddyPaymentScreen(props) {
  const {navigation, route} = props;
  const [spinner, setSpinner] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [verifyData, setVerifyData] = useState('');
  const [channel, setChannel] = useState('');

  const savingsPayment = async (data) => {
    setSpinner(true);

    try {
      const res = await completeSavingsPayment(data);

      if (res.status == 201) {
        setSpinner(false);

        // console.log('Complete Paymentttttttttt: ', res?.data);
        await showSuccess();
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error?.response?.data);
    }
  };

  const verifyPaymentRequest = async (data, paymentChannel) => {
    setSpinner(true);
    const res = await verifySavingsPayment(data);

    setSpinner(false);
    if (!res) return [];

    if (res.status == 200) {
      const verifyData = res?.data?.data;
      setVerifyData({...verifyData, id: data.savings_id});
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: verifyData.amount,
          buddyData: {
            savings_id: data.savings_id,
            buddyId: 23,
          },
          channel: 'wallet',
          reference: verifyData.paymentReference,
          purpose: 'buddySavings',
        };
        await savingsPayment(payload);
      } else {
        setShowPaystackPayment(true);
        console.log('Hello here');
      }
    } else {
      console.log('Error pp: ', res?.response);
    }
  };

  const handlePaymentRoute = async (value) => {
    const data = route?.params?.data;
    const res = route?.params?.res;

    console.log('kole: ', data, res);

    // if (value == 'wallet') {
    //   const verifyPayload = {
    //     amount: data.savings_amount,
    //     buddyData: {
    //       buddyData: {
    //         savings_id: res.buddy_savings.id,
    //         buddyId: 23,
    //       },
    //       buddyId: 23,
    //     },
    //     channel: 'wallet',
    //     purpose: 'buddySavings',
    //   };

    //   setChannel(value); // wallet
    //   await verifyPaymentRequest(verifyPayload, value);
    // } else {
    //   const verifyPayload = {
    //     amount: data.savings_amount,
    //     buddyData: {
    //       buddyData: {
    //         savings_id: res.buddy_savings.id,
    //         buddyId: 23,
    //       },
    //       buddyId: 23,
    //     },
    //     channel: 'wallet',
    //     purpose: 'buddySavings',
    //   };

    //   setChannel(value); // card or bank_transfer
    //   await verifyPaymentRequest(verifyPayload, value);
    // }
  };

  return (
    <>
      <View style={[styles.container]}>
        <View style={{flex: 1}}></View>

        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <TouchableOpacity
            onPress={() => setShowPaymentModal(true)}
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
              {route?.params?.data?.savings_amount &&
                '₦' + formatNumber(route?.params?.data?.savings_amount)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
            const data = {
              amount: verifyData.amount,
              savings_id: verifyData.id,
              channel: 'paystack',
              reference: verifyData.paymentReference,
              purpose: 'savings',
            };

            await savingsPayment(data);
          }}
        />
      )}
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
