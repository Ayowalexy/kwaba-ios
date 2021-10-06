import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logCurrentStorage} from '../../util/logCurrentStorage';
import axios from 'axios';
import SelectYearModal from '../../components/SelectYearModal';
import SelectPayMethodModal from '../../components/SelectPayMethodModal';
import {formatNumber, unFormatNumber} from '../../util/numberFormatter';

import Spinner from 'react-native-loading-spinner-overlay';

import {Formik, Field} from 'formik';
import * as yup from 'yup';

const rentalLoanFormSchema = yup.object().shape({
  homeAddress: yup.string().required('Field required'),
  lengthOfResidence: yup.string().required('Field required'),
  lastRentAmount: yup.string().required('Field required'),
  whoDidYouPayTo: yup.string().required('Field required'),
  howDidYouPay: yup.string().required('Field required'),
});

const RentalLoanForm3 = ({navigation}) => {
  const [homeAddress, setHomeAddress] = useState('');
  const [lengthOfResidence, setLengthOfResidence] = useState('');
  const [lastRentAmount, setLastRentAmount] = useState('');
  const [lastPaymentRecipient, setLastPaymentRecipient] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [modalVisible, setVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [progress, setProgress] = useState(100);

  const [showSelectYearModal, setShowSelectYearModal] = useState(false);
  const [showSelectPayMethodModal, setShowSelectPayMethodModal] = useState(
    false,
  );
  const [selectedPayMethod, setSelectedPayMethod] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [spinner, setSpinner] = useState(false);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    // console.log(userData);
    return token;
  };

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const dummyData = {
    accomodationstatus: '',
    amount: '',
    amount_needed_from_kwaba: '',
    bvn: '',
    dob: '1991-10-09',
    employee_work_email: '',
    employer_address: '',
    employer_email: '',
    employer_name: '',
    existing_loan_amount: '',
    home_address: '',
    home_stay_duration: '',
    last_rent_amount: '',
    last_rent_paid_to: '',
    last_rent_payment_method: '',
    loanable_amount: '',
    monthly_repayment: '',
    next_rent_address: '',
    next_rent_paid_to: '',
    non_refundable_deposit: '2500',
    pre_available_rent_amount: '',
    referrer: '',
    repayment_plan: '',
    salary_amount: '',
    total_rent: '',
  };

  const dummyData2 = {
    bvn: '123456789',
    dob: '1991-10-09',
  };

  const handleModalButtonPush = async () => {
    setVisible(false);

    const data = {
      home_address: homeAddress,
      home_stay_duration: lengthOfResidence,
      last_rent_amount: unFormatNumber(lastRentAmount),
      last_rent_paid_to: lastPaymentRecipient,
      last_rent_payment_method: modeOfPayment,
    };

    console.log(lengthOfResidence);

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    const url =
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/new';
    const token = await getToken();
    console.log(dummyData);
    console.log(token);
    console.log({...dummyData, ...JSON.parse(loanFormData), ...data});
    try {
      const response = await axios.post(
        url,
        {...dummyData, ...JSON.parse(loanFormData), ...data},
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      console.log(response);
      setSuccessModal(true);

      logCurrentStorage();
    } catch (error) {
      console.log(error.response.data);
      Alert.alert('Message', error.response.data.statusMsg, [{text: 'Close'}]);
    }
  };

  const handleSubmit = async (values) => {
    const data = {
      home_address: values.homeAddress,
      home_stay_duration: values.lengthOfResidence,
      last_rent_amount: values.lastRentAmount,
      last_rent_paid_to: values.whoDidYouPayTo,
      last_rent_payment_method: values.howDidYouPay,
    };

    console.log(data);

    const user = await getUser();

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');

    await AsyncStorage.setItem(
      'rentalLoanForm',
      JSON.stringify({...JSON.parse(loanFormData), ...data}),
    );

    setVisible(true);

    const rentalSteps = await AsyncStorage.getItem(`rentalSteps-${user.id}`);
    const steps = JSON.parse(rentalSteps);

    let stepsData = {
      application_form: 'done',
      congratulation: '',
      all_documents: '',
      verifying_documents: '',
      offer_breakdown: '',
      property_detail: '',
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
  };

  const handlePostSubmit = async () => {
    setVisible(false);
    setSpinner(true);

    const token = await getToken();
    let loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    let parsedData = JSON.parse(loanFormData);

    let data = {...dummyData, ...parsedData};
    console.log('The Data: ', data);

    try {
      const url =
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/new';
      const response = await axios.post(url, data, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      // console.log('The response: ', response);
      navigation.navigate('RentalLoanFormCongratulation');
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      console.log(error.response.data);
      if (
        error?.response?.data?.statusMsg ==
        'You already have a pending application!'
      ) {
        navigation.navigate('RentalLoanFormCongratulation');
        setSpinner(false);
      }
    }
  };

  const getApplicationData = async () => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };
    const token = await getToken();

    const borrwSteps = await AsyncStorage.getItem('borrwsteps');
    const steps = JSON.parse(borrwSteps);

    console.log('steps here' + steps);
    try {
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      // console.log(applicationIDCallRes.data.data.id);
      console.log(applicationIDCallRes.data.data);
      const applicationId = applicationIDCallRes.data.data.id;
      const status = applicationIDCallRes.data.data.status;
      // const statement = applicationIDCallRes.data.data.statement;
      if (status !== 4) {
        // setExistingApplication(applicationId);
        console.log('here', applicationId);
        console.log('status', applicationIDCallRes.data.data.status);
      }
    } catch (error) {
      console.log(error.response.data);
    }
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

  const WhoDidYouPayTo = (props) => {
    const lists = ['Landlord', 'Caretaker', 'Agent'];

    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        {lists.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              designs.buttonStyleA,
              {
                borderColor: value == option ? COLORS.light : '#ADADAD50',
              },
            ]}
            onPress={() => setFieldValue('whoDidYouPayTo', option)}>
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
  };

  const HowDidYouPay = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <TouchableOpacity
          style={[designs.customInput, {padding: 20}]}
          onPress={() => {
            setShowSelectPayMethodModal(!showSelectPayMethodModal);
          }}>
          {value != '' ? (
            <Text
              style={{
                // fontWeight: 'bold',
                color: COLORS.primary,
              }}>
              {value}
            </Text>
          ) : (
            <Text
              style={{
                // fontWeight: 'bold',
                color: '#BABABA',
              }}>
              How did you pay
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
    );
  };

  const LengthOfResidence = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <TouchableOpacity
          style={[designs.customInput, {padding: 20}]}
          onPress={() => {
            setShowSelectYearModal(!showSelectYearModal);
          }}>
          {value != '' ? (
            <Text
              style={{
                // fontWeight: 'bold',
                color: COLORS.primary,
              }}>
              {value}
            </Text>
          ) : (
            <Text
              style={{
                // fontWeight: 'bold',
                color: '#BABABA',
              }}>
              Choose a year
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
    );
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', padding: 15}}
        color={COLORS.primary}
      />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Formik
            validationSchema={rentalLoanFormSchema}
            initialValues={{
              homeAddress: '',
              lengthOfResidence: '',
              lastRentAmount: '',
              whoDidYouPayTo: '',
              howDidYouPay: '',
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
                  Rent Now Pay Later
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
                      Rent Information
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

                  <>
                    <Text
                      style={[
                        FONTS.body1FontStyling,
                        {
                          color: COLORS.dark,
                          marginBottom: 0,
                          marginTop: 20,
                          fontSize: 14,
                        },
                      ]}>
                      What is your current home address?
                    </Text>
                    <Field
                      component={CustomInput}
                      name="homeAddress"
                      placeholder="Enter Address"
                    />
                  </>

                  <>
                    <Text
                      style={[
                        FONTS.body1FontStyling,
                        {
                          color: COLORS.dark,
                          marginBottom: 0,
                          marginTop: 20,
                          fontSize: 14,
                        },
                      ]}>
                      How long have you lived here?
                    </Text>

                    <Field
                      component={LengthOfResidence}
                      name="lengthOfResidence"
                    />
                  </>

                  <>
                    <Text
                      style={[
                        FONTS.body1FontStyling,
                        {
                          color: COLORS.dark,
                          marginBottom: 0,
                          marginTop: 20,
                          fontSize: 14,
                        },
                      ]}>
                      How much was your last rent?{' '}
                    </Text>
                    <Field
                      component={NumberInput}
                      name="lastRentAmount"
                      placeholder="Amount"
                    />
                  </>

                  <>
                    <Text
                      style={[
                        FONTS.body1FontStyling,
                        {
                          color: COLORS.dark,
                          marginBottom: 0,
                          marginTop: 20,
                          fontSize: 14,
                        },
                      ]}>
                      Who did you pay to?{' '}
                    </Text>
                    <Field component={WhoDidYouPayTo} name="whoDidYouPayTo" />
                  </>

                  <>
                    <Text
                      style={[
                        FONTS.body1FontStyling,
                        {
                          color: COLORS.dark,
                          marginBottom: 0,
                          marginTop: 20,
                          fontSize: 14,
                        },
                      ]}>
                      How did you pay?{' '}
                    </Text>
                    <Field component={HowDidYouPay} name="howDidYouPay" />
                  </>
                </View>

                <TouchableOpacity
                  // onPress={() => setVisible(true)}
                  onPress={handleSubmit}
                  // onPress={()=> console.log('Submitting...')}
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

                <SelectPayMethodModal
                  onRequestClose={() =>
                    setShowSelectPayMethodModal(!showSelectPayMethodModal)
                  }
                  visible={showSelectPayMethodModal}
                  onClick={(value) =>
                    setValues({...values, howDidYouPay: value})
                  }
                />

                <SelectYearModal
                  onRequestClose={() =>
                    setShowSelectYearModal(!showSelectYearModal)
                  }
                  visible={showSelectYearModal}
                  onClick={(value) =>
                    setValues({...values, lengthOfResidence: value})
                  }
                />
              </>
            )}
          </Formik>
        </View>

        <Modal
          // visible={true}
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setVisible(false)}>
          <View style={designs.modalWrapper}>
            <View style={designs.modalView}>
              <View style={[designs.modalHeader, {marginBottom: 11}]}>
                <Icon
                  onPress={() => setVisible(false)}
                  style={{marginLeft: 'auto'}}
                  name="close-outline"
                  size={30}
                  color="#D6D6D6"
                />
              </View>
              <View>
                <Text style={designs.modalTitleText}>Confirm</Text>
                <Text style={[designs.modalBodyText, {textAlign: 'center'}]}>
                  You are about to submit your finance request
                </Text>
                <TouchableOpacity
                  // onPress={handleModalButtonPush}
                  onPress={handlePostSubmit}
                  // disabled={isError()}
                  style={[
                    designs.button,
                    {
                      backgroundColor: COLORS.secondary,
                      // marginBottom: 37,
                      width: '100%',
                      alignSelf: 'center',
                    },
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
                    SUBMIT
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('RentalLoanForm2')}
                  // onPress={() => setVisible(!modalVisible)}
                  onPress={getApplicationData}
                  style={[
                    designs.button,
                    {
                      backgroundColor: 'white',
                      elevation: 0,
                      // marginBottom: 24,
                      width: '100%',
                      alignSelf: 'center',
                    },
                  ]}>
                  <Text
                    style={[
                      designs.buttonText,
                      {
                        color: '#BFBFBF',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 12,
                      },
                    ]}>
                    NO, NOT NOW
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>

      <Spinner visible={spinner} size="large" />
    </View>
  );
};

export default RentalLoanForm3;

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
    padding: 20,
  },
});
