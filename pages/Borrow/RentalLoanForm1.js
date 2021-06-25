import React, {useState, useEffect} from 'react';
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
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {formatNumber, unFormatNumber} from '../../util/numberFormatter';
import SelectMonthModal from '../../components/SelectMonthModal';

import {Formik, Field} from 'formik';
import * as yup from 'yup';

const rentalLoanFormSchema = yup.object().shape({
  // accommodationStatus: yup.string().required('Select accomodation status'),
  requestAmount: yup.string().required('Provide an amount'),
  salaryAmount: yup.string().required('Provide an amount'),
});

const RentalLoanForm1 = ({navigation}) => {
  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [showSelectMonthModal, setShowSelectMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [progress, setProgress] = useState(33);

  const accomdation_list = [
    'Looking to renew my rent',
    'Want to pay for a new place',
    'I’m still searching',
  ];

  // const handleNavigation = async () => {
  //   const data = {
  //     accomodationstatus: accommodationStatus,
  //     salary_amount: salaryAmount,
  //     request_amount: requestAmount,
  //     selected_month: selectedMonth,
  //   };

  //   const loanFormData = await AsyncStorage.getItem('rentalLoanForm');

  //   // console.log(loanFormData);
  //   await AsyncStorage.setItem(
  //     'rentalLoanForm',
  //     JSON.stringify({...JSON.parse(loanFormData), ...data}),
  //   );

  //   navigation.navigate('RentalLoanFormDoc');
  // };

  const handleSubmit = async (values) => {
    const data = {
      accomodationstatus: accommodationStatus,
      salary_amount: Number(unFormatNumber(values.salaryAmount)),
      request_amount: Number(unFormatNumber(values.requestAmount)),
      selected_month: Number(selectedMonth),
    };

    // console.log('VALUES:', data);

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    console.log(loanFormData);

    await AsyncStorage.setItem(
      'rentalLoanForm',
      JSON.stringify({...JSON.parse(loanFormData), ...data}),
    );
    navigation.navigate('RentalLoanFormDoc');
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
            styles.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && styles.errorInput,
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

        {/* <N */}

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const AccomodationOptions = (props) => {
    return (
      <>
        {accomdation_list.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={[
              designs.buttonStyleA,
              {
                borderColor:
                  accommodationStatus == value ? COLORS.light : '#ADADAD50',
              },
            ]}
            onPress={() => setAccommodationStatus(value)}>
            <View>
              <Text
                style={[
                  designs.btnText,
                  {
                    color:
                      accommodationStatus == value ? COLORS.light : COLORS.grey,
                    fontWeight:
                      accommodationStatus == value ? 'bold' : 'normal',
                  },
                ]}>
                {value}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
            // marginVertical: 11,
            // marginHorizontal: 16,
            paddingHorizontal: 10,
            // justifyContent: 'flex-end',
          }}>
          <Formik
            validationSchema={rentalLoanFormSchema}
            initialValues={{
              requestAmount: '',
              salaryAmount: '',
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
                      Payment Option
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
                  <>
                    <Text style={styles.label}>
                      What’s your accommodation status?{' '}
                    </Text>

                    <AccomodationOptions />
                  </>

                  <>
                    <Text style={styles.label}>
                      How much is your rent request amount?
                    </Text>
                    <Field
                      component={NumberInput}
                      name="requestAmount"
                      placeholder="Request Amount"
                    />
                  </>

                  <>
                    <Text style={styles.label}>
                      How much do you earn monthly?
                    </Text>
                    <Field
                      component={NumberInput}
                      name="salaryAmount"
                      placeholder="Amount"
                    />
                  </>

                  <>
                    <Text style={styles.label}>
                      Choose a monthly payment plan
                    </Text>
                    <TouchableOpacity
                      style={[styles.customInput, {padding: 20}]}
                      onPress={() => {
                        setShowSelectMonthModal(!showSelectMonthModal);
                      }}>
                      {selectedMonth != '' ? (
                        <Text
                          style={{
                            // fontWeight: 'bold',
                            color: COLORS.primary,
                          }}>
                          {selectedMonth}{' '}
                          {selectedMonth <= 1 ? 'month' : 'months'}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            // fontWeight: 'bold',
                            color: '#BABABA',
                          }}>
                          Choose a month
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

                <TouchableOpacity
                  onPress={handleSubmit}
                  // disabled={isValid}
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
              </>
            )}
          </Formik>
        </View>
      </ScrollView>

      <SelectMonthModal
        onRequestClose={() => setShowSelectMonthModal(!showSelectMonthModal)}
        visible={showSelectMonthModal}
        // selectedMonth={selectedMonth}
        onClick={(value) => setSelectedMonth(value)}
        selectedMonth={selectedMonth}
      />
    </View>
  );
};

export default RentalLoanForm1;

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
