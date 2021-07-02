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

// business_website: '',
// social_media_platform: '',
// social_media_handle: '',
// business_address: '',
// company_size: '',
const businessFormSchema = yup.object().shape({
  business_website: yup.string().required('Please enter business website'),
  social_media_platform: yup.string().required('Please select social media platform'),
  social_media_handle: yup.string().required('Please enter social media handle'),
  business_address: yup.string().required('Please enter business address'),
  business_age: yup.string().required('Please select an option'),
  company_size: yup.string().required('Please select company size'),
});

export default function BusinessForm2({navigation}) {
  const [progress, setProgress] = useState(40);
  const [businessRegistrationType, setBusinessRegistrationType] = useState('');

  // modals toggle
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
  const [showBusinessAgeModal, setShowBusinessAgeModal] = useState(false);
  const [showCompanySizeModal, setShowCompanySizeModal] = useState(false);

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

  const SocialMediaPlatform = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
    <>
      <Text style={designs.label}>
        Select social media platform{' '}
      </Text>
      <TouchableOpacity
        style={[designs.customInput, {padding: 20}]}
        onPress={() => {
          setShowSocialMediaModal(!showSocialMediaModal);
        }}>
        {value != '' ? (
          <Text
            style={{
              fontWeight: 'bold',
              color: COLORS.dark,
            }}>
            {value}
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

      {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
    </>
    )
  }

  const BusinessAge = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
      <Text style={designs.label}>
        How long have you been in business{' '}
      </Text>
      <TouchableOpacity
        style={[designs.customInput, {padding: 20}]}
        onPress={() => {
          setShowBusinessAgeModal(!showBusinessAgeModal);
        }}>
        {value != '' ? (
          <Text
            style={{
              fontWeight: 'bold',
              color: COLORS.dark,
            }}>
            {value}
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

      {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
    </>
    )
  }

  const CompanySize = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
      <Text style={designs.label}>Company size </Text>
      <TouchableOpacity
        style={[designs.customInput, {padding: 20}]}
        onPress={() => {
          setShowCompanySizeModal(!showCompanySizeModal);
        }}>
        {value != '' ? (
          <Text
            style={{
              fontWeight: 'bold',
              color: COLORS.dark,
            }}>
            {value}
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

      {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
    </>
    )
  }

  const handleSubmit = async (values) => {
    console.log('VALUES: ', values);
    const {
      business_website,
      social_media_platform,
      social_media_handle,
      business_address,
      business_age,
      company_size
    } = values;
    const data = {
      business_website,
      social_media_platform,
      social_media_handle,
      business_address,
      business_age,
      company_size
    };

    const businessFormData = await AsyncStorage.getItem(
      'businessFormDataStore',
    );

    await AsyncStorage.setItem(
      'businessFormDataStore',
      JSON.stringify({...JSON.parse(businessFormData), ...data}),
    );

    console.log(data);
    console.log(businessFormData)

    navigation.navigate('BusinessForm3');
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
          // business_website: 'www.kwaba.ng',
          // social_media_platform: 'Facebook',
          // social_media_handle: 'hello@kwaba.ng',
          // business_address: '131a eti osa way dolphin estate',
          // business_age: '3',
          // company_size: '20',

          business_website: '',
          social_media_platform: '',
          social_media_handle: '',
          business_address: '',
          business_age: '',
          company_size: '',
        }}
        onSubmit={handleSubmit}>
        {({handleSubmit, isValid, values, setValues}) => (
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

                  <Field
                    name="social_media_platform"
                    component={SocialMediaPlatform}
                  />

                  <Field
                    name="social_media_handle"
                    component={CustomInput}
                    placeholder="Enter handle"
                  />
                  
                  <>
                    <Text style={designs.label}>Business address </Text>
                    <Field
                      name="business_address"
                      component={CustomInput}
                      placeholder="Business address"
                    />
                  </>
                  
                  <Field
                    name="business_age"
                    component={BusinessAge}
                  />

                  <Field
                    name="company_size"
                    component={CompanySize}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={designs.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                // onPress={()=> console.log(values)}
                // onPress={() => navigation.navigate('BusinessForm3')}
                // disabled={isValid ? false : true}
                style={[
                  designs.button,
                  // {
                  //   backgroundColor: isValid ? '#00DC99' : '#00DC9950',
                  // },
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


            <SocialMediaModal
              visible={showSocialMediaModal}
              onRequestClose={() => setShowSocialMediaModal(!showSocialMediaModal)}
              onClick={(value) => setValues({...values, 'social_media_platform':value})}
            />

            <BusinessAgeModal
              visible={showBusinessAgeModal}
              onRequestClose={() => setShowBusinessAgeModal(!showBusinessAgeModal)}
              onClick={(value) => setValues({...values, 'business_age':value})}
            />

            <CompanySizeModal
              visible={showCompanySizeModal}
              onRequestClose={() => setShowCompanySizeModal(!showCompanySizeModal)}
              onClick={(value) => setValues({...values,'company_size':value})}
            />

          </>
        )}
      </Formik>
    </View>
  );
}
