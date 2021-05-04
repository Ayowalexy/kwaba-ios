import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconLock from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, images} from '../../../util/index';
import {useDispatch} from 'react-redux';
import designs from './style';
import Tooltip from 'rn-tooltip';
import { emergencyLoan } from '../../../redux/actions/emergencyLoanActions';


export default function EmergencyLoanRequestDashBoard({navigation}) {
  const [loanAmount, setLoanAmount] = useState('');

  const dispatch = useDispatch();

  const handleNavigation = () => {
    const data = {
      loan_amount: loanAmount,
    };
    try {
      console.log('here')
      dispatch(emergencyLoan(data));
      console.log('done')
      return navigation.navigate('EmergencyLoanRequest');
    } catch (error){
      console.log(error)
    }
  };
  

  return (
    <View
      style={[
        designs.container,
        {backgroundColor: '#F7F8FD', paddingTop: 28, paddingHorizontal: 16, paddingBottom: 24},
      ]}>
      
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
              <View style={{width: '100%', marginLeft: 25, marginBottom: 20}}>
        <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{ fontWeight: '900'}}
        color= {COLORS.primary}
      />
      </View>
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}>
      <View style={{textAlign: 'left'}}>
          <Text style={[FONTS.h1FontStyling, {color: COLORS.primary, fontWeight: 'bold'}]}>Emergency Loan</Text>
          <Text style={[FONTS.body1FontStyling, {color: '#ADADAD', marginTop: 6}]}>Based on your savings activities, here is a breakdown of how much you can access</Text>
        </View>
        <View style={designs.rlDisplay}>
        <View style={[designs.displayCard, {backgroundColor: '#FB8B24', marginBottom: 15}]}>
            
            <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontSize: 12, color: COLORS.white, lineHeight: 15}}>You have saved</Text>
                {/* <Text style={{fontSize: 10, color: COLORS.light, lineHeight: 13, marginLeft: 8}}>As at 09:00am</Text> */}
                </View>
                <Text style={{fontSize: 23, color: COLORS.white, lineHeight: 29, fontWeight: 'bold'}}>₦1,205,000.00</Text>
            </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
              
                <IconLock name="lock" color="#ffe700" size={15} />
            
            </View>
          </View>
        <View style={designs.displayCard}>
            
            <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontSize: 12, color: COLORS.white, lineHeight: 15}}>BuyCoins</Text>
                <Text style={{fontSize: 10, color: COLORS.light, lineHeight: 13, marginLeft: 8}}>As at 09:00am</Text>
                </View>
                <Text style={{fontSize: 23, color: COLORS.white, lineHeight: 29, fontWeight: 'bold'}}>₦1,205,000.00</Text>
            </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity>
                <Icon name="close-circle-outline" color="#465969" size={10} />
            </TouchableOpacity>
            <Text style={{fontSize: 10, color: '#465969', marginLeft: 2}}>Remove</Text>
            </View>
          </View>
          <TouchableOpacity>
          <Text style={{fontSize: 10, color: '#00DC99', textAlign: 'right', paddingHorizontal: 10, lineHeight: 13}}>+ Add another account</Text>
          </TouchableOpacity>
          <View style={{marginTop: 8, paddingBottom: 11, borderBottomWidth: 1, borderColor: '#EAEAEA'}}>
              <View style={designs.flexRow}>
              <Text style={{color: COLORS.primary, fontSize: 12, lineHeight: 15, marginBottom: 1, marginRight: 5}}>
                {/* Salary */} Maximum Loan Amount
            </Text>
            <Tooltip height= 'auto' tooltipWidth={200} withOverlay={false} tooltipText="This is the most amount you can get against you savings" containerStyle={designs.tooltipContainer} popover={
                <Text>
                  This is the most amount you can get against you savings
                </Text>
              }>
            <IconLock name="info-circle" color= {COLORS.secondary} size={15} />
            </Tooltip>
            </View>
            <Text style={{color: COLORS.primary, fontSize: 23, lineHeight: 29, fontWeight: 'bold'}}>
            ₦310,000.00
            </Text>
          </View>
          {/* <View style={{marginTop: 20, marginBottom: 11}}>
            <Text style={{color: COLORS.primary, fontSize: 12, lineHeight: 15, marginBottom: 3}}> Total available asset amount</Text>
            <Text style={{color: COLORS.primary, fontSize: 30, lineHeight: 38, fontWeight: 'bold'}}>₦3,205,500.00</Text>
          </View>
          <View style={designs.loanAmountBox}>
            <Text style={{color: COLORS.primary, fontSize: 12, lineHeight: 15, marginBottom: 1}}>Maximum Loan Amount</Text>
            <Text style={{color: COLORS.primary, fontSize: 30, lineHeight: 38, fontWeight: 'bold'}}>₦1,610,000.00</Text>
          </View> */}
          <View>
          <Text
              style={{
                color: COLORS.primary,
                fontSize: 16,
                lineHeight: 20,
                marginTop: 20,
              }}>
              How much do you want?
            </Text>
            <TextInput
              style={[
                designs.textField,
                {
                  marginTop: 8,
                  textAlign: 'left',
                  marginBottom: 0
                },
              ]}
              placeholder='Amount'
              keyboardType="default"
              placeholderTextColor='#BFBFBF'
              onChangeText={(text) => setLoanAmount(text)}
            />
          </View>
        </View>  
        <View style={[designs.repaymentTermsBox, {marginBottom: 27}]}>
          <Text style={{color: '#FB8B24', fontSize: 18, lineHeight: 23, marginBottom: 11, fontWeight: 'bold'}}>Repayment Terms</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={designs.repaymentTermsContent}>
              <Text style={designs.smallTextTitles}>Repayment Duration</Text>
              <Text style={designs.repaymentTermsValues}>30 days</Text>
            </View>
            <View style={designs.repaymentTermsContent}>
              <Text style={designs.smallTextTitles}>Monthly Payment</Text>
              <Text style={designs.repaymentTermsValues}>₦20,000.00</Text>
              </View>
            <View style={designs.repaymentTermsContent}>
              <Text style={designs.smallTextTitles}>Repayment Amount</Text>
              <Text style={designs.repaymentTermsValues}>₦635,000.00</Text>
              </View>
          </View>
        </View>
        <TouchableOpacity style={[designs.buttonStyleB, {backgroundColor: '#00DC99', width: '100%'}]} onPress={handleNavigation}><Text style={{color: COLORS.white}}>ACCESS LOAN</Text></TouchableOpacity>
        </ScrollView>
        </View>
    </View>
  );
}
