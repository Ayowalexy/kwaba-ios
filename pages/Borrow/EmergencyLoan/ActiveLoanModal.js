import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {getSingleLoan, loanRepayment} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';
import moment from 'moment';
import axios from 'axios';
import AmountModalFunds from '../../../components/amountModalFunds';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';

export default function ActiveLoanModal(props) {
  const {visible, onRequestClose, loanID, navigation, loanData} = props;
  const [spinner, setSpinner] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [data, setData] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [channel, setChannel] = useState('');

  const [dataValue, setDataValue] = useState({
    loanId: '',
    status: '',
    loan_purpose: '',
    loan_amount: '',
    loan_repayment_amount: '',
    loan_amount_paid: '',
    repayment_date: '',
    account_name: '',
    account_number: '',
    account_bank: '',
  });

  useEffect(() => {
    // console.log('Loan Data: ', loanData);
    getOne();
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
          account_name: d.disbursement_account_name,
          account_number: d.disbursement_account_number,
          account_bank: d.disbursement_account_bank,
        });
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error);
    }
  };

  const handlePaymentRoute = async (value) => {
    // const data = {
    //   serviceID: airtimeData[0]?.serviceID, // e.g mtn, airtel, glo, 9mobile
    //   amount: unFormatNumber(amount), // e.g 100
    //   recepient: phoneNumber, // e.g 08011111111
    // };

    // setSpinner(true);
    // if (value == 'paystack') {
    //   const response = await BuyPurchaseAirtime(data);
    //   console.log('The buy response: ', response);
    //   if (response.status == 200) {
    //     setSpinner(false);
    //     setShowCardModal(true); // show card modal
    //     setResData(response?.data?.data);
    //     setChannel(value); //paystack
    //   } else {
    //     setSpinner(false);
    //   }
    // } else if (value == 'bank') {
    //   console.log(value);
    // } else {
    //   console.log(value); // wallet
    // }

    console.log('The Value: ', value);
    setChannel(value);
    setShowAmountModal(true);
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
                      // setShowAmountModal(true); // show amount modal
                      setShowPaymentModal(true); // show payment type
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
                    ₦{formatNumber(dataValue.loan_amount)}
                  </Text>
                </View>

                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>
                    Loan Repayment Amount:
                  </Text>
                  <Text style={[styles.tableValue]}>
                    ₦{formatNumber(dataValue.loan_repayment_amount)}
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
                      ₦{formatNumber(dataValue.loan_amount_paid)}
                    </Text>
                  </View>
                )}
                <View style={[styles.table]}>
                  <Text style={[styles.tableLabel]}>Loan Repayment Date:</Text>
                  <Text style={[styles.tableValue]}>
                    {moment(dataValue.repayment_date).format('MMM DD YYYY')}
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

      {showPaymentModal && (
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
      )}

      <Spinner visible={spinner} size="large" />
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
