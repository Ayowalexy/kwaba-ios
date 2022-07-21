import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MonoProvider, useMonoConnect} from '@mono.co/connect-react-native';
import OkraView from 'react-native-okra';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, images} from '../../util/index';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { getCurrentApplication } from '../../services/network';
import { getEmergencyLoans } from '../../services/network';

const moment = require('moment');
import { baseUrl } from '../../services/routes';

export default function OkraDebitMandate2({navigation}) {
  const [successModal, setSuccessModal] = useState(false);
  const [existingApplication, setExistingApplication] = useState('');
  const [monthlyRepayment, setmonthlyRepayment] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [spinner, setSpinner] = useState(false);

  const [accountDeatils, setAccountDetails] = useState({
    bankName: '',
    bankAccountNumber: '',
  });

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  useEffect(() => {
    getApplicationData();

  }, [monthlyRepayment]);

  const getApplicationData = async () => {
    const token = await getToken();

    try {
      const getAllAloans = await getEmergencyLoans();
      const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
      const applicationIDCallRes = await getCurrentApplication({ id: loan_id })
  
      console.log('one application', applicationIDCallRes?.data?.data)
      // console.log(applicationIDCallRes.data.data.id);

      const applicationId = applicationIDCallRes.data.data.id;

      setExistingApplication(applicationId);
      console.log('here', applicationIDCallRes.data);
      setmonthlyRepayment(applicationIDCallRes.data.data.approvedrepayment);
      const approved_repayment_plan =
        applicationIDCallRes.data.data.approved_repayment_plan;
      const repayment_start_date =
        applicationIDCallRes.data.data.remita_repayment_date;
      const repayment_end_date = moment(repayment_start_date)
        .add(Number(approved_repayment_plan) - 1, 'months')
        .format('YYYY-MM-DD');
      setStartDate(repayment_start_date);
      setEndDate(repayment_end_date);

      console.log('here2', monthlyRepayment);

      console.log('repayment_start_date', repayment_start_date);
      console.log('repayment_end_date', repayment_end_date);

      // account details;
      console.log('Account Details: ', applicationIDCallRes.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  let okraOptions = {
    // callback_url:
    //   'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/webhook',
    clientName: 'Kwaba',
    color: COLORS.secondary,
    // connectMessage: 'Which account do you want to connect with?',
    connectMessage: 'Connect your salary account.',
    currency: 'NGN',
    env: 'production-sandbox', // for sandbox use production-sandbox
    // exp: endDate,
    options: {saverid: 'this is it'},
    // isCorporate: false,
    key: '03e94436-d4df-5b42-8624-19e21eb14c5b',
    limit: '24',
    logo: 'https://kwaba.ng/assets/imgs/logo.png',
    products: ['auth', 'balance', 'identity', 'transactions'],
    redirect_url: 'redirect',
    success_message: 'this is the success message',
    success_title: 'it has entered success',
    token: '5e5bb362bd83ab0826527d30',
    widget_failed: '',
    widget_success: 'Your account was successfully linked to Okra, Inc',
    debitLater: true,
    debitType: 'recurring',
  };

  // // Generate unique reference Id of the direct debit mandate. This is integrator's external reference
  // const transactionRef = 'KWABA_REM' + Math.random().toString().split('.')[1];

  // let remitaOption = {
  //   transactionRef: transactionRef,
  //   description: '',
  //   sourceAccount: '',
  //   sourceAccountName: '',
  //   sourceAccountBankCode: '',
  //   maximumAmount: '',
  //   maximumTransactions: '',
  //   startDate: startDate,
  //   endDate: endDate,
  //   billPaymentProductId: '',
  //   statusWebHook: '',
  // };

  if (monthlyRepayment == null) {
    return (
      <>
        <OkraView
          okraOptions={okraOptions}
          onClose={(response) => {
            console.log('on close');
          }}
          onSuccess={async (response) => {
            // console.log('Na here we dey oo');
            console.log('on success we go ' + JSON.stringify(response));
            // handleLinkingSucess(response);
            const rnplStep = {
              nextStage: 'Disbursement',
              completedStages: ['Credit score', 'Applications', 
              'Documents upload', 'Offer approval breakdown',
               'Address verification', 'Property details', 
              'Direct debit']
            }
    
            const getAllAloans = await getEmergencyLoans();
            const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
            const applicationIDCallRes = await getCurrentApplication({ id: loan_id })
        
            console.log('okra', applicationIDCallRes?.data?.data.status)
           
            await AsyncStorage.setItem('rnplSteps', JSON.stringify(rnplStep))
    
            navigation.navigate('AwaitingDisbursement');
          }}
          onError={(response) => {
            console.log('on error', response);
          }}
        />
      </>
    );
  } else {
    return (
      <>
        <View>
          <Text style={{fontSize: 20, textAlign: 'center', top: 10}}>
            preparing...
          </Text>
        </View>
      </>
    );
  }
}
