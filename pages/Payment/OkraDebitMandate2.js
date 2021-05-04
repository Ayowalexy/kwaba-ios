import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MonoProvider, useMonoConnect } from '@mono.co/connect-react-native';
import OkraView from 'react-native-okra';

import {COLORS, FONTS, images} from '../../util/index';

const okraOptions = {
  callback_url: 'https://webhook.site/ded54b3f-f4f5-4fa1-86c3-0def6098fb4d',
  clientName: 'Kwaba',
  color: COLORS.secondary,
  connectMessage: 'Which account do you want to connect with?',
  currency: 'NGN',
  env: 'production-sandbox', // for sandbox use production-sandbox
  exp: '2020-08-06',
  filter: {
    banks: [],
    industry_type: 'all',
  },
  options: {saverid: 'this is it'},
  isCorporate: false,
  key: '4afcc9bf-c937-573b-87a1-5234c2d68bdf',
  limit: '24',
  logo: 'https://kwaba.ng/assets/imgs/logo.png',
  products: ['auth', 'balance', 'identity', 'transactions'],
  redirect_url: 'redirect',
  success_message: 'this is the success message',
  success_title: 'it has entered success',
  token: '5e5bb362bd83ab0826527d30',
  widget_failed: '',
  widget_success: 'Your account was successfully linked to Okra, Inc',
  debitLater:true,
  payment: true,
  charge: {
      type: 'recurring', 
      amount: 50000, // amount in KOBO
      note: '', // optional note
          schedule: { // required
                    interval: 'monthly',
                    startDate: 'YYYY-MM-DD', // If blank will default to today
                    endDate: 'YYYY-MM-DD' //If blank will not stop
            }, 
      currency: 'NGN', // supports 'NGN'
      account: '5f450b2689a23801307c8b5b' // Your account ID to credit
  }
 };


 export default function OkraDebitMandate2({navigation}) {

  return (
    <>
    <OkraView
        okraOptions={okraOptions}
        onClose={response => {
          console.log('on close');
          //navigation.navigate('PostPaymentForm4')
          navigation.navigate('AwaitingDisbursement');
        }}
        onSuccess={response => {
          console.log('on success we go '+ JSON.stringify(response));
          handleLinkingSucess(response);
        }}
        onError={response => {
          console.log('on error');
        }}
    />
  </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
});