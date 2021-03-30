import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Pressable
} from 'react-native';
import {icons} from '../../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { emergencyLoan, sendEmergencyLoanDetails } from '../../../redux/actions/emergencyLoanActions';
import {useDispatch, useSelector} from 'react-redux';


const EmergencyLoanRequest = ({navigation}) => {

  const dispatch = useDispatch();
  const [modalVisible, setVisible] = useState(false);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [accountDetails, setAccountDetails] = useState([]);
  const [selectedAccountDetails, setSelectedAccountDetails] = useState([]);
  const [pressed, setPressed] = useState(false);
  const store = useSelector((state) => state.applyForEmergencyLoanReducer);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loanPurposeOptions] = useState([
    {label: 'Household', value: 'Household'},
    {label: 'Personal', value: 'Personal'},
])

useEffect(()=> {
  const getAccounts = async () => {
    console.log('start')
    const accountDetailsData = await AsyncStorage.getItem('accountDetails');
    console.log(accountDetailsData)
    console.log(accountDetails)
    if (accountDetailsData.length>0) {
      setAccountDetails([...(JSON.parse(accountDetailsData))]);
      // setSelectedAccountDetails(accountDetails[0]);
      console.log('acc', accountDetails)
      // console.log(selectedAccountDetails)
    }

  };
  getAccounts();
  
}, []);

const handleNavigation =()=> {
  const data = {
    loan_purpose: loanPurpose,
    disbursement_account_name: 'John Utaka',
    disbursement_account_number: accountDetails[0].accountNumber,
    disbursement_account_bank: accountDetails[0].bank
  };
  try {
    console.log(data)
    dispatch(emergencyLoan(data));
    console.log('done')
    console.log('ttt', store)
    dispatch(sendEmergencyLoanDetails(store));
    console.log('dddf')
    const afterSubmit =()=>{
      setVisible(false);
    setSuccessModal(true)
    }
    
    afterSubmit()
  } catch (error){
    console.log(error)
  }  
     
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
                fontWeight: 'bold',
                marginBottom: 24
              },
            ]}>
            Emergency Loan
          </Text>
          
          <Pressable onPress={() => {
          setPressed(!pressed);
          setPickerModalVisible(!pickerModalVisible)
          console.log('switched', pressed)
        }} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: loanPurpose == ''? 25: 7, paddingBottom: 25, borderRadius: 10, borderColor: '#EFEFEF', backgroundColor: COLORS.white, marginBottom: 23}}> 
              <View style={{ padding: 0, justifyContent: 'center' }}>
                  <Text style={{color: COLORS.grey, fontSize: loanPurpose == ''? 16: 10, lineHeight: loanPurpose == ''? 30: 10, marginBottom: loanPurpose == ''? 0: 3}}>Loan Purpose</Text>
                  
                  {loanPurpose !== '' && <Text style={[FONTS.body1FontStyling, {marginBottom: 'auto'}]}>{loanPurpose}</Text>}
    
              </View>
              <View style={{height: '100%', paddingTop: loanPurpose == ''? 0: 12 }}><IconFA name = {pressed? 'angle-up': 'angle-down'} size={30} color={COLORS.grey}/></View>
          </Pressable>
          <Modal visible={pickerModalVisible} animationType="fade" transparent={true} onRequestClose ={()=>{setPickerModalVisible(!pickerModalVisible);
              setPressed(!pressed)}}>
          <View style={designs.modalWrapper}>
                    <View style={designs.modalView}>
                        <View style={[designs.modalHeader, {justifyContent: 'flex-end'}]}>
                        <Icon
              onPress={() => {setPickerModalVisible(!pickerModalVisible);
              setPressed(!pressed)}}
              style={{alignSelf: 'flex-end'}}
              name="close-outline"
              size={30}
              color="#465969"
            />
            </View>
            
            <View>
            { loanPurposeOptions.map((value, index) => {
              return <TouchableOpacity key={index} onPress={() => {setLoanPurpose(value.value); setPickerModalVisible(false); setPressed(!pressed)}}>
                  <Text style={FONTS.body1FontStyling}>{ value.label }</Text>
                </TouchableOpacity>
            })}
                
            </View>
            </View>
            </View>
            </Modal>
          <View style={{borderRadius: 15, backgroundColor: COLORS.white, paddingHorizontal: 25, paddingVertical: 2}}>
            <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
            <Text style={designs.offerBoxLabels}>Loan amount</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>₦200,000</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
<Text style={designs.offerBoxLabels}>Repayment amount</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>₦215,000</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
<Text style={designs.offerBoxLabels}>Due Date:</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>17 Feb, 2021</Text>
            </View>
            {/* <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between'}}>
<Text style={designs.offerBoxLabels}>Total repayment</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>₦210,000</Text>
            </View> */}
            <View style={{flexDirection: 'row', paddingTop: 22, paddingBottom: 16, borderColor: COLORS.grey, borderBottomWidth: 1, justifyContent: 'space-between', marginBottom: 20}}>
