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


const businessFormSchema = yup.object().shape({
  pay_in_bank: yup.string().required('Please select an option'),
  // monthly_business_expenditure: yup.string().required('Please enter amount'),
  monthly_business_revenue: yup.string().required('Please enter amount'),
});

export default function BusinessForm1({navigation}) {
  const [progress, setProgress] = useState(60);
  const [businessRegistrationType, setBusinessRegistrationType] = useState('');
  const [showBusinessSectorModal, setShowBusinessSectorModal] = useState(false);
  const [registration, setRegistration] = useState('');

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
            onPress={() => setFieldValue('pay_in_bank', option)}>
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
  }

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

  const handleSubmit = async (values) => {
    // const dummyData = {
    //   rent_purpose: '',
    //   business_name: '',
    //   is_business_registered: '',
    //   business_registration_type: '',
    //   business_website: '',
    //   social_media_platform: '',
    //   social_media_handle: '',
    //   business_address: '',
    //   business_age: '',
    //   company_size: '',
    //   business_sector: '',
    //   more_info: '',
    //   how_many_is_collected: '',
    //   is_payment_made_to_bank_account: '',
    //   monthly_business_expenditure: '',
    //   monthly_business_revenue: '',
    // };

    const {
      monthly_business_expenditure,
      monthly_business_revenue,
    } = values;
    const data = {
      monthly_business_expenditure,
      monthly_business_revenue,
    };

    const businessFormData = await AsyncStorage.getItem(
      'businessFormDataStore',
    );

    await AsyncStorage.setItem(
      'businessFormDataStore',
      JSON.stringify({ ...JSON.parse(businessFormData), ...data }),
    );

    console.log(data);
    console.log(businessFormData);

    // navigation.navigate('BusinessForm5')
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
          pay_in_bank: '',
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
                        4 of 5
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

                  <Field name="pay_in_bank" component={PayInBank} />

                  {values.pay_in_bank.toLowerCase() == 'yes' && 
                    <>
                      <Text style={[designs.boldText, {marginTop: 18}]}>
                        How much is the business monthly revenue?
                      </Text>
                      <Field name="monthly_business_expenditure" component={NumberInput} />
                    </>
                  }

                  <>
                    <Text style={[designs.boldText, {marginTop: 18}]}>
                      How much is spent monthly on the business?
                    </Text>
                    <Field name="monthly_business_revenue" component={NumberInput} />
                  </>

                  
                </View>
              </View>
            </ScrollView>
            <View style={designs.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                // onPress={()=> navigation.navigate('BusinessForm5')}
                // disabled={isValid ? false : true}
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
          </>
        )}
      </Formik>
    </View>
  );
}
