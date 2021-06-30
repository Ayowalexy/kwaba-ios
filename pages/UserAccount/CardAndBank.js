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
  StyleSheet,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AddCardModal from '../../components/addCardModal';
import {fetchBanks} from '../../services/network';
import AddBankAccountModal from '../../components/addBankAccountModal';

export default function CardAndBankDetails({navigation}) {
  const [modalVisible, setVisible] = useState(false);
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
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankCode, setBankCode] = useState('');

  // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  const paymentCards = [
    {
      id: '1',
      cardnumber: '1234 3245 1234 5678',
      default: 'true',
      expires: '12/2022',
      type: 'mastercard',
    },
    {
      id: '2',
      cardnumber: '1234 3245 1234 5678',
      default: '',
      expires: '12/2022',
      type: 'visa',
    },
    {
      id: '3',
      cardnumber: '1234 3245 1234 5678',
      default: '',
      expires: '12/2022',
      type: 'verizon',
    },
  ];

  const BankAccounts = [
    {
      id: '1',
      bankAccountName: 'Johnson Abraham',
      bankAccountNumber: '0987654321',
      bankName: 'Zenith Bank',
      bankCode: '1234',
    },
    {
      id: '2',
      bankAccountName: 'Adebisi Joseph',
      bankAccountNumber: '1411314521',
      bankName: 'Fidelity Bank',
      bankCode: '1234',
    },
    {
      id: '3',
      bankAccountName: 'Joshua Nwosu',
      bankAccountNumber: '0094552107',
      bankName: 'Access Bank',
      bankCode: '1011',
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

  const addAccount = async () => {
    console.log('start');
    // const accountDetails = {accountNumber: accountNumber, bank: bank};
    // console.log('accountDetails', accountDetails);
    // setBankDetails([...bankDetails, accountDetails]);
    // console.log(bankDetails);
    // saveAccountsToStorage(bankDetails);
    // setAddCardModal(false);

    console.log(bankCode, bankAccountNumber);
    const SECRET_KEY = 'sk_test_bc0f8a2e9c28d0291156739430fd631e6a867ba9';
    try {
      const response = await axios.get(
        `api.paystack.co/bank/resolve?account_number=0094551124&bank_code=460`,
        {
          headers: {Authorization: `Bearer ${SECRET_KEY}`},
        },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

  const renderPaymentCards = ({item}) => (
    <TouchableOpacity style={[styles.paymentCard]}>
      <View>
        {/* <Text>{item.cardnumber}</Text> */}
        <View>
          <Text
            style={{fontSize: 14, color: COLORS.primary, fontWeight: 'bold'}}>
            ****2345
          </Text>
        </View>
        <View style={{marginTop: 100}}>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: COLORS.light}}>
            EXPIRES
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: COLORS.light}}>
            12/2022
          </Text>
        </View>
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
            resizeMode: 'contain',
            position: 'absolute',
            right: -5,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  const renderBankAccounts = ({item}) => (
    <TouchableOpacity style={[styles.bankCard]}>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: COLORS.white,
          }}>
          {item.bankAccountName}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.light,
          }}>
          {item.bankName}
        </Text>
        <Text
          style={{
            marginTop: 40,
            fontSize: 14,
            color: COLORS.white,
            opacity: 0.8,
          }}>
          {item.bankAccountNumber}
        </Text>

        <Image
          style={{
            width: 71,
            height: 110,
            position: 'absolute',
            resizeMode: 'contain',
            right: 0,
            bottom: 0,
          }}
          source={images.maskGroup24}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
        color={COLORS.primary}
      />
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <Text style={[styles.heading]}>Card and Bank</Text>
        <View style={[styles.content]}>
          <Text style={[styles.contentTitle]}>Payment Card</Text>
          <View style={[styles.contentView]}>
            <TouchableOpacity
              onPress={() => setAddCardModal(true)}
              style={[styles.addButton]}>
              <IconFA5 name="plus" size={15} color={COLORS.white} />
            </TouchableOpacity>

            <FlatList
              data={paymentCards}
              renderItem={renderPaymentCards}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                marginLeft: 10,
              }}
              contentContainerStyle={{
                paddingVertical: 5,
              }}
            />
          </View>
        </View>

        <View style={[styles.content]}>
          <Text style={[styles.contentTitle]}>Bank Account</Text>
          <View style={[styles.contentView]}>
            <TouchableOpacity
              onPress={() => setBankModalVisible(true)}
              style={[styles.addButton]}>
              <IconFA5 name="plus" size={15} color={COLORS.white} />
            </TouchableOpacity>

            <FlatList
              data={BankAccounts}
              renderItem={renderBankAccounts}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                marginLeft: 10,
              }}
              contentContainerStyle={{
                paddingVertical: 5,
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* <AddCardModal
        onConfirm={addCard}
        onRequestClose={() => setAddCardModal(!addCardModal)}
        visible={addCardModal}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
        cvv={cvv}
        setCVV={setCvv}
      /> */}

      <AddBankAccountModal
        onConfirm={addAccount}
        onRequestClose={() => setBankModalVisible(!bankModalVisible)}
        visible={bankModalVisible}
        accountNumber={bankAccountNumber}
        setAccountNumber={(text) => setBankAccountNumber(text)}
        bankCode={bankCode}
        setBankCode={(text) => setBankCode(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  content: {
    paddingLeft: 20,
    // borderWidth: 1,
    paddingVertical: 10,
    marginTop: 20,
    // backgroundColor: '#FFFFFF',
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    // marginLeft: 10,
    color: COLORS.primary,
  },
  contentView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10,
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentCard: {
    width: 150,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
  bankCard: {
    width: 250,
    height: 140,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
});
