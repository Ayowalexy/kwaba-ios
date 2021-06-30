import React, {useState,useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';


const AwaitingDisbursement = ({navigation, route}) => {

  const response = route.params;

  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [existingApplication, setExistingApplication] = useState('');

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  useEffect(()=>{

    const getApplicationData =async ()=> {
    
      const token = await getToken();

      
      try{
      
          const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
              headers: {'Content-Type': 'application/json', Authorization: token},
            });
           // console.log(applicationIDCallRes.data.data.id);

             const applicationId = applicationIDCallRes.data.data.id;
      
            setExistingApplication(applicationId);
            console.log('here', applicationIDCallRes.data.data.approvedamount );
            //setmonthlyRepayment(applicationIDCallRes.data.data.approvedrepayment);
            const approved_repayment_plan=applicationIDCallRes.data.data.approved_repayment_plan;
            const repayment_start_date=applicationIDCallRes.data.data.remita_repayment_date;
            const repayment_end_date=moment(repayment_start_date).add(Number(approved_repayment_plan)-1,'months').format("YYYY-MM-DD");
            // setStartDate(repayment_start_date);
            // setEndDate(repayment_end_date);

            console.log('here2', monthlyRepayment);

            console.log('repayment_start_date', repayment_start_date);
            console.log('repayment_end_date', repayment_end_date);

            if(applicationId==7){
              navigation.navigate('RentalLoanActiveDashBoard');
            }
    
      }
      catch(error) {
        console.log(error.response.data)
      }

  

      
    };

    getApplicationData();


  })

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
        size={25}
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
