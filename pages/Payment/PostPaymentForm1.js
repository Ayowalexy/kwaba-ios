import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SelectPropertyModal from '../../components/SelectPropertyModal';
import SelectRoomsModal from '../../components/SelectRoomsModal';

import {Formik, Field} from 'formik';
import * as yup from 'yup';

const postPaymentFormSchema = yup.object().shape({
  propertyStreet: yup.string().required('Field required'),
  propertyCity: yup.string().required('Field required'),
  propertyState: yup.string().required('Field required'),
  propertyCountry: yup.string().required('Field required'),
  typeOfProperty: yup.string().required('Field required'),
  numberOfBedrooms: yup.string().required('Field required'),
});

const PostPaymentForm1 = ({navigation}) => {
  const [progress, setProgress] = useState(25);
  const [showNumberOfBedroomsModal, setShowNumberOfBedroomsModal] = useState(
    false,
  );
  const [showTypeOfPropertiesModal, setShowTypeOfPropertiesModal] = useState(
    false,
  );

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const top = useSafeAreaInsets().top;

  const handleSubmit = async (values) => {
    const data = {
      propertyStreet: values.propertyStreet,
      propertyCity: values.propertyCity,
      propertyState: values.propertyState,
      propertyCountry: values.propertyCountry,
      typeOfProperty: values.typeOfProperty,
      numberOfBedrooms: values.numberOfBedrooms,
    };

    const postPaymentFormData = await AsyncStorage.getItem('postPaymentForm');
    await AsyncStorage.setItem(
      'postPaymentForm',
      JSON.stringify({...JSON.parse(postPaymentFormData), ...data}),
    );

    // let stepsdata = {
    //   documentdone: 'done',
    //   propertydetail: 'done',
    //   landlorddetail: '',
    //   refree: '',
    //   offeraccepted: '',
    //   addressverification: '',
    //   debitmandate: '',
    //   awaitingdisbursment: '',
    // };
    // await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));
    const user = await getUser();

    const rentalSteps = await AsyncStorage.getItem(`rentalSteps-${user.id}`);
    const steps = JSON.parse(rentalSteps);
    let stepsData = {
      application_form: 'done',
      congratulation: 'done',
      all_documents: 'done',
      verifying_documents: 'done',
      offer_breakdown: 'done',
      property_detail: 'done',
      landlord_detail: '',
      referee_detail: '',
      offer_letter: '',
      address_verification: '',
      debitmandate: '',
      awaiting_disbursement: '',
      dashboard: '',
    };
    await AsyncStorage.setItem(
      `rentalSteps-${user.id}`,
      JSON.stringify(stepsData),
    );
    console.log('STEPS: ', steps);

    navigation.navigate('PostPaymentForm2');
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
            styles.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && styles.errorInput,
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

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const SelectProperties = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={[styles.label, {fontWeight: 'bold'}]}>
          Type of property
        </Text>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowTypeOfPropertiesModal(!showTypeOfPropertiesModal);
          }}>
          {value != '' ? (
            <Text
              style={{
                color: COLORS.primary,
              }}>
              {value}
            </Text>
          ) : (
            <Text
              style={{
                color: '#BABABA',
              }}>
              Type of property
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

  const SelectBedrooms = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={[styles.label, {fontWeight: 'bold'}]}>
          Number of bedrooms
        </Text>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            // setShowSelectMonthModal(!showSelectMonthModal);
            setShowNumberOfBedroomsModal(!showNumberOfBedroomsModal);
          }}>
          {value != '' ? (
            <Text
              style={{
                color: COLORS.primary,
              }}>
              {value}
            </Text>
          ) : (
            <Text
              style={{
                color: '#BABABA',
              }}>
              Number of Bedrooms
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
    <View style={[designs.container, {backgroundColor: '#F7F8FD', marginTop: Platform.OS == 'ios' ? top : 0}]}>
      <Icon
        onPress={() => navigation.navigate('Borrow')}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Formik
            validationSchema={postPaymentFormSchema}
            initialValues={{
              propertyStreet: '',
              propertyCity: '',
              propertyState: '',
              propertyCountry: '',
              typeOfProperty: '',
              numberOfBedrooms: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({handleSubmit, isValid, values, setValues}) => (
              <>
                <Text
                  style={[
                    FONTS.h1FontStyling,
                    {
                      color: '#2A286A',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: 20,
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
                      Property details
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#ADADAD',
                          marginRight: 15,
                        }}>
                        1 of 3
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

                  <Text style={[styles.label, {fontWeight: 'bold'}]}>
                    Address of property to be paid for
                  </Text>

                  <Field
                    component={CustomInput}
                    name="propertyStreet"
                    placeholder="Street"
                  />
                  <Field
                    component={CustomInput}
                    name="propertyCity"
                    placeholder="City"
                  />
                  <Field
                    component={CustomInput}
                    name="propertyState"
                    placeholder="State"
                  />
                  <Field
                    component={CustomInput}
                    name="propertyCountry"
                    placeholder="Country"
                  />
                  <Field component={SelectProperties} name="typeOfProperty" />
                  <Field component={SelectBedrooms} name="numberOfBedrooms" />
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  // onPress={() => {
                  //   handleNavigation();
                  // }}
                  // onPress={()=> navigation.navigate('SetUpPaymentPlan')}
                  style={[designs.button, {backgroundColor: COLORS.secondary}]}>
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
                    NEXT
                  </Text>
                </TouchableOpacity>

                <SelectPropertyModal
                  onRequestClose={() =>
                    setShowTypeOfPropertiesModal(!showTypeOfPropertiesModal)
                  }
                  visible={showTypeOfPropertiesModal}
                  onClick={(value) => {
                    setValues({...values, typeOfProperty: value});
                  }}
                />

                <SelectRoomsModal
                  onRequestClose={() =>
                    setShowNumberOfBedroomsModal(!showNumberOfBedroomsModal)
                  }
                  visible={showNumberOfBedroomsModal}
                  onClick={(value) => {
                    setValues({...values, numberOfBedrooms: value});
                  }}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostPaymentForm1;

const styles = StyleSheet.create({
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
    marginTop: 20,
    fontSize: 12,
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
