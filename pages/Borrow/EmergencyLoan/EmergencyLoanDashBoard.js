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
import Spinner from 'react-native-loading-spinner-overlay';
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
RNPaystack.init({
  publicKey: 'pk_test_803016ab92dcf40caa934ef5fd891e0808b258ef',
});

moment.suppressDeprecationWarnings = true;

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

  useEffect(() => {
    (async () => {
      const loans = await getEmergencyLoans();
      const activeLoan = loans.data.data.filter(
        (c) => c.repayment_status == 0,
      )[0];
      const paidLoans = loans.data.data.filter((c) => c.repayment_status == 1);
      setRepaidLoans(paidLoans);
      setLoanAmount(activeLoan != undefined ? activeLoan.loan_amount : 0);
      // setRepayment(activeLoan != undefined ? activeLoan.repayment_amount : 0);
      setDueDate(
        activeLoan != undefined
          ? moment(activeLoan.repayment_date.split(' ')[0]).format(
              'DD, MMM YYYY',
            )
          : '',
      );
      setLoanId(activeLoan != undefined ? activeLoan.id : '');

      console.log('The active loan: ', activeLoan);
    })();
  }, []);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);

  useEffect(() => {
    if (getMaxLoanCap1?.data) {
      setRepayment(getMaxLoanCap1.data.total_emmegency_loan_amount_taken);
      setLoanPiad(getMaxLoanCap1.data.total_emmegency_loan_amount_repay);
    }
  }, [getMaxLoanCap1]);

  const handlePayNow = async (item) => {
    setShowAmountModal(true);
    setLoanRepaymentData(item); // repayment loan data
  };

  useEffect(() => {
    handleFetchLoans();
  }, []);

  const getAllLoans = async () => {
    const token = await getToken();
    const apiUrl = 'http://67.207.86.39:8000';
    const url = apiUrl + '/api/v1/emergency_loan/all';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const handleFetchLoans = async () => {
    setSpinner(true);
    try {
      const loans = await getAllLoans();
      if (loans.status == 200) {
        setSpinner(false);
        console.log('The Loannnnnnn: ', loans.data.data);
        setRepaymentLists(loans.data.data);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error);
    }
  };

  const requestLoan = async () => {
    navigation.navigate('EmergencyLoanHome');
    dispatch(getMaxLoanCap());
  };

  // ENUM('Pending', 'Active', 'Running', 'Cancelled', 'Unpaid', 'Paid')

  // returned lists of repayments;
  const RepaymaneHistory = () => {
    return (
      <View style={[styles.repaymentListContainer]}>
        {repaymentLists.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                marginBottom: 10,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                elevation: 0.5,
                // borderWidth: 1,
                // borderColor: '#2A286A10',
                overflow: 'hidden',
              }}
              key={index}
              onPress={() => {
                setActiveLoanModal(true);
                setLoanID(item.id);
                setLoanData({status: item.disbursement_status, id: item.id});
              }}>
              <View style={[styles.repaymentFlex]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={[
                      styles.repaymentStatus,
                      {
                        backgroundColor:
                          item.status == 'Active' || item.status == 'Paid'
                            ? COLORS.secondary
                            : item.status == 'Pending' ||
                              item.status == 'Running'
                            ? COLORS.orange
                            : COLORS.red,
                      },
                    ]}
                  />
                  <View>
                    <Text
                      style={[
                        styles.repaymentText,
                        {fontSize: 12, fontWeight: 'bold'},
                      ]}>
                      {item.loan_purpose}
                      {'  '}
                      <Text style={{fontSize: 10}}>
                        ₦{formatNumber(item.loan_amount)}
                      </Text>
                    </Text>
                    <Text
                      style={[
                        styles.repaymentText,
                        {
                          fontWeight: 'normal',
                          marginLeft: 2,
                          fontStyle: 'italic',
                        },
                      ]}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    <Text
                      style={[
                        styles.repaymentText,
                        {
                          color: COLORS.secondary,
                        },
                      ]}>
                      View
                    </Text>
                    <Icon
                      name="arrow-forward"
                      color={COLORS.secondary}
                      size={12}
                      style={{marginLeft: 5}}
                    />
                  </View>
                  <Text style={[styles.repaymentText]}>
                    {item.disbursement_status == 1
                      ? moment(item.disbursement_date).format('DD MMM YYYY')
                      : moment(item.created_at).format('DD MMM YYYY')}
                  </Text>
                </View>
              </View>

              {item.status != 'Pending' &&
                item.status != 'Cancel' &&
                item.status != 'Unpaid' &&
                item.status != 'Running' && (
                  <View style={{marginTop: -5}}>
                    <TouchableOpacity
                      onPress={() => handlePayNow(item)}
                      style={{
                        backgroundColor: COLORS.primary,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: COLORS.white,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          textAlign: 'center',
                        }}>
                        Pay Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingLeft: 20,
        }}>
        <Icon
          onPress={() => navigation.navigate('Home')}
          name="arrow-back-outline"
          size={25}
          color={COLORS.primary}
        />
        {/* <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}> */}
        <Text
          style={[
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 14,
              marginLeft: 20,
            },
          ]}>
          Emergency Fund
        </Text>
        {/* </View> */}
      </View>
      {repaymentLists?.length > 0 && (
        <View style={[styles.banner]}>
          <View style={{flexDirection: 'row', width: '80%'}}>
            <Icon name="alert-circle" size={25} color={COLORS.dark} />

            <Text style={[styles.bannerText]}>
              Your loan is currently being processed. Hang tight, you will
              receive the funds shortly.
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleFetchLoans}
            style={{
              backgroundColor: '#FFFFFF50',
              width: 30,
              height: 30,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              onPress={handleFetchLoans}
              name="reload"
              size={20}
              color={COLORS.dark}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={{flex: 1, paddingHorizontal: 20, marginTop: 10}}>
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
                  ₦{formatNumber(loanPaid) || '0.00'}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  Total Loan Repayment
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                    fontWeight: 'bold',
                    marginLeft: 2,
                  }}>
                  ₦{formatNumber(repaymentAmount) || '0.00'}
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

        <View style={[styles.transaction]}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', color: COLORS.dark}}>
              All Loans
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                width: 30,
                height: 30,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="filter"
                size={15}
                style={{fontWeight: '900'}}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
            <RepaymaneHistory />
          </ScrollView>
        </View>
      </View>

      <Transactions
        onRequestClose={() => setTransactionModal(!transactionModal)}
        visible={transactionModal}
      />

      {activeLoanModal && (
        <ActiveLoanModal
          onRequestClose={() => setActiveLoanModal(!activeLoanModal)}
          visible={activeLoanModal}
          loanID={loanID}
          loanData={loanData}
        />
      )}

      {showAmountModal && (
        <AmountModalFunds
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          navigation={navigation}
          data={loanRepaymentData}
          redirectTo="EmergencyLoanDashBoard"
        />
      )}

      <Spinner visible={spinner} size="large" />
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
    paddingVertical: 10,
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
