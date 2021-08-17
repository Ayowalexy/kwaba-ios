import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {formatNumber} from '../../util/numberFormatter';
import {onChange} from 'react-native-reanimated';

import SelectSavingsOptionModal from '../../components/SelectSavingsOptionModal';
import LoandPurposeModal from '../../components/LoanPurposeModal';

import {useDispatch, useSelector} from 'react-redux';
import {getTotalSoloSavings} from '../../redux/actions/savingsActions';

const withdrawalFormSchema = yup.object().shape({
  savingsOption: yup.string().required('Select accomodation status'),
  withdrawalAmount: yup.string().required('Provide an amount'),
  reason: yup.string().required('Provide an amount'),
});

export default function Withdraw({navigation}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const [savings, setSavings] = useState(0);
  const [amountValue, setAmountValue] = useState('');
  const [showSavingsOptionModal, setShowSavingsOptionModal] = useState(false);

  const [selectedAmountIndex, setSelectedAmountIndex] = useState(1);

  const [showLoanPurposeModal, setShowLoanPurposehModal] = useState(false);
  const [loanPurpose, setLoanPurpose] = useState('');

  useEffect(() => {
    dispatch(getTotalSoloSavings());
  }, []);

  useEffect(() => {
    const totalSoloSavings =
      store?.data?.length > 0
        ? store.data.reduce((acc, saving) => acc + Number(saving.amount), 0)
        : 0;
    setSavings(totalSoloSavings);
    console.log('Total: ', totalSoloSavings);
  }, [store]);

  const handleSubmit = async (values) => {
    console.log(values);
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
              Select Savings Option
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

  const AmountOptions = (props) => {
    const amount_option_list = ['Full Amount', 'Specific Amount'];

    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        {amount_option_list.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.amountButton]}
            // onPress={() => setFieldValue('withdrawalAmount', option)}
            onPress={() => setSelectedAmountIndex(index)}>
            <View
              style={{
                flex: 1,
                // borderWidth: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                // marginTop: 15,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // borderWidth: 1,
                  paddingLeft: 20,
                }}>
                {/* radio button */}
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {selectedAmountIndex == index && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 12,
                        backgroundColor: COLORS.primary,
                      }}
                    />
                  )}
                </View>
                {/* text value */}
                <Text
                  style={{
                    fontSize: 14,
                    // fontWeight: 'bold',
                    color: '#999',
                    marginLeft: 20,
                  }}>
                  {option}
                </Text>
              </View>

              {option.toLowerCase() != 'full amount' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 0.7,
                    backgroundColor: '#f5f5f5',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      position: 'absolute',
                      left: 15,
                      color: COLORS.dark,
                    }}>
                    ₦
                  </Text>
                  <TextInput
                    style={{
                      width: '100%',
                      // height: '100%',
                      paddingLeft: 32,
                      color: COLORS.dark,
                      fontWeight: 'bold',
                      fontSize: 14,
                      // borderWidth: 1,
                      marginTop: 1,
                    }}
                    keyboardType="number-pad"
                    value={formatNumber(amountValue)}
                    onChangeText={(text) => setAmountValue(text)}
                    // autoFocus={selectedAmountIndex == 1 ? true : false}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: '100%',
                    flex: 0.7,
                    justifyContent: 'center',
                    // paddingLeft: 30,
                  }}>
                  <Text
                    style={{
                      left: 15,
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: COLORS.dark,
                    }}>
                    ₦ {formatNumber(savings)}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

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
            // setShowTypeOfPropertiesModal(!showTypeOfPropertiesModal);
            setShowLoanPurposehModal(!showLoanPurposeModal);
          }}>
          {loanPurpose != '' ? (
            <Text
              style={{
                color: COLORS.primary,
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
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
        color={COLORS.primary}
      />
      <Text style={[styles.heading]}>Withdraw</Text>

      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        {savings <= 0 ? (
          <View style={[styles.content, {alignItems: 'center'}]}>
            <Image source={images.piggy} style={[styles.image]} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.primary,
              }}>
              Cheeky!
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'normal',
                color: '#999',
                lineHeight: 22,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              You know you don't have an active{'\n'}rent savings right?
            </Text>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => navigation.navigate('SavingsHome')}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 12,
                  lineHeight: 30,
                  textTransform: 'uppercase',
                }}>
                START SAVING
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Formik
            validationSchema={withdrawalFormSchema}
            initialValues={{
              savingsOption: '',
              withdrawalAmount: '',
              reason: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({handleSubmit, isValid, values, setValues}) => (
              <>
                <View style={[styles.content]}>
                  <Field component={SelectSavings} name="savingsOption" />
                  <Field component={AmountOptions} name="withdrawalAmount" />
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
                        fontSize: 16,
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
                        Change
                      </Text>
                    </TouchableOpacity>
                  </View>

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
                  {/* <View style={{marginTop: 20, alignItems: 'center'}}>
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
                          JOSHUA UDO NWOSU
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: COLORS.light,
                          }}>
                          Access Bank
                        </Text>
                        <Text
                          style={{
                            top: 70,
                            fontSize: 14,
                            color: COLORS.white,
                            opacity: 0.8,
                          }}>
                          0094552107
                        </Text>

                        <Image
                          style={{
                            width: 71,
                            height: 100,
                            position: 'absolute',
                            resizeMode: 'contain',
                            right: -21,
                            bottom: -100,
                            borderWidth: 1,
                          }}
                          source={images.maskGroup24}
                        />
                      </View>
                    </TouchableOpacity>
                  </View> */}

                  <TouchableOpacity
                    style={[styles.button]}
                    // onPress={() => navigation.navigate('SavingsHome')}
                    onPress={handleSubmit}>
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
                </View>

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
                  onClick={(value) => setLoanPurpose(value)}
                  loanPurpose={loanPurpose}
                  setLoanPurpose={setLoanPurpose}
                />
              </>
            )}
          </Formik>
        )}
      </ScrollView>
    </View>
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
    width: 300,
    height: 300,
    // borderWidth: 1,
    marginVertical: 10,
    resizeMode: 'contain',
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
    width: 300,
    maxWidth: '100%',
    height: 170,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
});
