import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
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
import Spinner from 'react-native-loading-spinner-overlay';

import Modal from 'react-native-modal';

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

  const [selectedBank, setSelectedBank] = useState('');
  const [bankData, setBankData] = useState('');

  const [bankCode, setBankCode] = useState('');

  const [selectedAccountType, setSelectedAccountType] = useState('');

  const [userBankAccounts, setUserBankAccounts] = useState([]);

  const [actionModal, setActionModal] = useState(false);

  const [spinner, setSpinner] = useState(false);

  const [clickedID, setClickedID] = useState('');

  // const [bankCode, setBankCode] = useState('');

  // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  const paymentCards = [
    {
      id: '1',
      cardnumber: '1234 3245 1234 5678',
      default: 'true',
      expires: '12/2022',
      type: 'mastercard',
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

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  // fetch banks
  useEffect(() => {
    (async () => {
      try {
        const url = 'http://67.207.86.39:8000/api/v1/bank_email';
        const response = await axios.get(url, {
          headers: {'Content-Type': 'application/json'},
        });
        const data = response.data;

        const userData = await AsyncStorage.getItem('userData');
        const parsedUserData = JSON.parse(userData);

        if (response.status == 200) {
          // console.log(data.banks);
          setBankData(data.banks);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      setBankData('');
    };
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
    setSpinner(true);
    console.log('start');
    const data = {
      bank_name: selectedBank,
      bank_account_number: bankAccountNumber,
      bank_short_code:
        bankCode.toString().length == 2 ? '0' + bankCode : bankCode,
      type: selectedAccountType,
    };

    // console.log('DATA: ', data);

    verifyBankAccount(data.bank_account_number, data.bank_short_code);
    setBankModalVisible(false);
  };

  const verifyBankAccount = async (account_number, bank_code) => {
    const url = 'http://67.207.86.39:8000/api/v1/user/bank_details';
    try {
      const token = await getToken();
      const response = await axios.post(
        url,
        JSON.stringify({
          account_number: account_number,
          bank_code: bank_code,
        }),
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      if (response.data.accountStatus == true) {
        setSpinner(false);
        console.log('VERIFY CARD FROM BACKEND: ', response.data.data);

        const {account_name, account_number} = response.data.data;
        const userAccountDetails = {
          user_bank_name: account_name,
          bank_account_number: account_number,
          bank_name: selectedBank,
          bank_short_code: bank_code,
          type: selectedAccountType,
        };
        await createBankAccount(userAccountDetails);
      } else {
        setSpinner(false);
        console.log('Account not verified');
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  const createBankAccount = async (data) => {
    // @params - bank_name, bank_account_name, bank_account_number,
    // bank_short_code, type(savings or current)
    // api/v1/createbankaccount

    console.log('DETAIL', data);
    const url = 'http://67.207.86.39:8000/api/v1/createbankaccount';
    try {
      const token = await getToken();
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      // console.log('RESPONSE:', response);
      if (response.status == 200) {
        console.log('Card successfully added');
        setActionModal(true);
        getBankAccounts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get user bank accounts
  useEffect(() => {
    getBankAccounts();
  }, []);

  const getBankAccounts = async () => {
    const url = 'http://67.207.86.39:8000/api/v1/getuserbankaccounts';
    try {
      const token = await getToken();
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      // console.log('USER BANK ACCOUNT:', response.data.userBanks);
      setUserBankAccounts(response.data.userBanks);
      console.log('Token: ', token);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  // (async()=> {
  //   // const account_number = 0094552107;
  //   // const bank_code = 63;
  //   const url = "https://api.paystack.co/bank/resolve?account_number=4174714023&bank_code=214"
  //   // const url = "https://api.paystack.co/bank/resolve?account_number=0001234567&bank_code=058"
  //   // const url = 'https://api.paystack.co/bank/resolve?account_number=3510013219bank_code=50'
  //   // const url = 'https://api.paystack.co/bank/resolve?account_number=0094552107bank_code=063'
  //   try {
  //     const SECRET_KEY = 'sk_test_bc0f8a2e9c28d0291156739430fd631e6a867ba9';
  //     const response = await axios.get(url,{
  //       headers: {'Content-Type': 'application/json', Authorization: `Bearer ${SECRET_KEY}`},
  //     });
  //     console.log('Pay Stack:',response.data);
  //   } catch (error) {
  //     console.log('Pay Stack Error:', error.message);
  //   }
  // })()
  // (async()=> {
  //   const url = 'http://67.207.86.39:8000/api/v1/user/bank_details';
  //   try {
  //     const token = await getToken();
  //     const response = await axios.post(url, JSON.stringify({
  //       account_number: '0094552107',
  //       bank_code: '063'
  //     }), {
  //       headers: {'Content-Type': 'application/json', Authorization: token}
  //     })
  //     console.log('VERIFY CARD FROM BACKEND: ', response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })()
  // }, []);

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

  // get selected bank account.
  useEffect(() => {
    (async () => {
      // console.log(userBankAccounts);
      // console.log(clickedID);

      const selectedAccount = userBankAccounts.find(
        (account) => clickedID == account.id,
      );
      console.log('Selected Bank Account:', selectedAccount);

      try {
        await AsyncStorage.setItem(
          'selectedBankAccount',
          JSON.stringify(selectedAccount),
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [clickedID]);

  const renderPaymentCards = ({item}) => (
    <TouchableOpacity activeOpacity={0.9} style={[styles.paymentCard]}>
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
            right: -22,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  const renderBankAccounts = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.bankCard,
        {
          borderWidth: 2,
          borderColor: item.id == clickedID ? COLORS.secondary : 'transparent',
        },
      ]}
      onPress={() => {
        setClickedID(item.id);
      }}>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: COLORS.white,
          }}>
          {/* {item.bankAccountName} */}
          {item.user_bank_name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.light,
          }}>
          {/* {item.bankName} */}
          {item.bank_name}
        </Text>
        <Text
          style={{
            marginTop: 40,
            fontSize: 14,
            color: COLORS.white,
            opacity: 0.8,
          }}>
          {/* {item.bankAccountNumber} */}
          {item.bank_account_number}
        </Text>

        <Image
          style={{
            width: 71,
            height: 110,
            position: 'absolute',
            resizeMode: 'contain',
            right: -21,
            bottom: -20,
            borderWidth: 1,
          }}
          source={images.maskGroup24}
        />

        <View
          style={{
            width: 25,
            height: 25,
            backgroundColor: COLORS.dark,
            position: 'absolute',
            top: -10,
            right: -10,

            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
          }}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor:
                clickedID == item.id ? COLORS.secondary : 'transparent',
              borderRadius: 10,
            }}
          />
        </View>
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
              data={userBankAccounts}
              renderItem={renderBankAccounts}
              keyExtractor={(item) => item.id.toString()}
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

        <Modal
          isVisible={actionModal}
          onBackButtonPress={() => setActionModal(false)}
          onBackdropPress={() => setActionModal(false)}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <Text style={{color: COLORS.secondary, fontWeight: 'bold'}}>
              Card successfully added!
            </Text>
          </View>
        </Modal>

        <Spinner visible={spinner} size="large" />
      </ScrollView>

      <AddBankAccountModal
        onConfirm={addAccount}
        onRequestClose={() => setBankModalVisible(!bankModalVisible)}
        visible={bankModalVisible}
        // bankAccountName={bankAccountName}
        // setBankAccountName={(text) => setBankAccountName(text)}

        bankAccountNumber={bankAccountNumber}
        setBankAccountNumber={(text) => setBankAccountNumber(text)}
        // bankName={bankName}
        // setBankName={(text) => setBankName(text)}

        selectedBank={selectedBank}
        setSelectedBank={(text) => setSelectedBank(text)}
        selectedAccountType={selectedAccountType}
        setSelectedAccountType={setSelectedAccountType}
        setBankCode={setBankCode}
        bankData={bankData}
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
