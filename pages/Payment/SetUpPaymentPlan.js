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


const SetUpPaymentPlan = ({navigation}) => {

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
        const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
            headers: {'Content-Type': 'application/json', Authorization: token},
          });
          console.log(applicationIDCallRes.data.data.non_refundable_deposit);
        const amount = applicationIDCallRes.data.data.non_refundable_deposit;
        setSpinner(true);
        try {
          const response = await axios.post('http://67.207.86.39:8000/api/v1/application/payment/pay', {amount}, {
            headers: {'Content-Type': 'application/json', Authorization: token},
          });
          setSpinner(true);
          console.log(response);
          if (response.status === 200) {
            setSpinner(false);
            const result = await openInAppBrowser(
              response.data.data.authorization_url,
            );
            console.log('done')
            console.log('result', result);
            
            if (result.type == 'cancel') {
              let data = {reference: response.data.data.reference};
            console.log('data', data);
              console.log('cancel')
            
              setVerificationSpinner(true);
              const verify = await axios.put('http://67.207.86.39:8000/api/v1/application/payment/verify', JSON.stringify(data) , {
                headers: {'Content-Type': 'application/json', Authorization: token},
              });
    
              if (verify.data.status == 'success') {
                setVerificationSpinner(false);
                // Alert.alert(
                //   'Payment verified',
                //   'Your payment was verified. Thank you.',
                // );

                navigation.navigate('PostPaymentForm4')
              } else {
                setVerificationSpinner(false);
                Alert.alert(
                  'Payment Unverified',
                  'Your payment was not verified. Please retry.',
                );
              }
              }else{
                console.log(result.type)
              }
          }

        } catch (error) {
          console.log(error.response.data);
          
        };
        
  };

  const openInAppBrowser = async (url) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#2A286A',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          hasBackButton: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });

        return result;
      } else Linking.openURL(url);
    } catch (error) {
      return error.message;
    }
  };
    
      
      


  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={20}
        style={{marginTop: 28, marginLeft: 25, fontWeight: '900'}}
        color= {COLORS.primary}
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
          <Text style={[FONTS.body2FontStyling, {color: '#ADADAD', textAlign: 'center', marginBottom: 26}]}>This will make repayment easy </Text>
         
          
          <TouchableOpacity
            onPress={handleNavigation}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>SET UP PAYMENT</Text>
          </TouchableOpacity>
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

export default SetUpPaymentPlan;
