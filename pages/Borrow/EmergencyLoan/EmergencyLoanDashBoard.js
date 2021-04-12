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
import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const EmergencyLoanDashBoard = ({navigation}) => {

  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [repaymentData] = useState([{name: '1st Repayment', amount: '₦110,000.00', paymentDueDate: '12 Feb, 2021', status: 'PAID', paymentID: 1}]);

  const handlePayment = () => {
    const data = {
    
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
                marginBottom: 17,
                marginLeft: 16
              },
            ]}>
            Emergency Loan
          </Text>
          <Text style={[FONTS.body3FontStyling, {fontSize: 10, lineHeight: 13, color: COLORS.light, backgroundColor: '#EDECFC', borderRadius: 5, padding: 6, marginHorizontal: 16, marginBottom: 22}]}>We hope this loan was helpful. Please ensure to make repayment on time, failure will incur 2.5% daily.</Text>

          <View style={[designs.activeLoanDashboard, {marginHorizontal: 16, elevation: 20, backgroundColor: COLORS.white, }]}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                <View>
                    <Text style={{
                fontSize: 14,
                lineHeight: 19,
                color: COLORS.primary,
                marginTop: 19,
                marginLeft: 6,
                marginBottom: 10
              }}>Loan Repayment Amount</Text>
                    <Text style={{
                fontSize: 24,
                lineHeight: 38,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}>₦105,000,000.00</Text>
                </View>
                <Image style={{width: 90, height: 95, alignSelf: 'flex-end', right: -10}} source={images.maskGroup31}/>
              </View>
              <View style={{backgroundColor: '#46448d', borderRadius: 5, padding: 10, marginBottom: 12}}>
                  <View style={{padding: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                      <View>
                      <Text style={[FONTS.body1FontStyling, {color: COLORS.white, fontSize: 12}]}>Loan Amount</Text>
                      <Text style={[FONTS.body1FontStyling, {color: COLORS.white, fontSize: 16, fontWeight: 'bold'}]}>₦105,000.00</Text>
                      </View>
                      <View><TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: 10, color: COLORS.secondary, lineHeight: 20}}> View Details </Text>
                          <Icon name="chevron-forward-outline" size ={8} color={COLORS.secondary}/>
                      </TouchableOpacity></View>
                </View>
                  <View style={{padding: 6, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                      <View>
                  <Text style={[FONTS.body1FontStyling, {color: COLORS.white, fontSize: 12}]}>Due Date</Text>
                  <Text style={[FONTS.body1FontStyling, {color: COLORS.white, fontSize: 16, fontWeight: 'bold'}]}>17 Feb, 2021</Text>
                  </View>
                  <TouchableOpacity style={{backgroundColor: COLORS.light, padding: 10, borderRadius: 20, justifyContent: 'center'}} onPress={handlePayment}>
                  <View style={designs.flexRow}>
                  <Text style={{color: COLORS.white, fontSize: 12, paddingHorizontal: 3}}>Pay now</Text>
                  <Icon name="chevron-forward-outline" size={12} style={{color: COLORS.white, marginLeft: 2, alignSelf: 'center'}}/>
                  </View>
                </TouchableOpacity>
                </View>
              </View>        
          </View>
          
            <View style={{flex:1, borderTopLeftRadius: 20,
    borderTopRightRadius: 20, backgroundColor: COLORS.white, paddingVertical: 13, paddingHorizontal: 16, marginTop: 19}}>
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

export default EmergencyLoanDashBoard;
