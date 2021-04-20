import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const width=Dimensions.get('window').width;

const Borrow = ({navigation}) => {
  const [existingApplication, setExistingApplication] = useState('')

  useEffect(() => {
    const getApplicationData =async ()=> {
      const getToken = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const token = JSON.parse(userData).token;
        return token;
      };
      const token = await getToken();

      
    const borrwSteps = await AsyncStorage.getItem('borrwsteps');
    const steps = JSON.parse(borrwSteps);

    console.log('steps here'+steps);
      try{
      
          const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
              headers: {'Content-Type': 'application/json', Authorization: token},
            });
            console.log(applicationIDCallRes.data.data.id);
            console.log(applicationIDCallRes.data.data);
          const applicationId = applicationIDCallRes.data.data.id;
          const status=applicationIDCallRes.data.data.status;
          const statement=applicationIDCallRes.data.data.statement;
        if (status!==4){
          setExistingApplication(applicationId);
          console.log('here', existingApplication);
        }
      }
      catch(error) {
        console.log(error.response.data)
      }

      
    };
        // console.log(error.response.data)
    getApplicationData()
  }, []);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;

    return token;
  };

  const handleRentalLoanClick=async()=> {
    if (existingApplication !== ''){

    const borrwSteps = await AsyncStorage.getItem('borrwsteps');
    const steps = JSON.parse(borrwSteps);

    let stepsdata={
      documentdone:'done',
      propertydetail:'done',
      landlorddetail:'done',
      refree:'done',
      offeraccepted:'done',
      addressverification:'done',
      debitmandate:'',
      awaitingdisbursment:'',
    };

    await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));

    console.log('steps here', steps );

    if(steps==null){
      navigation.navigate('UploadDocuments')
    }else if(steps.documentdone=='')
    {
      navigation.navigate('UploadDocuments')
    }else if(steps.propertydetail=='')
    {
      navigation.navigate('PostPaymentForm1')
    }else if(steps.landlorddetail=='')
    {
      navigation.navigate('PostPaymentForm2')
    }else if(steps.refree=='')
    {
      navigation.navigate('PostPaymentForm3')
    }else if(steps.offeraccepted=='')
    {
      navigation.navigate('RentalLoanOfferTest') //PrintOfferLetter  RentalLoanOfferTest
    }else if(steps.addressverification=='')
    {
      navigation.navigate('AddressVerificationPayment')
    }else if(steps.debitmandate=='')
    {
      navigation.navigate('PostPaymentForm4')
    }else if(steps.awaitingdisbursment=='')
    {
      navigation.navigate('AwaitingDisbursement')
    }
   
  }
   else{
    navigation.navigate('RentalLoanForm1')
   } 
  }
  
 return (
    <View style={designs.container}>
        
      
      {/* < */}
      <ImageBackground source={images.borrowSectionBGI} style={designs.bgImage} imageStyle={{
          resizeMode: "stretch", 
        }}>
      <View style={designs.contentView}>
          
          <View style={designs.textView}>
                <Text style={[FONTS.largeTitleFontStyling, designs.bigText]}>
                We can help you with some extra money
                </Text>
                <Text style={[FONTS.body2FontStyling, designs.smallHeaderText]}>
                Whether you need extra money to balance your rent or a quick loan to sort out personal stuff, we gat you!
                </Text>
          </View>
          </View>
        
        <View   styles={{flex:1,flexDirection:'column',justifyContent:'center'}}>
            <TouchableOpacity
              onPress={handleRentalLoanClick}
              activeOpacity={0.7}
              style={[designs.button, {marginBottom: 20,width:width*0.9}]}> 
              <View style={designs.buttonInnerView}>
                  <Text style={designs.buttonText}> Rent Top-up</Text>
                  <Icon name="arrow-forward-outline" size={30} color= {COLORS.secondary} style={{fontWeight: '900'}}/>
              </View>              
            </TouchableOpacity>

            
         
            <TouchableOpacity
              onPress={() => navigation.navigate('EmergencyLoanRequestDashBoard')}
              style={[designs.button, {width:width*0.9}]}>
              <View style={designs.buttonInnerView}>
                  <Text style={designs.buttonText}> Instant Loan </Text>
                  <Icon name="arrow-forward-outline" size={30} color= {COLORS.secondary} style={{fontWeight: '900'}} />
              </View>  
            </TouchableOpacity>   
            </View>   
            </ImageBackground>
      
      
    </View>
  );
};

export default Borrow;
