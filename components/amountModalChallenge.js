import React, { useEffect, useState } from 'react';
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
import { COLORS, images } from '../util';
import * as Animatable from 'react-native-animatable';
import { formatNumber, unFormatNumber } from '../util/numberFormatter';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import {
  addFundsToBuddySavings,
  addFundsToSavings,
  getOneUserSavings,
  getUserSavings,
} from '../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';

import RNPaystack from 'react-native-paystack';

import CreditCardModalSavings from './CreditCard/CreditCardModalSavings';
RNPaystack.init({
  publicKey: 'pk_test_803016ab92dcf40caa934ef5fd891e0808b258ef',
});

// text.replace(/[- #+*;,.<>\{\}\[\]\\\/]/gi, '')



export default function AmountModalChallenge(props) {
  const {
    onRequestClose,
    visible,
    setAmount,
    setData,
    showCard,
    minimumAmount,
    target
  } = props;
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showAmountField, setShowAmountField] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const [resDataObj, setResDataObj] = useState('');
  const dispatch = useDispatch();
  const getSoloSaving = useSelector((state) => state.getSoloSavingsReducer);

  const amountSchema = yup.object().shape({
    amount: yup.number().required('Please provide amount').max(minimumAmount, `The target amount is ${minimumAmount}`),
  });

  const handleClose = () => {
    onRequestClose();
  };

  const handleSubmit = async (values) => {
    let data = {
      amount: Number(unFormatNumber(values.amount)),
    };

    setAmount(data?.amount);
    onRequestClose(); // close amount modal
    showCard();
  };

  const NumberInput = (props) => {
    const {
      field: { name, onBlur, onChange, value },
      form: { errors, touched, setFieldTouched },
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    console.log('hasError', hasError)

    return (
      <>
        {/* <Text style={[styles.boldText, {marginTop: 10}]}>How much?</Text> */}
        <View
          style={[
            styles.customInput,
            props.multiline && { height: props.numberOfLines * 40 },
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
            // keyboardType="number-pad"
            keyboardType="numeric"
            value={formatNumber(value)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            onChangeText={(text) => onChange(name)(text.replace(/\D/g, ''))}
            {...inputProps}
            maxLength={10}
          />
        </View>

        {Number(value) > Number(target) && <Text style={styles.errorText}>Target amount is ₦{formatNumber(minimumAmount)}</Text>}
      </>
    );
  };

  return (
    <>
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
                  right: 10,
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
                  {({ handleSubmit, isValid, values, setValues }) => (
                    <>
                      <Field
                        component={NumberInput}
                        name="amount"
                        placeholder="Amount"
                      />

                      <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={
                          values.amount < minimumAmount
                            ? true
                            : values.amount > target
                              ? true
                              : false}
                        style={[
                          styles.button,
                          {
                            backgroundColor:
                              values.amount < minimumAmount
                                ? '#5A4CB150'
                                : '#5A4CB1',
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
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: COLORS.primary,
                            marginTop: 5,
                            textAlign: 'center',
                          }}>
                          {
                            values?.amount > target
                              ?
                              (
                                <>
                                  The target amount is ₦
                                  {formatNumber(target)}
                                </>
                              )

                              : (
                                <>
                                  The minimum amount you can save is ₦
                                  {formatNumber(minimumAmount)}
                                </>
                              )
                          }
                        </Text>
                      </View>

                    </>
                  )}
                </Formik>
              </Animatable.View>
            </View>
          </View>
        </Modal>
      </View>
      <Spinner visible={spinner} size="large" />

      {/* {modal && ( */}
      {/* <CreditCardModalSavings
        onRequestClose={() => {
          setModal(!modal);
          onRequestClose();
        }}
        visible={modal}
        navigation={navigation}
        redirectTo={redirectTo}
        info={resDataObj}
        ID={ID}
      /> */}
      {/* )} */}
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
    backgroundColor: COLORS.white,
    // backgroundColor: '#5A4CB1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  btn: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
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
    fontFamily: 'CircularStd-Medium',
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
    backgroundColor: COLORS.secondary,
    backgroundColor: '#5A4CB1',
    marginTop: 20,
    // marginBottom: 20,

    width: '100%',
    paddingVertical: 15,
  },
});
