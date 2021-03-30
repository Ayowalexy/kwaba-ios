import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Pressable,
  FlatList
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AddCardModal from '../../components/addCardModal';
import { fetchBanks } from '../../services/network';
import {Picker} from '@react-native-picker/picker';


const CardAndBankDetails = ({navigation}) => {

  
  const [modalVisible, setVisible] = useState(false);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [cards, setCards] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [banks, setBanks] = useState([]);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addCardModal, setAddCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [addAccountModal, setAddAccountModal] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('');
  const [loanPurposeOptions] = useState([
    {label: 'Household', value: 'Household'},
    {label: 'Personal', value: 'Personal'},
])

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

useEffect(()=> {
  const getCards = async () => {
    const cards = await AsyncStorage.getItem('paymentCardDetails');
    if (cards) {
      setCards(JSON.parse(cards));
    }
  };
  getCards();
  
}, []);

useEffect(()=> {
  const getAccounts = async () => {
    const accountDetails = await AsyncStorage.getItem('accountDetails');
    if (accountDetails) {
      setBankDetails(JSON.parse(accountDetails));
    }
  };
  getAccounts();
  
}, []);

const addCard = () => {
  console.log('start')
  const cardDetails = {cardNumber: cardNumber, cvv: cvv, expiryDate: expiryDate};
  console.log('cardDetails', cardDetails)
  setCards([...cards, cardDetails]);
  console.log(cards);
  setAddCardModal(false);
  saveCardsToStorage(cards)
};

const addAccount = () => {
  console.log('start')
  const accountDetails = {accountNumber: accountNumber, bank: bank};
  console.log('accountDetails', accountDetails)
  setBankDetails([...bankDetails, accountDetails]);
  console.log(bankDetails);
  saveAccountsToStorage(bankDetails)
  // setAddCardModal(false);
};

const saveCardsToStorage = async (data) => {
  try {
    await AsyncStorage.setItem('paymentCardDetails', JSON.stringify(data));
  } catch (error) {}
};

const saveAccountsToStorage = async (data) => {
  try {
    await AsyncStorage.setItem('accountDetails', JSON.stringify(data));
  } catch (error) {}
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
          }}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: 24
              },
            ]}>
            Card and Bank
          </Text>
        </View>
        <View>
            <View>
                <Text>Payment card</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Icon name='add' style={{alignSelf: 'center'}} onPress = {()=> setAddCardModal(true)} size={20} />
                  <ScrollView scrollEnabled horizontal>
                    {
                      cards?.map((value, index) => {
                        return <View key={index}><Text style={{fontSize: 16, color: 'black', marginRight: 5}}>{value.cardNumber}</Text></View>
                            
                  
                      })
                    }

                  </ScrollView>

                </View>
                <View>
                <Text>Bank</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Icon name='add' style={{alignSelf: 'center'}}/>
                  <ScrollView scrollEnabled horizontal>
                    {
                      bankDetails?.map((value, index) => {
                        return <View key={index}><Text style={{fontSize: 16, color: 'black', marginRight: 5}}>{value.accountNumber}</Text></View>
                            
                  
                      })
                    }
                    

                  </ScrollView>

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
              style={{flex: 1, color: bank == 0? COLORS.grey: COLORS.dark}}
              selectedValue={bank}
              onValueChange={(itemValue, itemIndex) =>
                setBank(itemValue)
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
          <TouchableOpacity style={designs.iconBtn}>
              <Icon name="add" size={20} color="#BFBFBF" onPress={addAccount}/>
            </TouchableOpacity>
          
                
            </View>

        </View>
        </View>
        <AddCardModal
                    onConfirm={addCard}
        onRequestClose={() => setAddCardModal(!addCardModal)}
        visible={addCardModal} 
        cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
          cvv={cvv}
          setCVV={setCvv}
        />   
        


   </ScrollView>
  );
};

export default CardAndBankDetails;
