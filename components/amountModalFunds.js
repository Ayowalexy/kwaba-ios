import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../util';
import * as Animatable from 'react-native-animatable';
import {formatNumber, unFormatNumber} from '../util/numberFormatter';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {
  addFundsToSavings,
  getOneUserSavings,
  getUserSavings,
  loanPaymentVerification,
  loanRepayment,
} from '../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';

import RNPaystack from 'react-native-paystack';
import CreditCardModal from './CreditCard/CreditCardModal';
import CreditCardFormFunds from './CreditCard/CreditCardFormFunds';
import CreditCardModalFunds from './CreditCard/CreditCardModalFunds';
RNPaystack.init({
  publicKey: 'pk_test_803016ab92dcf40caa934ef5fd891e0808b258ef',
});
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function AmountModalFunds(props) {
  const {onRequestClose, visible, data, setAmount, showCard} = props;
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showAmountField, setShowAmountField] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const [resDataObj, setResDataObj] = useState('');
  const [resData, setResData] = useState('');
  const [ID, setID] = useState('');
  const dispatch = useDispatch();
  const getSoloSaving = useSelector((state) => state.getSoloSavingsReducer);

  // const repay = Number(data?.repayment_amount) - Number(data?.amount_paid);

  // useEffect(() => {
  //   console.log('The Repay: ', repay);
  // }, []);

  const amountSchema = yup.object().shape({
    amount: yup.string().required('Please provide amount'),
  });

  const handleClose = () => {
    // setShowPaymentType(false);
    onRequestClose();
    // console.log('Hello');
  };

  // const handleSubmit = async (values) => {
  //   try {
  //     setSpinner(true);
  //     // const res = await getUserSavings();
  //     // const ID = res.data.data[0].id;

  //     const res = await getOneUserSavings(ID);

  //     if (res.status == 200) {
  //       let data = {
  //         savings_id: ID,
  //         amount: Number(unFormatNumber(values.amount)),
  //         channel: 'paystacks',
  //       };

  //       const res = await addFundsToSavings(data);

  //       if (res.status == 200) {
  //         setSpinner(false);
  //         setShowAmountField(false);
  //         setModal(true);
  //         const resData = res.data.data;

  //         // we can use redux to dispatch this data
  //         // but for now let's use useState by send
  //         // the data as props
  //         setResDataObj(resData);
  //         onRequestClose();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setSpinner(false);
  //   }
  // };

  // const handleSubmit = async (values) => {
  //   console.log('Emeregency funds: ', data);

  //   const repaymentData = {
  //     loan_id: data.id,
  //     amount: values.amount,
  //     channel: channel,
  //   };
  //   // console.log('Pay Now', repaymentData);
  //   // console.log('The Res: ', data);

  //   setSpinner(true);
  //   try {
  //     const response = await loanRepayment(repaymentData);
  //     console.log('RRR: ', response);
  //     if (response.status == 200) {
  //       setSpinner(false);
  //       setResData(response?.data.data);
  //       setID(repaymentData?.loanId);
  //       setModal(true);
  //     } else {
  //       setSpinner(false);
  //       console.log('Error: ', response.response);
  //     }
  //   } catch (error) {
  //     setSpinner(false);
  //     console.log('The Error: ', error.response);
  //   }
  // };

  const handleSubmit = async (values) => {
    let data = {
      amount: Number(unFormatNumber(values.amount)),
    };

    setAmount(data?.amount);
    onRequestClose();
    showCard();
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
        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        <Text style={[styles.boldText, {marginTop: 10}]}>How much?</Text>
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
            ???
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
            onChangeText={(text) => onChange(name)(text.replace(/\D/g, ''))}
            {...inputProps}
          />
        </View>

        {/* {hasError && <Text style={styles.errorText}>{errors[name]}</Text>} */}
      </>
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onRequestClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon
                onPress={handleClose}
                name="close-outline"
                size={25}
                style={{
                  right: 5,
                  top: 5,
                  position: 'absolute',
                  zIndex: 2,
                  color: COLORS.grey,
                  padding: 10,
                  //   borderWidth: 1,
                }}
              />
              <Animatable.View
                duration={300}
                delay={100}
                easing="ease-in-out"
                animation="slideInLeft">
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
                      <Field
                        component={NumberInput}
                        name="amount"
                        placeholder="Amount"
                      />

                      <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={values.amount < 100 ? true : false}
                        style={[
                          styles.button,
                          {
                            backgroundColor:
                              values.amount < 100
                                ? '#00DC9950'
                                : COLORS.secondary,
                          },
                        ]}>
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
                      {/* <View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: COLORS.primary,
                            marginTop: 5,
                            textAlign: 'center',
                          }}>
                          The minimum amount you can pay is ???100
                        </Text>
                      </View> */}
                    </>
                  )}
                </Formik>
              </Animatable.View>
            </View>
          </View>
        </Modal>
      </View>

      {/* {modal && (
        <CreditCardModalFunds
          onRequestClose={() => setModal(!modal)}
          visible={modal}
          info={resData}
          navigation={navigation}
          redirectTo={redirectTo}
          ID={ID}
        />
      )}

      <Spinner visible={spinner} size="large" /> */}
    </KeyboardAwareScrollView>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    paddingVertical: 40,
    paddingHorizontal: 20,
    height: 450
  },
  btn: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 1,
    paddingVertical: 15,
  },
  displayFlex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    borderColor: '#ADADAD',
    borderWidth: 1,
    marginTop: 15,
  },
  creditCard: {
    width: '100%',
    height: 51,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 19,
  },

  boldText: {
    fontSize: 16,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'Poppins-Medium',
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
    textTransform: 'capitalize',
    // marginLeft: 5,
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
