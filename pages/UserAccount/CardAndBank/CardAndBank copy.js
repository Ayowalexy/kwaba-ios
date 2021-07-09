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
  FlatList,
  Animated,
} from 'react-native';
import {icons} from '../../../util/index';
import designs from '../style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AddCardModal from '../../../components/addCardModal';
import {fetchBanks} from '../../../services/network';
import {Picker} from '@react-native-picker/picker';
import AddBankAccountModal from '../../../components/addBankAccountModal';

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

  const [bankModalVisible, setBankModalVisible] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [bankAccountName, setBankAccountName] = useState('Adebisi Joseph');
  const [bankAccountNumber, setBankAccountNumber] = useState('1411314521');
  const [bankName, setBankName] = useState('UBA');
  const [bankCode, setBankCode] = useState('');
  const [loanPurposeOptions] = useState([
    {label: 'Household', value: 'Household'},
    {label: 'Personal', value: 'Personal'},
  ]);

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

  const BankAccounts = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      bankAccountName: 'Adebisi Joseph',
      bankAccountNumber: '1411314521',
      bankName: 'Adebisi Joseph',
      bankCode: '1234',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      bankAccountName: 'Adebisi Joseph',
      bankAccountNumber: '1411314521',
      bankName: 'Adebisi Joseph',
      bankCode: '1234',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      bankAccountName: 'Adebisi Joseph',
      bankAccountNumber: '1411314521',
      bankName: 'Adebisi Joseph',
      bankCode: '1234',
    },
  ];

  useEffect(() => {
    async function fetchBanksForDropdown() {
      const banks = await fetchBanks();
      console.log(banks);
      if (banks.banks) {
        setBanks(banks.banks);
      }
      //
    }
    fetchBanksForDropdown();
  }, []);

  useEffect(() => {
    const getCards = async () => {
      const cards = await AsyncStorage.getItem('paymentCardDetails');
      if (cards) {
        setCards(JSON.parse(cards));
      }
    };
    getCards();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      const accountDetails = await AsyncStorage.getItem('accountDetails');
      if (accountDetails) {
        setBankDetails(JSON.parse(accountDetails));
      }
    };
    getAccounts();
  }, []);

  const addCard = () => {
    console.log('start');
    const cardDetails = {
      cardNumber: cardNumber,
      cvv: cvv,
      expiryDate: expiryDate,
    };
    console.log('cardDetails', cardDetails);
    setCards([...cards, cardDetails]);
    console.log(cards);
    setAddCardModal(false);
    saveCardsToStorage(cards);
  };

  const addAccount = () => {
    console.log('start');
    const accountDetails = {accountNumber: accountNumber, bank: bank};
    console.log('accountDetails', accountDetails);
    setBankDetails([...bankDetails, accountDetails]);
    console.log(bankDetails);
    saveAccountsToStorage(bankDetails);
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

  const renderItem = ({item, index}) => (
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
        style={{
          flex: 1,
          flexDirection: 'column',
          height: '100%',
          width: boxWidth,
          borderRadius: 24,
          backgroundColor: '#fff',
          marginLeft: 10,
        }}>
        <Text style={{marginLeft: 10, marginTop: 20}}>{item.cardnumber}</Text>
        {/* {item.default=='true'?
        <>
         <Text style={{backgroundColor:COLORS.light,width:90,textAlign:'center', marginLeft:10,color:COLORS.primary,borderRadius:20}}>DEFAULT</Text>
        </>
      :
      ''
      } */}
        <Text
          style={{
            backgroundColor: COLORS.light,
            width: 90,
            textAlign: 'center',
            marginLeft: 10,
            color: COLORS.primary,
            borderRadius: 20,
          }}>
          {item.default ? 'DEFAULT' : ''}
        </Text>
        <Image
          source={
            item.type == 'mastercard'
              ? images.mastercarddesign
              : images.visacarddesign
          }
          resizeMode="contain"
          style={{
            height: 200,
            width: 150,
            alignSelf: 'flex-end',
            marginTop: -40,
          }}
        />
      </View>
    </Animated.View>
  );

  return (
    <ScrollView style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{marginTop: 28, marginLeft: 16, fontWeight: '900'}}
        color="#2A286A"
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
              marginBottom: 10,
            },
          ]}>
          Card and Bank
        </Text>
      </View>

      <View>
        <View style={{flexDirection: 'column', marginLeft: 16}}>
          <View>
            <Text
              style={[
                FONTS.h2FontStyling,
                {
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginBottom: 24,
                  marginLeft: 20,
                },
              ]}>
              Payment Card
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setAddCardModal(true)}
              style={{
                height: 45,
                width: 45,
                borderRadius: 25,
                backgroundColor: COLORS.secondary,
                marginLeft: 20,
              }}>
              <Icon
                name="add"
                size={35}
                color={COLORS.white}
                style={{alignSelf: 'center', marginTop: 2}}
              />
            </TouchableOpacity>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              //data={loremWords}
              style={{height: 250, marginLeft: 40}}
              contentContainerStyle={{paddingVertical: 16}}
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
              contentOffset={{x: halfBoxDistance * -1, y: 0}}
              onLayout={(e) => {
                setScrollViewWidth(e.nativeEvent.layout.width);
              }}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: pan.x}}}],
                {
                  useNativeDriver: false,
                },
              )}
              keyExtractor={(item, index) => `${index}-${item}`}
              renderItem={renderItem}
            />
          </View>
        </View>

        <View style={{flexDirection: 'column', marginLeft: 16}}>
          <View>
            <Text
              style={[
                FONTS.h2FontStyling,
                {
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginBottom: 24,
                  marginLeft: 20,
                },
              ]}>
              Bank Account
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setBankModalVisible(true)}
              style={{
                height: 45,
                width: 45,
                borderRadius: 25,
                backgroundColor: COLORS.secondary,
                marginLeft: 20,
              }}>
              <Icon
                name="add"
                size={35}
                color={COLORS.white}
                style={{alignSelf: 'center', marginTop: 2, fontWeight: 'bold'}}
              />
            </TouchableOpacity>

            <ScrollView scrollEnabled horizontal>
              {BankAccounts.map(() => (
                <View
                  style={{
                    borderRadius: 15,
                    backgroundColor: COLORS.primary,
                    paddingTop: 16,
                    paddingBottom: 16,
                    paddingLeft: 16,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '35%',
                    height: 125,
                    marginLeft: 40,
                  }}>
                  <View>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 15,
                        lineHeight: 23,
                        fontFamily: 'CircularStd',
                        marginBottom: 1,
                      }}>
                      {bankAccountName != '' ? bankAccountName : '-'}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.light,
                        fontSize: 10,
                        lineHeight: 13,
                        fontFamily: 'CircularStd',
                        marginBottom: 23,
                      }}>
                      {bankName != '' ? bankName : '-'}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 10,
                        lineHeight: 13,
                        fontFamily: 'CircularStd',
                      }}>
                      {bankAccountNumber != '' ? bankAccountNumber : '-'}
                    </Text>
                  </View>
                  <View>
                    <Image
                      style={{width: 71, height: 110}}
                      source={images.maskGroup24}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
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

      <AddBankAccountModal
        onConfirm={addCard}
        onRequestClose={() => setBankModalVisible(!bankModalVisible)}
        visible={bankModalVisible}
        accountNumber={bankAccountNumber}
        setAccountNumber={(text) => setBankAccountNumber(text)}
        bankCode={bankCode}
        setBankCode={(text) => setBankCode(text)}
      />
    </ScrollView>
  );
};

export default CardAndBankDetails;
