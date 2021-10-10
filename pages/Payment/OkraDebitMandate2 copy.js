import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MonoProvider, useMonoConnect} from '@mono.co/connect-react-native';
import OkraView from 'react-native-okra';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, images} from '../../util/index';
import axios from 'axios';
const moment = require('moment');

export default function OkraDebitMandate2({navigation}) {
  const [successModal, setSuccessModal] = useState(false);
  const [existingApplication, setExistingApplication] = useState('');
  const [monthlyRepayment, setmonthlyRepayment] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // const [okraOptions, setOkraOptions] = useState({});

  //const okraOptions;

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
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      // console.log(applicationIDCallRes.data.data.id);

      const applicationId = applicationIDCallRes.data.data.id;

      setExistingApplication(applicationId);
      console.log('here', applicationIDCallRes.data.data.approvedamount);
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
    } catch (error) {
      console.log(error.response.data);
    }
  };

  let okraOptions = {
    // callback_url: 'https://webhook.site/ded54b3f-f4f5-4fa1-86c3-0def6098fb4d',
    callback_url:
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/webhook',
    // callback_url: 'https://kwaba.com.ng/api/webhook/okra',
    clientName: 'Kwaba',
    color: COLORS.secondary,
    connectMessage: 'Which account do you want to connect with?',
    currency: 'NGN',
    env: 'production-sandbox', // for sandbox use production-sandbox
    // exp: '2020-08-06',
    exp: endDate,
    // filter: {
    //   banks: [],
    //   industry_type: 'all',
    // },
    options: {saverid: 'this is it'},
    isCorporate: false,
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
    // payment: true,
    // charge: {
    //   type: 'recurring',
    //   amount: monthlyRepayment * 100, // amount in KOBO
    //   note: '', // optional note
    //   schedule: {
    //     // required
    //     interval: 'monthly',
    //     startDate: startDate, // If blank will default to today
    //     endDate: endDate, //If blank will not stop
    //   },
    //   currency: 'NGN', // supports 'NGN'
    //   account: '5f450b2689a23801307c8b5b', // Your account ID to credit
    // },
  };

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

    console.log('Link Data: ', linkdata);

    const linkUrl =
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/link_account';

    try {
      const response = await axios.put(linkUrl, JSON.stringify(linkdata), {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      console.log('here is the linkurl resposonse ', response);

      if (response.status == 200) {
        const url =
          'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/direct_debit';

        let data = {
          interval: 'monthly',
          startDate: startDate,
          endDate: endDate,
          amount: monthlyRepayment,
          loanId: existingApplication,
        };

        console.log('DATA RES TATA: ', data);

        try {
          const response = await axios.post(url, JSON.stringify(data), {
            headers: {'Content-Type': 'application/json', Authorization: token},
          });
          console.log('REDIRECT DEBIT: ', response);
          setSuccessModal(true);

          logCurrentStorage();

          navigation.navigate('AwaitingDisbursement');
        } catch (error) {
          console.log(error.response.data);
          // Alert.alert('Message', error.response.data.statusMsg, [
          //   {text: 'Close'},
          // ]);
        }
      }
    } catch (error) {
      Alert.alert('Message', error.response.data.statusMsg, [{text: 'Close'}]);
    }
  };

  if (monthlyRepayment != null) {
    return (
      <>
        <OkraView
          okraOptions={okraOptions}
          onClose={(response) => {
            console.log('on close');
            //navigation.navigate('PostPaymentForm4')
            // navigation.goBack();
            // navigation.navigate('AwaitingDisbursement');
            // console.log('on success we go ' + monthlyRepayment);
            // console.log('The RESPONSE: ', response);
          }}
          onSuccess={(response) => {
            console.log('Na here we dey oo');
            console.log('on success we go ' + JSON.stringify(response));
            // handleLinkingSucess(response);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
