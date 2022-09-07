import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons, images} from '../../util';
import {
  getMaxLoanCap,
  getTotalSoloSavings,
  getOneSoloSavings,
  getOneSoloSavingsTransaction,
  getTotalBuddySavings,
  getOneBuddySavings,
  updateState,
} from '../../redux/actions/savingsActions';
import {getAirtimeBillTrans} from '../../redux/actions/billsAction';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserWallet,
  getUserWalletTransactions,
} from '../../redux/actions/walletAction';

import {
  getUserSavingsChallenge,
  getOneUserSavingsChallenge,
} from '../../redux/actions/savingsChallengeAction';

export default function PaymentSuccessful(props) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (
      props?.route?.params?.subText ==
      'You have successfully funded your wallet'
    ) {
      // dispatch(getTotalSoloSavings());
      dispatch(updateState())
      dispatch(getMaxLoanCap());
      console.log('Meow wallet');
      // dispatch(getAirtimeBillTrans());
      // dispatch(getUserWallet());
      dispatch(getUserWalletTransactions());
      // dispatch(getUserSavingsChallenge());
    } else {
      dispatch(getTotalBuddySavings());
      dispatch(getTotalSoloSavings());
      dispatch(getMaxLoanCap());
      dispatch(getOneBuddySavings(props?.route?.params?.id));
      dispatch(getOneSoloSavings(props?.route?.params?.id));
      dispatch(getOneSoloSavingsTransaction(props?.route?.params?.id));
      dispatch(getAirtimeBillTrans());
      dispatch(getUserWallet());
      dispatch(getUserWalletTransactions());
      dispatch(getUserSavingsChallenge());
      dispatch(getOneUserSavingsChallenge(props?.route?.params?.id));
    }
  }, []);

  const handlePress = () => {
    if (
      props?.route?.params?.subText ==
      'You have successfully funded your wallet'
    ) {
      // dispatch(getTotalSoloSavings());
      dispatch(updateState())
      dispatch(getMaxLoanCap());
      console.log('Meow wallet');
      // dispatch(getAirtimeBillTrans());
      // dispatch(getUserWallet());
      dispatch(getUserWalletTransactions());
      // dispatch(getUserSavingsChallenge());
    } else {
      console.log('@'.repeat(20))
      console.log('Payment Succesful')
      console.log('@'.repeat(20))
      dispatch(updateState())
      dispatch(getTotalSoloSavings());
      dispatch(getMaxLoanCap());
      dispatch(getOneSoloSavings(props?.route?.params?.id));
      dispatch(getOneSoloSavingsTransaction(props?.route?.params?.id));
      dispatch(getAirtimeBillTrans());
      dispatch(getUserWallet());
      dispatch(getUserWalletTransactions());
      dispatch(getUserSavingsChallenge());
      // dispatch(getOneUserSavingsChallenge(props?.route?.params?.id));
    }

    console.log('Payment ID: ', props?.route?.params?.id);

    if (props?.route?.params?.name) {
      props.navigation.navigate(props?.route?.params?.name, {
        id: props?.route?.params?.id,
        amount: props?.route?.params?.amount_saved
      });
    } else {
      //   props.navigation.goBack();
      props.navigation.navigate('Home');
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.content]}>
        <Image
          style={[styles.img]}
          source={images.congratulation}
          resizeMode="contain"
        />
        <Text style={[styles.title]}>
          {props?.route?.params?.content || 'Payment Successful'}
        </Text>
        <Text style={[styles.subText]}>
          {props?.route?.params?.subText ||
            'You have successfully made payment'}
        </Text>
      </View>
      <TouchableOpacity style={[styles.btn]} onPress={handlePress}>
        <Text style={[styles.btnText]}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    paddingHorizontal: 20,
  },

  img: {height: 150},

  btn: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    // height: 70,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    paddingVertical: 20,
  },

  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },

  subText: {
    fontSize: 15,
    marginTop: 10,
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: 20,
  },
});
