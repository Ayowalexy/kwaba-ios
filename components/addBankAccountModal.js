import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectBankModal from './SelectBankModal';
import SelectBankAccountType from './SelectBankAccountType';
import { COLORS } from '../util';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAllBanks, getBankAccounts } from '../services/network';
import { baseUrl } from '../services/routes';
import ActionModal from './ActiomModal';
// import { paystackBanks } from '../services/network';


export default function AddBankAccountModal(props) {
  const { onRequestClose, visible, setDisplayAllBankAccounts, setReloadBanks, setBankModalVisible, onRequestClose_ = () => null } = props;

  const [selectedBank, setSelectedBank] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');

  const [bankData, setBankData] = useState([]);
  const [bankCode, setBankCode] = useState('');
  const [show, setVisible] = useState(false)
  const [msg, setMsg] = useState('')
  const [type, setType] = useState('')

  // const [selectAccountType, setSelectAccountType] = useState('');
  const [showSelectBankModal, setShowSelectBankModal] = useState(false);
  const [showSelectAccountTypeModal, setShowSelectAccountTypeModal] =
    useState(false);

  const [spinner, setSpinner] = useState(false);

  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [verifiedname, setVerifiedname] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [details, setDetails] = useState('');
  const [showBanks, setShowBanks] = useState(false)

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  // fetch banks via paystak
  const paystackBanks = async () => {
    try {
      // const banks = await axios.get('https://api.paystack.co/bank', {
      //   headers: {'Content-Type': 'application/json'}, timeout: 80000
      // });

      // // console.log("func")
      // // const res = await axios.get('https://google.com')
      // // console.log(res)     
      // setBankData(banks?.data);
      // return banks;
    } catch (error) {
      console.log('The Big Bang Error: ', error);
      // return error;
    }
  };


  useEffect(() => {
    //  paystackBanks()
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const res = await paystackBanks();
  //     setBankData(res?.data?.data);
  //     console.log('Paystack banks: ', res?.data);

  //     // console.log('RES BANK: ', res.data);
  //   })();
  //   // return () => {
  //   //   setBankData('');
  //   // };
  // }, []);

  // useEffect(() => {
  //   // console.\log('The banks: ', );
  //   getBanks();
  // }, []);

  // // fetch banks via nip
  // const getBanks = async () => {
  //   try {
  //     const response = await getAllBanks();
  //     if (response.status == 200) {
  //       // console.log('The bank nip: ', response.data.data.banks);
  //       setBankData(response.data.data.banks);
  //     }
  //   } catch (error) {
  //     console.log('Error: ', error);
  //   }
  // };

  // fetch banks
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const url = 'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/bank_email';
  //       const response = await axios.get(url, {
  //         headers: {'Content-Type': 'application/json'},
  //       });
  //       const data = response.data;

  //       const userData = await AsyncStorage.getItem('userData');
  //       const parsedUserData = JSON.parse(userData);

  //       if (response.status == 200) {
  //         // console.log(data.banks);
  //         setBankData(data.banks);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();

  //   return () => {
  //     setBankData('');
  //   };
  // }, []);

  const verifyBank = async (account_number, sort_code) => {
    try {
      const response = await axios.get(
        'https://kwaba-landlord-api-staging-fjjxl.ondigitalocean.app/api/rent-bank/landlord/properties',

        {
          params: {
            pageLimit: 10,
            pageNumber: 1
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: '123'
          },

        },
      );

      console.log('bankkk', response)
    } catch (e) {
      console.log('big bang error', e)
    }
  }

  const addAccount = async () => {
    setSpinner(true);
    const data = {
      bank_name: selectedBank,
      bank_account_number: bankAccountNumber,
      bank_short_code:
        bankCode.toString().length == 2 ? '0' + bankCode : bankCode,
    };

    console.log('The Bank Account: ', data);

    // verifyBank(data.bank_account_number, data.bank_short_code)

    // console.log('bank verification', res?.data)



    verifyBankAccount(data.bank_account_number, data.bank_short_code);
  };

  const verifyBankAccount = async (account_number, bank_code) => {
    console.log('na only the live endpoint sabi return better result, so use am');
    const url = `https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/user/bank_details`;

    // https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/
    try {
      console.log('here')
      const token = await getToken();
      const response = await axios.post(
        url,
        JSON.stringify({
          account_number: account_number,
          bank_code: bank_code,
        }),
        {
          headers: { 'Content-Type': 'application/json', Authorization: token },
        },
      );

      if (String(response.status).startsWith('2')) {
        setSpinner(false);


        const { account_name, account_number } = response?.data?.data;
        const userAccountDetails = {
          user_bank_name: account_name,
          bank_account_number: account_number,
          bank_name: selectedBank,
          bank_short_code: bank_code,
          type: 'savings',
        };
        console.log('Bank Account Verified: ', userAccountDetails);
        setVerifiedname(account_name)
        setDetails(userAccountDetails)
        // await createBankAccount(userAccountDetails);
      } else {
        setSpinner(false);
        console.log('Account not verified');
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error:', error.response.data);
      if (error.response.status == 500) {
        console.log('Error Bank Account not found...');
        Alert.alert('Error', 'Something went wrong, please check the account number and try again.')
      }
    }
  };

  const createBankAccount = async (data) => {
    let d = {
      ...data,
    };

    console.log('Create Bank: ', d);

    try {
      const url =
        `${baseUrl}/createbankaccount`;
      const token = await getToken();
      const response = await axios.post(url, JSON.stringify(d), {
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });

      if (String(response.status).startsWith('2')) {
        console.log('account successfully created');

        setVisible(true)
        setType('success')
        setMsg({
          header: 'Success',
          text: 'You have successfully added a bank account, keep transacting without limits.',
          action: 'Continue'
        })
        setTimeout(() => {
          onRequestClose();
        }, 2000);
        setUserBankAccounts([...userBankAccounts, response?.data?.userBanks]);
      }
    } catch (error) {
      console.log('Another Error:', error);
      if (error.response.status == 400) {
        setVisible(true)
        setType('success')
        setMsg({
          header: 'error',
          text: 'Error Account Already Exist',
          action: 'Continue'
        })
        console.log('Error Account Already Exists...');
      }
    }
  };

  useEffect(() => {
    setDisplayAllBankAccounts(userBankAccounts);
  }, [userBankAccounts]);

  useEffect(() => {
    const getAllBanks = async () => {
      try {
        const res = await getBankAccounts();
        console.log('existing banks', res.data);
        setUserBankAccounts(res.data.userBanks);
      } catch (error) {
        console.log(error);
      }
    };

    getAllBanks();
  }, []);



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
                    fontFamily: 'Poppins-Medium',
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
                  onRequestClose();
                  // onRequestClose_();

                  setTimeout(() => {
                   setShowSelectBankModal(true);
                  }, 200);

                  console.log(bankData);
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
                  style={{ fontWeight: 'bold' }}
                  color="#BABABA"
                />
              </TouchableOpacity>
              <TextInput
                style={[styles.textInput, { marginTop: 10 }]}
                placeholder="Account Number"
                keyboardType="number-pad"
                placeholderTextColor="#ADADAD"
                value={bankAccountNumber}
                onChangeText={setBankAccountNumber}
              />
              {
                Boolean(verifiedname) ? (
                  <Text style={{
                    paddingTop: 10,
                    textTransform: 'uppercase',
                    color: COLORS.dark

                  }}>
                    {verifiedname}
                  </Text>

                ) : null
              }
              <TouchableOpacity
                disabled={!bankAccountNumber || !selectedBank ? true : false}
                onPress={async () => {
                  if (Boolean(verifiedname)) {
                    await createBankAccount(details);
                  } else {
                    addAccount()
                  }
                }}
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
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                  {
                    Boolean(verifiedname) ? 'CONFIRM' : 'VERIFY'
                  }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ActionModal
          visible={show}
          setVisible={setVisible}
          type={type}
          msg={msg}
        />
      </View>

      <SelectBankModal
        onRequestClose={() => setShowSelectBankModal(!showSelectBankModal)}
        visible={showSelectBankModal}
        onClick={(bank, bankCode) => {
          setSelectedBank(bank);
          setBankCode(bankCode);
          setTimeout(() => {
            setBankModalVisible(!visible);
          }, 200)
        }}
        close={onRequestClose}
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

      <Spinner visible={spinner} size="large" cancelable={true} />

    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Medium',
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
