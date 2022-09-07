import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LoanOfferContent from './LoanOfferContent';
import { icons } from '../../util/index';
import designs from './style';
import { COLORS, FONTS, images } from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import IconFA from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchBanks } from '../../services/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import OkraView from 'react-native-okra';
import moment from 'moment';
import Banks from '../../components/banks.json'
import { baseUrl } from '../../services/routes'
import { getCurrentApplication } from '../../services/network';
import { getEmergencyLoans } from '../../services/network';

let height = Dimensions.get('window').height;

const widthtouse = Dimensions.get('window').width;

export default function OkraDebitMandate({ navigation }) {
  const [successModal, setSuccessModal] = useState(false);
  const [existingApplication, setExistingApplication] = useState('');
  const [monthlyRepayment, setmonthlyRepayment] = useState();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [dataLoaded, setDataLoaded] = useState(false);

  const [banks, setBanks] = useState([]);

  const [accountDeatils, setAccountDetails] = useState({
    bankName: '',
    bankAccountNumber: '',
  });

  useEffect(() => {
    const getApplicationData = async () => {
      const getToken = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const token = JSON.parse(userData).token;
        return token;
      };
      const token = await getToken();

      try {
        const getAllAloans = await getEmergencyLoans();
        const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
        const applicationIDCallRes = await getCurrentApplication({ id: loan_id })

        // console.log(applicationIDCallRes.data.data.id);
        console.log('app STAT', applicationIDCallRes.data.data.status)

        const applicationId = applicationIDCallRes.data.data.id;

        setExistingApplication(applicationId);
        // console.log('here', applicationIDCallRes.data.data.monthly_repayment);
        setmonthlyRepayment(
          Number(applicationIDCallRes.data.data.monthly_repayment),
        );

        const approved_repayment_plan =
          applicationIDCallRes.data.data.approved_repayment_plan;
        const repayment_start_date =
          applicationIDCallRes.data.data.remita_repayment_date;
        const repayment_end_date = moment(repayment_start_date)
          .add(Number(approved_repayment_plan) - 1, 'months')
          .format('YYYY-MM-DD');
        // console.log('Repayment start: ', repayment_start_date);
        // console.log('Repayment end: ', repayment_end_date);

        setStartDate(repayment_start_date);
        setEndDate(repayment_end_date);

        setDataLoaded(true);

        setAccountDetails({
          bankName: applicationIDCallRes.data.data.bank_name,
          bankAccountNumber: applicationIDCallRes.data.data.account_no,
        });
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getApplicationData();
  }, []);

  // fetch banks via paystak
  const paystackBanks = async () => {
    try {
      // const banks = await axios.get('https://api.paystack.co/bank', {
      //   headers: {'Content-Type': 'application/json'},
      // });
      // // setBankData(banks?.data?.data);
      // console.log('Paystack banks: ', banks?.data?.data);
      setBanks(Banks?.data?.data);
      // return banks;
    } catch (error) {
      console.log('The Big Bang Error: ', error);
      // return error;
    }
  };

  useEffect(() => {
    paystackBanks();
  }, []);

  // Generate unique reference Id of the direct debit mandate. This is integrator's external reference
  const transactionRef = 'KWABA_REM-' + Math.random().toString().split('.')[1];

  let remitaOptions = {
    transactionRef: transactionRef,
    description: 'Rent Now Pay Later',
    sourceAccount: accountDeatils.bankAccountNumber,
    sourceAccountName: '',
    sourceAccountBankCode: '',
    maximumAmount: '',
    maximumTransactions: '',
    startDate: startDate,
    endDate: endDate,
    billPaymentProductId: '',
    statusWebHook: '',
  };

  useEffect(() => {
    console.log('Remita: ', remitaOptions);
  }, [dataLoaded]);

  const handleLinkingSucess = async (response) => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };
    const token = await getToken();
    console.log(token);

    let linkdata = {
      bank_id: response.bank_id,
      customer_id: response.customer_id,
      record_id: response.record_id,
      account_id: response.accounts[0].id,
    };

    console.log(linkdata);

    const linkUrl =
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/link_account';

    try {
      const response = await axios.put(linkUrl, linkdata, {
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      console.log('here is the linkurl resposonse ', response);

      if (response.status == 200) {
        const url =
          'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/direct_debit';

        let data = {
          interval: 'monthly',
          startDate: '2021-04-15',
          endDate: '2021-07-15',
          amount: monthlyRepayment,
          loanId: existingApplication,
        };

        try {
          const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json', Authorization: token },
          });
          console.log(response);
          setSuccessModal(true);

          logCurrentStorage();
        } catch (error) {
          console.log(error.response.data);
          // Alert.alert('Message', error.response.data.statusMsg, [
          //   {text: 'Close'},
          // ]);
        }
      }
    } catch (error) {
      Alert.alert('Message', error.response.data.statusMsg, [{ text: 'Close' }]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[designs.container, { backgroundColor: '#F7F8FD' }]}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{ marginTop: 28, marginLeft: 16, fontWeight: '900' }}
          color="#2A286A"
        />

        <View
          style={{
            marginVertical: 11,
            marginHorizontal: 16,
          }}>
          <Text
            style={[
              // FONTS.h1FontStyling,
              {
                color: COLORS.primary,
                fontSize: 18,
                textAlign: 'left',
                fontWeight: 'bold',
                marginLeft: 10,
              },
            ]}>
            Rent Now, Pay Later
          </Text>
          <Image
            source={images.paymentMethodPNG}
            style={{
              width: '100%',
              height: 100,
              justifyContent: 'center',
              marginBottom: 50,
              marginTop: 100,
            }}
            resizeMode="contain"
          />
          <Text
            style={[
              // FONTS.h1FontStyling,
              {
                color: COLORS.primary,
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 10,
              },
            ]}>
            Setup repayment method
          </Text>
          <Text
            style={[
              FONTS.body2FontStyling,
              { color: COLORS.dark, textAlign: 'center', fontSize: 14 },
            ]}>
            {/* This will make repayment easy */}
            We need to connect to your account securely, {'\n'}for your monthly
            repayment
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('OkraDebitMandate2')}
            style={[
              {
                backgroundColor: COLORS.secondary,
                width: '100%',
                // height: 70,
                marginTop: 30,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              },
            ]}>
            <Text
              style={[
                {
                  color: COLORS.white,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 12,
                },
              ]}>
              SET UP REPAYMENT
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={successModal} animationType="fade" transparent={true}>
        <View style={designs.centeredModalWrapper}>
          <View style={[designs.successModal, { borderRadius: 30 }]}>
            <Icon
              style={{ alignSelf: 'flex-end' }}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            <Image
              source={icons.tick}
              style={{ width: 84, height: 84, marginTop: 25 }}
            />
            <Text style={designs.successModalBodyText}>
              Your Debit mandate is set up.
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 12,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 6,
              }}>
              Congratulations! your request is in process.
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AwaitingDisbursement');
              }}
              style={[
                designs.button,
                {
                  marginTop: 30,
                  width: '100%',
                  alignSelf: 'center',
                  backgroundColor: COLORS.secondary,
                },
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                  textAlign: 'center',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
