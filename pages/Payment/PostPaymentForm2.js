import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import SelectBankModal from '../../components/SelectBankModal';

import {Formik, Field} from 'formik';
import * as yup from 'yup';

const postPaymentFormSchema = yup.object().shape({
  landLordFirstName: yup.string().required('Field required'),
  landLordLastName: yup.string().required('Field required'),
  landLordPhoneNumber: yup.string().required('Field required'),
  landLordAccountNumber: yup.string().required('Field required'),
  landLordBank: yup.string().required('Field required'),
});

const PostPaymentForm1 = ({navigation}) => {
  const [progress, setProgress] = useState(50);
  const [selectedBank, setSelectedBank] = useState('');
  const [showSelectBankModal, setShowSelectBankModal] = useState(false);
  const [bankData, setBankData] = useState([]);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    (async () => {
      try {
        const url = 'http://67.207.86.39:8000/api/v1/bank_email';
        const response = await axios.get(url, {
          headers: {'Content-Type': 'application/json'},
        });
        const data = response.data;

        const userData = await AsyncStorage.getItem('userData');

        if (response.status == 200) {
          setBankData(data.banks);
          console.log(data.banks);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = async (values) => {
    const data = {
      landLordFirstName: values.landLordFirstName,
      landLordLastName: values.landLordLastName,
      landLordPhoneNumber: values.landLordPhoneNumber,
      landLordAccountNumber: values.landLordAccountNumber,
      landLordBank: values.landLordBank,
    };

    const user = await getUser();

    const postPaymentFormData = await AsyncStorage.getItem('postPaymentForm');
    await AsyncStorage.setItem(
      'postPaymentForm',
      JSON.stringify({...JSON.parse(postPaymentFormData), ...data}),
    );

    // let stepsdata = {
    //   documentdone: 'done',
    //   propertydetail: 'done',
    //   landlorddetail: 'done',
    //   refree: '',
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

    navigation.navigate('PostPaymentForm3');
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

  const SelectBanks = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={[styles.label, {fontWeight: 'bold'}]}>Select bank</Text>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            // setShowSelectMonthModal(!showSelectMonthModal);
            // setShowNumberOfBedroomsModal(!showNumberOfBedroomsModal);
            setShowSelectBankModal(!showSelectBankModal);
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
              landLordFirstName: '',
              landLordLastName: '',
              landLordPhoneNumber: '',
              landLordAccountNumber: '',
              landLordBank: '',
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
                      Landlord details
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#ADADAD',
                          marginRight: 15,
                        }}>
                        2 of 3
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
                    name="landLordFirstName"
                    placeholder="First Name"
                  />
                  <Field
                    component={CustomInput}
                    name="landLordLastName"
                    placeholder="Last Name"
                  />
                  <Field
                    component={CustomInput}
                    name="landLordPhoneNumber"
                    placeholder="Phone Number"
                  />
                  <Field
                    component={CustomInput}
                    name="landLordAccountNumber"
                    placeholder="Account Number"
                  />

                  <Field component={SelectBanks} name="landLordBank" />
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

                <SelectBankModal
                  onRequestClose={() =>
                    setShowSelectBankModal(!showSelectBankModal)
                  }
                  visible={showSelectBankModal}
                  onClick={(value) => {
                    setSelectedBank(value);
                    setValues({...values, landLordBank: value});
                  }}
                  banks={bankData}
                  selectedBank={selectedBank}
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
