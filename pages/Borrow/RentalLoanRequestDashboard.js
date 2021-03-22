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
import {COLORS, FONTS, images} from '../../util/index';
import designs from './style';


export default function RentalLoanRequestDashBoard({navigation}) {
  

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
        size={20}
        style={{ fontWeight: '900'}}
        color= {COLORS.primary}
      />
      </View>
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}>
      <View style={{textAlign: 'left'}}>
          <Text style={[FONTS.h1FontStyling, {color: COLORS.primary, fontWeight: 'bold'}]}>Rental Loan</Text>
          <Text style={[FONTS.body1FontStyling, {color: '#ADADAD', marginTop: 6}]}>Based on your 3rd party accounts here is a breakdown of how much you can access</Text>
        </View>
        <View style={designs.rlDisplay}>
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
              <Text style={{color: COLORS.primary, fontSize: 12, lineHeight: 15, marginBottom: 1}}>
                Salary
            </Text>
            <Text style={{color: COLORS.primary, fontSize: 23, lineHeight: 29, fontWeight: 'bold'}}>
            ₦400,000.00
            </Text>
          </View>
          <View style={{marginTop: 20, marginBottom: 11}}>
            <Text style={{color: COLORS.primary, fontSize: 12, lineHeight: 15, marginBottom: 3}}> Total available asset amount</Text>
            <Text style={{color: COLORS.primary, fontSize: 30, lineHeight: 38, fontWeight: 'bold'}}>₦3,205,500.00</Text>
          </View>
          <View style={designs.loanAmountBox}>
            <Text style={{color: COLORS.primary, fontSize: 12, lineHeight: 15, marginBottom: 1}}>Maximum Loan Amount</Text>
            <Text style={{color: COLORS.primary, fontSize: 30, lineHeight: 38, fontWeight: 'bold'}}>₦1,610,000.00</Text>
          </View>
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
            />
          </View>
        </View>  
        <View style={designs.repaymentTermsBox}>
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
        <TouchableOpacity style={[designs.buttonStyleB, {backgroundColor: '#00DC99', width: '100%'}]} onPress={() => navigation.navigate('PayWithSavings')}><Text style={{color: COLORS.white}}>REQUEST LOAN</Text></TouchableOpacity>
        </ScrollView>
        </View>
    </View>
  );
}
