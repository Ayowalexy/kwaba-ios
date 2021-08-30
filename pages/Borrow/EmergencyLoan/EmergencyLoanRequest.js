import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {icons} from '../../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {currencyFormat} from '../../../util/numberFormatter';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddBankAccountModal from '../../../components/addBankAccountModal';
import {
  applyForEmergencyLoan,
  resolveBankAccount,
  fetchBanks,
} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import LoanPurposeModal from '../../../components/LoanPurposeModal';
import ConfirmModal from './ConfirmModal';
import SuccessModal from './SuccessModal';

const EmergencyLoanRequest = ({route, navigation}) => {
  const [spinner, setSpinner] = useState(false);
  const [modalVisible, setVisible] = useState(false);
  const [bankModalVisible, setBankModalVisible] = useState(false);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanAmount, setLoanAmount] = useState(0);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [pressed, setPressed] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showLoanPurposeModal, setShowLoanPurposehModal] = useState(false);
  const [userSelectedBankAccount, setUserSelectedBankAccount] = useState([]);

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('userData');
      const accountName = JSON.parse(userData).user.savings_account_name;
      const accountNumber = JSON.parse(userData).user.savings_account_number;
      const code = JSON.parse(userData).user.savings_bank_code;
      setBankAccountName(accountName != null ? accountName : '');
      setBankAccountNumber(accountNumber != null ? accountNumber : '');
      setBankCode(code != null ? code : '');

      console.log(accountNumber, accountName, code, JSON.parse(userData).user);
    })();
  }, []);

  useEffect(() => {
    setLoanAmount(route.params.loan_amount);
    setRepaymentAmount(route.params.repayment_amount);
    setDueDate(moment().add(30, 'days').format('DD, MMM YYYY'));
  }, []);

  useEffect(() => {
    (async () => {
      const userBankAccount = await AsyncStorage.getItem('selectedBankAccount');
      if (userBankAccount) {
        const parsedUserBankAccount = JSON.parse(userBankAccount);
        console.log(userBankAccount);
        setUserSelectedBankAccount(parsedUserBankAccount);

        setBankAccountName(parsedUserBankAccount.user_bank_name);
        setBankAccountNumber(parsedUserBankAccount.bank_account_number);
        setBankName(parsedUserBankAccount.bank_name);
      }
    })();
  }, [userSelectedBankAccount]);

  // const addCard = async () => {
  //   setBankModalVisible(false);
  //   const data = {
  //     account_number: bankAccountNumber,
  //     bank_code: bankCode,
  //   };
  //   try {
  //     let bankDetails = await resolveBankAccount(data);
  //     let banks = await fetchBanks();
  //     if (bankDetails.accountStatus == true) {
  //       setBankAccountName(bankDetails.data.account_name);
  //       setBankAccountNumber(bankDetails.data.account_number);
  //       let bank = banks.banks.filter((c) => c.code == bankCode);
  //       setBankName(bank[0].name);
  //     }
  //   } catch (error) {
  //     Alert.alert('', error);
  //   }
  // };

  const loanTable = [
    {
      title: 'Loan Amount',
      value: `₦${currencyFormat(Number(loanAmount))}`,
    },
    {
      title: 'Repayment Amount',
      value: `₦${currencyFormat(Number(repaymentAmount))}`,
    },
    {
      title: 'Due Date',
      value: `${dueDate != '' ? dueDate : '-'}`,
    },
    {
      title: 'Duration',
      value: `30 Days`,
    },
  ];

  const handleSubmit = async () => {
    setSpinner(true);
    // setVisible(false);
    // setting this manually
    // setBankAccountName('Joshua Udo Nwosu');
    // setBankAccountNumber('0094552107');
    // setBankName('Access Bank');

    const data = {
      loan_amount: loanAmount,
      loan_purpose: loanPurpose,
      // disbursement_account_name: bankAccountName,
      // disbursement_account_number: bankAccountNumber,
      // disbursement_account_bank: bankName,
      disbursement_account_name: 'JOSHUA UDO NWOSU',
      disbursement_account_number: '0094552107',
      disbursement_account_bank: 'Access Bank(Diamond)',
    };

    console.log('DATA: ', data);

    try {
      setSpinner(false);
      const response = await applyForEmergencyLoan(data);
      console.log('RESPONSE: ', response);
      if (response.status == 201) {
        setSpinner(false);
        setSuccessModal(false);
        console.log('Success');
      } else {
        setSpinner(false);
        console.log(response.data.statusMsg);
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
          fontWeight: '900',
        }}
        color={COLORS.primary}
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={styles.content}>
          <Text style={styles.heading}>Emergency Fund</Text>

          <TouchableOpacity
            style={styles.customInput}
            onPress={() => {
              setShowLoanPurposehModal(!showLoanPurposeModal);
              // console.log(selectedMonth);
            }}>
            {loanPurpose != '' ? (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: COLORS.dark,
                }}>
                {loanPurpose}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#BABABA',
                }}>
                Loan Purpose
              </Text>
            )}

            <Icon
              name="chevron-down-outline"
              size={20}
              style={{fontWeight: 'bold'}}
              color="#BABABA"
            />
          </TouchableOpacity>

          <View style={styles.card}>
            {loanTable.map(({title, value}, index) => {
              return (
                <View key={index} style={styles.flexItem}>
                  <Text style={styles.itemTitle}>{title}</Text>
                  <Text style={styles.itemValue}>{value}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.card}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: COLORS.dark, fontSize: 12}}>
                Disbursement Account
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Disbursement')}>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.secondary,
                    fontWeight: 'bold',
                  }}>
                  Add Account
                </Text>
              </TouchableOpacity>
            </View>

            {!userSelectedBankAccount.length > 0 && (
              <View style={{marginTop: 20, alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={0.9} style={[styles.bankCard]}>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: COLORS.white,
                      }}>
                      {/* {userSelectedBankAccount &&
                        userSelectedBankAccount.user_bank_name} */}
                      JOSHUA UDO NWOSU
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.light,
                      }}>
                      {/* {userSelectedBankAccount &&
                        userSelectedBankAccount.bank_name} */}
                      Access Bank(DIAMOND)
                    </Text>
                    <Text
                      style={{
                        marginTop: 40,
                        fontSize: 14,
                        color: COLORS.white,
                        opacity: 0.8,
                      }}>
                      {/* {userSelectedBankAccount &&
                        userSelectedBankAccount.bank_account_number} */}
                      0094552107
                    </Text>

                    <Image
                      style={{
                        width: 71,
                        height: 110,
                        position: 'absolute',
                        resizeMode: 'contain',
                        right: -21,
                        bottom: -20,
                        borderWidth: 1,
                      }}
                      source={images.maskGroup24}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[
              designs.buttonStyleB,
              {backgroundColor: '#00DC99', width: '100%'},
            ]}
            onPress={() => setVisible(true)}
            // onPress={() => navigation.navigate('EmergencyLoanDashBoard')}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              APPLY
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Spinner visible={spinner} animation="fade" size="large" />

      <LoanPurposeModal
        visible={showLoanPurposeModal}
        onRequestClose={() => setShowLoanPurposehModal(!showLoanPurposeModal)}
        onClick={(value) => setLoanPurpose(value)}
        loanPurpose={loanPurpose}
        setLoanPurpose={setLoanPurpose}
      />

      <ConfirmModal
        visible={modalVisible}
        onRequestClose={() => setVisible(!modalVisible)}
        data={{loanAmount, repaymentAmount, dueDate}}
        onClick={handleSubmit}
      />

      <SuccessModal
        visible={successModal}
        navigation={navigation}
        // onRequestClose={() => console.log('Joshua')}
        onRequestClose={() => setSuccessModal(!successModal)}
        // setSuccessModal={() => setSuccessModal(!successModal)}
      />
    </View>
  );
};

export default EmergencyLoanRequest;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  flexItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#46596920',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },

  itemTitle: {
    color: COLORS.dark,
    fontSize: 12,
  },
  itemValue: {
    color: COLORS.dark,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bankCard: {
    width: 250,
    height: 140,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
});
