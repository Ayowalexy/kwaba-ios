import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import SelectRelationshipModal from '../../components/SelectRelationshipModal';

import {Formik, Field} from 'formik';
import * as yup from 'yup';

const postPaymentFormSchema = yup.object().shape({
  refereeFirstName: yup.string().required('Field required'),
  refereeLastName: yup.string().required('Field required'),
  refereePhoneNumber: yup.string().required('Field required'),
  refereeEmail: yup.string().required('Field required'),
  refereeStreet: yup.string().required('Field required'),
  refereeCity: yup.string().required('Field required'),
  refereeState: yup.string().required('Field required'),
  refereeCountry: yup.string().required('Field required'),
  refereeRelationship: yup.string().required('Field required'),
});

const PostPaymentForm1 = ({navigation}) => {
  const [progress, setProgress] = useState(75);
  const [
    showSelectRelationshipModal,
    setShowSelectRelationshipModal,
  ] = useState(false);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const handleSubmit = async (values) => {
    // const data = {
    //   refereeFirstName: values.refereeFirstName,
    //   refereeLastName: values.refereeLastName,
    //   refereePhoneNumber: values.refereePhoneNumber,
    //   refereeEmail: values.refereeEmail,
    //   refereeStreet: values.refereeStreet,
    //   refereeCity: values.refereeCity,
    //   refereeState: values.refereeState,
    //   refereeCountry: values.refereeCountry,
    //   relationship: values.relationship,
    // };

    const postPaymentFormData = await AsyncStorage.getItem('postPaymentForm');
    const data = JSON.parse(postPaymentFormData);
    const url =
      'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/update/landlord_and_property';
    const refereeUrl =
      'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/update/referee';

    const token = await getToken();

    const user = await getUser();

    const refereedata = {
      referee_address:
        values.refereeStreet +
        ' ' +
        values.refereeCity +
        ' ' +
        values.refereeState +
        ' ' +
        values.refereeCountry,
      referee_email: values.refereeEmail,
      referee_relationship: values.refereeRelationship,
      referee_firstname: values.refereeFirstName,
      referee_lastname: values.refereeLastName,
      referee_telephone: values.refereePhoneNumber,
    };

    const landlordAndPropertyData = {
      landlord_firstname: data.landLordFirstName,
      landlord_lastname: data.landLordLastName,
      landlord_telephone: data.landLordPhoneNumber,
      landlord_address: data.propertyState,
      landlord_accountnumber: data.landLordAccountNumber,
      landlord_bankname: data.landLordAccountBank,
      next_rent_address:
        data.propertyStreet +
        ' ' +
        data.propertyState +
        ' ' +
        data.propertyCountry,
      next_rent_property_type: data.typeOfProperty,
      next_rent_property_no_of_bedrooms: data.numberOfBedrooms,
      next_rent_paid_to: 'LandLord',
    };

    try {
      const response2 = await axios.put(
        refereeUrl,
        JSON.stringify(refereedata),
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      const response = await axios.put(
        url,
        JSON.stringify(landlordAndPropertyData),
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      // let stepsdata = {
      //   documentdone: 'done',
      //   propertydetail: 'done',
      //   landlorddetail: 'done',
      //   refree: 'done',
      //   offeraccepted: '',
      //   addressverification: '',
      //   debitmandate: '',
      //   awaitingdisbursment: '',
      // };
      // await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));

      const rentalSteps = await AsyncStorage.getItem(`rentalSteps-${user.id}`);
      const steps = JSON.parse(rentalSteps);
      let stepsData = {
        application_form: 'done',
        congratulation: 'done',
        all_documents: 'done',
        verifying_documents: 'done',
        offer_breakdown: 'done',
        property_detail: 'done',
        landlord_detail: 'done',
        referee_detail: 'done',
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

      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      console.log(applicationIDCallRes.data.data.assigned_to);

      if (applicationIDCallRes.data.data.assigned_to == 'Kwaba') {
        // navigation.navigate('AcceptanceLetterKwaba');
        // navigation.navigate('AcceptanceletterAddosser');
        // navigation.navigate('AddosserLetter');
        navigation.navigate('PTMFB');
      } else {
        // navigation.navigate('AcceptanceLetterKwaba');
        // navigation.navigate('AcceptanceletterAddosser');
        // navigation.navigate('AddosserLetter');
        navigation.navigate('PTMFB');
      }

      // navigation.navigate('OfferLetter');

      // console.log({Response: response.data, 'Response 2': response2.data});
    } catch (error) {
      Alert.alert('Message', error.reponse.data.statusMsg);
    }

    // await AsyncStorage.setItem(
    //   'postPaymentForm',
    //   JSON.stringify({...JSON.parse(postPaymentFormData), ...data}),
    // );
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

  const Relationship = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={[styles.label, {fontWeight: 'bold'}]}>Relationship</Text>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowSelectRelationshipModal(!showSelectRelationshipModal);
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
              Relationship
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
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
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
              refereeFirstName: '',
              refereeLastName: '',
              refereePhoneNumber: '',
              refereeEmail: '',
              refereeStreet: '',
              refereeCity: '',
              refereeState: '',
              refereeCountry: '',
              refereeRelationship: '',
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
                      Referee details
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#ADADAD',
                          marginRight: 15,
                        }}>
                        3 of 3
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

                  {/* <Text style={[styles.label, {fontWeight: 'bold'}]}>
                    Address of property to be paid for
                  </Text> */}

                  <Field
                    component={CustomInput}
                    name="refereeFirstName"
                    placeholder="First Name"
                  />
                  <Field
                    component={CustomInput}
                    name="refereeLastName"
                    placeholder="Last Name"
                  />
                  <Field
                    component={CustomInput}
                    name="refereePhoneNumber"
                    placeholder="Phone Number"
                  />
                  <Field
                    component={CustomInput}
                    name="refereeEmail"
                    placeholder="Email"
                  />

                  <Text style={[styles.label, {fontWeight: 'bold'}]}>
                    Office Address
                  </Text>

                  <Field
                    component={CustomInput}
                    name="refereeStreet"
                    placeholder="Street"
                  />
                  <Field
                    component={CustomInput}
                    name="refereeCity"
                    placeholder="City"
                  />
                  <Field
                    component={CustomInput}
                    name="refereeState"
                    placeholder="State"
                  />
                  <Field
                    component={CustomInput}
                    name="refereeCountry"
                    placeholder="Country"
                  />

                  <Field component={Relationship} name="refereeRelationship" />
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

                <SelectRelationshipModal
                  onRequestClose={() =>
                    setShowSelectRelationshipModal(!showSelectRelationshipModal)
                  }
                  visible={showSelectRelationshipModal}
                  onClick={(value) => {
                    setValues({...values, refereeRelationship: value});
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
