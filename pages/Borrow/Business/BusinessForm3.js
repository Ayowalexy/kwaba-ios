import React, { useEffect, useState } from 'react';
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
import { icons } from '../../../util/index';
import designs from './style';
import { COLORS, FONTS, images } from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { formatNumber, unFormatNumber } from '../../../util/numberFormatter';
import BusinessSectorModal from './Modals/BusinessSectorModal';

import { Formik, Field } from 'formik';
import * as yup from 'yup';

// business_sector: '',
// more_info: '',
const businessFormSchema = yup.object().shape({
  business_sector: yup.string().required('Please select an option'),
  more_info: yup.string().required('This field is required'),
});

export default function BusinessForm1({ navigation }) {
  const [progress, setProgress] = useState(60);
  const [businessRegistrationType, setBusinessRegistrationType] = useState('');
  const [showBusinessSectorModal, setShowBusinessSectorModal] = useState(false);
  const [registration, setRegistration] = useState('');

  const CustomInput = (props) => {
    const {
      field: { name, onBlur, onChange, value },
      form: { errors, touched, setFieldTouched },
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={designs.label}>
          Tell us more about your business to support{'\n'}your
          applictaion{' '}
        </Text>
        <View
          style={[
            designs.customInput,
            props.multiline && { height: props.numberOfLines * 40 },
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

  const BusinessSector = (props) => {
    const {
      field: { name, onBlur, onChange, value },
      form: { errors, touched, setFieldTouched },
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={designs.label}>
          What Industry does you business belong?
        </Text>
        <TouchableOpacity
          style={[designs.customInput, { padding: 20 }]}
          onPress={() => {
            setShowBusinessSectorModal(!showBusinessSectorModal);
            // console.log(selectedMonth);
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
            style={{ fontWeight: 'bold' }}
            color="#BABABA"
          />
        </TouchableOpacity>


        {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
      </>
    )
  }

  const handleSubmit = async (values) => {
    const {
      business_sector,
      more_info,
    } = values;
    const data = {
      business_sector,
      more_info,
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

    navigation.navigate('BusinessForm4')
  };

  return (
    <View style={[designs.container, { backgroundColor: '#F7F8FD' }]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{ fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10 }}
        color={COLORS.primary}
      />

      <Formik
        validationSchema={businessFormSchema}
        initialValues={{
          // business_sector: 'Banking',
          // more_info: 'A medium sized fintech company',

          business_sector: '',
          more_info: '',
        }}
        onSubmit={handleSubmit}>
        {({ handleSubmit, isValid, values, setValues }) => (
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

                  <Field
                    name="business_sector"
                    component={BusinessSector}
                  />


                    <Field
                      name="more_info"
                      component={CustomInput}
                      placeholder="Tell us more"
                    />
                  
                </View>
              </View>
            </ScrollView>
            <View style={designs.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                // onPress={()=> console.log('Helow')}
                // onPress={()=> navigation.navigate('BusinessForm4')}
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

            <BusinessSectorModal
              visible={showBusinessSectorModal}
              onRequestClose={() =>
                setShowBusinessSectorModal(!showBusinessSectorModal)
              }
              onClick={(value) => setValues({ ...values, 'business_sector': value })}
            // registration={registration}
            // setRegistration={setRegistration}
            />

          </>
        )}
      </Formik>

      {/* <BusinessSectorModal
        visible={showBusinessSectorModal}
        onRequestClose={() =>
          setShowBusinessSectorModal(!showBusinessSectorModal)
        }
        // onClick={(value) => setRegistration(value)}
        // registration={registration}
        // setRegistration={setRegistration}
      /> */}
    </View>
  );
}
