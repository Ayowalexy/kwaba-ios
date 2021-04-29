import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';


const AwaitingDisbursement = ({navigation, route}) => {

  const response = route.params;

  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');

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
                marginBottom: 134
              },
            ]}>
            Rental Loan
          </Text>
          {/* <Image source={images.group3693} style={designs.uploadDocumentImage}/> */}
          <Image source={images.group3693} style={{height:190,width:190,alignSelf:'center'}}/> 
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
            Awaiting disbursement
          </Text>
          <Text style={[FONTS.body2FontStyling, {color: '#ADADAD', textAlign: 'center', marginBottom: 26}]}>We are just dotting the i's and crossing the t's. Your rent will be paid within the next 24 hours.</Text>
         
          
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('AllDocuments', response)}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>UPLOAD DOCUMENTS</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() => {navigation.navigate('Borrow')}}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>Check Status</Text>
          </TouchableOpacity> */}
        </View>
        
   </View>
  );
};

export default AwaitingDisbursement;
