import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {icons} from '../../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';
import BusinessSectorModal from './Modals/BusinessSectorModal';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import BussinessCompleteModal from './BussinessCompleteModal';

import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const businessFormSchema = yup.object().shape({
  is_payment_made_to_bank_account: yup
    .string()
    .required('Please select an option'),
  // monthly_business_expenditure: yup.string().required('Please enter amount'),
  monthly_business_revenue: yup.string().required('Please enter amount'),
});

export default function BusinessForm1({navigation}) {
  const [progress, setProgress] = useState(100);
  const [businessRegistrationType, setBusinessRegistrationType] = useState('');
  const [showBusinessSectorModal, setShowBusinessSectorModal] = useState(false);
  const [registration, setRegistration] = useState('');

  const [showBusinessCompleteModal, setShowBusinessCompleteModal] = useState(
    false,
  );
  const [spinner, setSpinner] = useState(false);

  const PayInBank = (props) => {
    const option_list = ['Yes', 'No'];
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    return (
      <>
        <Text style={designs.label}>
          Do you pay your business revenue into a bank account?{' '}
        </Text>
        {option_list.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              designs.buttonStyleA,
              {
                borderColor: value == option ? COLORS.light : '#ADADAD50',
              },
            ]}
            onPress={() =>
              setFieldValue('is_payment_made_to_bank_account', option)
            }>
            <View>
              <Text
                style={[
                  designs.btnText,
                  {
                    color: value == option ? COLORS.light : COLORS.grey,
                    fontWeight: value == option ? 'bold' : 'normal',
                  },
                ]}>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
      </>
    );
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
        <View
          style={[
            designs.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && designs.errorInput,
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

        {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const handleSubmit = async (values) => {
    const url =
      'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/business/application/new';
    const dummyData = {
      rent_purpose: 'Business space',
      business_name: 'Kwaba',
      is_business_registered: 'yes',
      business_registration_type: 'Limited liability',
      business_website: 'https://www.kwaba.ng',
      social_media_platform: 'facebook.com',
      social_media_handle: 'kwabang',
      business_address: '131a eti osa way dolphin estate Ikoyi Lagos, Nigeria',
      business_age: '3 years',
      company_size: '11 - 50 employees',
      business_sector: 'Construction/Real Estate',
      more_info: "Let's pay your landlord, You can pay us later.",
      how_many_is_collected:
        'Cash, Bank Transfer, Point of sale (POS), Online, All of the above', // seperated with commas
      is_payment_made_to_bank_account: 'yes',
      monthly_business_expenditure: '500000',
      monthly_business_revenue: '200000',
    };

    const {monthly_business_expenditure, monthly_business_revenue} = values;
    const data = {
      monthly_business_expenditure,
      monthly_business_revenue,
    };

    const token = await getToken();

    const businessFormData = await AsyncStorage.getItem(
      'businessFormDataStore',
    );

    await AsyncStorage.setItem(
      'businessFormDataStore',
      JSON.stringify({...dummyData, ...JSON.parse(businessFormData), ...data}),
    );

    // console.log('DATA: ', data);
    // console.log('BUSINESS FORM DAT: ', businessFormData);
    // console.log('DUMMY DATA: ', dummyData);
    console.log('The Business Route: ', {
      ...dummyData,
      ...JSON.parse(businessFormData),
      ...data,
    });

    try {
      setSpinner(true);
      const response = await axios.post(
        url,
        {...dummyData, ...JSON.parse(businessFormData), ...data},
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      console.log('Res: ', response);

      if (response.status == 201) {
        setSpinner(false);
        setShowBusinessCompleteModal(true);
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error);
    }

    // navigation.navigate('RentalFormBusiness1');
    // setShowBusinessCompleteModal(true);
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />

      <Formik
        validationSchema={businessFormSchema}
        initialValues={{
          is_payment_made_to_bank_account: '',
          monthly_business_expenditure: '',
          monthly_business_revenue: '',
        }}
        onSubmit={handleSubmit}>
        {({handleSubmit, isValid, values}) => (
          <>
            <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
              <View
                style={{
                  paddingHorizontal: 10,
                  //   marginBottom: 10,
                }}>
                <Text
                  style={[
                    {
                      color: '#2A286A',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: 18,
                      marginLeft: 5,
                    },
                  ]}>
                  Rent Now, Pay Later
                </Text>
                <View style={designs.contentWrapper}>
                  <View style={designs.formHeader}>
                    <Text
                      style={[
                        FONTS.h3FontStyling,
                        {
                          color: COLORS.primary,
                          textAlign: 'left',
                          fontWeight: 'bold',
                          fontSize: 16,
                        },
                      ]}>
                      Financial details
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#ADADAD',
                          marginRight: 15,
                        }}>
                        5 of 5
                      </Text>
                      <AnimatedCircularProgress
                        size={25}
                        width={5}
                        fill={progress}
                        rotation={0}
                        tintColor={COLORS.secondary}
                        backgroundColor="#D6D6D6"
                      />
                    </View>
                  </View>

                  {/*  */}

                  <Field
                    name="is_payment_made_to_bank_account"
                    component={PayInBank}
                  />

                  {(values.is_payment_made_to_bank_account.toLowerCase() ==
                    'yes' ||
                    values.is_payment_made_to_bank_account.toLowerCase() ==
                      'no') && (
                    <>
                      <Text style={[designs.boldText, {marginTop: 18}]}>
                        How much is the business monthly revenue?
                      </Text>
                      <Field
                        name="monthly_business_revenue"
                        component={NumberInput}
                        placeholder="Amount"
                      />
                    </>
                  )}

                  <>
                    <Text style={[designs.boldText, {marginTop: 18}]}>
                      How much is spent monthly on the business?
                    </Text>
                    <Field
                      name="monthly_business_expenditure"
                      component={NumberInput}
                      placeholder="Amount"
                    />
                  </>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    designs.button,
                    {
                      backgroundColor: isValid ? '#00DC99' : '#00DC9950',
                    },
                  ]}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 12,
                      lineHeight: 30,
                      textTransform: 'uppercase',
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>

      {showBusinessCompleteModal && (
        <BussinessCompleteModal
          onRequestClose={() =>
            setShowBusinessCompleteModal(!showBusinessCompleteModal)
          }
          visible={showBusinessCompleteModal}
          navigation={navigation}
        />
      )}

      <Spinner visible={spinner} size="large" />
    </View>
  );
}
