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

// rent_purpose: '',
// business_name: '',
// is_business_registered: '',
// business_registration_type: '',
const businessFormSchema = yup.object().shape({
  rent_purpose: yup.string().required('Please select rent purpose'),
  business_name: yup.string().required('Please provide business name'),
  is_business_registered: yup.string().required('Please select an option'),
  business_registration_type: yup.string().required('Please select an option'),
});

export default function BusinessForm1({navigation}) {
  const [progress, setProgress] = useState(60);
  const [businessRegistrationType, setBusinessRegistrationType] = useState('');
  const [showBusinessSectorModal, setShowBusinessSectorModal] = useState(false);
  const [registration, setRegistration] = useState('');

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
              textAlignVertical: 'top',
            }}
            underlineColorAndroid="transparent"
            multiline={true}
            numberOfLines={15}
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

  const handleSubmit = async (values) => {
    // console.log('VALUES: ', values);
    const dummyData = {
      rent_purpose: '',
      business_name: '',
      is_business_registered: '',
      business_registration_type: '',
      business_website: '',
      social_media_plaform: '',
      social_media_handle: '',
      business_address: '',
      business_age: '',
      company_size: '',
      business_sector: '',
      more_info: '',
      how_many_is_collected: '',
      is_payment_made_to_bank_account: '',
      monthly_business_expenditure: '',
      monthly_business_revenue: '',
    };
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
          rent_purpose: '',
          business_name: '',
          is_business_registered: '',
          business_registration_type: 'partnership',
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
                      Business Information
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#ADADAD',
                          marginRight: 15,
                        }}>
                        3 of 5
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

                  <>
                    <Text style={designs.label}>
                      What Industry does you business belong?
                    </Text>
                    <TouchableOpacity
                      style={[designs.customInput, {padding: 20}]}
                      onPress={() => {
                        setShowBusinessSectorModal(!showBusinessSectorModal);
                        // console.log(selectedMonth);
                      }}>
                      {businessRegistrationType != '' ? (
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: COLORS.dark,
                          }}>
                          {businessRegistrationType}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: '#BABABA',
                          }}>
                          Select an option
                        </Text>
                      )}

                      <Icon
                        name="chevron-down-outline"
                        size={20}
                        style={{fontWeight: 'bold'}}
                        color="#BABABA"
                      />
                    </TouchableOpacity>
                  </>

                  <>
                    <Text style={designs.label}>
                      Tell us more about your business to support{'\n'}your
                      applictaion{' '}
                    </Text>
                    <Field
                      name="social_media_handle"
                      component={CustomInput}
                      placeholder="Tell us more"
                    />
                  </>
                </View>
              </View>
            </ScrollView>
            <View style={designs.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
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

      <BusinessSectorModal
        visible={showBusinessSectorModal}
        onRequestClose={() =>
          setShowBusinessSectorModal(!showBusinessSectorModal)
        }
        // onClick={(value) => setRegistration(value)}
        // registration={registration}
        // setRegistration={setRegistration}
      />
    </View>
  );
}
