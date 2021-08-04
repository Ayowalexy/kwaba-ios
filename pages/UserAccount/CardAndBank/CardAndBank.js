import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {getBankAccounts, getTokenizeCards} from '../../../services/network';

import AvailableCardAndBank from './AvailableCardAndBank';

export default function CardAndBankDetails({navigation}) {
  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [paymentCards, setPaymentCards] = useState([]);

  useEffect(() => {
    const getAllCards = async () => {
      try {
        const res = await getTokenizeCards();
        setPaymentCards(res.data.cards);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCards();
  }, []);

  useEffect(() => {
    const getAllBanks = async () => {
      try {
        const res = await getBankAccounts();
        setUserBankAccounts(res.data.userBanks);
      } catch (error) {
        console.log(error);
      }
    };

    getAllBanks();
  }, []);

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

      <AvailableCardAndBank
        paymentCards={paymentCards}
        allCards={(value) => setPaymentCards(value)}
        userBankAccounts={userBankAccounts}
        allBanks={(value) => setUserBankAccounts(value)}
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
