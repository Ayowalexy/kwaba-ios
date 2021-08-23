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
} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {currencyFormat} from '../../../util/numberFormatter';
import moment from 'moment';
import SuccessModal from '../../../components/SuccessModal';

import RNPaystack from 'react-native-paystack';
RNPaystack.init({
  publicKey: 'sk_test_bc0f8a2e9c28d0291156739430fd631e6a867ba9',
});

export default function EmergencyLoanDashBoard({navigation}) {
  const [spinner, setSpinner] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [verificationSpinner, setVerificationSpinner] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [repaymentAmount, setRepayment] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [loanId, setLoanId] = useState('');
  const [repaidLoans, setRepaidLoans] = useState([]);

  useEffect(() => {
    (async () => {
      const loans = await getEmergencyLoans();
      const activeLoan = loans.data.data.filter(
        (c) => c.repayment_status == 0,
      )[0];
      const paidLoans = loans.data.data.filter((c) => c.repayment_status == 1);
      setRepaidLoans(paidLoans);
      setLoanAmount(activeLoan != undefined ? activeLoan.loan_amount : 0);
      setRepayment(activeLoan != undefined ? activeLoan.repayment_amount : 0);
      // setDueDate(
      //   activeLoan != undefined
      //     ? moment(activeLoan.repayment_date.slice(0, 10)).format(
      //         'DD, MMM YYYY',
      //       )
      //     : '',
      // );
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

  const chargeCard = async () => {
    RNPaystack.chargeCard({
      cardNumber: '4123450131001381',
      expiryMonth: '10',
      expiryYear: '22',
      cvc: '883',
      email: 'chargeIOS@master.dev',
      amountInKobo: 150000,
      subAccount: 'ACCT_pz61jjjsslnx1d9',
    })
      .then((response) => {
        console.log(response); // card charged successfully, get reference here
      })
      .catch((error) => {
        console.log(error); // error is a javascript Error object
        console.log(error.message);
        console.log(error.code);
      });
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

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.navigate('Home')}
        name="arrow-back-outline"
        size={25}
        style={{padding: 15, fontWeight: '900'}}
        color={COLORS.primary}
      />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text
          style={[
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 17,
              // borderWidth: 1,
              // marginLeft: 16,
            },
          ]}>
          Emergency Fund
        </Text>
        <View
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
        </View>

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
                  Loan Repayment Amount
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.dark,
                    fontWeight: 'bold',
                  }}>
                  ₦200,000.00
                </Text>
              </View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: 'flex-end',
                  // right: -10,
                }}
                source={images.Group3950}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={[styles.box2]}>
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
                  ₦200,000.00
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
                  17, Feb 2021
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
          </View>
        </View>

        <View style={[styles.transaction]}>
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#BFBFBF50',
            }}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.dark}}>
              Repayments
            </Text>
          </View>
        </View>
      </View>
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
    paddingVertical: 20,
    paddingHorizontal: 5,
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
});
