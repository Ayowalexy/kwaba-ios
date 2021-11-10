import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectBankModal from '../../components/SelectBankModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import email from 'react-native-email';
import {sendEmail} from 'react-native-email-action';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {verifyBankAccount} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';

import moment from 'moment';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const bankRequestSchema = yup.object().shape({
  full_name: yup.string().required('Full is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email address is required'),
  phone_number: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  bank: yup.string().required('Please select your bank'),
  account_number: yup
    .string()
    .min(10, ({min}) => `Account number must be ${min} characters`)
    .required('Account number is required'),
  // account_name: yup.string().required('Account name is required'),
});

export default function RentalLoanFormBankStatementUploadEmail({navigation}) {
  const [selectedBank, setSelectedBank] = useState('');
  const [showSelectBankModal, setShowSelectBankModal] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [
    selectedBankForVerification,
    setSelectedBankForVerification,
  ] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [showAccountNameField, setShowAccountNameField] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const url =
          'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/bank_email';
        const response = await axios.get(url, {
          headers: {'Content-Type': 'application/json'},
        });
        const data = response.data;

        if (response.status == 200) {
          setBankData(data.banks);
          // console.log(bankData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    bankData.forEach((bank) => {
      if (bank.name == selectedBank) {
        let data = {
          code: bank.code.toString().length == 2 ? '0' + bank.code : bank.code,
          name: bank.name,
          email: bank.contact_email,
        };

        setSelectedBankForVerification(data);
      }
    });
  }, [selectedBank]);

  const sixMonthsAgo = moment().subtract(6, 'months').format('MMMM Do, YYYY');

  const todaysDate = moment().format('MMMM Do, YYYY');

  const handleSubmit = async (values) => {
    console.log(values);
    sendEmail({
      to: `${selectedBankForVerification.email}`,
      subject: 'REQUEST FOR LATEST SIX (6) MONTHS BANK STATEMENT',
      // body: `
      //   I hereby request for my latest six (6) months bank statement for the account(s) listed below;\n
      //   Account name: ${accountName}\n
      //   Account number: ${values.account_number}\n
      //   Kindly reply to this email with my statement and put hello@kwaba.ng in copy while sending it.\n
      //   Thanks.`,
      body: `I hereby request for my bank statement from ${sixMonthsAgo} to ${todaysDate} for the account(s) listed below;\n\nAccount name: ${accountName}\nAccount number: ${values.account_number}\n\nKindly reply to this email with my statement and put hello@kwaba.ng in copy while sending it.\n\nThanks.`,
    }).then((res) => console.log('Email response: ', res));
  };

  const verifyBank = async (val) => {
    setSpinner(true);
    setShowAccountNameField(false);

    let data = {
      account_number: val.account_number,
      bank_code: selectedBankForVerification.code,
    };

    try {
      const res = await verifyBankAccount(data);
      if (res.data.accountStatus) {
        console.log(res.data.data);
        setAccountName(res.data.data.account_name);
        setShowAccountNameField(true);
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  const CustomInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched, values},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <View
          style={[
            styles.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && styles.errorInput,
          ]}>
          <TextInput
            style={{
              width: '100%',
              // paddingLeft: 50,
              paddingHorizontal: 16,
              paddingVertical: 16,
            }}
            // style={designs.textInput}
            keyboardType="default"
            value={value}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);

              if (name == 'account_number' && value.toString().length == 10) {
                verifyBank(values);
                // console.log(props.form.values);
              }
            }}
            onChangeText={(text) => onChange(name)(text)}
            {...inputProps}
          />
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const SelectBank = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    return (
      <>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowSelectBankModal(!showSelectBankModal);
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
              }}>
              Bank
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
    <Formik
      validationSchema={bankRequestSchema}
      initialValues={{
        full_name: '',
        email: '',
        phone_number: '',
        bank: '',
        account_number: '',
        account_name: '',
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}>
      {({handleSubmit, isValid, values, setValues}) => (
        <>
          <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back-outline"
              size={25}
              style={{
                fontWeight: '900',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}
              color={COLORS.primary}
            />
            <ScrollView>
              <View style={styles.content}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  Request Bank Statement
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 20,
                    marginBottom: 20,
                    marginTop: 10,
                    color: COLORS.dark,
                  }}>
                  The email used to request for your bank statement should be
                  the one you receive notification with your bank
                </Text>
                <Field
                  component={CustomInput}
                  name="full_name"
                  placeholder="Full Name"
                />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email"
                />
                <Field
                  component={CustomInput}
                  name="phone_number"
                  placeholder="Phone Number"
                />
                <Field component={SelectBank} name="bank" />
                {values.bank != '' && (
                  <Field
                    component={CustomInput}
                    name="account_number"
                    placeholder="Account Number"
                  />
                )}
                {showAccountNameField && (
                  <TextInput
                    style={[styles.textField]}
                    placeholder="Account Name"
                    editable={false}
                    value={accountName}
                  />
                )}

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    designs.button,
                    {
                      backgroundColor: COLORS.secondary,
                      marginTop: 20,
                      marginBottom: 0,
                    },
                  ]}>
                  <Text
                    style={[
                      designs.buttonText,
                      {
                        color: COLORS.white,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 12,
                      },
                    ]}>
                    CREATE EMAIL
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <SelectBankModal
            onRequestClose={() => setShowSelectBankModal(!showSelectBankModal)}
            visible={showSelectBankModal}
            onClick={(value) => {
              setSelectedBank(value);
              setValues({...values, bank: value});
            }}
            banks={bankData}
            selectedBank={selectedBank}
          />

          <Spinner visible={spinner} size="large" />
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 0.5,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },

  text: {
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 0,
    color: '#BFBFBF',
    lineHeight: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  body: {
    fontSize: 12,
    lineHeight: 20,
    color: '#ADADAD',
    marginTop: 20,
    width: '80%',
    // fontWeight: 'bold',
  },
  img: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    top: -20,
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

  textField: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
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
