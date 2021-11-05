import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
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
import SavingsListModal from './SavingsListModal';

import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {getBankAccounts, requestWithdrawal} from '../../../services/network';

import Spinner from 'react-native-loading-spinner-overlay';

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
  const [selectedAmountIndex, setSelectedAmountIndex] = useState(0);
  const [showLoanPurposeModal, setShowLoanPurposehModal] = useState(false);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [withdrawSource, setWithdrawSource] = useState('');
  const [userSelectedBankAccount, setUserSelectedBankAccount] = useState([]);

  const [showSavingsListModal, setShowSavingsListModal] = useState(false);
  const [item, setItem] = useState(false);

  const [selectedBank, setSelectedBank] = useState('');

  const [spinner, setSpinner] = useState(false);

  const focusedInput = useRef();

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

      setUserSelectedBankAccount(JSON.parse(storeBank));
    })();
  }, []);

  useEffect(() => {
    dispatch(getMaxLoanCap());
    getBanks();
  }, []);

  //   useEffect(() => {
  //     const data = getMaxLoanCap1.data;
  //     setSavings(data?.you_have_save);
  //   }, []);

  useEffect(() => {
    if (item) {
      console.log('The save: ', item.save_amount);
      setSavings(item.amount_save);
    }
  }, [item]);

  const getBanks = async () => {
    const accounts = await getBankAccounts();

    try {
      console.log('The bank account: ', accounts?.data?.userBanks);
      const currentBank = accounts?.data?.userBanks.filter(
        (item) => item.defaultbank != 1,
      )[0];
      setSelectedBank(currentBank);
      console.log('Current: ', currentBank);
      console.log('Current user bank name: ', currentBank.user_bank_name);
    } catch (error) {
      console.log('The error: ', error);
    }
  };

  const handleSubmit = async (values) => {
    const data = {
      option:
        values.savingsOption == 'Solo Savings'
          ? 'savings'
          : values.savingsOption,
      amount: selectedAmountIndex == 0 ? savings : unFormatNumber(amountValue),
      reason: values.reason,
      savings_id: item && item.id,
      account_number: selectedBank?.bank_account_number,
      account_name: selectedBank?.user_bank_name,
      bank_name: selectedBank?.bank_name,
      bank_code: selectedBank?.bank_short_code,
    };
    // console.log('The Data Withdraw: ', data);
    setSpinner(true);
    try {
      const response = await requestWithdrawal(data);
      if (response.status == 200) {
        setSpinner(false);

        console.log(response);
        Alert.alert('Successful', 'Your withdrawal request has been sent', [
          {text: 'Continue', onPress: () => navigation.navigate('Home')},
        ]);
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error);
    }
    // console.log('Item: ', item);
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

                {item && (
                  <TouchableOpacity
                    style={[
                      styles.card,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 0,
                      },
                    ]}
                    onPress={() => {
                      setShowSavingsListModal(true);
                    }}>
                    <View style={[styles.cardFlex, {flex: 1}]}>
                      <View style={[styles.progressContainer]}>
                        <AnimatedCircularProgress
                          size={60}
                          width={5}
                          rotation={0}
                          style={{zIndex: 9, position: 'relative'}}
                          fill={
                            (Number(item.amount_save) /
                              Number(item.target_amount)) *
                            100
                          }
                          tintColor={COLORS.light}
                          backgroundColor="#2A286A10">
                          {(fill) => (
                            <View
                              style={{
                                backgroundColor: COLORS.white,
                                height: 40,
                                width: 40,
                                borderRadius: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // elevation: 2,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'CircularStd',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: COLORS.dark,
                                  textAlign: 'center',
                                }}>
                                {fill.toFixed(0)}%
                              </Text>
                            </View>
                          )}
                        </AnimatedCircularProgress>
                      </View>
                      <View style={[styles.cardText]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text style={[styles.cardTitle]}>{item.name}</Text>
                        </View>

                        <View style={[styles.cardAmount]}>
                          <View>
                            <Text style={{fontSize: 12, color: COLORS.dark}}>
                              Amount Saved
                            </Text>
                            <Text style={[styles.amountText]}>
                              ₦{formatNumber(item.amount_save) || '0.00'}
                            </Text>
                          </View>
                          <View>
                            <Text style={{fontSize: 12, color: COLORS.dark}}>
                              Target Amount
                            </Text>
                            <Text style={[styles.amountText]}>
                              ₦{formatNumber(item.target_amount)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}

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
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          selectedAmountIndex == 0 ? COLORS.dark : '#46596950',
                      }}>
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
                        color:
                          selectedAmountIndex == 0 ? COLORS.dark : '#46596950',
                        textAlign: 'center',
                      }}>
                      ₦
                    </Text>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color:
                            selectedAmountIndex == 0
                              ? COLORS.dark
                              : '#46596950',
                        }}>
                        {formatNumber(savings) || '0.00'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedAmountIndex(1);
                    focusedInput.current.focus();
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
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          selectedAmountIndex == 1 ? COLORS.dark : '#46596950',
                      }}>
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
                        color:
                          selectedAmountIndex == 1 ? COLORS.dark : '#46596950',
                        textAlign: 'center',
                      }}>
                      ₦
                    </Text>
                    <TextInput
                      ref={focusedInput}
                      style={{
                        color:
                          selectedAmountIndex == 1 ? COLORS.dark : '#46596950',
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginTop: 1,
                        flex: 1,
                      }}
                      keyboardType="number-pad"
                      value={formatNumber(amountValue)}
                      onChangeText={(text) => setAmountValue(text)}
                      //   autoFocus={selectedAmountIndex == 0}
                      //   focusable={selectedAmountIndex == 1}
                    />
                  </View>
                </TouchableOpacity>
                {item && Number(amountValue) > Number(item.amount_save) && (
                  <Text
                    style={{color: COLORS.red, fontSize: 10, marginLeft: 5}}>
                    Insuffiecent funds
                  </Text>
                )}

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
                    onPress={() => navigation.navigate('CardAndBankDetails')}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                      }}>
                      {selectedBank != '' ? 'Change Account' : 'Add Account'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {selectedBank != '' && (
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
                          {selectedBank?.user_bank_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: COLORS.light,
                          }}>
                          {/* Access Bank(DIAMOND) */}
                          {selectedBank?.bank_name}
                        </Text>
                        <Text
                          style={{
                            marginTop: 20,
                            fontSize: 14,
                            color: COLORS.white,
                            opacity: 0.8,
                          }}>
                          {/* 0094552107 */}
                          {selectedBank?.bank_account_number}
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
                  setWithdrawSource(value);
                  setItem(false);
                  //   console.log('Values: ', value);
                  if (value == 'Solo Savings') {
                    setShowSavingsListModal(true);
                  }
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

              {values.savingsOption != '' && (
                <SavingsListModal
                  onRequestClose={() =>
                    setShowSavingsListModal(!showSavingsListModal)
                  }
                  visible={showSavingsListModal}
                  type={values.savingsOption}
                  navigation={navigation}
                  selectedItem={(item) => setItem(item)}
                />
              )}
            </>
          )}
        </Formik>
      </View>

      <Spinner visible={spinner} size="large" />
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

  //

  cardContainer: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    // backgroundColor: COLORS.primary,
    width: '100%',
    flex: 1,
  },
  card: {
    width: '100%',
    // backgroundColor: '#9D98EC20',
    backgroundColor: COLORS.white,
    borderRadius: 5,
    // marginBottom: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ADADAD50',
  },
  cardFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginRight: 20,
  },
  cardText: {
    // borderWidth: 1,
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: COLORS.dark,
    marginRight: 20,
  },
  cardAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  amountText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: COLORS.dark,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
