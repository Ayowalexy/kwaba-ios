import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatNumber} from '../../../util/numberFormatter';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';
import PaystackPayment from '../../../components/Paystack/PaystackPayment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  completeSavingsPayment,
  verifySavingsPayment,
  getOneBuddy,
} from '../../../services/network';

export default function BuddyPaymentScreen(props) {
  const {navigation, route} = props;
  const [spinner, setSpinner] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [verifyData, setVerifyData] = useState('');
  const [channel, setChannel] = useState('');
  const [savingsId, setSavingsId] = useState('');

  const savingsPayment = async (data, savingsId) => {
    setSpinner(true);
    try {
      const res = await completeSavingsPayment(data);

      if (res.status == 200) {
        console.log('savings haidee', savingsId);
        navigation.navigate('PaymentSuccessful', {
          content: 'Payment Successful',
          subText: 'You have successfully funded your savings',
          name: 'BuddySavingDashBoard',
          id: savingsId,
        });
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

    if (!res) return [];

    if (res.status == 200) {
      const verifyData = res?.data?.data;

      setVerifyData({...verifyData, id: data.buddyData.savings_id});
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: verifyData.amount,
          buddyData: {
            savings_id: data.buddyData.savings_id,
            buddyId: data.buddyData.buddyId,
          },
          channel: 'wallet',
          reference: verifyData.reference,
          purpose: 'buddySavings',
        };
        await savingsPayment(payload, savingsId);
      } else {
        setShowPaystackPayment(true);
        console.log('Hello here');
      }
    } else {
      setSpinner(false);
      console.log('Error pp: ', res.response.data);
    }
  };

  const handlePaymentRoute = async (value) => {
    const data = route?.params?.data;
    const res = route?.params?.res;

    console.log('kole: ', data, res);

    try {
      setSavingsId(res.buddy_savings_id);
      const buddyBody = await getOneBuddy(res.buddy_savings_id);
      const userData = await AsyncStorage.getItem('userData');
      const mainUserEmail = JSON.parse(userData).user.email;

      if (buddyBody.status === 200) {
        const currentBuddy = buddyBody.data.buddies.find(
          (d) =>
            d.email.trim().toLowerCase() === mainUserEmail.trim().toLowerCase(),
        );

        if (value == 'wallet') {
          const verifyPayload = {
            amount: data.savings_amount,
            buddyData: {
              savings_id: buddyBody.data.savings_plan.id,
              buddyId: currentBuddy.id,
            },
            channel: 'wallet',
            purpose: 'buddySavings',
          };
          console.log('verifyPayload', verifyPayload);
          // setSavingsId(verifyPayload.buddyData.savings_id);

          setChannel(value); // wallet
          await verifyPaymentRequest(verifyPayload, value);
        } else {
          const verifyPayload = {
            amount: data.savings_amount,
            buddyData: {
              savings_id: buddyBody.data.savings_plan.id,
              buddyId: currentBuddy.id,
            },
            channel: 'paystack',
            purpose: 'buddySavings',
          };
          console.log('verifyPayload', verifyPayload);
          // setSavingsId(verifyPayload.buddyData.savings_id);
          setChannel(value); // card or bank_transfer
          await verifyPaymentRequest(verifyPayload, value);
        }
      } else {
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
    }
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
            console.log('savings haidee', savingsId);
            navigation.navigate('PaymentSuccessful', {
              content: 'Payment Successful',
              subText: 'You have successfully funded your savings',
              name: 'BuddySavingDashBoard',
              id: savingsId,
            });
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
