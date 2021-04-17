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
  Pressable,
  Dimensions,
  Alert
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchBanks } from '../../services/network';
import AsyncStorage from '@react-native-async-storage/async-storage';

let height= Dimensions.get('window').height;
const PostPaymentForm2 = ({navigation}) => {

  const [landLordFirstName, setLandLordFirstName] = useState('');
  const [landLordLastName, setLandLordLastName] = useState('');
  const [landLordPhoneNumber, setLandLordPhoneNumber] = useState('');
  //{"code": "801", "id": 4267941563, "name": "Abbey Mortgage Bank"}, {"code": "044", "id": 4267941564, "name": "Access Bank"}, {"code": "063", "id": 4267941565, "name": "Access Bank (Diamond)"}, {"code": "035A", "id": 4267941566, "name": "ALAT by WEMA"}, {"code": "401", "id": 4267941567, "name": "ASO Savings and Loans"}, {"code": "50931", "id": 4267941568, "name": "Bowen Microfinance Bank"}, {"code": "50823", "id": 4267941569, "name": "CEMCS Microfinance Bank"}, {"code": "023", "id": 4267941570, "name": "Citibank Nigeria"}, {"code": "559", "id": 4267941571, "name": "Coronation Merchant Bank"}
  const [banks, setBanks] = useState([{"code": "801", "id": 4267941563, "name": "Abbey Mortgage Bank"}]);
  
  const [landLordAccountNumber, setLandLordAccountNumber] = useState('');
  const [landLordAccountBank, setLandLordAccountBank] = useState('');
  const [pickerModalOpen, setPickerModalOpen] = useState(false)
  const [progress, setProgress] = useState(50);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  let controller;

  useEffect(()=> {
    async function fetchBanksForDropdown(){
      const banks = await fetchBanks();
      console.log(banks);
      if (banks.banks){
       setBanks(banks.banks);
      }
    };
    fetchBanksForDropdown()
    
  }, []);



  const isError = () => {
    if (
      (landLordFirstName.trim().length == 0 ||
      landLordLastName.trim().length == 0||
      landLordPhoneNumber.trim().length == 0||
      landLordAccountNumber.trim().length == 0||
      landLordAccountBank.trim().length == 0)) {
        return true;
    } else {
      return false;
    }
  };
 

  const handleNavigation =async () => {

    const data = {
      landLordFirstName: landLordFirstName,
      landLordLastName: landLordLastName,
      landLordPhoneNumber: landLordPhoneNumber,
      landLordAccountNumber: landLordAccountNumber,
      landLordAccountBank: landLordAccountBank,
    };


    // if (isError()) {
    //   return Alert.alert('Missing inputs', 'Please Fill out all fields', [
    //     {text: 'Close'},
    //   ]);
    // }

    const postPaymentFormData = await AsyncStorage.getItem('postPaymentForm');
    await AsyncStorage.setItem('postPaymentForm', JSON.stringify({...JSON.parse(postPaymentFormData), ...data}));

    console.log(postPaymentFormData);

    

    navigation.navigate('PostPaymentForm3');
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
            LandLord Details
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, lineHeight: 15, color: '#ADADAD', marginRight: 15}}>2 of 4</Text>
          <AnimatedCircularProgress
            size={25}
            width={5}
            fill={progress}
            rotation={0}
            tintColor= {COLORS.secondary}
            backgroundColor="#D6D6D6" />
  </View>
          
          </View>
          <TextInput
            style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
            placeholder="Full Name"
            placeholderTextColor= {COLORS.grey}
            value={landLordFirstName}
          onChangeText={(text) => setLandLordFirstName(text)}
          />
          <TextInput
            style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
            placeholder="Last Name"
            placeholderTextColor= {COLORS.grey}
            value={landLordLastName}
          onChangeText={(text) => setLandLordLastName(text)}
          />
          <TextInput
          style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
          placeholder="Phone Number "
          placeholderTextColor= {COLORS.grey}
          value={landLordPhoneNumber}
        onChangeText={(text) => setLandLordPhoneNumber(text)}
        />

      <TextInput
          style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
          placeholder="Account Number"
          placeholderTextColor= {COLORS.grey}
          value={landLordAccountNumber}
        onChangeText={(text) => setLandLordAccountNumber(text)}
        />
        {/* <TextInput
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
        /> */}
           <View style={{minHeight: 0,maxHeight:500}}>
                    
              <Pressable onPress={() => {
                    setPressed(!pressed);
                    setPickerModalVisible(!pickerModalVisible)
                    console.log('switched', pressed)
                  }} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: landLordAccountBank == ''? 25: 7, paddingBottom: 25, borderRadius: 10, backgroundColor: COLORS.white, marginBottom: 23,borderColor:COLORS.gray,borderWidth:0.2}}> 
                  <View style={{ padding: 0, justifyContent: 'center' }}>
                      <Text style={{color: COLORS.grey, fontSize: landLordAccountBank == ''? 16: 10, lineHeight: landLordAccountBank == ''? 30: 10, marginBottom: landLordAccountBank == ''? 0: 3}}>Bank</Text>
                      
                      {landLordAccountBank !== '' && <Text style={[FONTS.body1FontStyling, {marginBottom: 'auto'}]}>{landLordAccountBank}</Text>}
        
                  </View>
                  <View style={{height: '100%', paddingTop: landLordAccountBank == ''? 0: 12 }}><IconFA name = {pressed? 'angle-up': 'angle-down'} size={30} color={COLORS.grey}/></View>
              </Pressable>

                <View style={{maxHeight:height}}>
                    <Modal visible={pickerModalVisible} animationType="slide"  transparent={true} onRequestClose ={()=>{setPickerModalVisible(!pickerModalVisible);
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
                                  <View style={{height:height-300}}>
                                    <ScrollView>
                                      { banks.map((value, index) => {
                                        return <TouchableOpacity key={index} onPress={() => {setLandLordAccountBank(value.name); setPickerModalVisible(false); setPressed(!pressed)}} style={{height:40}}> 
                                                    <Text   style={FONTS.body1FontStyling}>{ value.name }</Text>
                                                </TouchableOpacity>    
                                                
                                            
                                      })}
                                    </ScrollView>
                                  </View>
                              </View>
                          </View>
                      </Modal>
                </View>  
            </View>
         
          </View>
         
          
          <TouchableOpacity
            onPress={handleNavigation}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>NEXT</Text>
          </TouchableOpacity>
        </View>

        
   </ScrollView>
  );
};

export default PostPaymentForm2;