<Text style={designs.offerBoxLabels}>Duration</Text><Text style={[designs.offerBoxLabels, {fontWeight: 'bold'}]}>30 Days</Text>
            </View>

          </View>

          <View style={{marginTop: 20, paddingVertical: 20, paddingHorizontal: 20, borderRadius: 10, backgroundColor: COLORS.white}}>
            <View style={[designs.flexRow, {justifyContent: 'space-between', paddingRight: 10, marginBottom: 17}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: COLORS.primary}}>Disbursement Account</Text><Text style={{fontSize: 12, color: COLORS.secondary }}>Change</Text></View>
            <View style={{borderRadius: 15, backgroundColor: COLORS.primary, padding: 16, flexDirection: 'row', width: '75%'}}>
              <View>
                <Text style={{color: COLORS.white, fontSize: 15, lineHeight: 23, fontFamily: 'CircularStd', marginBottom: 1}}>Johnson Abraham</Text>
                <Text style={{color: COLORS.light, fontSize: 10, lineHeight: 13, fontFamily: 'CircularStd', marginBottom: 23}}>{accountDetails[0]?.accountNumber}</Text>
                <Text style={{color: COLORS.white, fontSize: 10, lineHeight: 13, fontFamily: 'CircularStd'}}>{accountDetails[0]?.bank}</Text>
              </View>
              <View>
                <Image style={{width: 71, height: 110, left: '5%'}} source={images.maskGroup24}/> 
                </View>

            </View>
          </View>
            
        
        </View>
        <View style={{paddingHorizontal: 16}}>
        <TouchableOpacity style={[designs.buttonStyleB, {backgroundColor: '#00DC99', width: '100%'}]} onPress={() => setVisible(true)}><Text style={{color: COLORS.white}}>APPLY</Text></TouchableOpacity>
        </View>

        <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose ={()=>{}}>
                <View style={designs.modalWrapper}>
                    <View style={designs.modalView}>
                        <View style={[designs.modalHeader, {justifyContent: 'space-between', marginBottom: 20}]}>
                          <Text style={{flex: 1, textAlign: 'center', fontSize: 18, lineHeight: 25, fontWeight: 'bold', color: COLORS.primary}}>Confirm</Text>
                        <Icon
              onPress={() => setVisible(!modalVisible)}
              style={{alignSelf: 'flex-end'}}
              name="close-outline"
              size={30}
              color="#465969"
            />
            </View>
            
            <View>
                <Text style={{fontSize: 16, lineHeight: 20, color: COLORS.primary, textAlign: 'center', marginBottom: 23}}>Please confirm loan details</Text>
                <View style={[designs.repaymentTermsBox, {borderRadius: 5, borderColor: '#EAEAEA'}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={designs.repaymentTermsContent}>
              <Text style={designs.smallTextTitles}>Loan Amount</Text>
              <Text style={designs.repaymentTermsValues}>₦220,000.00</Text>
            </View>
            <View style={designs.repaymentTermsContent}>
              <Text style={designs.smallTextTitles}>Repayment Amount</Text>
              <Text style={designs.repaymentTermsValues}>₦220,000.00</Text>
              </View>
            <View style={designs.repaymentTermsContent}>
              <Text style={designs.smallTextTitles}>Due Date</Text>
              <Text style={designs.repaymentTermsValues}>30 Days</Text>
              </View>
          </View>
        </View>
                <TouchableOpacity
            onPress={handleNavigation} style={[designs.button, {backgroundColor: COLORS.secondary, elevation: 6, width: '100%', marginTop: 12, alignSelf: 'center', marginBottom: 20}]}>
            <Text style={[designs.buttonText, {fontSize: 14, color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>YES, IT'S FINE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{}} style={[designs.button, {backgroundColor: COLORS.white, elevation: 0, width: '100%', marginTop: 0, alignSelf: 'center'}]}>
            <Text style={[designs.buttonText, {fontSize: 14, color: COLORS.grey, textAlign: 'center', fontWeight: 'normal'}]}>CANCEL</Text>
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
            Request Success
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 12,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 6,
              }}>
              Loan will be disbursed shortly
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSuccessModal(false);
                navigation.navigate('EmergencyLoanDashBoard');
              }}
              style={[designs.button, {marginTop: 30, width: '100%', alignSelf: 'center', backgroundColor: COLORS.secondary}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                  textAlign: 'center'
                }}>
                GO HOME
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        


   </ScrollView>
  );
};

export default EmergencyLoanRequest;
