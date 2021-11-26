import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {getBankAccounts, getTokenizeCards} from '../../../services/network';

// import AvailableCardAndBank from './AvailableCardAndBank';
import PaymentCard from './PaymentCard';
import BankAccount from './BankAccount';

export default function CardAndBankDetails({navigation}) {
  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [paymentCards, setPaymentCards] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

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
        setShowSpinner(true);
        const res = await getBankAccounts();
        if (res.status == 200) {
          setUserBankAccounts(res.data.userBanks);
          setShowSpinner(false);
        } else {
          setShowSpinner(false);
        }
      } catch (error) {
        console.log(error);
        setShowSpinner(false);
      }
    };

    getAllBanks();
  }, []);

  return (
    <>
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

        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
          <View style={[styles.content]}>
            <PaymentCard
              paymentCards={paymentCards}
              allCards={(value) => setPaymentCards(value)}
            />
            <BankAccount
              userBankAccounts={userBankAccounts}
              allBanks={(value) => setUserBankAccounts(value)}
            />
          </View>
        </ScrollView>
        {showSpinner && (
          <View>
            <ActivityIndicator size={'large'} color={COLORS.secondary} />
          </View>
        )}
      </View>
    </>
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
    paddingLeft: 10,
    // borderWidth: 1,
    paddingVertical: 10,
    // marginTop: 20,
  },
});
