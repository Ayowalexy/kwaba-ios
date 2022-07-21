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
import designs from './styles';
import {COLORS, FONTS, images} from '../../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCurrentStage } from '../../../../redux/reducers/store/stageActions';
import {formatNumber, unFormatNumber} from '../../../../util/numberFormatter';
import SelectMonthModal from '../../../../components/SelectMonthModal';
import { useDispatch } from 'react-redux';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

import RnplStepProgress from '../RnplStepProgress';

const rentalLoanFormSchema = yup.object().shape({
  accommodationStatus: yup.string().required('Select accomodation status'),
  requestAmount: yup.string().required('Provide an amount'),
  salaryAmount: yup.string().required('Provide an amount'),
  monthlyPaymentPlan: yup.string().required('Select a monthly payment plan'),
});

const Form1 = ({navigation}) => {
  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [showSelectMonthModal, setShowSelectMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [progress, setProgress] = useState(33);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const data = {
      accomodationstatus: values.accommodationStatus,
      salary_amount: unFormatNumber(values.salaryAmount),
      amount_needed_from_kwaba: unFormatNumber(values.requestAmount),
      repayment_plan: values.monthlyPaymentPlan,
    };

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    console.log(loanFormData);

    await AsyncStorage.setItem(
      'rentalLoanForm',
      JSON.stringify({...JSON.parse(loanFormData), ...data}),
    );

    dispatch(setCurrentStage(stepsArray))


    navigation.navigate('FormBreakdown');
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

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const AccommodationOptions = (props) => {
    const accomdation_list = [
      'Looking to renew my rent',
      'Want to pay for a new place',
      'I’m still searching',
    ];

    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        {accomdation_list.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              designs.buttonStyleA,
              {
                borderColor: value == option ? COLORS.light : '#ADADAD50',
              },
            ]}
            onPress={() => setFieldValue('accommodationStatus', option)}>
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

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const SelectMonthlyPlan = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={styles.label}>Choose a monthly payment plan</Text>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowSelectMonthModal(!showSelectMonthModal);
          }}>
          {value != '' ? (
            <Text
              style={{
                // fontWeight: 'bold',
                color: COLORS.primary,
              }}>
              {value} {value <= 1 ? 'Month' : 'Months'}
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

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  return (
    <RnplStepProgress>
      <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <Formik
              validationSchema={rentalLoanFormSchema}
              initialValues={{
                accommodationStatus: '',
                requestAmount: '',
                salaryAmount: '',
                monthlyPaymentPlan: '',
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}>
              {({handleSubmit, isValid, values, setValues}) => (
                <>
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
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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

                      <Field
                        component={AccommodationOptions}
                        name="accommodationStatus"
                      />
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

                    <Field
                      component={SelectMonthlyPlan}
                      name="monthlyPaymentPlan"
                    />
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                      designs.button,
                      {backgroundColor: COLORS.secondary},
                    ]}>
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

                  <SelectMonthModal
                    onRequestClose={() =>
                      setShowSelectMonthModal(!showSelectMonthModal)
                    }
                    visible={showSelectMonthModal}
                    onClick={(value) => {
                      setValues({...values, monthlyPaymentPlan: value});
                      setSelectedMonth(value);
                    }}
                    selectedMonth={selectedMonth}
                  />
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </RnplStepProgress>
  );
};

export default Form1;

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


const stepsArray = [
  {
    title: 'Credit score',
    subTitle: '',
    status: 'complete',
  },
  {
    title: 'Applications',
    subTitle: '',
    status: 'complete',
  },
  {
    title: 'Documents upload',
    subTitle: '',
    status: 'locked',
  },
  {
    title: 'Offer approval breakdown',
    subTitle: '',
    status: 'locked',
  },
  {
    title: 'Property details',
    subTitle: '',
    status: 'locked',
  }
];