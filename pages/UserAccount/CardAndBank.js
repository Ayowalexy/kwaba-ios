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
<<<<<<< HEAD
  FlatList,
  Animated
=======
  FlatList
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
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

<<<<<<< HEAD
const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
const boxWidth = scrollViewWidth * 0.7;
const boxDistance = scrollViewWidth - boxWidth;
const halfBoxDistance = boxDistance / 2;
const pan = React.useRef(new Animated.ValueXY()).current;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    cardnumber: '1234 3245 1234 5678',
    default: 'true',
    expires: '12/2022',
    type: 'mastercard',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    cardnumber: '1234 3245 1234 5678',
    default: '',
    expires: '12/2022',
    type: 'visa',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    cardnumber: '1234 3245 1234 5678',
    default: '',
    expires: '12/2022',
    type: 'visa',
  },
  
  
  
];

=======
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
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

<<<<<<< HEAD
const renderItem = ({ item, index }) => (
  <Animated.View
    style={{
      transform: [
        {
          scale: pan.x.interpolate({
            inputRange: [
              (index - 1) * boxWidth - halfBoxDistance,
              index * boxWidth - halfBoxDistance,
              (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
            ],
            outputRange: [0.8, 1, 0.8], // scale down when out of scope
            extrapolate: 'clamp',
          }),
        },
      ],
    }}>
    <View
      style={
        {
          flex:1,
          flexDirection:'column',
          height: '100%',
          width: boxWidth,
          borderRadius: 24,
          backgroundColor: '#fff',
          marginLeft:10
        }
      }>
      <Text style={{marginLeft:10,marginTop:20}}>{item.cardnumber}</Text>
      {/* {item.default=='true'?
        <>
         <Text style={{backgroundColor:COLORS.light,width:90,textAlign:'center', marginLeft:10,color:COLORS.primary,borderRadius:20}}>DEFAULT</Text>
        </>
      :
      ''
      } */}
      <Text style={{backgroundColor:COLORS.light,width:90,textAlign:'center', marginLeft:10,color:COLORS.primary,borderRadius:20}}>{item.default?'DEFAULT':''}</Text>
      <Image source={item.type=='mastercard'?images.mastercarddesign:images.visacarddesign} resizeMode='contain' style={{height:200,width:150,alignSelf:'flex-end', marginTop:-40}} />

    </View>
  </Animated.View>
);


  return (
    <ScrollView style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
        <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={35}
            style={{marginTop: 28, marginLeft: 16, fontWeight: '900'}}
            color="#2A286A"
          />

=======

  return (
    <ScrollView style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={20}
        style={{marginTop: 28, marginLeft: 25, fontWeight: '900'}}
        color= {COLORS.primary}
      />
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
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
<<<<<<< HEAD
                marginBottom: 10
=======
                marginBottom: 24
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
              },
            ]}>
            Card and Bank
          </Text>
        </View>
<<<<<<< HEAD


        <View>
            <View style={{flexDirection:'column',marginLeft:16}}>
                <View>
                  <Text style={[FONTS.h2FontStyling,{color: COLORS.primary,fontWeight: 'bold',marginBottom: 24,marginLeft:54}]}>Payment Card</Text>
                 </View> 
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                   <TouchableOpacity onPress = {()=> setAddCardModal(true)}   style={{height:45,width:45,borderRadius:25,backgroundColor:COLORS.secondary,marginLeft:54}}>
                       <Icon name='add'  size={35} color={COLORS.white}  style={{alignSelf: 'center',marginTop:2}}/>
                   </TouchableOpacity>
                   <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal
                    //data={loremWords}
                    style={{  height: 250,marginLeft:44 }}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    contentInsetAdjustmentBehavior="never"
                    snapToAlignment="center"
                    decelerationRate="fast"
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={1}
                    snapToInterval={boxWidth}
                    contentInset={{
                      left: halfBoxDistance,
                      right: halfBoxDistance,
                    }}
                    contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
                    onLayout={(e) => {
                      setScrollViewWidth(e.nativeEvent.layout.width);
                    }}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: pan.x } } }],
                      {
                        useNativeDriver: false,
                      },
                    )}
                    keyExtractor={(item, index) => `${index}-${item}`}
                    renderItem={renderItem}
                  />

                </View>        
            </View>
      
        </View>
        <AddCardModal
         onConfirm={addCard}
          onRequestClose={() => setAddCardModal(!addCardModal)}
          visible={addCardModal} 
          cardNumber={cardNumber}
=======
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
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
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
