import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
  Dimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {verifyPayment} from '../../services/network';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import { MonoProvider, useMonoConnect } from '@mono.co/connect-react-native';




const widthtouse=Dimensions.get('window').width;


const config = {
    publicKey: "live_pk_3MSVtE6Jtj2K6ZGMrkCT",
    onClose: () => alert('Debit direct cancelled'),
    onSuccess: async(data) => {
      const code = data.getAuthCode();
      let stepsdata={
        documentdone:'done',
        propertydetail:'done',
        landlorddetail:'done',
        refree:'done',
        offeraccepted:'done',
        addressverification:'done',
        debitmandate:'done',
        awaitingdisbursment:'',
      };
  
      await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));
      console.log("Access code", code)
    }
  }

  const reauth_token = "code_xyz";
  const payConfig = {
    scope: "payments",
    data: {
      type: "recurring-debit", // "one-time-debit" | "recurring-debit"
      amount: 250000, // amount in kobo
      description: "Wallet funding",
      plan: "plan-234", // only for recurring payment
      currency: "NGN", // (optional) default to NGN
      period: "monthly", // only for recurring payment
      reference: "mono_r27bn0he820e", // optional 
    }
  }

function InitiateDirectDebit() {
  
    const { init } = useMonoConnect();
    return (
      
       
        <TouchableOpacity
            onPress={() => init()}
            style={[designs.button, {backgroundColor: COLORS.secondary,width:widthtouse*0.85,height:70,marginTop:80}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>SET UP REPAYMENT</Text>
          </TouchableOpacity>
     
    )
  }
const MonoDebitMandate = ({navigation}) => {

  // const response = route.params; 
  
  const [spinner, setSpinner] = useState(false);
  const [verificationSpinner, setVerificationSpinner] = useState(false);

  const handleNavigation = async() => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };
    const token = await getToken();
  };


  
  
    
      
      


  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={35}
            style={{marginTop: 28, marginLeft: 16, fontWeight: '900'}}
            color="#2A286A"
        />

        <View
          style={{
            marginVertical: 11,
            marginHorizontal: 16,
          }}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: 130
              },
            ]}>
            Rental Loan
          </Text>
          <Image source={images.paymentMethodPNG} style={designs.paymentMethodImage}/>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 10
              },
            ]}>
            Setup repayment method
          </Text>
          <Text style={[FONTS.body2FontStyling, {color: '#ADADAD', textAlign: 'center', marginBottom: 26}]}>This will make repayment easy</Text>
         

        
               

                <MonoProvider {...{...config, ...payConfig}}>
                <InitiateDirectDebit />
                </MonoProvider>

               
    
          
        
          <Spinner
        visible={spinner}
        textContent={'Initializing transactions...'}
        animation="fade"
        textStyle={{
          color: '#2A286A',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 30,
        }}
        size="large"
      />
      <Spinner
        visible={verificationSpinner}
        textContent={'Verifying transactions...'}
        animation="fade"
        textStyle={{
          color: '#2A286A',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 30,
        }}
        size="large"
      />
      
        </View>
        
   </View>
  );
};

export default MonoDebitMandate;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20
    },
  });