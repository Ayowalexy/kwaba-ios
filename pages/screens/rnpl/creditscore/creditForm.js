import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../../util';
import designs from './styles';
import PaystackPaymentCobble from '../../../../components/Paystack/PaystackPaymentCobble';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CreditAccept from './creditAccept';
import {purchase} from '../../../../services/creditScrore';
import PaystackPayment from '../../../../components/Paystack/PaystackPayment';
import {
  completeSavingsPayment,
  verifySavingsPayment,
} from '../../../../services/network';
import PaymentTypeModal from '../../../../components/PaymentType/PaymentTypeModal';

const CreditScoreValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  bvn: yup
    .string()
    .test('bvn', 'Must be exactly 11 characters', (val) => val?.length === 11)
    .required('BVN is required'),
});

const CustomInput = (props) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <View
        style={[
          designs.customInput,
          props.multiline && {height: props.numberOfLines * 40},
          hasError && designs.errorInput,
        ]}>
        <TextInput
          style={{
            width: '100%',
            paddingHorizontal: 16,
            paddingVertical: 16,
            color: COLORS.dark,
          }}
          keyboardType="default"
          value={value}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          onChangeText={(text) => onChange(name)(text)}
          {...inputProps}
        />
      </View>

      {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
    </>
  );
};

export default function CreditForm(props) {
  const {navigation} = props;

  const [spinner, setSpinner] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [resData, setResData] = useState([]);
  const [formValue, setFormValue] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [channel, setChannel] = useState('');
  const [verifyData, setVerifyData] = useState({});
  const amount = 2000;

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'creditForm');
    })();
  }, []);

  // const userData = async () => {
  //   const userData = await AsyncStorage.getItem('userData');
  //   return JSON.parse(userData).user;
  // };

  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      bvn: values.bvn,
      company: 'Kwaba',
    };

    setFormValue(data);
    console.log('DF: ', formValue);

    // setSpinner(true);
    // // const res = await purchase(data);
    // setSpinner(false);
    setShowAcceptModal(true);
    try {
      // if (res.status == 200) {
      //   console.log('The Res: ', res?.data);
      //   setSpinner(false);
      //   setShowAcceptModal(true);
      // }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error.response);
    }
  };

  const savingsPayment = async (data) => {
    setSpinner(true);
    console.log({data});
    try {
      const res = await completeSavingsPayment(data);
      console.log('Hello: ', res?.data);
      if (res.status == 200) {
        const scoreResponse = await purchase(formValue);
        if (!scoreResponse?.data?.success) {
          throw new Error({response: {data: 'Invalid BVN'}});
        }
        setSpinner(false);

        console.log('Complete Paymentttttttttt: ', res.data.data);
        // await showSuccess();
        // setShowAcceptModal(true);
        navigation.navigate('CreditAwaiting', formValue);
        // console.log('Form Value: ', formValue);
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error.response.data);
    }
  };

  const verifyPaymentRequest = async (data, paymentChannel) => {
    console.log('The Data: ', data);

    setSpinner(true);
    const res = await verifySavingsPayment(data);

    setSpinner(false);
    if (!res) {
      return [];
    }

    if (res.status == 200) {
      const verifyData = res?.data?.data;
      console.log('Verifying data....: ', verifyData);
      setVerifyData(verifyData);
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: verifyData.amount,
          channel: 'wallet',
          // reference: verifyData.paymentReference,
          reference: verifyData.reference,
          purpose: 'creditScoring',
        };

        await savingsPayment(payload);
      } else {
        setShowPaystackPayment(true);
      }
    } else {
      console.log('Errorrr: ', res.response.data.meta.error);
      Alert.alert('Oops', res.response.data.meta.error);
    }
  };

  const handlePaymentRoute = async (value) => {
    console.log('Value: ', value);
    console.log('Form Value: ', formValue);

    if (value == 'wallet') {
      const verifyPayload = {
        amount: amount,
        channel: 'wallet',
        purpose: 'creditScoring',
      };

      setChannel(value); // wallet
      await verifyPaymentRequest(verifyPayload, value);
    } else {
      const verifyPayload = {
        amount: amount,
        channel: 'paystack',
        purpose: 'creditScoring',
      };

      setChannel(value); // card or bank_transfer
      await verifyPaymentRequest(verifyPayload, value);
    }
  };

  return (
    <>
      <View style={[designs.centeredView]}>
        <View style={[designs.topNav]}>
          <TouchableOpacity onPress={() => navigation.navigate('Rent')}>
            <Icon name="arrow-back-outline" size={25} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={[designs.modalView]}>
          <View style={{paddingHorizontal: 20, paddingVertical: 20, flex: 1}}>
            <Formik
              validationSchema={CreditScoreValidationSchema}
              initialValues={{email: '', bvn: ''}}
              onSubmit={(values) => {
                handleSubmit(values);
              }}>
              {({handleSubmit, isValid, values, setValues}) => {
                useEffect(() => {
                  (async () => {
                    const user = await getUser();
                    setValues({email: user.email});
                  })();
                }, []);

                return (
                  <>
                    <View style={{flex: 1}}>
                      <Field
                        component={CustomInput}
                        name="email"
                        placeholder="Email Address"
                      />

                      <Field
                        component={CustomInput}
                        name="bvn"
                        placeholder="BVN"
                      />
                    </View>

                    <TouchableOpacity
                      onPress={handleSubmit}
                      // onPress={() => setShowAcceptModal(true)}
                      disabled={!isValid}>
                      <View style={designs.button}>
                        {spinner ? (
                          <ActivityIndicator
                            size="small"
                            color={COLORS.white}
                          />
                        ) : (
                          <Text style={designs.buttonText}>Continue</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
      </View>

      {showAcceptModal && (
        <CreditAccept
          onRequestClose={() => setShowAcceptModal(!showAcceptModal)}
          visible={showAcceptModal}
          // onConfirm={() => setShowPaystackPayment(true)}
          onConfirm={() => {
            setShowPaymentModal(true);
          }}
        />
      )}

      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
        />
      )}

      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={verifyData}
          channel={channel}
          paymentCanceled={(e) => {
            setSpinner(false);
            Alert.alert('Payment cancelled');
          }}
          paymentSuccessful={async (res) => {
            console.log('The Res: ', res);
            const data = {
              amount: 2000,
              channel: 'paystack',
              // reference: verifyData.paymentReference,
              reference: verifyData.reference,
              purpose: 'creditScoring',
            };

            // console.log('the dataatatta: ', data);
            console.log('This complete data: ', data);

            await savingsPayment(data);
          }}
        />
      )}
    </>
  );
}
