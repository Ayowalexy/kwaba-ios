import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Alert
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logCurrentStorage } from '../../util/logCurrentStorage';
import axios from 'axios';


const PostPaymentForm3 = ({navigation}) => {

  const [refereeFirstName, setRefereeFirstName] = useState('');
  const [refereeLastName, setRefereeLastName] = useState('');
  const [refereePhoneNumber, setRefereePhoneNumber] = useState('');
  const [refereeEmail, setRefereeEmail] = useState('');
  const [refereeStreet, setRefereeStreet] = useState('');
  const [refereeCity, setRefereeCity] = useState('');
  const [refereeState, setRefereeState] = useState('');
  const [refereeCountry, setRefereeCountry] = useState('');
  const [relationships] = useState([
    {label: 'Cousin', value: 'Cousin'},
    {label: 'Brother', value: 'brother'},
])
  const [refereeRelationship, setRefereeRelationship] = useState(null);
  const [pickerModalOpen, setPickerModalOpen] = useState(false)
  const [progress, setProgress] = useState(75);
  let controller;


  const dummyData =
  {
    landlord_firstname: "Adams",
    landlord_lastname: "Eve",
    landlord_telephone: "07034969842",
    landlord_address: "23B Njoku Ekpor Street, Ketu, Lagos",
    landlord_accountnumber: "0045682546",
    landlord_bankname: "Ecobank",
    next_rent_address: "24 Daniel Makinde Street, Ketu, Lagos",
    next_rent_property_type: "House",
    next_rent_property_no_of_bedrooms: "3",
    next_rent_paid_to: "LandLord"
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };


  const isError = () => {
    if ( (refereeStreet.trim().length == 0 ||
    refereeCity.trim().length == 0||
    refereeState.trim().length == 0||
    refereeCountry.trim().length == 0||
    refereeEmail.trim().length == 0||
    refereeRelationship.trim().length == 0||
    refereeFirstName.trim().length == 0||
    refereeLastName.trim().length == 0||
    refereePhoneNumber.trim().length == 0)
     ) {
        return true;
    } else {
      return false;
    }
  };

  const handleNavigation = async() => {

    // const data = {
    //   refereeFirstName: refereeFirstName,
    //   refereeLastName: refereeLastName,
    //   refereePhoneNumber: refereePhoneNumber,
    //   refereeEmail: refereeEmail,
    //   refereeStreet: refereeStreet,
    //   refereeCity: refereeCity,
    //   refereeState: refereeState,
    //   refereeCountry: refereeCountry,
    // };


    if (isError()) {
      return Alert.alert('Missing inputs', 'Please Fill out all fields', [
        {text: 'Close'},
      ]);
    }

    const postPaymentFormData = await AsyncStorage.getItem('postPaymentForm');
    const data=JSON.parse(postPaymentFormData);
    const url = 'http://67.207.86.39:8000/api/v1/application/update/landlord_and_property';
    const refreeUrl = 'http://67.207.86.39:8000/api/v1/application/update/referee';

    const token = await getToken();
    console.log(dummyData);
    console.log(token);
    // console.log({...dummyData,...JSON.parse(postPaymentFormData),...data});
    
    const refreedata={
      referee_address: refereeStreet+" "+refereeCity+" "+refereeState+" "+refereeCountry,
      referee_email: refereeEmail,
      referee_relationship: refereeRelationship,
      referee_firstname: refereeFirstName,
      referee_lastname: refereeLastName,
      referee_telephone: refereePhoneNumber
    };

   

    const landlordAndPropertyData={
      landlord_firstname: data.landLordFirstName,
      landlord_lastname: data.landLordLastName,
      landlord_telephone: data.landLordPhoneNumber,
      landlord_address:data.propertyState,
      landlord_accountnumber: data.landLordAccountNumber,
      landlord_bankname: data.landLordAccountBank,
      next_rent_address: data.propertyStreet+" "+data.propertyState+" "+data.propertyCountry,
      next_rent_property_type: data.typeOfProperty,
      next_rent_property_no_of_bedrooms:data.numberOfBedrooms,
      next_rent_paid_to: "LandLord"
    };
    

  


   
    
    
    try {
    

      const response2 = await axios.put(refreeUrl,JSON.stringify(refreedata)  , {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      
      console.log(refreedata);

      const response = await axios.put(url, JSON.stringify(landlordAndPropertyData) , {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });


      console.log(landlordAndPropertyData);

      //console.log(response);

       //navigation.navigate('PostPaymentForm4');

       let stepsdata={
        documentdone:'done',
        propertydetail:'done',
        landlorddetail:'done',
        refree:'done',
        offeraccepted:'',
        addressverification:'',
        debitmandate:'',
        awaitingdisbursment:'',
      };
    
      await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));

      // if( response2.status==200){
          
      // }   
      navigation.navigate('RentalLoanOfferTest');

       //navigation.navigate('LoanOfferContent');

      } catch (error) {
        //console.log(error.response.data);
        Alert.alert('Message', error.response.data.statusMsg, [
          {text: 'Close'},
        ]);
      }

   

  };


  // useEffect(()=>{

  //   const logData=async()=>{
  //     const postPaymentFormData = await AsyncStorage.getItem('postPaymentForm');
  //     console.log(JSON.stringify(postPaymentFormData))
  //   }
  
  //  logData();
  // })


  return (

    <ScrollView style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
        
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
            Referee
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, lineHeight: 15, color: '#ADADAD', marginRight: 15}}>3 of 4</Text>
          <AnimatedCircularProgress
            size={25}
            width={5}
            fill={progress}
            rotation={0}
            tintColor= {COLORS.secondary}
            backgroundColor="#D6D6D6" 
          />
       </View>
          
          </View>
          <TextInput
            style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
            placeholder="First Name"
            placeholderTextColor= {COLORS.grey}
            value={refereeFirstName}
          onChangeText={(text) => setRefereeFirstName(text)}
          />
          <TextInput
            style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
            placeholder="Last Name"
            placeholderTextColor= {COLORS.grey}
            value={refereeLastName}
          onChangeText={(text) => setRefereeLastName(text)}
          />
          <TextInput
          style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
          placeholder="Phone Number"
          placeholderTextColor= {COLORS.grey}
          value={refereePhoneNumber}
        onChangeText={(text) => setRefereePhoneNumber(text)}
        />
        <TextInput
        style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
        placeholder="Email"
        placeholderTextColor= {COLORS.grey}
        value={refereeEmail}
        onChangeText={(text) => setRefereeEmail(text)}
       />

      <Text
            style={[
              FONTS.h3FontStyling,
              {
                color: COLORS.primary,
                textAlign: 'left',
                fontWeight: 'bold',
                marginTop: 20, 
                marginBottom: 15
              },
            ]}>
            Office Address
          </Text>

          <TextInput
            style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
            placeholder="Street"
            placeholderTextColor= {COLORS.grey}
            value={refereeStreet}
          onChangeText={(text) => setRefereeStreet(text)}
          />
          <TextInput
            style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
            placeholder="City"
            placeholderTextColor= {COLORS.grey}
            value={refereeCity}
          onChangeText={(text) => setRefereeCity(text)}
          />
          <TextInput
          style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
          placeholder="State"
          placeholderTextColor= {COLORS.grey}
          value={refereeState}
        onChangeText={(text) => setRefereeState(text)}
        />
        <TextInput
          style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
          placeholder="Country"
          placeholderTextColor= {COLORS.grey}
          value={refereeCountry}
        onChangeText={(text) => setRefereeCountry(text)}
        />
        <View style={{minHeight: 0}}>
        <DropDownPicker
                    items={relationships}
                    defaultNull
                    placeholder="Relationship"
                    placeholderStyle={{color: COLORS.grey, fontSize: 16, lineHeight: 30}}
                    style={designs.dropDownPicker}
                    controller={instance => controller = instance}
                    dropDownStyle={{height: 0, borderWidth: 0}}
                    dropDownMaxHeight={0}
                    arrowStyle={{marginRight: 10, size: 15}}
                    onChangeItem={item => setRefereeRelationship(item.value)}
                    onOpen={() => setPickerModalOpen(true)}
                />
            </View>
         
          </View>
         
          
          <TouchableOpacity
            onPress={()=>{handleNavigation()}}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>NEXT</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={pickerModalOpen} animationType="fade" transparent={true} onRequestClose ={()=>{}}>
            <View style={designs.modalWrapper}>
            <View style={designs.modalView}> 
            <View style={[designs.modalHeader, {marginBottom: 11}]}>
            <Icon
              onPress={() => {controller.close();
                setPickerModalOpen(false)}}
              style={{marginLeft: 'auto'}}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            </View>
            <View>
                <Text style={designs.modalTitleText}>Relationship with your Referee</Text>
                <Text style={[designs.modalBodyText, {marginLeft: 10}]}>Search</Text>
            <View>
                
            {relationships.map((relationship, index) => {
            return (
                
                <TouchableOpacity key={index} onPress={()=> {controller.selectItem(relationship.value);
                    controller.close();
                    setPickerModalOpen(false)}} style={{marginBottom: 22, marginLeft: 10}}>
                <Text style={[designs.buttonText, {fontSize: 16, lineHeight: 20, fontWeight: 'normal'}]}>{relationship.label}</Text>
              </TouchableOpacity>
            )
              
        })}
        </View>
                </View>
            </View>

            </View>
            
        </Modal>
        
   </ScrollView>
  );
};

export default PostPaymentForm3;
