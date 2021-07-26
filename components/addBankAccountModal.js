import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectBankModal from './SelectBankModal';
import SelectBankAccountType from './SelectBankAccountType';
import {COLORS} from '../util';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default function AddBankAccountModal(props) {
  const {onRequestClose, visible, onConfirm, setDisplayAllBankAccounts} = props;
  const [selectedBank, setSelectedBank] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');

  const [bankData, setBankData] = useState([]);
  const [bankCode, setBankCode] = useState('');

  // const [selectAccountType, setSelectAccountType] = useState('');
  const [showSelectBankModal, setShowSelectBankModal] = useState(false);
  const [showSelectAccountTypeModal, setShowSelectAccountTypeModal] = useState(
    false,
  );

  const [spinner, setSpinner] = useState(false);

  const [userBankAccounts, setUserBankAccounts] = useState([]);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  // fetch banks
  useEffect(() => {
    (async () => {
      try {
        const url = 'http://67.207.86.39:8000/api/v1/bank_email';
        const response = await axios.get(url, {
          headers: {'Content-Type': 'application/json'},
        });
        const data = response.data;

        const userData = await AsyncStorage.getItem('userData');
        const parsedUserData = JSON.parse(userData);

        if (response.status == 200) {
          // console.log(data.banks);
          setBankData(data.banks);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      setBankData('');
    };
  }, []);

  const addAccount = async () => {
    setSpinner(true);
    // console.log('start');
    const data = {
      bank_name: selectedBank,
      bank_account_number: bankAccountNumber,
      bank_short_code:
        bankCode.toString().length == 2 ? '0' + bankCode : bankCode,
    };

    // console.log('DATA: ', data);

    verifyBankAccount(data.bank_account_number, data.bank_short_code);
  };

  const verifyBankAccount = async (account_number, bank_code) => {
    const url = 'http://67.207.86.39:8000/api/v1/user/bank_details';
    try {
      const token = await getToken();
      const response = await axios.post(
        url,
        JSON.stringify({
          account_number: account_number,
          bank_code: bank_code,
        }),
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      if (response.data.accountStatus == true) {
        setSpinner(false);
        // console.log('VERIFY CARD FROM BACKEND: ', response.data.data);

        const {account_name, account_number} = response.data.data;
        const userAccountDetails = {
          user_bank_name: account_name,
          bank_account_number: account_number,
          bank_name: selectedBank,
          bank_short_code: bank_code,
          type: 'savings',
        };
        await createBankAccount(userAccountDetails);
        getBankAccounts();
      } else {
        setSpinner(false);
        console.log('Account not verified');
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error:', error.response);
    }
  };

  const createBankAccount = async (data) => {
    let d = {
      ...data,
      created_at: '',
      updated_at: '',
    };

    // console.log(d);

    // console.log('DETAIL', data);
    const url = 'http://67.207.86.39:8000/api/v1/createbankaccount';
    const token = await getToken();
    try {
      const response = await axios.post(url, JSON.stringify(d), {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      if (response.status == 200) {
        // console.log('Card successfully added');
        // setActionModal(true)
        onRequestClose();
        // setUserBankAccounts((oldValues) => [
        //   ...oldValues,
        //   response.data.userBanks,
        // ]);
        setUserBankAccounts([...userBankAccounts, response.data.userBanks]);
        // console.log('RESPONSE:', response.data.userBanks);
        // getBankAccounts();
      }
    } catch (error) {
      console.log('Another Error:', error);
    }
  };

  useEffect(() => {
    getBankAccounts();
  }, []);

  useEffect(() => {
    // console.log('******');
    // console.log('All bank accounts: ', userBankAccounts);
    setDisplayAllBankAccounts(userBankAccounts);
  }, [userBankAccounts]);

  const getBankAccounts = async () => {
    const url = 'http://67.207.86.39:8000/api/v1/getuserbankaccounts';
    try {
      const token = await getToken();
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });

      setUserBankAccounts(response.data.userBanks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onRequestClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: COLORS.dark,
                    fontFamily: 'CircularStd',
                    fontWeight: 'bold',
                    fontSize: 18,
                    lineHeight: 19,
                  }}>
                  Add Account
                </Text>
                <Icon
                  onPress={onRequestClose}
                  name="close-outline"
                  size={30}
                  color="#465969"
                />
              </View>

              <TouchableOpacity
                style={styles.customInput}
                onPress={() => {
                  setShowSelectBankModal(!showSelectBankModal);
                  // console.log(bankData);
                }}>
                {selectedBank != '' ? (
                  <Text
                    style={{
                      // fontWeight: 'bold',
                      color: COLORS.primary,
                    }}>
                    {selectedBank}
                  </Text>
                ) : (
                  <Text
                    style={{
                      // fontWeight: 'bold',
                      color: '#aaa',
                      fontSize: 13,
                    }}>
                    Select Bank
                  </Text>
                )}

                <Icon
                  name="chevron-down-outline"
                  size={20}
                  style={{fontWeight: 'bold'}}
                  color="#BABABA"
                />
              </TouchableOpacity>
              <TextInput
                style={[styles.textInput, {marginTop: 10}]}
                placeholder="Account Number"
                keyboardType="number-pad"
                placeholderTextColor="#ADADAD"
                value={bankAccountNumber}
                onChangeText={setBankAccountNumber}
              />
              <TouchableOpacity
                disabled={!bankAccountNumber || !selectedBank ? true : false}
                onPress={addAccount}
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      !bankAccountNumber || !selectedBank
                        ? '#00DC99'
                        : '#00DC99',
                  },
                ]}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                  CONFIRM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <SelectBankModal
        onRequestClose={() => setShowSelectBankModal(!showSelectBankModal)}
        visible={showSelectBankModal}
        onClick={(bank, bankCode) => {
          setSelectedBank(bank);
          setBankCode(bankCode);
        }}
        banks={bankData}
        selectedBank={selectedBank}
        // setBankCode={(value) => setBankCode(value)}
      />

      {/* <SelectBankAccountType
        onRequestClose={() =>
          setShowSelectAccountTypeModal(!showSelectAccountTypeModal)
        }
        visible={showSelectAccountTypeModal}
        onClick={(value) => setSelectedAccountType(value)}
        selectedAccountType={selectedAccountType}
      /> */}

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 25,
  },
  btn: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 13,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
});
