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
// import designs from './style';
import {COLORS, FONTS, images, icons} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AddCardModal from '../../../components/addCardModal';
import {fetchBanks} from '../../../services/network';
import AddBankAccountModal from '../../../components/addBankAccountModal';

import CardAndBankModal from './CardAndBankModal';
import NoCardAndBank from './NoCardAndBank';
import AvailableCardAndBank from './AvailableCardAndBank';

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

  const [type, setType] = useState('');
  const [showCardAndBankModal, setShowCardAndCardModal] = useState(false);
  const [paymentCard, setPaymentCard] = useState([
    // {
    //   id: '1',
    //   cardnumber: '1234 3245 1234 5678',
    //   default: 'true',
    //   expires: '12/2022',
    //   type: 'mastercard',
    // },
  ]);
  const [bankAccount, setBankAccount] = useState([
    {
      id: '1',
      cardnumber: '1234 3245 1234 5678',
      default: 'true',
      expires: '12/2022',
      type: 'mastercard',
    },
  ]);

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
      <Text style={[styles.heading]}>Card and Bank</Text>

      {!paymentCard.length && !bankAccount.length ? (
        <NoCardAndBank />
      ) : (
        <AvailableCardAndBank />
      )}
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
  button: {
    width: '100%',
    padding: 15,
    // height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    marginTop: 20,
  },
});
