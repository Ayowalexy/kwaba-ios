import React, {useState} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const RentalLoanActiveDashBoard = ({navigation}) => {

  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [repaymentData] = useState([{name: '1st Repayment', amount: '₦110,000.00', paymentDueDate: '12 Feb, 2021', status: 'PAID', paymentID: 1}]);

  const handleNavigation = () => {
    const data = {
    accommodationStatus: accommodationStatus,
    salaryAmount: salaryAmount,
    };
    // try {
    //   dispatch(soloSaving(data));

    //   return navigation.navigate('SoloSaving2');
    // } catch (error) {}
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
          style={{flex: 1}}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: 11,
                marginLeft: 16
              },
            ]}>
            Rental Loan
          </Text>

          <View style={[designs.activeLoanDashboard, {marginHorizontal: 16, elevation: 20}]}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                <View>
                    <Text style={{
                fontSize: 15,
                lineHeight: 19,
                color: COLORS.white,
                marginTop: 19,
                marginLeft: 6,
                marginBottom: 10
              }}>Next Payment Amount</Text>
                    <Text style={{
                fontSize: 26,
                lineHeight: 38,
                color: COLORS.white,
                fontWeight: 'bold',
                marginLeft: 6,
              }}>₦105,000,000.00</Text>
                </View>
                <Image style={{width: 90, height: 95, alignSelf: 'flex-end', right: -10}} source={images.maskGroup29}/>
              </View>
              <View style={{backgroundColor: '#46448d', borderRadius: 5, padding: 10, marginBottom: 12, flexDirection: 'row'}}>
                  <View style={{flex: 1, borderRightWidth: 1, borderRightColor: COLORS.light, paddingHorizontal: 6}}>
                      <Text style={[designs.innerBoxTitles]}>Next Loan Payment</Text>
                      <Text style={designs.innerBoxValues}>21 days</Text>
                </View>
                  <View style={{flex: 1, borderRightWidth: 1, borderRightColor: COLORS.light, paddingHorizontal: 6}}>
                  <Text style={[designs.innerBoxTitles]}>Next Payment Due Date</Text>
                      <Text style={designs.innerBoxValues}>17 Feb, 2021</Text>
                </View>
                <View style={{flex: 2, paddingHorizontal: 6}}>
                <Text style={[designs.innerBoxTitles]}>Repayment Balance</Text>
                <Text style={designs.innerBoxValues}>₦110,105,000.00</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 3}}>
              <Text style={{color: COLORS.light, alignSelf: 'center'}}>1 of 2 months</Text>
              <TouchableOpacity style={{backgroundColor: COLORS.light, padding: 10, borderRadius: 20}}>
                  <View style={designs.flexRow}>
                  <Text style={{color: COLORS.white}}>Pay now</Text>
                  <Icon name="chevron-forward-outline" size={12} style={{color: COLORS.white, marginLeft: 2, alignSelf: 'center'}}/>
                  </View>
                </TouchableOpacity>
              </View>
              
          </View>
          <AnimatedCircularProgress
              size={100}
              width={10}
              rotation={0}
              style={designs.circularProgress}
              fill= {75}
              tintColor="#00DC99"
              backgroundColor="#2A286A">
              {(fill) => (
                <ImageBackground
                  style={{
                    backgroundColor: '#2A286A',
                    height: 100,
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }} source={images.ellipse100}>
                  <Text
                    style={{
                      fontFamily: 'CircularStd',
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'white',
                      lineHeight: 27,
                      textAlign: 'center',
                    }}>
                    75%
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd',
                      fontSize: 10,
                      fontWeight: '600',
                      color: 'white',
                      lineHeight: 14,
                      textAlign: 'center',
                    }}>
                    achieved
                  </Text>
                </ImageBackground>
              )}
            </AnimatedCircularProgress>

            <View style={{flex:1, borderTopLeftRadius: 20,
    borderTopRightRadius: 20, backgroundColor: COLORS.white, paddingVertical: 13, paddingHorizontal: 16}}>
        <Text style={[FONTS.h3FontStyling, {color: COLORS.primary, paddingBottom: 12, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#BFBFBF'}]}>Repayments</Text>
        <View>
        <FlatList
        data={repaymentData}
        renderItem={({item}) =>
            (<View style={{marginTop: 12}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4}}>
                  <View style={designs.flexRow}>
                <Text style={[designs.smallText, {fontSize: 8, color: COLORS.grey}]}>{'\u2B24'} {''}</Text>
                    <Text style={{color: COLORS.primary, fontSize: 12, lineHeight: 15}}>{item.name}</Text>
                  </View>
                    <Text style={{color: COLORS.primary, fontSize: 12, lineHeight: 15}}>{item.amount}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: COLORS.grey, fontSize: 10, lineHeight: 13}}>{item.paymentDueDate}</Text>
                    <Text style={{color: COLORS.grey, fontSize: 10, lineHeight: 13}}>{item.status}</Text>
                </View>
            </View>)}
        keyExtractor={item => item.paymentID.toString()}
      />

        </View>

            </View>

          {/* <View style = {designs.contentWrapper}>
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
          </View>
          <Text style={[FONTS.body1FontStyling], {color: COLORS.dark, marginBottom: 8}}>What’s your accommodation status? </Text>
          <TouchableOpacity style={[designs.buttonStyleA, {borderColor: accommodationStatus == 'Looking to renew my rent' ? COLORS.light : '#EFEFEF'}]} onPress={() => setAccommodationStatus('Looking to renew my rent')}><View>
              <Text style={[designs.btnText, {color: accommodationStatus == 'Looking to renew my rent' ? COLORS.light : COLORS.grey}]}>Looking to renew my rent</Text></View></TouchableOpacity>
           
            
          <TouchableOpacity style={[designs.buttonStyleA, {borderColor: accommodationStatus == 'Want to pay for a new place' ? COLORS.light : '#EFEFEF'}]} onPress={() => setAccommodationStatus('Want to pay for a new place')}><View>
              <Text style={[designs.btnText, {color: accommodationStatus == 'Want to pay for a new place' ? COLORS.light : COLORS.grey}]}>Want to pay for a new place</Text></View></TouchableOpacity>
           
            
          
          <TouchableOpacity style={[designs.buttonStyleA, {borderColor: accommodationStatus == 'I’m still searching' ? COLORS.light : '#EFEFEF'}]} onPress={() => setAccommodationStatus('I’m still searching')}><View>
              <Text style={[designs.btnText, {color: accommodationStatus == 'I’m still searching' ? COLORS.light : COLORS.grey}]}>I’m still searching</Text></View></TouchableOpacity>
           
            
          
          <Text style={[FONTS.body1FontStyling], {color: COLORS.dark, marginBottom: 8}}>How much do you earn monthly? </Text>
          <TextInput
            style={[designs.textField, {marginBottom: 0, textAlign: 'left'}]}
            placeholder="Amount"
            placeholderTextColor= {COLORS.grey}
            value={salaryAmount}
          onChangeText={(text) => setSalaryAmount(text)}
          />
          </View>
         
          
          <TouchableOpacity
            onPress={() => navigation.navigate('CompleteProfile3')}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>NEXT</Text>
          </TouchableOpacity> */}
        </View>
        
   </View>
  );
};

export default RentalLoanActiveDashBoard;
