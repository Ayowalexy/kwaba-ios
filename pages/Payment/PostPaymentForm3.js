import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [progress, setProgress] = useState(25);
  let controller;
 

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
  backgroundColor="#D6D6D6" />
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
                    onChangeItem={item => setRefereeRelationship(item)}
                    onOpen={() => setPickerModalOpen(true)}
                />
            </View>
         
          </View>
         
          
          <TouchableOpacity
            onPress={() => navigation.navigate('PostPaymentForm4')}
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
