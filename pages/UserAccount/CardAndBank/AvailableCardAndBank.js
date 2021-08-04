import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import {COLORS, FONTS, images} from '../../../util/index';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AddBankAccountModal from '../../../components/addBankAccountModal';
import Modal from 'react-native-modal';
import AddPaymentCardModal from '../../../components/addPaymentCardModal';

import PaymentCard from './PaymentCard';
import BankAccount from './BankAccount';

export default function AvailableCardAndBank(props) {
  const {allBanks, userBankAccounts, allCards, paymentCards} = props;

  return (
    <>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}>
          <PaymentCard allCards={allCards} paymentCards={paymentCards} />
          <BankAccount
            allBanks={allBanks}
            userBankAccounts={userBankAccounts}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
});
