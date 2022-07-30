import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images, COLORS} from '../../util/index';
import RepaymentCard from './RepaymentCard';
import {
  currencyFormat,
  formatNumber,
  unFormatNumber,
} from '../../util/numberFormatter';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import CreditCardModalRNPL from '../../components/CreditCard/CreditCardModalRNPL';
import { getCurrentApplication } from '../../services/network';
import { getEmergencyLoans } from '../../services/network';
import { baseUrl } from '../../services/routes';



export default function RentNowPayLaterDashboard({navigation}) {
  const [percentAchieved, setPercentAchieved] = useState(75);
  const [nextPaymentDueDate, setnextPaymentDueDate] = useState(45);
  const [noOfDaysToNextPayment, setnoOfDaysToNextPayment] = useState(45);
  const [repaymentBalance, setrepaymentBalance] = useState(45);
  const [monthlyRepayment, setmonthlyRepayment] = useState();
  const [repaymentPlan, setrepaymentPlan] = useState();
  const [repaymentPlanCount, setrepaymentPlanCount] = useState();

  const [loanID, setLoanID] = useState('');

  // modal
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showAmountField, setShowAmountField] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const [resDataObj, setResDataObj] = useState('');

  const [visible, setVisible] = useState(false);

  const amountSchema = yup.object().shape({
    amount: yup.string().required('Please provide amount'),
  });

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();

      let stepsData = {
        application_form: 'done',
        congratulation: 'done',
        all_documents: 'done',
        verifying_documents: 'done',
        offer_breakdown: 'done',
        property_detail: 'done',
        landlord_detail: 'done',
        referee_detail: 'done',
        offer_letter: 'done',
        address_verification: 'done',
        debitmandate: 'done',
        awaiting_disbursement: 'done',
        dashboard: 'done',
      };

      await AsyncStorage.setItem(
        `rentalSteps-${user.id}`,
        JSON.stringify(stepsData),
      );
    })();
  }, []);

  const getDashboardData = async () => {
    const token = await getToken();

    try {
      const getAllAloans = await getEmergencyLoans();
      const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
      const applicationIDCallRes = await getCurrentApplication({ id: loan_id })


      console.log(applicationIDCallRes.data.data.non_refundable_deposit);
      const loanId = applicationIDCallRes.data.data.id;
      setmonthlyRepayment(
        Number(applicationIDCallRes.data.data.approvedamount),
      );

      // const response = await axios.post('https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/payment/pay', {amount}, {
      //   headers: {'Content-Type': 'application/json', Authorization: token},
      // });

      setLoanID(loanId);
      console.log('Loan: ', loanId);

      //approved_repayment_plan
      setrepaymentPlan(applicationIDCallRes.data.data.repayment_plan);

      const res = await axios.post(
        `${baseUrl}/application/dashboard`,
        {loanId},
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      console.log('Dashboard', res.data);

      setPercentAchieved(res.data.percentagePaid);
      setnextPaymentDueDate(res.data.nextPaymentDueDate);
      setnoOfDaysToNextPayment(res.data.noOfDaysToNextPayment);
      setrepaymentBalance(res.data.repaymentBalance);
      setrepaymentPlanCount(res.data.repayment_plan);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const handleRepayment = async () => {
    setVisible(true);
  };

  const payment = async (data) => {
    const url =
      `${baseUrl}/application/rentrepayment/pay`;
    const token = await getToken();
    try {
      const response = await axios.post(url, data, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const verifyPayment = async (data) => {
    const url =
      `${baseUrl}/application/rentrepayment/verify`;
    const token = await getToken();
    try {
      const response = await axios.post(url, data, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = async (values) => {
    console.log('The Values: ', values.amount);
    const data = {
      amount: unFormatNumber(values.amount),
    };
    try {
      setSpinner(true);
      const res = await payment(data);
      if (res.status == 200) {
        // USE THIS DATA LATER FOR PAYMENT
        // VERIFICATION
        const verifyPaymentData = {
          reference: res.data.data.reference,
          applicationId: loanID,
        };

        console.log('verify payment data: ', verifyPaymentData);
        console.log('Res: ', res.data.data);
        setResDataObj(res.data.data);
        setSpinner(false);
        setModal(true);
      }
    } catch (error) {
      console.log('The error: ', error);
      setSpinner(false);
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
        <Text style={[styles.boldText, {marginTop: 18}]}>How much?</Text>
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
            }}
            onChangeText={(text) => onChange(name)(text)}
            {...inputProps}
          />
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  if (nextPaymentDueDate != null) {
    return (
      <View style={styles.container}>
        <Icon
          onPress={() => navigation.navigate('Home')}
          name="arrow-back-outline"
          size={25}
          style={{padding: 18, paddingHorizontal: 10}}
          color="#2A286A"
        />
        <ScrollView
          contentContainerStyle={{flex: 1}}
          showsVerticalScrollIndicator={false}
          scrollEnabled>
          <View style={[styles.content, {flex: 1}]}>
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                Rent Now Pay Later
              </Text>
            </View>

            <View style={[styles.soloSavingCard]}>
              <View
                style={{
                  paddingTop: 20,
                  paddingBottom: 0,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{color: COLORS.white, fontSize: 12, marginLeft: 5}}>
                  Next payment amount
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 5,
                    marginLeft: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: COLORS.white,
                    }}>
                    ₦{currencyFormat(Number(monthlyRepayment))}
                  </Text>

                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: 'contain',
                      right: -11,
                      bottom: 0,
                      position: 'absolute',
                    }}
                    source={images.maskGroup29}
                  />
                </View>

                <View style={[styles.paymentDetail]}>
                  <View style={[styles.paymentDetailContent]}>
                    <Text style={[styles.text]}>Next loan payment</Text>
                    <Text style={[styles.value]}>
                      {noOfDaysToNextPayment} days
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.paymentDetailContent,
                      {
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: '#FFFFFF50',
                        paddingHorizontal: 10,
                      },
                    ]}>
                    <Text style={[styles.text]}>Next payment due date</Text>
                    <Text style={[styles.value]}>{nextPaymentDueDate}</Text>
                  </View>
                  <View style={[styles.paymentDetailContent]}>
                    <Text style={[styles.text]}>Repayment balance</Text>
                    <Text style={[styles.value]}>
                      ₦{currencyFormat(repaymentBalance)}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.white,
                      fontWeight: '200',
                    }}>
                    {repaymentPlanCount} of {repaymentPlan} months
                  </Text>
                </View>

                <View
                  style={{
                    // borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 100,
                    elevation: 10,
                  }}>
                  <AnimatedCircularProgress
                    size={90}
                    width={10}
                    rotation={0}
                    style={{
                      width: 97,
                      height: 97,
                      zIndex: 9,
                      position: 'relative',
                    }}
                    fill={0}
                    tintColor={COLORS.secondary}
                    backgroundColor="#9D98EC20">
                    {(fill) => (
                      <View
                        style={{
                          backgroundColor: '#2A286A',
                          height: 100,
                          width: 100,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                        }}>
                        <Image
                          source={images.darkPurpleCircle}
                          style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'stretch',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: 'CircularStd',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'white',
                            // lineHeight: 27,
                            textAlign: 'center',
                          }}>
                          {percentAchieved}%
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'CircularStd',
                            fontSize: 10,
                            fontWeight: '600',
                            color: 'white',
                            // lineHeight: 14,
                            textAlign: 'center',
                            marginTop: -5,
                          }}>
                          achieved
                        </Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                </View>

                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={handleRepayment}
                    style={{
                      backgroundColor: COLORS.light,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: COLORS.white,
                        fontWeight: '200',
                      }}>
                      Pay now
                    </Text>
                    <Icon
                      name="chevron-forward-outline"
                      size={10}
                      style={{color: COLORS.white, marginLeft: 5, marginTop: 2}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.white,
              width: '100%',
              // minHeight: 300,
              flex: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              elevation: 50,
              
            }}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomColor: '#BFBFBF50',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                Repayments
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
            <RepaymentCard
              amount={85000}
              type='paid'
            />
            </View>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => setVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Formik
                validationSchema={amountSchema}
                initialValues={{
                  amount: '',
                }}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}>
                {({handleSubmit, isValid, values, setValues}) => (
                  <>
                    <Icon
                      onPress={() => {
                        // setShowAmountField(false);
                        // setShowPaymentType(true);
                        setVisible(false);
                      }}
                      name="close"
                      size={25}
                      style={{
                        right: 25,
                        top: 15,
                        position: 'absolute',
                        zIndex: 2,
                        color: COLORS.grey,
                        padding: 10,
                      }}
                    />
                    <Field
                      component={NumberInput}
                      name="amount"
                      placeholder="Amount"
                    />

                    <TouchableOpacity
                      onPress={handleSubmit}
                      disabled={isValid ? false : true}
                      style={[styles.button]}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 12,
                          lineHeight: 30,
                        }}>
                        PROCEED
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>

        {modal && (
          <CreditCardModalRNPL
            onRequestClose={() => {
              setModal(!modal);
            }}
            visible={modal}
            info={resDataObj}
            navigation={navigation}
            redirectTo="RentNowPayLaterDashboard"
          />
        )}

        <Spinner visible={spinner} size="large" />
      </View>
    );
  } else {
    return (
      <>
        <View>
          <Text>loading...</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
    backgroundColor: '#F7F8FD',
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // backgroundColor: '#f00',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  soloSavingCard: {
    width: '100%',
    minHeight: 200,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    elevation: 10,
    // overflow: 'hidden',
  },
  // circularProgress: {
  //   width: 97,
  //   height: 97,
  //   zIndex: 9,
  //   position: 'relative',
  // },
  paymentDetail: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff20',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  paymentDetailContent: {
    alignItems: 'center',
  },
  text: {
    fontSize: 8,
    color: COLORS.white,
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  // modal
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  textInput: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#ADADAD',
    borderWidth: 1,
    marginTop: 15,
  },
  boldText: {
    fontSize: 18,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'CircularStd',
    fontWeight: 'bold',
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
  button: {
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: COLORS.primary,
    marginTop: 20,
    // marginBottom: 20,

    width: '100%',
    paddingVertical: 15,
  },
});
