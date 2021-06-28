import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MonoProvider, useMonoConnect } from '@mono.co/connect-react-native';
import OkraView from 'react-native-okra';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, images} from '../../util/index';
import axios from 'axios';



 export default function OkraDebitMandate2({navigation}) {

  const [successModal, setSuccessModal] = useState(false);
  const [existingApplication, setExistingApplication] = useState('');
  const [monthlyRepayment, setmonthlyRepayment] = useState();
 // const [okraOptions, setOkraOptions] = useState({});

  
  
  //const okraOptions;
  

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };


 
  useEffect(() => {

    const getApplicationData =async ()=> {
    
      const token = await getToken();

      
      try{
      
          const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
              headers: {'Content-Type': 'application/json', Authorization: token},
            });
           // console.log(applicationIDCallRes.data.data.id);

             const applicationId = applicationIDCallRes.data.data.id;
      
             setExistingApplication(applicationId);
            console.log('here', applicationIDCallRes.data.data.approvedamount );
            setmonthlyRepayment(applicationIDCallRes.data.data.approvedamount);
            console.log('here2', monthlyRepayment);
    
      }
      catch(error) {
        console.log(error.response.data)
      }

  

      
    };
        
    getApplicationData();

  
    

  }, [monthlyRepayment]);


  let okraOptions={
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
        amount: monthlyRepayment*100, // amount in KOBO
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

  const handleLinkingSucess = async(response) => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    }; 
    const token = await getToken();
    console.log(token);

    let linkdata={
      bank_id: response.bank_id,
      customer_id:response.customer_id,
      record_id:response.record_id,
      account_id: response.accounts[0].id
    };

    console.log(linkdata);

    const linkUrl="http://67.207.86.39:8000/api/v1/application/link_account";
    

    try {

      const response = await axios.put(linkUrl, linkdata, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      console.log("here is the linkurl resposonse ",response);

      // if(response.status==200){
      
      // }

      if(response.status==200){
        const url = 'http://67.207.86.39:8000/api/v1/application/direct_debit';

        let data={
          interval: "monthly",
          startDate: "2021-04-15",
          endDate: "2021-07-15",
          amount: monthlyRepayment,
          loanId: existingApplication
        };

        try {
          const response = await axios.post(url, data, {
            headers: {'Content-Type': 'application/json', Authorization: token},
          });
          console.log(response);
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

      Alert.alert('Message', error.response.data.statusMsg, [
        {text: 'Close'},
      ]);

    }

  }

  if(monthlyRepayment!=null){

  return (

    
    <>



    <OkraView
        okraOptions={okraOptions}
        onClose={response => {
          console.log('on close');
          //navigation.navigate('PostPaymentForm4')
          navigation.navigate('Borrow');
          console.log('on success we go '+ monthlyRepayment);
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
  ) 
}else{
  return (  
<>
<View>
   <Text>loading...</Text>  
</View>
</>
)
}


 
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