import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Tooltip from 'rn-tooltip';
import {useDispatch, useSelector} from 'react-redux';
import {
  getTotalSoloSavings,
  getMaxLoanCap,
} from '../../../redux/actions/savingsActions';
import {COLORS, FONTS, images} from '../../../util/index';
import designs from './style';
import {
  formatNumber,
  unFormatNumber,
  currencyFormat,
} from '../../../util/numberFormatter';
import { getInterestRateForSavingsAndBuddy} from '../../../services/network'

import {Formik, Field} from 'formik';
import * as yup from 'yup';


const emergencyFundFormSchema = yup.object().shape({
  requestAmount: yup.string().required('Provide an amount'),
});



export default function EmergencyLoanHome({navigation}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const [savings, setSavings] = useState(0);
  const [maximumLoanAmount, setMaximumLoanAmount] = useState(0);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [emergencyLoanRate, setEmergencyLoanRate] = useState(0)

  useEffect(() => {
    dispatch(getTotalSoloSavings());
    dispatch(getMaxLoanCap());
  }, []);

  useEffect(() => {

    (async () => {
      const rates = await getInterestRateForSavingsAndBuddy();
    setEmergencyLoanRate(rates.data[0].emergency_loans);

    })()
    const data = getMaxLoanCap1?.data;

    console.log('The Data: ', data);

    setSavings(data?.total_savings);
    // setMaximumLoanAmount(data?.max_loan_amount || '0.00');
    setMaximumLoanAmount(data?.maximumLoanAmount);
  }, []);

  const calculateRepayment = (amount) => {
    //OLD INTEREST RATE UPDATED TO VALUE FROM THE BACKEND FROM 2%
    // const interestRate = 0.02;
    const interestRate = emergencyLoanRate / 100;
    const repayment = Number(amount) + Number(amount) * interestRate;
    return repayment;
  };

  const handleSubmit = (values) => {
    if (errorMsg == '')
      navigation.navigate('EmergencyLoanRequest', {
        loan_amount: unFormatNumber(values?.requestAmount),
        repayment_amount: repaymentAmount,
      });
  };

  const checIfLoanable = (value) => {
    if (Number(unFormatNumber(value)) < 1000) {
      setErrorMsg('The minimum amount you can request is ₦1,000');
    } else {
      if (Number(unFormatNumber(value)) > maximumLoanAmount) {
        setErrorMsg(
          `The maximum amount you can get now is ₦${getMaxLoanCap1?.data?.maximumLoanAmount}`,
        );
        setRepaymentAmount(0);
      } else {
        setErrorMsg('');
        setRepaymentAmount(calculateRepayment(unFormatNumber(value)));
      }
    }
  };

  const NumberInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text
          style={{
            color: COLORS.dark,
            fontSize: 14,
            fontWeight: 'bold',
            lineHeight: 20,
            marginTop: 20,
          }}>
          {/* How much do you want? */}
          Tell us how much you want
        </Text>
        <View
          style={[
            styles.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && styles.errorInput,
          ]}>
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
              paddingLeft: 50,
              paddingVertical: 16,
            }}
            keyboardType="number-pad"
            value={formatNumber(value)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);

              // checks if request amount is less than or equal to maximum loan amount
              checIfLoanable(value);
            }}
            onChangeText={(text) => {
              onChange(name)(text.replace(/\D/g, ''));
            }}
            {...inputProps}
          />
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  return (
    <View
      style={[
        designs.container,
        {
          backgroundColor: '#F7F8FD',
        },
      ]}>
      {getMaxLoanCap1?.data?.you_have_save > 0 ? (
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={25}
            style={{
              fontWeight: '900',
              paddingHorizontal: 15,
              paddingVertical: 15,
              position: 'absolute',
            }}
            color={COLORS.primary}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
              
            <Image
              source={images.maskGroup44}
              style={{width: 100, height: 100, marginBottom: 20}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.primary,
                textAlign: 'center',
                lineHeight: 25,
              }}>
              To access emergency funds,{'\n'}you need to be an active saver on
              Kwaba.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SavingsHome')}
              style={{
                backgroundColor: COLORS.primary,
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 5,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.white,
                  textTransform: 'uppercase',
                }}>
                Begin Saving
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={25}
            style={{
              fontWeight: '900',
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
            color={COLORS.primary}
          />
          <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={false}
            style={{width: '100%', paddingHorizontal: 15}}>
            <Formik
              validationSchema={emergencyFundFormSchema}
              initialValues={{
                requestAmount: '',
              }}
              onSubmit={handleSubmit}>
              {({
                handleSubmit,
                isValid,
                values,
                status,
                errors,
                setValues,
                setStatus,
              }) => (
                <>
                  <View style={{textAlign: 'left', paddingLeft: 10}}>
                    <Text
                      style={[
                        {
                          color: COLORS.primary,
                          fontSize: 18,
                          fontWeight: 'bold',
                        },
                      ]}>
                      Emergency Fund
                    </Text>
                    <Text
                      style={[
                        {
                          color: '#46596995',
                          fontSize: 13,
                          marginTop: 6,
                          lineHeight: 20,
                          paddingRight: 50,
                        },
                      ]}>
                      {/* Based on your savings activities below the loan amount you can
                  get against you savings */}
                      Based on your saving activity, below is{'\n'}
                      how much you can get.
                    </Text>
                  </View>
                  <View style={designs.rlDisplay}>
                    <View style={designs.displayCard}>
                      <View>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: COLORS.white,
                              lineHeight: 15,
                            }}>
                            You have saved
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 20,
                            color: COLORS.white,
                            lineHeight: 29,
                            fontWeight: 'bold',
                          }}>
                          ₦{formatNumber(Number(savings).toFixed(2))}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="lock-closed"
                          size={15}
                          style={{fontWeight: '900'}}
                          color="yellow"
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 8,
                        paddingBottom: 11,
                        borderBottomWidth: 1,
                        borderColor: '#EAEAEA',
                      }}>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: COLORS.primary,
                            marginBottom: 4,
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}>
                          {/* Maximum Loan Amount */}
                          Available Loanable Amount
                        </Text>
                        <Tooltip
                          backgroundColor="#00DC99"
                          height={42.45}
                          withOverlay={false}
                          containerStyle={{
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                          }}
                          popover={
                            <Text
                              style={{
                                fontSize: 10,
                                color: 'white',
                                textAlign: 'left',
                              }}>
                              This is the most amount{'\n'}you can get against
                              your
                              {'\n'}savings
                            </Text>
                          }>
                          <Icon
                            name="information-circle"
                            size={20}
                            style={{
                              fontWeight: '900',
                              marginLeft: 5,
                            }}
                            color="#00DC99"
                          />
                        </Tooltip>
                      </View>
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontSize: 23,
                          lineHeight: 29,
                          fontWeight: 'bold',
                        }}>
                        ₦{formatNumber(Number(maximumLoanAmount).toFixed(2))}
                      </Text>
                    </View>

                    <Field
                      component={NumberInput}
                      name="requestAmount"
                      placeholder="Amount"
                    />
                    {errorMsg != '' && (
                      <Text
                        style={[
                          styles.errorText,
                          {marginTop: 5, fontSize: 12, lineHeight: 20},
                        ]}>
                        {errorMsg}
                      </Text>
                    )}
                  </View>
                  <View style={designs.repaymentTermsBox}>
                    <Text
                      style={{
                        color: '#FB8B24',
                        fontSize: 18,
                        lineHeight: 23,
                        marginBottom: 11,
                        fontWeight: 'bold',
                      }}>
                      Repayment Terms
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <View style={designs.repaymentTermsContent}>
                        <Text style={designs.smallTextTitles}>
                          Repayment Days
                        </Text>
                        <Text style={designs.repaymentTermsValues}>
                          30 Days
                        </Text>
                      </View>
                      <View style={designs.repaymentTermsContent}>
                        <Text style={designs.smallTextTitles}>
                          Amount To Repay
                        </Text>
                        <Text style={designs.repaymentTermsValues}>
                          ₦
                          {(maximumLoanAmount > 0 &&
                            formatNumber(repaymentAmount)) ||
                            ' 0.00'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    disabled={
                      errorMsg != '' ||
                      unFormatNumber(values.requestAmount) < 1000
                        ? true
                        : false
                    }
                    style={[
                      designs.buttonStyleB,
                      {
                        backgroundColor:
                          errorMsg != '' ||
                          unFormatNumber(values.requestAmount) < 1000
                            ? '#00DC9950'
                            : '#00DC99',
                        width: '100%',
                      },
                    ]}
                    onPress={handleSubmit}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      ACCESS LOAN
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 8,
    fontSize: 14,
  },
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },
});
