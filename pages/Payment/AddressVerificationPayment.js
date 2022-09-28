import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { icons } from '../../util/index';
import designs from './style';
import { COLORS, FONTS, images } from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyPayment } from '../../services/network';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import CreditCardModal from '../../components/CreditCard/CreditCardModal';
import { formatNumber } from '../../util/numberFormatter';
import { baseUrl } from '../../services/routes';
import PaymentTypeModal from '../../components/PaymentType/PaymentTypeModal';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import { loanRepayment } from '../../services/network';
import { getEmergencyLoans } from '../../services/network';
import { getCurrentApplication } from '../../services/network';


const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

const getUser = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const user = JSON.parse(userData).user;
  return user;
};

const AddressVerificationPayment = ({ navigation }) => {
  const [spinner, setSpinner] = useState(false);
  const [verificationSpinner, setVerificationSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const [resDataObj, setResDataObj] = useState('');
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [resData, setResData] = useState('')
  const [channel, setChannel] = useState('')

  const top = useSafeAreaInsets().top;

  useEffect(() => {
    (async () => {
      const getAllAloans = await getEmergencyLoans();
      const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
      const applicationIDCallRes = await getCurrentApplication({ id: loan_id })

      console.log('applicationIDCallRes.data.data.id', applicationIDCallRes.data.data.status);
    })()
  }, [])
  const handlePaymentRoute = async (value) => {
    console.log('The Value: ', value);
    // setChannel(value);
    // setShowAmountModal(true);

    // console.log('ID: ', loanRepaymentData?.id);
    const getAllAloans = await getEmergencyLoans();
    const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
    

    try {
      const data = {
        amount: 2500,
        purpose: 'addressVerification',
        channel: 'paystack',
        loan_id

      };

      console.log('The Data loan: ', data);

      setSpinner(true);
      const response = await loanRepayment(data);
      console.log('That Resp: ', response.data);

      setSpinner(false);
      if (response.status == 200) {
        if (value == 'wallet') {
          const data = {
            payment_channel: value,
            reference: response?.data?.data?.reference,
            loan_id
          };
          console.log('The Datata: ', data);
          setSpinner(true);
          // const verify = await verifyWalletTransaction(data);

          // console.log('Verify: ', verify.response);
          // if (false) {
          //   setSpinner(false);
          //   navigation.navigate('PaymentSuccessful', {
          //     name: 'Home',
          //     content: 'Payment Successful',
          //     subText: 'Awesome! Your payment was successful',
          //   });
          // } else {
          //   setSpinner(false);
          //   Alert.alert('Oops!', verify?.response?.data.response_message);
          //   console.log('Oops!', verify.response);
          // }
        } else {
          setChannel(value);
          setResData(response?.data?.data);
          setShowPaystackPayment(true); // show paystack
        }
      } else {
        setSpinner(false);
        // Alert.alert('Oops!', response.response.data)
        console.log('Oops!', response.response.data);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Oops', error.response);
    }
  };

  const handleNavigation = async () => {
    setSpinner(true);
    // console.log('This has started....');
    const user = await getUser();

    const token = await getToken();
    const amount = 2500;
    // application/payment/pay
    const url =
      `${baseUrl}/payments/verify`;

    const data = {
      amount,
      channel: 'paystack',
      purpose: 'addressVerification'

    };

    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });

      if (response.status === 200) {
        setSpinner(false);
        setModal(true);
        const resData = response.data.data;

        console.log('The response: ', resData);
        setResDataObj(resData);

        let stepsData = {
          application_form: 'done',
          congratulation: 'done',
          all_documents: 'done',
          verifying_documents: 'done',
          offer_breakdown: 'done',
          property_detail: 'done',
          landlord_detail: 'done',
          referee_detail: 'done',
          offer_letter: 'done',
          address_verification: 'done',
          debitmandate: '',
          awaiting_disbursement: '',
          dashboard: '',
        };

        await AsyncStorage.setItem(
          `rentalSteps-${user.id}`,
          JSON.stringify(stepsData),
        );
      }
    } catch (error) {
      console.log('Error: ', error);
      setSpinner(false);
    }
  };

  return (
    <View style={[designs.container, { backgroundColor: '#F7F8FD', marginTop: Platform.OS == 'ios' ? top : 0 }]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{ fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10 }}
        color={COLORS.primary}
      />
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <Text
          style={[
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 130,
            },
          ]}>
          Rent Now, Pay Later
        </Text>
        <Image
          source={images.paymentMethodPNG}
          style={designs.paymentMethodImage}
        />
        <Text
          style={[
            FONTS.h1FontStyling,
            {
              color: '#2A286A',
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: 10,
            },
          ]}>
          Address Verification
        </Text>
        <Text
          style={[
            FONTS.body2FontStyling,
            {
              color: '#ADADAD',
              color: COLORS.dark,
              textAlign: 'center',
              marginBottom: 30,
              fontSize: 14,
              lineHeight: 25,
              paddingHorizontal: 10,
            },
          ]}>
          You’re almost done. We just need to verify your address to make your
          rent payment.
        </Text>
        <TouchableOpacity
          onPress={() => setShowPaymentModal(true)}
          // onPress={handleNavigation}
          style={[
            designs.button,
            {
              backgroundColor: COLORS.secondary,
              flexDirection: 'row',
              justifyContent: 'center',
            },
          ]}>
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'center',
              fontWeight: 'normal',
              fontSize: 12,
              fontWeight: 'bold',
              marginRight: 5,
            }}>
            PAY
          </Text>
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'center',
              fontWeight: 'normal',
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            {' '}
            ₦{formatNumber(2500)}
          </Text>
        </TouchableOpacity>
        <Spinner visible={spinner} animation="fade" size="large" />
        <Spinner visible={verificationSpinner} animation="fade" size="large" />
      </View>

      <CreditCardModal
        onRequestClose={() => setModal(false)}
        visible={modal}
        info={resDataObj}
        navigation={navigation}
        redirectTo="OkraDebitMandate"
      />

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
          data={resData}
          channel={channel}
          paymentCanceled={(e) => {
            console.log('Pay cancel', e);
            Alert.alert(e.status);
            setSpinner(false);
            // Do something
          }}
          paymentSuccessful={async (res) => {
            console.log('Pay done', res);

            setSpinner(false);

            const rnplStep = {
              nextStage: 'Property details',
              completedStages: ['Credit score', 'Applications', 'Documents upload', 'Offer approval breakdown', 'Address verification']
            }

            await AsyncStorage.setItem('rnplSteps', JSON.stringify(rnplStep))


            navigation.navigate('PaymentSuccessful', {
              name: 'OkraDebitMandate',
              content: 'Payment Successful',
              subText: 'Awesome! You have successfully paid for your address verification',
            });
          }}
        />
      )}
    </View>
  );
};

export default AddressVerificationPayment;
