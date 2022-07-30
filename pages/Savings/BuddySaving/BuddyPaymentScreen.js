import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatNumber} from '../../../util/numberFormatter';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';
import PaystackPayment from '../../../components/Paystack/PaystackPayment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { getOneUserBuddySavings } from '../../../services/network';
import { setWalletbalance } from '../../../redux/reducers/store/wallet/wallet.actions';
import {
  completeSavingsPayment,
  verifySavingsPayment,
  getOneBuddy,
} from '../../../services/network';
import { selectBuddySavings } from '../../../redux/reducers/store/buddySavings/buddySavingsSlectors';
import { useDispatch, useSelector } from 'react-redux';
import { setBuddySavings } from '../../../redux/reducers/store/buddy-savings/buddy-savings.actions';
import { createABuddySavingsActions } from '../../../redux/reducers/store/buddySavings/buddySavings.action';
export default function BuddyPaymentScreen(props) {
  const {navigation, route} = props;
  const [spinner, setSpinner] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [verifyData, setVerifyData] = useState('');
  const [channel, setChannel] = useState('');
  const [savingsId, setSavingsId] = useState('');
  const dispatch = useDispatch();
  const [_buddydata, setBuddydata] = useState('')
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);

  const [walletBalance, setWalletBalance] = useState(0);


  useEffect(() => {
    if (getMaxLoanCap1?.data) {
      setWalletBalance(getMaxLoanCap1?.data?.wallet_available_balance);
    }
  }, [getMaxLoanCap1]);

  console.log('params data', {...route.params.data, ...route.params.res})

  const verifyPaymentRequest = async (data, paymentChannel, buddySavingsId) => {
    setSpinner(true);
    const res = await verifySavingsPayment(data);


    if (!res) {
      setSpinner(false);
      return [];
    }

    if (res.status == 200) {
      const verifyData = res?.data?.data;
      console.log('Payement channel', paymentChannel)
      setVerifyData({...verifyData, id: data.buddyData.savings_id});

      const buddyData = {
        name: route.params.data.title,
        target_amount: route.params.data.target_amount,
        amount_saved: route.params.data.savings_amount,
        id: data.buddyData.buddyId,
        buddy_savings_id: route.params.res.buddy_savings_id
      }

      setBuddydata(buddyData)


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
        const response = await completeSavingsPayment(payload);
        if (response.status == 200) {
          setSpinner(false);
          dispatch(setBuddySavings(buddyData))
          dispatch(setWalletbalance(walletBalance - verifyData.amount))

          // dispatch(createABuddySavingsActions({...route.params.data, ...route.params.res}))
          navigation.navigate('PaymentSuccessful', {
            content: 'Payment Successful',
            subText: 'You have successfully funded your savings',
            name: 'BuddySavingDashBoard',
            id: buddySavingsId,
            amount: Math.floor(verifyData.amount)
          });
        } else {
          setSpinner(false);
        }
      } else {
        setShowPaystackPayment(true);
      }
    } else {
      setSpinner(false);
      console.log('Error pp: ', res.response.data);
    }
  };

  const handlePaymentRoute = async (value) => {
    const data = route?.params?.data;
    const res = route?.params?.res;
    try {
      setSavingsId(res.buddy_savings_id);
      const buddyBody = await getOneUserBuddySavings(res.buddy_savings_id);
      // const buddyBody = await getOneBuddy(res.buddy_savings_id);
      const userData = await AsyncStorage.getItem('userData');
      const mainUserEmail = JSON.parse(userData).user.email;

      console.log("res -d", res.buddy_savings_id)
      console.log("buddyBody", buddyBody)
      if (buddyBody.status == 200) {
        const currentBuddy = buddyBody.data.buddies.find(
          (d) =>
            d.email.trim().toLowerCase() === mainUserEmail.trim().toLowerCase(),
        );

        if (value == 'wallet') {

          if(Number(data.savings_amount) > walletBalance){
            setSpinner(false)
            return Alert.alert('Error', "Your balance is insufficent to complete this transaction")
          }
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
          await verifyPaymentRequest(
            verifyPayload,
            value,
            res.buddy_savings_id,
          );
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
          await verifyPaymentRequest(
            verifyPayload,
            value,
            res.buddy_savings_id,
          );
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
        <Spinner visible={spinner} size="large" />
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
            setSpinner(false);
            dispatch(setBuddySavings(_buddydata))
            // dispatch(createABuddySavingsActions({...route.params.data, ...route.params.res}))
            navigation.navigate('PaymentSuccessful', {
              content: 'Payment Successful',
              subText: 'You have successfully funded your savings',
              name: 'BuddySavingDashBoard',
              id: savingsId,
              amount: Math.floor(verifyData.amount)
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
