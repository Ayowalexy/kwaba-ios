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
import NumberFormat from '../../components/NumberFormat';

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

  const isError = () => {
    // if(typeof lengthOfResidence !== "string"){
    //   return true;
    // }
    // else

    let value = true;
    let homeAddress1 = homeAddress.trim().length;
    console.log(homeAddress1);
    let lengthOfResidence1 = lengthOfResidence.trim().length;
    let lastRentAmount1 = lastRentAmount.trim().length;
    let lastPaymentRecipient1 = lastPaymentRecipient.trim().length;
    let modeOfPayment1 = modeOfPayment.trim().length;
    if (
      homeAddress1 == 0 ||
      lengthOfResidence1 == 0 ||
      lastRentAmount1 == 0 ||
      lastPaymentRecipient1 == 0 ||
      modeOfPayment1 == 0
    ) {
      return true;
    } else {
      value = false;
      console.log(value);
      return false;
    }
  };

  const handleModalButtonPush = async () => {
    setVisible(false);

    const data = {
      home_address: homeAddress,
      home_stay_duration: lengthOfResidence,
      last_rent_amount: lastRentAmount,
      last_rent_paid_to: lastPaymentRecipient,
      last_rent_payment_method: modeOfPayment,
    };

    console.log(lengthOfResidence);

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    const url = 'http://67.207.86.39:8000/api/v1/application/new';
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

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const dummyData = {
    accomodationstatus: 'Want to pay for a new place',
    amount: '600000',
    amount_needed_from_kwaba: '600000',
    bvn: '123456789',
    dob: '1991-10-09',
    employee_work_email: 'prince@kwaba.ng',
    employer_address: 'Etiosa, Ikoyi',
    employer_email: 'Hello.kwaba@gmail.com',
    employer_name: 'Kwaba',
    existing_loan_amount: '0',
    home_address: '32 Adebisi Street,Ketu',
    home_stay_duration: 'Less Than 1 Year',
    last_rent_amount: '500000',
    last_rent_paid_to: 'Landlord',
    last_rent_payment_method: 'Bank transfer',
    loanable_amount: '600000',
    monthly_repayment: '60000',
    next_rent_address: '32 Trans-Bucknor Street, Lagos',
    next_rent_paid_to: 'Landlord',
    non_refundable_deposit: '2000',
    pre_available_rent_amount: '0',
    referrer: '',
    repayment_plan: '6 Months',
    salary_amount: '100000',
    total_rent: '600000',
  };

  const handleNavigation = async() => {
    // setSuccessModal(false);
    // navigation.navigate('UploadBankStatement');

    // added by Joshua Nwosu
    setVisible(false);

    // let stepsdata={
     
    //   propertydetail:'done',
    //   landlorddetail:'done',
    //   documentdone:'',
    //   refree:'',
    //   offeraccepted:'',
    //   addressverification:'',
    //   debitmandate:'',
    //   awaitingdisbursment:'',
    // };
    //   await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));

    // // console.log('steps here', steps);
    //   const borrwSteps = await AsyncStorage.getItem('borrwsteps');
    //   const steps = JSON.parse(borrwSteps);
      
    //   if (steps.documentdone == '') {
    //     navigation.navigate('UploadDocuments');
    //   } else if (steps.refree == '') {
    //     navigation.navigate('UploadDocuments');
    //   }
    //   else if (steps.offeraccepted == '') {
    //     navigation.navigate('RentalLoanOfferTest'); 
    //   } else if (steps.addressverification == '') {
    //     navigation.navigate('AddressVerificationPayment');
    //   } else if (steps.debitmandate == '') {
    //     navigation.navigate('OkraDebitMandate');
    //   } else if (steps.awaitingdisbursment == '') {
    //     navigation.navigate('AwaitingDisbursement');
    //   }
    // // } else {
    // //   navigation.navigate('RentalLoanForm1');

    //   //navigation.navigate('EmergencyLoanRequestDashBoard');

    // //   return token;
    // // }
    navigation.navigate('RentalLoanFormCongratulation');
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
        'http://67.207.86.39:8000/api/v1/application/one',
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
            <Text
              style={[
                FONTS.body1FontStyling,
                {color: COLORS.dark, marginBottom: 8, fontSize: 14},
              ]}>
              What is your current home address?
            </Text>
            <TextInput
              style={[designs.textField, {marginBottom: 17, textAlign: 'left'}]}
              placeholder="Enter Address"
              placeholderTextColor={COLORS.grey}
              value={homeAddress}
              onChangeText={(text) => setHomeAddress(text)}
            />

            <Text
              style={[
                FONTS.body1FontStyling,
                {color: COLORS.dark, marginBottom: 8, fontSize: 14},
              ]}>
              How long have you lived here?{' '}
            </Text>

            <TouchableOpacity
              style={styles.customInput}
              onPress={() => {
                setShowSelectYearModal(!showSelectYearModal);
              }}>
              {selectedYear != '' ? (
                <Text
                  style={{
                    color: COLORS.light,
                  }}>
                  {selectedYear} {selectedYear <= 1 ? 'year' : 'years'}
                </Text>
              ) : (
                <Text
                  style={{
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
            <Text
              style={[
                FONTS.body1FontStyling,
                {color: COLORS.dark, marginBottom: 8, fontSize: 14},
              ]}>
              How much was your last rent?{' '}
            </Text>

            <NumberFormat
              value={lastRentAmount}
              onChangeText={(text) => setLastRentAmount(text)}
            />

            <Text
              style={[
                FONTS.body1FontStyling,
                {color: COLORS.dark, marginBottom: 11, fontSize: 14},
              ]}>
              Who did you pay to?{' '}
            </Text>
            <TouchableOpacity
              style={[
                designs.buttonStyleA,
                {
                  borderColor:
                    lastPaymentRecipient == 'Landlord'
                      ? COLORS.light
                      : '#EFEFEF',
                },
              ]}
              onPress={() => setLastPaymentRecipient('Landlord')}>
              <View>
                <Text
                  style={[
                    designs.btnText,
                    {
                      color:
                        lastPaymentRecipient == 'Landlord'
                          ? COLORS.light
                          : COLORS.grey,
                    },
                  ]}>
                  Landlord
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                designs.buttonStyleA,
                {
                  borderColor:
                    lastPaymentRecipient == 'Caretaker'
                      ? COLORS.light
                      : '#EFEFEF',
                },
              ]}
              onPress={() => setLastPaymentRecipient('Caretaker')}>
              <View>
                <Text
                  style={[
                    designs.btnText,
                    {
                      color:
                        lastPaymentRecipient == 'Caretaker'
                          ? COLORS.light
                          : COLORS.grey,
                    },
                  ]}>
                  Caretaker
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                designs.buttonStyleA,
                {
                  borderColor:
                    lastPaymentRecipient == 'Agent' ? COLORS.light : '#EFEFEF',
                },
              ]}
              onPress={() => setLastPaymentRecipient('Agent')}>
              <View>
                <Text
                  style={[
                    designs.btnText,
                    {
                      color:
                        lastPaymentRecipient == 'Agent'
                          ? COLORS.light
                          : COLORS.grey,
                    },
                  ]}>
                  Agent
                </Text>
              </View>
            </TouchableOpacity>

            <Text
              style={[
                FONTS.body1FontStyling,
                {color: COLORS.dark, marginBottom: 8, fontSize: 14},
              ]}>
              How did you pay?{' '}
            </Text>

            <TouchableOpacity
              style={styles.customInput}
              onPress={() => {
                setShowSelectPayMethodModal(!showSelectPayMethodModal);
              }}>
              {selectedPayMethod != '' ? (
                <Text
                  style={{
                    color: COLORS.light,
                  }}>
                  {selectedPayMethod}
                </Text>
              ) : (
                <Text
                  style={{
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
          </View>

          <TouchableOpacity
            onPress={() => setVisible(true)}
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
        </View>

        {/* Confirm Modal */}

        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {}}>
          <View style={designs.modalWrapper}>
            <View style={designs.modalView}>
              <View style={[designs.modalHeader, {marginBottom: 11}]}>
                <Icon
                  onPress={() => setVisible(!modalVisible)}
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
                  onPress={handleNavigation}
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

      <SelectYearModal
        onRequestClose={() => setShowSelectYearModal(!showSelectYearModal)}
        visible={showSelectYearModal}
        onClick={(value) => setSelectedYear(value)}
      />

      <SelectPayMethodModal
        onRequestClose={() =>
          setShowSelectPayMethodModal(!showSelectPayMethodModal)
        }
        visible={showSelectPayMethodModal}
        onClick={(value) => setSelectedPayMethod(value)}
      />
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
