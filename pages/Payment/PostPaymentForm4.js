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
  Alert,
  Dimensions
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchBanks } from '../../services/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OkraView from 'react-native-okra';

let height= Dimensions.get('window').height;
const PostPaymentForm4 = ({navigation}) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Email, setEmail] = useState('');
  const [banks, setBanks] = useState([]);
  const [landLordAccountBank, setLandLordAccountBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [refereeCity, setRefereeCity] = useState('');
  const [refereeState, setRefereeState] = useState('');
  const [refereeCountry, setRefereeCountry] = useState('');
  const [relationships] = useState([
    {label: 'Cousin', value: 'Cousin'},
    {label: 'Brother', value: 'brother'},
])
  const [refereeRelationship, setRefereeRelationship] = useState(null);
  const [pickerModalOpen, setPickerModalOpen] = useState(false)
  const [progress, setProgress] = useState(100);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [phoneNumber, setLastName] = useState('');
  
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

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log(userData);
      if (userData) {
        setFirstName(JSON.parse(userData).user.firstname);
        setLastName(JSON.parse(userData).user.lastname);
        setPhoneNumber(JSON.parse(userData).user.telephone);
      }
    };
    getUserData();
  }, []);
 

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
            Direct Debit Mandate
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12, lineHeight: 15, color: '#ADADAD', marginRight: 15}}>4 of 4</Text>
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
            placeholder="First Name"
            placeholderTextColor= {COLORS.grey}
            value={firstName}
             onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
            placeholder="Last Name"
            placeholderTextColor= {COLORS.grey}
            value={lastName}
          onChangeText={(text) => setLastName(text)}
          />
          <TextInput
          style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
          placeholder="Phone Number"
          placeholderTextColor= {COLORS.grey}
          value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        />

        {/* <Text
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
            Direct Debit Mandate
          </Text>
        <TextInput
        style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
        placeholder="Account Number"
        placeholderTextColor= {COLORS.grey}
        value={accountNumber}
      onChangeText={(text) => setAccountNumber(text)}
      /> */}
  
      {/* <View style={{minHeight: 0}}>
        <DropDownPicker
                    items={banks}
                    defaultNull
                    placeholder="Bank"
                    placeholderStyle={{color: COLORS.grey, fontSize: 16, lineHeight: 30}}
                    style={designs.dropDownPicker}
                    controller={instance => controller = instance}
                    dropDownStyle={{height: 0, borderWidth: 0}}
                    dropDownMaxHeight={0}
                    arrowStyle={{marginRight: 10, size: 15}}
                    onChangeItem={item => setBanks(item)}
                    onOpen={() => setPickerModalOpen(true)}
                />
            </View> */}
            {/* <View style={{minHeight: 0,maxHeight:500}}>
                    
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
                  </View> */}
         
          </View>

      
          <TouchableOpacity
            onPress={() => navigation.navigate('OkraDebitMandate2')}
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
                
            {banks.map((bank, index) => {
            return (
                
                <TouchableOpacity key={index} onPress={()=> {controller.selectItem(bank.name);
                    controller.close();
                    setPickerModalOpen(false)}} style={{marginBottom: 22, marginLeft: 10}}>
                <Text style={[designs.buttonText, {fontSize: 16, lineHeight: 20, fontWeight: 'normal'}]}>{bank.name}</Text>
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

export default PostPaymentForm4;
