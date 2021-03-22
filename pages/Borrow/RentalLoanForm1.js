import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RentalLoanForm1 = ({navigation}) => {

  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [progress, setProgress] = useState(33);

  const isError = () => {
    if (
      (salaryAmount.trim().length == 0 ||
      accommodationStatus.trim().length == 0)) {
        return true;
    } else {
      return false;
    }
  };


    

  const handleNavigation = async () => {
    const data = {
    accomodationstatus: accommodationStatus,
    salary_amount: salaryAmount,
    };

    // await AsyncStorage.setItem('rentalLoanForm', JSON.stringify(data));
    // navigation.navigate('RentalLoanThirdPartyConnection')

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    await AsyncStorage.setItem('rentalLoanForm', JSON.stringify({...JSON.parse(loanFormData), ...data}));
    navigation.navigate('RentalLoanThirdPartyConnection')

    // try {
    //   dispatch(soloSaving(data));

    //   return navigation.navigate('SoloSaving2');
    // } catch (error) {}
  };


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
            justifyContent: 'flex-end'
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
            Payment Option
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, lineHeight: 15, color: '#ADADAD', marginRight: 15}}>1 of 3</Text>
          <AnimatedCircularProgress
  size={25}
  width={5}
  fill={progress}
  rotation={0}
  tintColor= {COLORS.secondary}
  backgroundColor="#D6D6D6" />
  </View>
          
          </View>
          <Text style={[FONTS.body1FontStyling, {color: COLORS.dark, marginBottom: 8}]}>What’s your accommodation status? </Text>
          <TouchableOpacity style={[designs.buttonStyleA, {borderColor: accommodationStatus == 'Looking to renew my rent' ? COLORS.light : '#EFEFEF'}]} onPress={() => setAccommodationStatus('Looking to renew my rent')}><View>
              <Text style={[designs.btnText, {color: accommodationStatus == 'Looking to renew my rent' ? COLORS.light : COLORS.grey}]}>Looking to renew my rent</Text></View></TouchableOpacity>
           
            
          <TouchableOpacity style={[designs.buttonStyleA, {borderColor: accommodationStatus == 'Want to pay for a new place' ? COLORS.light : '#EFEFEF'}]} onPress={() => setAccommodationStatus('Want to pay for a new place')}><View>
              <Text style={[designs.btnText, {color: accommodationStatus == 'Want to pay for a new place' ? COLORS.light : COLORS.grey}]}>Want to pay for a new place</Text></View></TouchableOpacity>
           
            
          
          <TouchableOpacity style={[designs.buttonStyleA, {borderColor: accommodationStatus == 'I’m still searching' ? COLORS.light : '#EFEFEF'}]} onPress={() => setAccommodationStatus('I’m still searching')}><View>
              <Text style={[designs.btnText, {color: accommodationStatus == 'I’m still searching' ? COLORS.light : COLORS.grey}]}>I’m still searching</Text></View></TouchableOpacity>
           
            
          
          <Text style={[FONTS.body1FontStyling, {color: COLORS.dark, marginBottom: 8}]}>How much do you earn monthly? </Text>
          <TextInput
            style={[designs.textField, {marginBottom: 0, textAlign: 'left'}]}
            placeholder="Amount"
            placeholderTextColor= {COLORS.grey}
            value={salaryAmount}
          onChangeText={(text) => setSalaryAmount(text)}
          />
          </View>
         
          
          <TouchableOpacity
            onPress={handleNavigation}
            disabled={isError()}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>NEXT</Text>
          </TouchableOpacity>
        </View>
        
   </ScrollView>
  );
};

export default RentalLoanForm1;
