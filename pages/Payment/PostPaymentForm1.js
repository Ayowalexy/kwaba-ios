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
  Alert
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import IconFA from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostPaymentForm1 = ({navigation}) => {

  const [propertyStreet, setPropertyStreet] = useState('');
  const [propertyCity, setPropertyCity] = useState('');
  const [propertyState, setPropertyState] = useState('');
  const [propertyCountry, setPropertyCountry] = useState('');
const [typeOfProperty, setTypeOfProperty] = useState('');
const [typeOfPropertyOptions, setTypeOfPropertyOptions] = useState([
  {label: 'Duplex', value: 'Duplex'},
  {label: 'Semi-detached', value: 'Semi-detached'},
]);
const [numberOfBedrooms, setNumberOfBedrooms]=useState('');
const [numberOfBedroomsOptions, setNumberOfBedroomsOptions] = useState([{label: '2', value: '2'},
{label: '3', value: '3'}, {label: '4', value: '4'}])
  const [pickerModalOpen, setPickerModalOpen] = useState(false)
  const [picker2ModalOpen, setPicker2ModalOpen] = useState(false)
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [progress, setProgress] = useState(25);
  const [pressed, setPressed] = useState(false);
  
  let controller;

  const isError = () => {
    if (
      (propertyStreet.trim().length == 0 ||
      propertyCity.trim().length == 0||
      propertyState.trim().length == 0||
      propertyCountry.trim().length == 0||
      typeOfProperty.trim().length == 0||
      numberOfBedrooms.trim().length == 0)) {
        return true;
    } else {
      return false;
    }
  };

 

  const handleNavigation = async() => {

    if (isError()) {
      return Alert.alert('Missing inputs', 'Please Fill out all fields', [
        {text: 'Close'},
      ]);
    }
    const data = {
      propertyStreet: propertyStreet,
      propertyCity: propertyCity,
      propertyState: propertyState,
      propertyCountry: propertyCountry,
      typeOfProperty: typeOfProperty,
      numberOfBedrooms: numberOfBedrooms
    };
    
      if(isError()==false){
        const postPaymentFormData = await AsyncStorage.getItem('postPaymentForm');
        await AsyncStorage.setItem('postPaymentForm', JSON.stringify({...JSON.parse(postPaymentFormData), ...data}));
        let stepsdata={
          documentdone:'done',
          propertydetail:'done',
          landlorddetail:'',
          refree:'',
          offeraccepted:'',
          addressverification:'',
          debitmandate:'',
          awaitingdisbursment:'',
        };
      
        await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));
        navigation.navigate('PostPaymentForm2');
      }else{
        Alert.alert('Missing inputs', 'Please Fill out all fields', [
          {text: 'Close'},
        ]);
      }


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
            Property details
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, lineHeight: 15, color: '#ADADAD', marginRight: 15}}>1 of 4</Text>
          <AnimatedCircularProgress
            size={25}
            width={5}
            fill={progress}
            rotation={0}
            tintColor= {COLORS.secondary}
            backgroundColor="#D6D6D6" />
        </View>
          
          </View>

         <Text
            style={[
              FONTS.h3FontStyling,
              {
                color: COLORS.primary,
                textAlign: 'left',
                fontWeight: 'bold',
                marginTop: 20, 
                marginLeft: 10,
                marginBottom: 15
              },
            ]}>
            Address of property to be paid for
          </Text>

          <TextInput
            style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
            placeholder="Street"
            placeholderTextColor= {COLORS.grey}
            value={propertyStreet}
          onChangeText={(text) => setPropertyStreet(text)}
          />
          <TextInput
            style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
            placeholder="City"
            placeholderTextColor= {COLORS.grey}
            value={propertyCity}
          onChangeText={(text) => setPropertyCity(text)}
          />
          <TextInput
          style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
          placeholder="State"
          placeholderTextColor= {COLORS.grey}
          value={propertyState}
        onChangeText={(text) => setPropertyState(text)}
        />
        <TextInput
          style={[designs.textField, {marginBottom: 15, textAlign: 'left'}]}
          placeholder="Country"
          placeholderTextColor= {COLORS.grey}
          value={propertyCountry}
        onChangeText={(text) => setPropertyCountry(text)}
        />
        <View style={{minHeight: 0, marginBottom: 14}}>



              <Pressable onPress={() => {
                    setPressed(!pressed);
                    setPickerModalVisible(!pickerModalVisible)
                    console.log('switched', pressed)
                  }} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: typeOfProperty == ''? 25: 7, paddingBottom: 25, borderRadius: 10, backgroundColor: COLORS.white, marginBottom: 23,borderColor:COLORS.gray,borderWidth:0.2}}> 
                  <View style={{ padding: 0, justifyContent: 'center' }}>
                      <Text style={{color: COLORS.grey, fontSize: typeOfProperty == ''? 16: 10, lineHeight: typeOfProperty == ''? 30: 10, marginBottom: typeOfProperty == ''? 0: 3}}>Type of property</Text>
                      
                      {typeOfProperty !== '' && <Text style={[FONTS.body1FontStyling, {marginBottom: 'auto'}]}>{typeOfProperty}</Text>}
        
                  </View>
                  <View style={{height: '100%', paddingTop: typeOfProperty == ''? 0: 12 }}><IconFA name = {pressed? 'angle-up': 'angle-down'} size={30} color={COLORS.grey}/></View>
              </Pressable>


                  <Modal visible={pickerModalVisible} animationType="fade" transparent={true} onRequestClose ={()=>{setPickerModalVisible(!pickerModalVisible);
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
                                <View>

                                    { typeOfPropertyOptions.map((value, index) => {
                                      return <TouchableOpacity key={index} onPress={() => {setTypeOfProperty(value.value); setPickerModalVisible(false); setPressed(!pressed)}}>
                                          <Text style={FONTS.body1FontStyling}>{ value.label }</Text>
                                        </TouchableOpacity>
                                    })}
                                    
                                </View>
                            </View>
                        </View>
                    </Modal>
                
            </View>

            <View style={{minHeight: 0}}>
                <DropDownPicker
                    items={numberOfBedroomsOptions}
                    defaultNull
                    placeholder="Number of Bedrooms"
                    placeholderStyle={{color: COLORS.grey, fontSize: 16, lineHeight: 30}}
                    style={designs.dropDownPicker}
                    controller={instance => controller = instance}
                    dropDownStyle={{height: 0, borderWidth: 0}}
                    dropDownMaxHeight={0}
                    arrowStyle={{marginRight: 10, size: 15}}
                    onChangeItem={item => setNumberOfBedrooms(item.value)}
                    onOpen={() => setPicker2ModalOpen(true)}
                />
            </View>
         
          </View>
         
          
          <TouchableOpacity
            onPress={()=>{handleNavigation()}}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>NEXT</Text>
          </TouchableOpacity>
        </View>

        
        <Modal visible={picker2ModalOpen} animationType="fade" transparent={true} onRequestClose ={()=>{}}>
            <View style={designs.modalWrapper}>
            <View style={designs.modalView}> 
            <View style={[designs.modalHeader, {marginBottom: 11}]}>
            <Icon
              onPress={() => {controller.close();
                setPicker2ModalOpen(false)}}
              style={{marginLeft: 'auto'}}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            </View>
            <View>
                <Text style={designs.modalTitleText}>Number of Bedrooms</Text>
               
            <View>
                
            {numberOfBedroomsOptions.map((bedroomNumber, index) => {
            return (
                
                <TouchableOpacity key={index} onPress={()=> {controller.selectItem(bedroomNumber.value);
                  console.log(bedroomNumber.value)
                    controller.close();
                    setPicker2ModalOpen(false)}} style={{marginBottom: 22, marginLeft: 10}}>
                <Text style={[designs.buttonText, {fontSize: 16, lineHeight: 20, fontWeight: 'normal'}]}>{bedroomNumber.label}</Text>
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

export default PostPaymentForm1;
