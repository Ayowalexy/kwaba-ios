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
  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  // const [paymentCards, setPaymentCards] = useState([
  //   // {
  //   //   id: '1',
  //   //   cardnumber: '1234 3245 1234 5678',
  //   //   default: 'true',
  //   //   expires: '12/2022',
  //   //   type: 'mastercard',
  //   // },
  // ]);

  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [paymentCards, setPaymentCards] = useState([]);

  useEffect(() => {
    getBankAccounts();
    getPaymentCards();
  }, []);

  const getBankAccounts = async () => {
    const url = 'http://67.207.86.39:8000/api/v1/getuserbankaccounts';
    try {
      const token = await getToken();
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      setUserBankAccounts(response.data.userBanks);
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentCards = async () => {
    const url = 'http://67.207.86.39:8000/api/v1/usercards';
    try {
      const token = await getToken();
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      setPaymentCards(response.data.cards);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (paymentCards && userBankAccounts) {
  //   } else if (paymentCards && !userBankAccounts) {
  //   } else if (!paymentCards && userBankAccounts) {
  //   }
  //   // console.log('The lengths: ', paymentCards.length, userBankAccounts.length);
  // }, []);

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

      {/* {paymentCards.length < 0 && userBankAccounts.length < 0 ? (
        <NoCardAndBank allBanks={(value) => setUserBankAccounts(value)} />
      ) : (
      <AvailableCardAndBank
        paymentCards={paymentCards}
        userBankAccounts={userBankAccounts}
        allBanks={(value) => setUserBankAccounts(value)}
      />
      )} */}
      <AvailableCardAndBank
        paymentCards={paymentCards}
        userBankAccounts={userBankAccounts}
        allBanks={(value) => setUserBankAccounts(value)}
        allCards={(value) => setPaymentCards(value)}
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
