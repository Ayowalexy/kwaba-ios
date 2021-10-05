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

  const [repaymentLists, setRepaymentLists] = useState([]);

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

      // console.log(activeLoan);
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
    }
  }, [getMaxLoanCap1]);

  const chargeCard = async () => {
    console.log('Loading...');
    const url =
      'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/user_create_savings';
    let data = {
      savings_amount: 50000,
      target_amount: 200000,
      auto_save: true,
      frequency: 'Monthly',
      start_date: '2021-08-16T11:03:24+01:00',
      name: 'my first savings',
      how_long: '3months',
      locked: true,
      bvn: '1234567890',
    };

    try {
      const token = await getToken();
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const responseData = response.data.data;
      console.log('Response: ', responseData);
      if (response.status == 200) {
        // const payCode = await RNPaystack.chargeCardWithAccessCode({
        //   cardNumber: '4123450131001381',
        //   expiryMonth: '03',
        //   expiryYear: '24',
        //   cvc: '883',
        //   accessCode: responseData.access_code,
        // });
        const pay = await RNPaystack.chargeCard({
          cardNumber: '4123450131001381',
          expiryMonth: '10',
          expiryYear: '22',
          cvc: '883',
          email: 'joshuanwosu078@gmail.com',
          amountInKobo: responseData.amount * 100,
          reference: responseData.reference,
        });
        console.log('The Pay: ', pay.reference);
        const verify = await verifySavingsPayment(pay);
        console.log('Verify: ', verify);
      }
    } catch (error) {
      console.log('Error: ', error);
    }

    // try {
    //   const pay = await RNPaystack.chargeCard({
    //     cardNumber: '4123450131001381',
    //     expiryMonth: '10',
    //     expiryYear: '22',
    //     cvc: '883',
    //     email: 'chargeIOS@master.dev',
    //     amountInKobo: 150000,
    //     // subAccount: 'ACCT_pz61jjjsslnx1d9',
    // reference
    //   });
    //   // console.log('Pay: ', pay);
    // const verify = await verifySavingsPayment(pay);
    //   console.log('Verify: ', verify);
    // } catch (error) {
    //   console.log(error); // error is a javascript Error object
    //   console.log(error.message);
    //   console.log(error.code);
    // }
  };

  const handlePayment = async () => {
    const data = {loanId: loanId};
    setSpinner(true);
    try {
      const response = await loanRepayment(data);

      if (response.status == 200) {
        setSpinner(false);
        const url = response.data.data.authorization_url;
        const result = await openInAppBrowser(url);
        if (result.type === 'cancel') {
          let data = {reference: response.data.data.reference, loanId: loanId};
          setVerificationSpinner(true);
          const verify = await loanPaymentVerification(data);
          if (verify.data.status == 'success') {
            setVerificationSpinner(false);
            setSuccessModal(true);
          } else {
            setVerificationSpinner(false);
            Alert.alert(
              'Payment Unverified',
              'Your payment was not verified. Please retry.',
            );
          }
        }
      }
    } catch (error) {
      setSpinner(false);
      Alert.alert('Error', error.message);
    }
  };

  const openInAppBrowser = async (url) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#2A286A',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          hasBackButton: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });

        return result;
      } else Linking.openURL(url);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    // (async () => {
    //   const loans = await getAllLoans();
    //   // console.log('The Loan: ', loans.data.data);
    //   setRepaymentLists(loans.data.data);
    // })();
    // handleFetchLoans();
  }, []);

  const getAllLoans = async () => {
    const token = await getToken();
    const apiUrl = 'https://kwaba-main-api-2-cq4v8.ondigitalocean.app';
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
        // console.log('The Loan: ', loans.data.data);
        setRepaymentLists(loans.data.data);
      }
    } catch (error) {
      setSpinner(false);
    }
  };

  // returned lists of repayments;
  const RepaymaneHistory = () => {
    return (
      <View style={[styles.repaymentListContainer]}>
        {repaymentLists.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => console.log('Clicked', index + 1)}>
              <View style={[styles.repaymentFlex]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={[
                      styles.repaymentStatus,
                      {
                        backgroundColor:
                          item.disbursement_status == 1
                            ? COLORS.secondary
                            : COLORS.orange,
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
                        {fontWeight: 'normal', marginLeft: 2},
                      ]}>
                      {item.disbursement_status == 1 ? 'Success' : 'Pending'}
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
                      style={[styles.repaymentText, {color: COLORS.secondary}]}>
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
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.navigate('Home')}
        name="arrow-back-outline"
        size={25}
        style={{padding: 15, fontWeight: '900'}}
        color={COLORS.primary}
      />
      <View style={{flex: 1, paddingHorizontal: 20, marginTop: 0}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 17,
              },
            ]}>
            Emergency Fund
          </Text>
          <TouchableOpacity onPress={handleFetchLoans} style={{marginTop: -20}}>
            <Icon
              name="ios-reload-circle"
              size={35}
              style={{fontWeight: '900'}}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            // backgroundColor: COLORS.light,
            backgroundColor: '#9D98EC50',
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: COLORS.dark,
              fontWeight: 'normal',
              lineHeight: 18,
            }}>
            Your fund will land into your account and your dashboard will be
            updated soonest.
          </Text>
        </View> */}

        <View style={[styles.dashboard]}>
          <View style={[styles.box1]}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: 10, color: COLORS.dark}}>
                  Total Loan Repayment
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.dark,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  ₦{formatNumber(repaymentAmount) || '0.00'}
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 5,
                    backgroundColor: COLORS.primary,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    console.log('CLICKED');
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'normal',
                      // color: COLORS.secondary,
                      // textDecorationLine: 'underline',
                      color: COLORS.white,
                    }}>
                    View transaction details
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: 'flex-end',
                  // position: 'absolute',
                  // right: -20,
                }}
                source={images.Group3950}
                resizeMode="contain"
              />
            </View>
          </View>
          {/* <View style={[styles.box2]}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: 10, color: COLORS.white}}>
                  Loan Amount
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.white,
                    fontWeight: 'bold',
                  }}>
                  ₦0.00
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={{color: COLORS.secondary, fontSize: 12}}>
                  View details
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View>
                <Text style={{fontSize: 10, color: COLORS.white}}>
                  Due Date
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.white,
                    fontWeight: 'bold',
                  }}>
                  --
                </Text>
              </View>
              <TouchableOpacity
                onPress={chargeCard}
                style={{
                  backgroundColor: COLORS.light,
                  padding: 10,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                }}>
                <Text style={{color: COLORS.white, fontSize: 12}}>Pay now</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>

        <View style={[styles.transaction]}>
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#BFBFBF50',
            }}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', color: COLORS.dark}}>
              Active Loans
            </Text>
          </View>

          {/* Repayment History Component */}
          <RepaymaneHistory />
        </View>
      </View>

      <Spinner visible={spinner} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    width: '100%',
    minHeight: 100,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#BFBFBF20',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    // elevation: 0.2,
  },
  box1: {
    width: '100%',
    paddingVertical: 10,
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
    backgroundColor: COLORS.white,
    width: '100%',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#BFBFBF20',
  },

  // repyament history
  repaymentListContainer: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    backgroundColor: COLORS.white,
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
});
