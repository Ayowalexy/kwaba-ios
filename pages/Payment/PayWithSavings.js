import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {Picker} from '@react-native-picker/picker';
import { fetchBanks } from '../../services/network';




export default function PayWithSavings({navigation}) {
    const [modalVisible, setVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState(0);
    const [accountNumber, setAccountNumber] =useState('');
    const [successModal, setSuccessModal] = useState(false);
    const values = ['Who do you pay your rent to?', 'Landlord', 'Agent'];

    useEffect(()=> {
      async function fetchBanksForDropdown(){
        const banks = await fetchBanks();
        console.log(banks);
        if (banks.banks){
          setBanks(banks.banks);
        }
        // 
      };
      fetchBanksForDropdown()
      
    }, []);
    
    // const banks = [...fetchBanks()];
    
    
    return (
        <View style={[designs.container, {backgroundColor: '#F7F8FD', paddingTop: 28, paddingHorizontal: 16}]}>
            <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{marginLeft: 9, fontWeight: '900', marginBottom: 33}}
        color= {COLORS.primary}
      />
      <View>
          <Text style={{fontSize: 18, lineHeight: 23, marginBottom: 24, color: COLORS.primary, fontWeight: 'bold'}}> Enter the account details of who will receive your rent</Text>
          <View style={designs.customInput}>
            <Picker
              mode="dropdown"
              dropdownIconColor="white"
              accessibilityLabel="Who do you pay your rent to?"
              style={{flex: 1, color: selectedValue == 0? COLORS.grey: COLORS.dark}}
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
                  {values
            .filter((value, index) => selectedValue === 0 ? value : index === 0 ? false : value)
            .map((value, index) => (
              <Picker.Item label={value} value={value} key={index} />
            ))}
            </Picker>
            <TouchableOpacity style={designs.iconBtn}>
              <Icon name="chevron-down-outline" size={20} color="#BFBFBF" />
            </TouchableOpacity>
          </View>
          </View>
          <View>
          <Text style={{fontSize: 18, lineHeight: 23, marginTop: 27, color: COLORS.primary, marginBottom: 16, fontWeight: 'bold'}}>Account details</Text>
          <TextInput
              style={[designs.textField, {marginBottom: 0, textAlign: 'left'}]}
              placeholder="Account Number"
              placeholderTextColor= {COLORS.grey}
              value={accountNumber}
            onChangeText={(text) => setAccountNumber(text)}/>
          </View>
          <View style={{marginTop: 16}}>
          <View style={designs.customInput}>
            <Picker
              mode="dropdown"
              dropdownIconColor="white"
              accessibilityLabel="Bank"
              style={{flex: 1, color: selectedBank == 0? COLORS.grey: COLORS.dark}}
              selectedValue={selectedBank}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedBank(itemValue)
              }>
                {banks.map((value, index) => (
              <Picker.Item label={value.name} value={value.name} key={index} />
            ))}
                  {/* {banks
            .filter((value, index) => selectedBank === 0 ? value : index === 0 ? false : value)
            .map((value, index) => (
              <Picker.Item label={value} value={value} key={index} />
            ))} */}
            </Picker>
            <TouchableOpacity style={designs.iconBtn}>
              <Icon name="chevron-down-outline" size={20} color="#BFBFBF" />
            </TouchableOpacity>
          </View>
          </View>
          <View style={{flex:1, justifyContent: 'flex-end'}}>
          <TouchableOpacity style={[designs.buttonStyleB, {backgroundColor: COLORS.primary}]} onPress={() => setVisible(true)}><Text style={{color: COLORS.white}}>NEXT</Text></TouchableOpacity>
          </View>      
          <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose ={()=>{}}>
                <View style={designs.modalWrapper}>
                    <View style={designs.modalView}>
                        <View style={designs.modalHeader}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{marginLeft: 0, marginRight: 24, fontWeight: '900', marginBottom: 0}}
        color= {COLORS.primary}
      />
      <Text style={{flex: 1, fontFamily: 'Poppins-Bold', fontSize: 15, lineHeight: 23, color: COLORS.primary, fontWeight: 'bold'}}>Confirm Account</Text>
      <Icon
              onPress={() => setVisible(!modalVisible)}
              style={{alignSelf: 'flex-end'}}
              name="close-outline"
              size={30}
              color="#465969"
            />
        
                        </View>
                        <View style={designs.modalInnerView}>
                            <Text style={designs.modalSmallTitle}>Account Number</Text>
                            <Text style={designs.modalSmallTitle}>Bank Name:</Text>
                        </View>
                        <View style={designs.modalInnerView}>
                            <Text style={designs.modalInnerValues}>2134545678</Text>
                            <Text style={designs.modalInnerValues}>Guaranty Trust Bank</Text>
                        </View>
                        <View style={designs.modalInnerView}>
                            <Text style={designs.modalSmallTitle}>Account Name:</Text>
                            <Text style={designs.modalSmallTitle}>Amount</Text>
                        </View>
                        <View style={designs.modalInnerView}>
                            <Text style={designs.modalInnerValues}>Jame Awolabi</Text>
                            <Text style={designs.modalInnerValues}>₦1,980,000.00</Text>
                        </View>
                        <TouchableOpacity style={[designs.buttonStyleB, {backgroundColor: COLORS.primary, width: '100%', marginTop: 30, marginBottom: 2}]} onPress={() => {setSuccessModal(true);
          setVisible(false);}}><Text style={{color: COLORS.white}}>PAY</Text></TouchableOpacity>
                        <TouchableOpacity style={[designs.buttonStyleB, {backgroundColor: 'transparent', width: '100%', marginBottom: 11}]} onPress={() => {}}><Text style={{color: COLORS.grey}}>CANCEL</Text></TouchableOpacity>
                    </View>
                    
                </View>
          </Modal>
          <Modal visible={successModal} animationType="fade" transparent={true}>
        <View style={designs.centeredModalWrapper}>
          <View style={designs.successModal}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#465969"
            />
            <Image source={icons.tick} />
            <Text style={[FONTS.h1FontStyling, {color: COLORS.primary, fontWeight: 'bold', marginTop: 10}]}>
              Congratulations
            </Text>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 14,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 15,
              }}>
              Your rent has been paid
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSuccessModal(false);
                navigation.navigate('RentalLoanActiveDashBoard');
              }}
              style={[designs.buttonStyleB, {marginTop: 20, width: '100%'}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                }}>
                AWESOME
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        </View>
    );
}
