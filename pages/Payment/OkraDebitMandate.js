import React, {useState, useEffect} from 'react';
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
  StyleSheet
} from 'react-native';
import LoanOfferContent from './LoanOfferContent';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import IconFA from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchBanks } from '../../services/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import OkraView from 'react-native-okra';



let height= Dimensions.get('window').height;


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
  debitLater:true
};




export default function OkraDebitMandate({navigation}) {

  const [successModal, setSuccessModal] = useState(false);
  const [existingApplication, setExistingApplication] = useState('')


  useEffect(() => {

    const getApplicationData =async ()=> {
      const getToken = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const token = JSON.parse(userData).token;
        return token;
      };
      const token = await getToken();

      
      try{
      
          const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
              headers: {'Content-Type': 'application/json', Authorization: token},
            });
            console.log(applicationIDCallRes.data.data.id);

           // console.log("here is the response "+JSON.stringify(applicationIDCallRes.data.data));
 
            const applicationId = applicationIDCallRes.data.data.id;
      
            setExistingApplication(applicationId);
            console.log('here', applicationIDCallRes.data.data.id);
    
      }
      catch(error) {
        console.log(error.response.data)
      }

      
    };
        
    getApplicationData()
  }, []);

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

      if(response.status==200){
        const url = 'http://67.207.86.39:8000/api/v1/application/direct_debit';

        let data={
          interval: "monthly",
          startDate: "2021-04-15",
          endDate: "2021-07-15",
          amount: 50000,
          loanId: existingApplication
        };

        try {
          const response = await axios.post(url, data, {
            headers: {'Content-Type': 'application/json', Authorization: token},
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

      Alert.alert('Message', error.response.data.statusMsg, [
        {text: 'Close'},
      ]);

    }


    

    


  }


  return (
      <View style={{flex:1}}>

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

        <Modal visible={successModal} animationType="fade" transparent={true}>
        <View
          style={designs.centeredModalWrapper}>
          <View style={[designs.successModal, {borderRadius: 30}]}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            <Image source={icons.tick} style={{width: 84, height: 84, marginTop: 25}}/>
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
            onPress={()=>{navigation.navigate('AwaitingDisbursement')}}
              style={[designs.button, {marginTop: 30, width: '100%', alignSelf: 'center', backgroundColor: COLORS.secondary}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                  textAlign: 'center'
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
  
  )
}

const styles = StyleSheet.create({

})

