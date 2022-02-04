import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getEmergencyLoans,
  loanRepayment,
  loanPaymentVerification,
  verifySavingsPayment,
} from '../../../services/network';
// import Spinner from 'react-native-loading-spinner-overlay';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {currencyFormat, formatNumber} from '../../../util/numberFormatter';
import moment from 'moment';
import SuccessModal from '../../../components/SuccessModal';
import {useDispatch, useSelector} from 'react-redux';
import {getMaxLoanCap} from '../../../redux/actions/savingsActions';

import RNPaystack from 'react-native-paystack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Transactions from './Transactions';
import ActiveLoanModal from './ActiveLoanModal';
import AmountModalFunds from '../../../components/amountModalFunds';
import CreditCardFormFunds from '../../../components/CreditCard/CreditCardFormFunds';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';

import LoanTabs from './LoanTabs';

moment.suppressDeprecationWarnings = true;

// ENUM('Pending', 'Active', 'Running', 'Cancelled', 'Unpaid', 'Paid')

export default function EmergencyLoanDashBoard({navigation}) {
  const dispatch = useDispatch();
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const [spinner, setSpinner] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [verificationSpinner, setVerificationSpinner] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [repaymentAmount, setRepayment] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [loanId, setLoanId] = useState('');
  const [repaidLoans, setRepaidLoans] = useState([]);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [loanRepaymentData, setLoanRepaymentData] = useState([]);

  const [loanPaid, setLoanPiad] = useState(0);

  const [repaymentLists, setRepaymentLists] = useState([]);
  const [transactionModal, setTransactionModal] = useState(false);
  const [activeLoanModal, setActiveLoanModal] = useState(false);
  const [loanID, setLoanID] = useState('');

  const [loanData, setLoanData] = useState({});
  const [channel, setChannel] = useState('');

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [showBanner, setShowBanner] = useState(false);
  const [allLoans, setAllLoans] = useState('');

  useEffect(() => {
    (async () => {
      const loans = await getEmergencyLoans();
      console.log('Loans Data: ', loans);
      const activeLoan = loans.data.data.filter(
        (c) => c.repayment_status == 0,
      )[0];
      const paidLoans = loans.data.data.filter((c) => c.repayment_status == 1);
      setRepaidLoans(paidLoans);
      setLoanAmount(activeLoan != undefined ? activeLoan.loan_amount : 0);
      setDueDate(
        activeLoan != undefined
          ? moment(activeLoan.repayment_date.split(' ')[0]).format(
              'DD, MMM YYYY',
            )
          : '',
      );
      setLoanId(activeLoan != undefined ? activeLoan.id : '');

      console.log('The active loan: ', activeLoan);

      console.log('That loan: ', loans?.data?.data);

      setAllLoans(loans?.data?.data);

      if (
        loans?.data?.data?.filter((item) => item.status == 'Pending').length > 0
      ) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    })();
  }, []);

  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);

  useEffect(() => {
    if (getMaxLoanCap1?.data) {
      setRepayment(getMaxLoanCap1?.data?.emergency_loan_amount_to_repay || 0);
      setLoanPiad(getMaxLoanCap1?.data?.emergency_loan_amount_paid || 0);
    }
  }, [getMaxLoanCap1]);

  const requestLoan = async () => {
    if (
      allLoans.filter((item) => item.status.toLowerCase() == 'pending').length >
      0
    ) {
      Alert.alert(
        'Oops!',
        `You can't apply for another loan because you still have a pending loan request.`,
      );
    } else if (
      allLoans.filter((item) => item.status.toLowerCase() == 'active').length >
      0
    ) {
      Alert.alert(
        'Oops!',
        `You currently have an active loan. Repay this loan to request for another loan.`,
      );
    } else if (
      allLoans.filter((item) => item.status.toLowerCase() == 'overdue').length >
      0
    ) {
      Alert.alert(
        'Oops!',
        `You need to repay your last loan before you can access another loan.`,
      );
    } else {
      navigation.navigate('EmergencyLoanHome');
      dispatch(getMaxLoanCap());
    }
  };

  const handlePaymentRoute = async (value) => {
    console.log('The Value: ', value);
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // paddingVertical: 10,
          // paddingLeft: 20,
        }}>
        <Icon
          onPress={() => navigation.navigate('Home')}
          name="arrow-back-outline"
          size={25}
          color={COLORS.primary}
          style={{paddingVertical: 10, paddingHorizontal: 20}}
        />
        <Text
          style={[
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 14,
              marginLeft: 10,
            },
          ]}>
          Emergency Fund
        </Text>
        {/* </View> */}
      </View>
      {showBanner && (
        <View style={[styles.banner]}>
          <View style={{flexDirection: 'row', width: '80%'}}>
            <Icon name="alert-circle" size={25} color={COLORS.dark} />

            <Text style={[styles.bannerText]}>
              Your loan is currently being processed. Hang tight, you will
              receive the funds shortly.
            </Text>
          </View>

          <TouchableOpacity
            // onPress={handleFetchLoans}
            onPress={() => dispatch(getMaxLoanCap())}
            style={{
              backgroundColor: '#FFFFFF50',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              // onPress={handleFetchLoans}
              name="reload"
              size={20}
              color={COLORS.dark}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={{paddingHorizontal: 20, marginVertical: 10}}>
        <View style={[styles.dashboard]}>
          <View style={[styles.box1]}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  Loan Paid
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                    fontWeight: 'bold',
                    marginLeft: 0,
                  }}>
                  ₦{formatNumber(Number(loanPaid).toFixed(2)) || '0.00'}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  Total Amount To Repay
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                    fontWeight: 'bold',
                    marginLeft: 2,
                  }}>
                  ₦{formatNumber(Number(repaymentAmount).toFixed(2)) || '0.00'}
                </Text>
              </View>
            </View>

            <View
              style={{
                // paddingHorizontal: 20,
                // paddingTop: 10,
                // paddingBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => setTransactionModal(true)}
                style={{
                  // marginTop: 20,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{color: COLORS.secondary, fontSize: 12}}>
                  View loan history
                </Text>
                <Icon
                  name="arrow-forward"
                  size={15}
                  style={{marginTop: 5, marginLeft: 10}}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.requestBtn]}
                onPress={requestLoan}>
                <Text style={[styles.requestText]}>Request loan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <LoanTabs navigation={navigation} />

      {transactionModal && (
        <Transactions
          onRequestClose={() => setTransactionModal(!transactionModal)}
          visible={transactionModal}
        />
      )}

      {showAmountModal && (
        <AmountModalFunds
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          navigation={navigation}
          data={loanRepaymentData}
          redirectTo="EmergencyLoanDashBoard"
          channel={channel}
        />
      )}

      {/* <Spinner visible={spinner} size="large" /> */}
      {spinner && <ActivityIndicator size={'large'} color={COLORS.primary} />}
    </View>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    width: '100%',
    minHeight: 100,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: '#BFBFBF20',
    borderRadius: 10,
    // marginTop: 10,
    padding: 10,
    // elevation: 10,
    // elevation: 0.2,
  },
  box1: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  box2: {
    backgroundColor: COLORS.primary,
    width: '100%',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  transaction: {
    // backgroundColor: COLORS.white,
    width: '100%',
    // padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // marginTop: 10,
    flex: 1,
    // borderWidth: 1,
    // borderColor: '#BFBFBF20',
  },

  // repyament history
  repaymentListContainer: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    // backgroundColor: COLORS.white,
    // paddingHorizontal: 20,
    // paddingVertical: 20,
  },

  repaymentFlex: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF20',
  },

  repaymentText: {
    fontSize: 10,
    // fontWeight: 'bold',
    color: COLORS.dark,
  },

  repaymentStatus: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    marginRight: 10,
  },

  requestBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 10,
  },

  requestText: {
    color: COLORS.dark,
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 'bold',
  },

  banner: {
    width: '100%',
    backgroundColor: '#9D98EC40',
    paddingVertical: 5,
    paddingHorizontal: 20,
    // marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 5,
    borderLeftColor: COLORS.dark,
  },

  bannerText: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 16,
    color: COLORS.dark,
    paddingLeft: 10,
  },
});
