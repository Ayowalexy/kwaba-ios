import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getSingleLoan,
  loanRepayment,
  verifySavingsPayment,
  verifyWalletTransaction,
} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';
import moment from 'moment';
import axios from 'axios';
import AmountModalFunds from '../../../components/amountModalFunds';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';
import PaystackPayment from '../../../components/Paystack/PaystackPayment';

export default function ActiveLoanModal(props) {
  const {visible, onRequestClose, loanID, navigation, loanData} = props;
  const [spinner, setSpinner] = useState(false);
  const [data, setData] = useState('');

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loanRepaymentData, setLoanRepaymentData] = useState([]);
  const [showAmountModal, setShowAmountModal] = useState(false);

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [amount, setAmount] = useState('');

  const [channel, setChannel] = useState('');

  const [resData, setResData] = useState('');

  const [dataValue, setDataValue] = useState({
    loanId: '',
    status: '',
    loan_purpose: '',
    loan_amount: '',
    loan_repayment_amount: '',
    loan_amount_paid: '',
    repayment_date: '',
    disbursement_date: '',
    account_name: '',
    account_number: '',
    account_bank: '',
  });

  useEffect(() => {
    // console.log('Loan Data: ', loanData);
    getOne();
    setLoanRepaymentData(loanData);
  }, []);

  const getOne = async () => {
    const data = {
      loanId: loanID,
    };
    try {
      setSpinner(true);
      const resp = await getSingleLoan(data);
      if (resp.status == 200) {
        // console.log('response get one loan: ', resp.data.data);
        setSpinner(false);
        const d = resp.data.data;
        setData(d);
        setDataValue({
          loanId: d.id,
          status: d.status,
          loan_purpose: d.loan_purpose,
          loan_amount: d.loan_amount,
          loan_repayment_amount: d.repayment_amount,
          loan_amount_paid: d.amount_paid,
          repayment_date: d.repayment_date,
          disbursement_date: d.created_at,
          account_name: d.disbursement_account_name,
          account_number: d.disbursement_account_number,
          account_bank: d.disbursement_account_bank,
        });
        console.log('D: ', d);
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error);
    }
  };

  const handlePaymentRoute = async (value) => {
    try {
      const data = {
        loan_id: loanRepaymentData?.id,
        amount: amount,
      };

      console.log('The Data loan: ', data);
      console.log('The Value: ', value);

      setSpinner(true);
      const response = await loanRepayment(data);
      console.log('That Resp: ', response);

      if (response.status == 200) {
        if (value == 'wallet') {
          const data = {
            payment_channel: value,
            reference: response?.data?.data?.reference,
          };
          console.log('The Datata: ', data);
          setSpinner(true);
          const verify = await verifyWalletTransaction(data);

          console.log('Verify: ', verify.response);
          if (verify.status == 200) {
            onRequestClose();
            setSpinner(false);
            navigation.navigate('PaymentSuccessful', {
              name: 'Home',
              content: 'Payment Successful',
              subText: 'Awesome! Your payment was successful',
            });
          } else {
            setSpinner(false);
            Alert.alert('Oops!', verify?.response?.data.response_message);
            console.log('Oops!', verify.response);
          }
        } else {
          setChannel(value);
          setResData(response?.data?.data);
          setShowPaystackPayment(true); // show paystack
        }
      } else {
        setSpinner(false);
        // Alert.alert('Oops!', response.response.data)
        console.log('Oops!', response.response.data);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Oops', error.response);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={onRequestClose}
        animationType="slide"
        transparent={true}>
        <View style={styles.centeredModalWrapper}>
          <View style={[styles.bg]}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: '100%',
                height: 100,
              }}>
              <Icon
                onPress={onRequestClose}
                name="close"
                size={25}
                style={{
                  padding: 15,
                  fontWeight: '900',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 2,
                }}
                color={COLORS.white}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: -40,
              }}>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: '100%',
                  minHeight: 50,
                  elevation: 10,
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: COLORS.dark,
                      }}>
                      Repayment Amount:
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        marginTop: 2,
                        marginLeft: 1,
                        color: COLORS.dark,
                      }}>
                      ₦{formatNumber(dataValue.loan_repayment_amount)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      setShowAmountModal(true); // show amount modal
                      // setShowPaymentModal(true); // show payment type
                    }}
                    disabled={
                      dataValue.status.toLowerCase() == 'pending' ||
                      dataValue.status.toLowerCase() == 'paid'
                    }
                    style={{
                      backgroundColor: COLORS.primary,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      opacity:
                        dataValue.status.toLowerCase() == 'pending' ||
                        dataValue.status.toLowerCase() == 'paid'
                          ? 0.8
                          : 1,
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontWeight: 'bold',
                        fontSize: 10,
                        fontStyle: 'italic',
                      }}>
                      {/* {dataValue.status != 'Pending' ? 'PAY NOW' : 'PENDING'} */}
                      {dataValue.status.toLowerCase() == 'paid'
                        ? 'LOAN PAID'
                        : 'PAY NOW'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: COLORS.white,
                  marginTop: 10,
                  borderRadius: 5,
                  elevation: 10,
                }}>
                <Text style={[styles.tableHeader]}>Loan Details</Text>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Loan Purpose:</Text>
                  <Text style={[styles.tableValue]}>
                    {dataValue.loan_purpose}
                  </Text>
                </View>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Loan Amount:</Text>
                  <Text style={[styles.tableValue]}>
                    ₦
                    {dataValue.loan_amount == ''
                      ? '0.00'
                      : formatNumber(dataValue.loan_amount)}
                  </Text>
                </View>

                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>
                    Loan Repayment Amount:
                  </Text>
                  <Text style={[styles.tableValue]}>
                    ₦
                    {dataValue.loan_repayment_amount == ''
                      ? '0.00'
                      : formatNumber(dataValue.loan_repayment_amount)}
                  </Text>
                </View>

                {Number(dataValue.loan_amount_paid) > 0 && (
                  <View style={[styles.table]}>
                    <Text style={[styles.tableLabel]}>Loan Amount Paid:</Text>
                    <Text
                      style={[
                        styles.tableValue,
                        {
                          color:
                            dataValue.loan_amount_paid > 0
                              ? COLORS.secondary
                              : COLORS.dark,
                        },
                      ]}>
                      ₦
                      {dataValue.loan_amount_paid == ''
                        ? '0.00'
                        : formatNumber(dataValue.loan_amount_paid)}
                    </Text>
                  </View>
                )}
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>
                    Loan Disbursement Date:
                  </Text>
                  <Text style={[styles.tableValue]}>
                    {dataValue?.disbursement_date != '' &&
                      moment(dataValue?.disbursement_date).format(
                        'MMM DD YYYY',
                      )}
                  </Text>
                </View>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Loan Repayment Date:</Text>
                  <Text style={[styles.tableValue]}>
                    {dataValue?.repayment_date != '' &&
                      moment(dataValue?.repayment_date).format('MMM DD YYYY')}
                  </Text>
                </View>

                <Text style={[styles.tableHeader]}>Disbursement Account</Text>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Account Name:</Text>
                  <Text style={[styles.tableValue]}>
                    {dataValue.account_name}
                  </Text>
                </View>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Account Number:</Text>
                  <Text style={[styles.tableValue]}>
                    {dataValue.account_number}
                  </Text>
                </View>
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Bank Name:</Text>
                  <Text style={[styles.tableValue]}>
                    {dataValue.account_bank}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            console.log('Hello', data);
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
        />
      )}

      {showAmountModal && (
        <AmountModalFunds
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          navigation={navigation}
          data={data}
          redirectTo="EmergencyLoanDashBoard"
          channel={channel}
        />
      )} */}
      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
        />
      )}

      {showAmountModal && (
        <AmountModalFunds
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          setAmount={(d) => setAmount(d)}
          showCard={() => setShowPaymentModal(true)}
          data={loanRepaymentData}
        />
      )}

      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={resData}
          channel={channel}
          paymentCanceled={(e) => {
            console.log('Pay cancel', e);
            Alert.alert(e.status);
            setSpinner(false);
            // Do something
          }}
          paymentSuccessful={async (res) => {
            console.log('Pay done', res);

            // Do something

            const data = {
              channel: 'paystack',
              reference: res.data.transactionRef.reference,
            };

            console.log('the dataatatta: ', data);

            setSpinner(true);
            const verify = await verifySavingsPayment(data);

            console.log('the verifyyyyy: ', verify);

            if (verify.status == 200) {
              // console.log('Success: Bills Payment Verified', res);
              onRequestClose();
              navigation.navigate('PaymentSuccessful', {
                name: 'EmergencyLoanDashBoard',
                content: 'Payment Successful',
                subText: 'Awesome! You have successfully made payment',
              });
              setSpinner(false);
              Alert.alert('Oops! ', verify?.response?.data?.response_message);
            } else {
              setSpinner(false);
            }
          }}
        />
      )}

      <Spinner visible={spinner} size="small" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredModalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bg: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  headline: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,

    // No transaction style
    justifyContent: 'center',
    alignItems: 'center',
  },

  table: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF50',
  },
  tableLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  tableValue: {
    fontSize: 12,
    fontWeight: 'bold',
    // fontStyle: 'italic',
    color: COLORS.dark,
  },
  tableHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingVertical: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    backgroundColor: '#BFBFBF50',
  },
});
