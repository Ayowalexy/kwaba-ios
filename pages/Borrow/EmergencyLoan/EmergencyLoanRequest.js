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
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import {getBankAccounts} from '../../../redux/actions/bankActions';
import {useDispatch, useSelector} from 'react-redux';
import {getBankFromStorageReducer} from '../../../redux/reducers/bankReducer';
import {getMaxLoanCap} from '../../../redux/actions/savingsActions';
import DisbursementModal from './DisbursementModal';
import { setEmergencyLoans } from '../../../redux/reducers/store/emergency-loan/emergency-loans.action';



const EmergencyLoanRequest = ({route, navigation}) => {
  const dispatch = useDispatch();
  const theStoredAccount = useSelector(
    (state) => state.getBankFromStorageReducer,
  );
  const userBankAccounts = useSelector((state) => state.getBankAccountsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
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

  const [disbursementModal, setDisbursementModal] = useState(false);

  const top = useSafeAreaInsets().top;
  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    dispatch(getBankAccounts());
  }, []);

  useEffect(() => {
    console.log('Called again nnn...');
    getBankAccountLocally();
  }, [getMaxLoanCap1]);

  // useEffect(() => {
  //   (async () => {
  //     const user = await getUser();
  //     const localBank = await AsyncStorage.getItem(`storeBank-${user.id}`);
  //     userBankAccounts?.data?.map(async (item, index) => {
  //       if (
  //         item.bank_account_number != JSON.parse(localBank).bank_account_number
  //       ) {
  //         await AsyncStorage.removeItem(`storeBank-${user.id}`);
  //       }
  //     });
  //   })();
  // }, []);

  const getBankAccountLocally = async () => {
    const user = await getUser();
    const account = await AsyncStorage.getItem(`storeBank-${user.id}`);
    const parsedData = JSON.parse(account);
    console.log('The parsed bank', parsedData?.user_bank_name);
    setUserSelectedBankAccount(parsedData);
  };

  useEffect(() => {
    setLoanAmount(route?.params?.loan_amount);
    setRepaymentAmount(route?.params?.repayment_amount);
    setDueDate(moment().add(30, 'days').format('DD, MMM YYYY'));
  }, []);

  const loanTable = [
    {
      title: 'Loan Amount',
      value: `???${currencyFormat(Number(loanAmount))}`,
    },
    {
      title: 'Repayment Amount',
      value: `???${currencyFormat(Number(repaymentAmount))}`,
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

    console.log('user select bank', userSelectedBankAccount)

    if(Object.is(null, userSelectedBankAccount)){
      return Alert.alert('No bank account selected','Please add an account')
    }
    const data = {
      loan_amount: loanAmount,
      loan_purpose: loanPurpose,

      disbursement_account_name: userSelectedBankAccount.user_bank_name,
      disbursement_account_number: userSelectedBankAccount.bank_account_number,
      disbursement_account_bank: userSelectedBankAccount.bank_name,
    };

    console.log('DATA: ', data);

    try {
      setSpinner(true);
      const response = await applyForEmergencyLoan(data);
      console.log('RESPONSE: ', response);
      if (response.status == 201) {
        setSpinner(false);
        setSuccessModal(true);
        setVisible(false);
        dispatch(setEmergencyLoans(loanAmount))
        console.log('Success');
      } else {
        setSpinner(false);
        console.log(response.data.statusMsg);
      }
    } catch (error) {
      setSpinner(false);
      setVisible(false);
      console.log(error);
    }
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD', marginTop: Platform.OS == 'ios' ? top : 0}]}>
      <Icon
        onPress={() => {
          navigation.goBack();
          dispatch(getBankAccounts());
          dispatch(getMaxLoanCap());
        }}
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
                // onPress={() => navigation.navigate('Disbursement')}
                onPress={() => setDisbursementModal(true)}>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.secondary,
                    fontWeight: 'bold',
                  }}>
                  {userSelectedBankAccount ? 'Change Account' : 'Add Account'}
                </Text>
              </TouchableOpacity>
            </View>

            {userSelectedBankAccount && (
              <View style={{marginTop: 20}}>
                <TouchableOpacity activeOpacity={0.9} style={[styles.bankCard]}>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: COLORS.white,
                      }}>
                      {userSelectedBankAccount?.user_bank_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: COLORS.light,
                      }}>
                      {userSelectedBankAccount?.bank_name}
                    </Text>
                    <Text
                      style={{
                        marginTop: 20,
                        fontSize: 14,
                        color: COLORS.white,
                        opacity: 0.8,
                      }}>
                      {userSelectedBankAccount?.bank_account_number}
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
              // {backgroundColor: '#00DC99', width: '100%'},
              {
                backgroundColor:
                  loanPurpose == '' && userSelectedBankAccount?.user_bank_name
                    ? '#00DC9950'
                    : '#00DC99',
                width: '100%',
              },
            ]}
            onPress={() => setVisible(true)}
            disabled={
              loanPurpose == '' && userSelectedBankAccount?.user_bank_name
                ? true
                : false
            }
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

      {showLoanPurposeModal && (
        <LoanPurposeModal
          visible={showLoanPurposeModal}
          onRequestClose={() => setShowLoanPurposehModal(!showLoanPurposeModal)}
          onClick={(value) => setLoanPurpose(value)}
          loanPurpose={loanPurpose}
          setLoanPurpose={setLoanPurpose}
        />
      )}

      {modalVisible && (
        <ConfirmModal
          visible={modalVisible}
          onRequestClose={() => setVisible(!modalVisible)}
          data={{loanAmount, repaymentAmount, dueDate}}
          onClick={handleSubmit}
        />
      )}

      {successModal && (
        <SuccessModal
          visible={successModal}
          navigation={navigation}
          // onRequestClose={() => console.log('Joshua')}
          onRequestClose={() => setSuccessModal(!successModal)}
          // setSuccessModal={() => setSuccessModal(!successModal)}
        />
      )}

      {disbursementModal && (
        <DisbursementModal
          onRequestClose={() => setDisbursementModal(!disbursementModal)}
          visible={disbursementModal}
        />
      )}
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
    paddingHorizontal: 10,
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
    width: 270,
    height: 120,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
});
