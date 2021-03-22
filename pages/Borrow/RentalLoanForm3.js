import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logCurrentStorage } from '../../util/logCurrentStorage';
import axios from 'axios';



const RentalLoanForm3 = ({navigation}) => {

  const [homeAddress, setHomeAddress] = useState('');
  const [lengthOfResidence, setLengthOfResidence] = useState('');
  const [lastRentAmount, setLastRentAmount] = useState('');
  const [lastPaymentRecipient, setLastPaymentRecipient] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState()
  const [modalVisible, setVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [progress, setProgress] = useState(100);

  

  const handleModalButtonPush = async () => {
    setVisible(false);
    const data = {
      home_address: homeAddress,
      home_stay_duration: lengthOfResidence,
      last_rent_amount: lastRentAmount,
      last_rent_paid_to: lastPaymentRecipient,
      last_rent_payment_method: modeOfPayment,
    };
    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    const url = 'http://67.207.86.39:8000/api/v1/application/new';
    const token = await getToken();
    console.log(dummyData);
    console.log(token);
    console.log({...dummyData,...JSON.parse(loanFormData),...data})
    try {
      const response = await axios.post(url, {...dummyData,...JSON.parse(loanFormData),...data}, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      console.log(response);
      setSuccessModal(true);
      
    logCurrentStorage();
    } catch (error) {
      console.log(error.response.data);
      
    }
    
  };
  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const dummyData =

  {
    accomodationstatus: "Want to pay for a new place",
    amount: "600000",
    amount_needed_from_kwaba: "600000",
    bvn: "123456789",
    dob: "1991-10-09",
    employee_work_email: "prince@kwaba.ng",
    employer_address: "Etiosa, Ikoyi",
    employer_email: "Hello.kwaba@gmail.com",
    employer_name: "Kwaba",
    existing_loan_amount: "0",
    home_address: "32 Adebisi Street,Ketu",
    home_stay_duration: "Less Than 1 Year",
    last_rent_amount: "500000",
    last_rent_paid_to: "Landlord",
    last_rent_payment_method: "Bank transfer",
    loanable_amount: "600000",
    monthly_repayment: "60000",
    next_rent_address: "32 Trans-Bucknor Street, Lagos",
    next_rent_paid_to: "Landlord",
    non_refundable_deposit: "2000",
    pre_available_rent_amount: "0",
    referrer: "",
    repayment_plan: "6 Months",
    salary_amount: "100000",
    total_rent: "600000",
  };

  const handleNavigation =  () => {
    setSuccessModal(false);
    navigation.navigate('UploadBankStatement');
  }


  return (
    <ScrollView style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
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
                fontWeight: 'bold'
              },
            ]}>
            Rental Loan
          </Text>
          <View style = {designs.contentWrapper}>
          <View style = {designs.formHeader}>
          <Text
            style={[
              FONTS.h3FontStyling,
              {
                color: COLORS.primary,
                textAlign: 'left',
                fontWeight: 'bold'
              },
            ]}>
            Rent Information
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, lineHeight: 15, color: '#ADADAD', marginRight: 15}}>3 of 3</Text>
          <AnimatedCircularProgress
  size={25}
  width={5}
  fill={progress}
  rotation={0}
  tintColor= {COLORS.secondary}
  backgroundColor="#D6D6D6" />
  </View>
          </View>
          <Text style={[FONTS.body1FontStyling, {color: COLORS.dark, marginBottom: 8}]}>What is your current home address?</Text>
          <TextInput
            style={[designs.textField, {marginBottom: 17, textAlign: 'left'}]}
            placeholder="Enter Address"
            placeholderTextColor= {COLORS.grey}
            value={homeAddress}
          onChangeText={(text) => setHomeAddress(text)}
          />

