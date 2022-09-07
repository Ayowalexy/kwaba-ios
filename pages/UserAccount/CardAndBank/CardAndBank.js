import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {COLORS} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {getBankAccounts, getTokenizeCards} from '../../../services/network';
import ActionModal from '../../../components/ActiomModal';
// import AvailableCardAndBank from './AvailableCardAndBank';
import PaymentCard from './PaymentCard';
import BankAccount from './BankAccount';

export default function CardAndBankDetails({navigation}) {
  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [paymentCards, setPaymentCards] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
 
  
  console.log('banks', paymentCards)

 

  useEffect(() => {
    const getAllCards = async () => {
      try {
        const res = await getTokenizeCards();

        const d =  [{
            added_by_user: true, 
            card_details: 
              {authorization_code:"AUTH_b3p1y331l5",
              bin:"408408",
              last4:"4081",
              exp_month:"12",
              exp_year:"2030",
              channel:"card",
              card_type:"visa",
              bank:"TEST BANK",
              country_code:"NG",
              brand:"visa",
              reusable: true,
              signature:"SIG_sLm590YofglVlj1KqpUM",
              account_name: null,
              receiver_bank_account_number:null,
              receiver_bank:null
            }, 
            created_at: "2022-04-21T13:07:36.806Z", 
            id: 110, 
            last_4_digits: "4081", 
            purpose: "cardTokenization", 
            updated_at: "2022-04-21T13:07:36.806Z", 
            user_id: 8
          }]
        
        // setPaymentCards(d);
        console.log('res data', res.data.data)
        setPaymentCards(res.data.data);
        

        // setPaymentCards(res.data);
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
      <View style={[styles.container, { marginTop: Platform.OS == 'ios' ? statusBarHeight : 0}]}>
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
                  navigation={navigation}
                  paymentCards={paymentCards || []}
                  allCards={(value) => {
                    console.log('set value', value)
                    setPaymentCards(value)}}
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

