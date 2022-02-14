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
  const {visible, onRequestClose, setFormData} = props;

  const [spinner, setSpinner] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [resData, setResData] = useState([]);
  const [formValue, setFormValue] = useState([]);

  const userData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    return JSON.parse(userData).user;
  };

  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      bvn: values.bvn,
      company: 'Kwaba',
    };

    setFormValue(data);

    setSpinner(true);

    Keyboard.dismiss();

    const res = await purchase(data);

    // console.log('The Res: ', res);

    try {
      if (res.status == 200) {
        setResData(res?.data?.data);
        setSpinner(false);
        setShowAcceptModal(true);

        console.log('The Res: ', res?.data?.data);
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error.response);
    }

    // console.log('The Data: ', data);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={[designs.centeredView]}>
          <View style={[designs.topNav]}>
            <TouchableOpacity onPress={onRequestClose}>
              <Icon
                name="arrow-back-outline"
                size={25}
                color={COLORS.primary}
              />
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
                      const user = await userData();
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
      </Modal>

      {showAcceptModal && (
        <CreditAccept
          onRequestClose={() => setShowAcceptModal(!showAcceptModal)}
          visible={showAcceptModal}
          onConfirm={() => setShowPaystackPayment(true)}
        />
      )}

      {showPaystackPayment && (
        <PaystackPaymentCobble
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={{...resData, ...formValue, amount: 2000}}
          channel={'card'}
          paymentCanceled={(e) => {
            console.log('Pay cancel', e);
            Alert.alert(`Payment ${e.status}`);
            setSpinner(false);
          }}
          paymentSuccessful={async (res) => {
            console.log('Pay done', res);
            if (res.status == 'success') {
              // console.log('CreditScoreAwaiting', formValue);
              setFormData(formValue);
              onRequestClose();
            } else {
              Alert.alert('Oops', 'Something went wrong');
            }
          }}
        />
      )}
    </>
  );
}
