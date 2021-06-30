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
import SocialMediaModal from './Modals/SocialMediaModal';
import BusinessAgeModal from './Modals/BusinessAgeModal';
import CompanySizeModal from './Modals/CompanySizeModal';

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
  const [progress, setProgress] = useState(40);
  const [businessRegistrationType, setBusinessRegistrationType] = useState('');

  // modals toggle
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
  const [showBusinessAgeModal, setShowBusinessAgeModal] = useState(false);
  const [showCompanySizeModal, setShowCompanySizeModal] = useState(false);

  const [registration, setRegistration] = useState('');

  const RentPurpose = (props) => {
    const rent_purpose_list = ['Business space', 'Personal accommodation'];
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    return (
      <>
        <Text style={designs.label}>
          What’s the purpose of the rent payment?{' '}
        </Text>
        {rent_purpose_list.map((purpose, index) => (
          <TouchableOpacity
            key={index}
            style={[
              designs.buttonStyleA,
              {
                borderColor: value == purpose ? COLORS.light : '#ADADAD50',
              },
            ]}
            onPress={() => setFieldValue('rent_purpose', purpose)}>
            <View>
              <Text
                style={[
                  designs.btnText,
                  {
                    color: value == purpose ? COLORS.light : COLORS.grey,
                    fontWeight: value == purpose ? 'bold' : 'normal',
                  },
                ]}>
                {purpose}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
      </>
    );
  };

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

  const IsBusinessRegistered = (props) => {
    const is_business_registered_list = ['Yes', 'No'];
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    return (
      <>
        <Text style={designs.label}>Is your business registered? </Text>
        {is_business_registered_list.map((isRegistered, index) => (
          <TouchableOpacity
            key={index}
            style={[
              designs.buttonStyleA,
              {
                borderColor: value == isRegistered ? COLORS.light : '#ADADAD50',
              },
            ]}
            onPress={() =>
              setFieldValue('is_business_registered', isRegistered)
            }>
            <View>
              <Text
                style={[
                  designs.btnText,
                  {
                    color: value == isRegistered ? COLORS.light : COLORS.grey,
                    fontWeight: value == isRegistered ? 'bold' : 'normal',
                  },
                ]}>
                {isRegistered}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const handleSubmit = async (values) => {
    // console.log('VALUES: ', values);
    const {
      rent_purpose,
      business_name,
      is_business_registered,
      business_registration_type,
    } = values;
    const data = {
      rent_purpose,
      business_name,
      is_business_registered,
      business_registration_type,
    };

    const businessFormData = await AsyncStorage.getItem(
      'businessFormDataStore',
    );

    await AsyncStorage.setItem(
      'businessFormDataStore',
      JSON.stringify({...JSON.parse(businessFormData), ...data}),
    );

    navigation.navigate('BusinessForm2');

    // setTimeout(() => {
    //   console.log('Business Form Data:', businessFormData);
    // }, 2000);
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
                        2 of 5
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
                    <Text style={designs.label}>Business website </Text>
                    <Field
                      name="business_website"
                      component={CustomInput}
                      placeholder="Enter Link"
                    />
                  </>

                  <>
                    <Text style={designs.label}>
                      Select social media platform{' '}
                    </Text>
                    <TouchableOpacity
                      style={[designs.customInput, {padding: 20}]}
                      onPress={() => {
                        setShowSocialMediaModal(!showSocialMediaModal);
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
                          Select social media platform
                        </Text>
                      )}

                      <Icon
                        name="chevron-down-outline"
                        size={20}
                        style={{fontWeight: 'bold'}}
                        color="#BABABA"
                      />
                    </TouchableOpacity>
                    <Field
                      name="social_media_handle"
                      component={CustomInput}
                      placeholder="Enter handle"
                    />
                  </>

                  <>
                    <Text style={designs.label}>Business address </Text>
                    <Field
                      name="business_address"
                      component={CustomInput}
                      placeholder="Business address"
                    />
                  </>

                  <>
                    <Text style={designs.label}>
                      How long have you been in business{' '}
                    </Text>
                    <TouchableOpacity
                      style={[designs.customInput, {padding: 20}]}
                      onPress={() => {
                        setShowBusinessAgeModal(!showBusinessAgeModal);
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
                    <Text style={designs.label}>Company size </Text>
                    <TouchableOpacity
                      style={[designs.customInput, {padding: 20}]}
                      onPress={() => {
                        setShowCompanySizeModal(!showCompanySizeModal);
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
                </View>
              </View>
            </ScrollView>
            <View style={designs.buttonContainer}>
              <TouchableOpacity
                // onPress={handleSubmit}
                onPress={() => navigation.navigate('BusinessForm3')}
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

      <SocialMediaModal
        visible={showSocialMediaModal}
        onRequestClose={() => setShowSocialMediaModal(!showSocialMediaModal)}
        // onClick={(value) => setSocialMedia(value)}
        // registration={registration}
        // setRegistration={setRegistration}
      />

      <BusinessAgeModal
        visible={showBusinessAgeModal}
        onRequestClose={() => setShowBusinessAgeModal(!showBusinessAgeModal)}
        // onClick={(value) => setRegistration(value)}
        // registration={registration}
        // setRegistration={setRegistration}
      />

      <CompanySizeModal
        visible={showCompanySizeModal}
        onRequestClose={() => setShowCompanySizeModal(!showCompanySizeModal)}
        // onClick={(value) => setRegistration(value)}
        // registration={registration}
        // setRegistration={setRegistration}
      />
    </View>
  );
}