<Text style={[FONTS.body1FontStyling, {color: COLORS.dark, marginBottom: 8}]}>How long have you lived here? </Text>
         <TextInput
            style={[designs.textField, {marginBottom: 17, textAlign: 'left'}]}
            placeholder="1 year"
            placeholderTextColor= {COLORS.grey}
            value={lengthOfResidence}
          onChangeText={(text) => setLengthOfResidence(text)}
          />
          <Text style={[FONTS.body1FontStyling, {color: COLORS.dark, marginBottom: 8}]}>How much was your last rent? </Text>
          <TextInput
            style={[designs.textField, {marginBottom: 27, textAlign: 'left'}]}
            placeholder="Amount"
            placeholderTextColor= {COLORS.grey}
            value={lastRentAmount}
          onChangeText={(text) => setLastRentAmount(text)}
          />
          
          <Text style={[FONTS.body1FontStyling, {color: COLORS.dark, marginBottom: 11}]}>Who did you pay to? </Text>
          <TouchableOpacity style={[designs.buttonStyleA, {borderColor: lastPaymentRecipient == 'Landlord' ? COLORS.light : '#EFEFEF'}]} onPress={() => setLastPaymentRecipient('Landlord')}><View>
              <Text style={[designs.btnText, {color: lastPaymentRecipient == 'Landlord' ? COLORS.light : COLORS.grey}]}>Landlord</Text></View></TouchableOpacity>
           
            
          <TouchableOpacity style={[designs.buttonStyleA, {borderColor: lastPaymentRecipient == 'Caretaker' ? COLORS.light : '#EFEFEF'}]} onPress={() => setLastPaymentRecipient('Caretaker')}><View>
              <Text style={[designs.btnText, {color: lastPaymentRecipient == 'Caretaker' ? COLORS.light : COLORS.grey}]}>Caretaker</Text></View></TouchableOpacity>
           
            
          
          <TouchableOpacity style={[designs.buttonStyleA, {borderColor: lastPaymentRecipient == 'Agent' ? COLORS.light : '#EFEFEF'}]} onPress={() => setLastPaymentRecipient('Agent')}><View>
              <Text style={[designs.btnText, {color: lastPaymentRecipient == 'Agent' ? COLORS.light : COLORS.grey}]}>Agent</Text></View></TouchableOpacity>
           
            
              <Text style={[FONTS.body1FontStyling, {color: COLORS.dark, marginBottom: 8}]}>How did you pay? </Text>
          <TextInput
            style={[designs.textField, {marginBottom: 0, textAlign: 'left'}]}
            placeholder="Select an option"
            placeholderTextColor= {COLORS.grey}
            value={modeOfPayment}
          onChangeText={(text) => setModeOfPayment(text)}
          />
         
          </View>
         
          
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>NEXT</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose ={()=>{}}>
            <View style={designs.modalWrapper}>
            <View style={designs.modalView}> 
            <View style={[designs.modalHeader, {marginBottom: 11}]}>
            <Icon
              onPress={() => setVisible(!modalVisible)}
              style={{marginLeft: 'auto'}}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            </View>
            <View>
                <Text style={designs.modalTitleText}>Confirm</Text>
                <Text style={designs.modalBodyText}>You are about to submit your finance request</Text>
                <TouchableOpacity
            onPress={handleModalButtonPush}
            style={[designs.button, {backgroundColor: COLORS.secondary, marginBottom: 37, width: '100%', alignSelf: 'center'}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>SUBMIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('RentalLoanForm2')}
            style={[designs.button, {backgroundColor: 'white', elevation: 0, marginBottom: 24, width: '100%', alignSelf: 'center'}]}>
            <Text style={[designs.buttonText, {color: '#BFBFBF', textAlign: 'center', fontWeight: 'normal'}]}>NO, NOT NOW</Text>
          </TouchableOpacity>
                </View>
            </View>

            </View>
            
        </Modal>
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
            Finance Request Submitted
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 12,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 6,
              }}>
              Congratulations! your request has been submitted.
            </Text>
            <TouchableOpacity
              onPress={handleNavigation}
              style={[designs.button, {marginTop: 30, width: '100%', alignSelf: 'center', backgroundColor: COLORS.secondary}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                  textAlign: 'center'
                }}>
                JUST A FEW THINGS LEFT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        
   </ScrollView>
  );
};

export default RentalLoanForm3;
