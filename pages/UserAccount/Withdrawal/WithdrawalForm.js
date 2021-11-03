import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

import {COLORS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';

import SelectSavingsOptionModal from '../../../components/SelectSavingsOptionModal';
import LoandPurposeModal from '../../../components/LoanPurposeModal';

import {useDispatch, useSelector} from 'react-redux';
import {getMaxLoanCap} from '../../../redux/actions/savingsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const withdrawalFormSchema = yup.object().shape({
  savingsOption: yup.string().required('Select accomodation status'),
  reason: yup.string().required('Select a reason'),
});

export default function WithdrawalForm(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const theStoredAccount = useSelector(
    (state) => state.getBankFromStorageReducer,
  );
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const [savings, setSavings] = useState(0);
  const [amountValue, setAmountValue] = useState('');
  const [showSavingsOptionModal, setShowSavingsOptionModal] = useState(false);
  const [selectedAmountIndex, setSelectedAmountIndex] = useState(1);
  const [showLoanPurposeModal, setShowLoanPurposehModal] = useState(false);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [userSelectedBankAccount, setUserSelectedBankAccount] = useState([]);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      const storeBank = await AsyncStorage.getItem(`storeBank-${user.id}`);
      console.log('The Account From Local Storage: ', storeBank);
    })();
  }, []);

  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);

  useEffect(() => {
    const data = getMaxLoanCap1.data;
    setSavings(data.you_have_save);
  }, []);

  useEffect(() => {
    console.log('From Redux Store Man: ', theStoredAccount);
    setUserSelectedBankAccount(theStoredAccount.data);
  }, [theStoredAccount]);

  const handleSubmit = async (values) => {
    const data = {
      option:
        values.savingsOption == 'Solo Savings'
          ? 'savings'
          : values.savingsOption,
      amount: selectedAmountIndex == 0 ? savings : unFormatNumber(amountValue),
      reason: values.reason,
      savings_id: '',
      account_number: '',
      account_name: '',
      bank_name: '',
      bank_code: '',
    };
    console.log('The Data Withdraw: ', data);
  };

  const SelectSavings = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowSavingsOptionModal(!showSavingsOptionModal);
          }}>
          {value != '' ? (
            <Text
              style={{
                color: COLORS.primary,
              }}>
              {value}
            </Text>
          ) : (
            <Text
              style={{
                color: '#BABABA',
              }}>
              Select Withdrawal Source
            </Text>
          )}

          <Icon
            name="chevron-down-outline"
            size={20}
            style={{fontWeight: 'bold'}}
            color="#BABABA"
          />
        </TouchableOpacity>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const SelectReason = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowLoanPurposehModal(!showLoanPurposeModal);
          }}>
          {loanPurpose != '' ? (
            <Text
              style={{
                color: COLORS.dark,
              }}>
              {loanPurpose}
            </Text>
          ) : (
            <Text
              style={{
                color: '#BABABA',
              }}>
              Reason
            </Text>
          )}

          <Icon
            name="chevron-down-outline"
            size={20}
            style={{fontWeight: 'bold'}}
            color="#BABABA"
          />
        </TouchableOpacity>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  return (
    <>
      <View style={[styles.content]}>
        <Formik
          validationSchema={withdrawalFormSchema}
          initialValues={{
            savingsOption: '',
            reason: '',
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}>
          {({handleSubmit, isValid, values, setValues}) => (
            <>
              <View style={{flex: 1}}>
                <Field component={SelectSavings} name="savingsOption" />

                <TouchableOpacity
                  onPress={() => {
                    setSelectedAmountIndex(0);
                  }}
                  style={{
                    marginTop: 10,
                    height: 65,
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#ADADAD50',
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      flex: 3,
                      height: '100%',
                      width: '100%',
                      borderRightWidth: 1,
                      borderRightColor: '#ADADAD50',
                      paddingLeft: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name={
                        selectedAmountIndex == 0
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={25}
                      color={COLORS.dark}
                      style={{marginRight: 10}}
                    />
                    <Text style={{fontSize: 14, color: COLORS.dark}}>
                      Full Amount
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        width: 30,
                        fontWeight: 'bold',
                        color: COLORS.dark,
                        textAlign: 'center',
                      }}>
                      ₦
                    </Text>
                    <View
                      style={{
                        color: COLORS.dark,
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginTop: 1,
                        flex: 1,
                      }}>
                      <Text style={{fontWeight: 'bold', color: COLORS.dark}}>
                        {formatNumber(savings)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedAmountIndex(1);
                  }}
                  style={{
                    marginTop: 10,
                    height: 65,
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#ADADAD50',
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      flex: 3,
                      height: '100%',
                      width: '100%',
                      borderRightWidth: 1,
                      borderRightColor: '#ADADAD50',
                      paddingLeft: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name={
                        selectedAmountIndex == 1
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={25}
                      color={COLORS.dark}
                      style={{marginRight: 10}}
                    />
                    <Text style={{fontSize: 14, color: COLORS.dark}}>
                      Specific Amount
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        width: 30,
                        fontWeight: 'bold',
                        color: COLORS.dark,
                        textAlign: 'center',
                      }}>
                      ₦
                    </Text>
                    <TextInput
                      style={{
                        color: COLORS.dark,
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginTop: 1,
                        flex: 1,
                      }}
                      keyboardType="number-pad"
                      value={formatNumber(amountValue)}
                      onChangeText={(text) => setAmountValue(text)}
                      //   autoFocus
                    />
                  </View>
                </TouchableOpacity>

                <Field component={SelectReason} name="reason" />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      color: COLORS.dark,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    Bank Account
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Disbursement')}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                      }}>
                      {theStoredAccount?.data
                        ? 'Change Account'
                        : 'Add Account'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {!theStoredAccount?.data && (
                  <View style={{marginVertical: 30, alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CardAndBankDetails')}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: COLORS.primary,
                          textAlign: 'center',
                        }}>
                        No account? Click to select bank account
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {theStoredAccount?.data && (
                  <View style={{marginTop: 20}}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={[styles.bankCard]}>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: COLORS.white,
                          }}>
                          {/* JOSHUA UDO NWOSU */}
                          {theStoredAccount?.data?.user_bank_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: COLORS.light,
                          }}>
                          {/* Access Bank(DIAMOND) */}
                          {theStoredAccount?.data?.bank_name}
                        </Text>
                        <Text
                          style={{
                            marginTop: 20,
                            fontSize: 14,
                            color: COLORS.white,
                            opacity: 0.8,
                          }}>
                          {/* 0094552107 */}
                          {theStoredAccount?.data?.bank_account_number}
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

              <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 12,
                    lineHeight: 30,
                    textTransform: 'uppercase',
                  }}>
                  WITHDRAW
                </Text>
              </TouchableOpacity>
              {/* </View> */}

              <SelectSavingsOptionModal
                onRequestClose={() =>
                  setShowSavingsOptionModal(!showSavingsOptionModal)
                }
                visible={showSavingsOptionModal}
                onClick={(value) => {
                  setValues({...values, savingsOption: value});
                }}
              />

              <LoandPurposeModal
                visible={showLoanPurposeModal}
                onRequestClose={() =>
                  setShowLoanPurposehModal(!showLoanPurposeModal)
                }
                onClick={(value) => {
                  setValues({...values, reason: value});
                  setLoanPurpose(value);
                }}
                loanPurpose={loanPurpose}
                setLoanPurpose={setLoanPurpose}
              />
            </>
          )}
        </Formik>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    // borderWidth: 1,
    marginVertical: 10,
    resizeMode: 'contain',
    marginTop: 50,
  },

  button: {
    width: '100%',
    padding: 15,
    // height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    marginTop: 20,
    marginBottom: 20,
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
  },
  label: {
    color: COLORS.dark,
    marginTop: 20,
    fontSize: 12,
  },
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },

  amountButton: {
    backgroundColor: COLORS.white,
    marginTop: 15,
    height: 65,
    borderWidth: 1,
    borderColor: '#ADADAD50',
    borderRadius: 5,
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
