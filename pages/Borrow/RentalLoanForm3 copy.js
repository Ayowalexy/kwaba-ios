import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  Pressable,
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
import DropDownPicker from 'react-native-dropdown-picker';
import SelectYearModal from '../../components/SelectYearModal';
import SelectPayMethodModal from '../../components/SelectPayMethodModal';

const RentalLoanForm3 = ({navigation}) => {
  const [homeAddress, setHomeAddress] = useState('');
  const [lengthOfResidence, setLengthOfResidence] = useState('');
  const [lastRentAmount, setLastRentAmount] = useState('');
  const [lastPaymentRecipient, setLastPaymentRecipient] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [modalVisible, setVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [progress, setProgress] = useState(100);
  const [pickerModalOpen, setPickerModalOpen] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const [showSelectYearModal, setShowSelectYearModal] = useState(false);
  const [showSelectPayMethodModal, setShowSelectPayMethodModal] = useState(
    false,
  );
  const [selectedYear, setSelectedYear] = useState('');

  const [lengthOfResidenceOptions] = useState([
    {label: 'Less than a year', value: 'Less than a year'},
    {label: '1 Year', value: '1 Year'},
    {label: '2 Years', value: '2 Years'},
    {label: '3 Years', value: '3 Years'},
    {label: '4 Years', value: '4 Years'},
    {label: '5 Years', value: '5 Years'},
    {label: 'More than five Years', value: 'More than five Years'},
  ]);
  const [modeOfPaymentOptions] = useState([
    {label: 'Bank Transfer', value: 'Bank Transfer'},
    {label: 'Cheque', value: 'Cheque'},
    {label: 'Deposit', value: 'Deposit'},
  ]);

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

    // if (isError()) {
    //   return Alert.alert('Missing inputs', 'Please Fill out all fields', [
    //     {text: 'Close'},
    //   ]);
    // }
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

  const handleNavigation = () => {
    setSuccessModal(false);
    navigation.navigate('UploadBankStatement');
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
            // marginVertical: 11,
            // marginHorizontal: 16,
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
            {/* <TextInput
            style={[designs.textField, {marginBottom: 17, textAlign: 'left'}]}
            placeholder="1 year"
            placeholderTextColor= {COLORS.grey}
            value={lengthOfResidence}
          onChangeText={(text) => setLengthOfResidence(text)}
          /> */}
            {/* <View style={{minHeight: 10}}>
              <DropDownPicker
                items={lengthOfResidenceOptions}
                defaultNull
                placeholder="1 Year"
                placeholderStyle={{
                  color: COLORS.grey,
                  fontSize: 14,
                  // lineHeight: 30,
                }}
                style={designs.dropDownPicker}
                // controller={instance => controller = instance}
                dropDownStyle={{
                  alignItems: 'flex-end',
                }}
                // dropDownMaxHeight={}
                arrowStyle={{marginRight: 4}}
                arrowSize={18}
                arrowColor={COLORS.grey}
                onChangeItem={(item) => setLengthOfResidence(item.value)}
                // onOpen={() => setPickerModalOpen(true)}
              />
            </View> */}
            <TouchableOpacity
              style={styles.customInput}
              onPress={() => {
                setShowSelectYearModal(!showSelectYearModal);
              }}>
              {selectedYear != '' ? (
                <Text
                  style={{
                    // fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {selectedYear} {selectedYear <= 1 ? 'year' : 'years'}
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
            <Text
              style={[
                FONTS.body1FontStyling,
                {color: COLORS.dark, marginBottom: 8, fontSize: 14},
              ]}>
              How much was your last rent?{' '}
            </Text>
            <TextInput
              style={[designs.textField, {marginBottom: 27, textAlign: 'left'}]}
              placeholder="Amount"
              placeholderTextColor={COLORS.grey}
              value={lastRentAmount}
              onChangeText={(text) => setLastRentAmount(text)}
              keyboardType="number-pad"
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
            {/* <TextInput
            style={[designs.textField, {marginBottom: 0, textAlign: 'left'}]}
            placeholder="Select an option"
            placeholderTextColor= {COLORS.grey}
            value={modeOfPayment}
          onChangeText={(text) => setModeOfPayment(text)}
          /> */}
            {/* <View style={{minHeight: 50, elevation: 10000, zIndex: 10000}}>
               <DropDownPicker
        
                    items={modeOfPaymentOptions}
                    defaultNull
                    placeholder="Select an option"
                    placeholderStyle={{color: COLORS.grey, fontSize: 16, lineHeight: 30}}
                    style={[designs.dropDownPicker, {elevation: 5000, zIndex: 10000}]}
                    // controller={instance => controller = instance}
                    dropDownStyle={{elevation: 5000, zIndex: 10000}}
                    dropDownMaxHeight={200}
                    arrowStyle={{marginRight: 4}}
                    arrowSize={18}
                    arrowColor={COLORS.grey}
                    onChangeItem={item => setModeOfPayment(item)}
                    onOpen={() => setPickerModalOpen(true)}
                />
            </View> */}

            {/* <Pressable
              onPress={() => {
                setPressed(!pressed);
                setPickerModalVisible(!pickerModalVisible);
                console.log('switched', pressed);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingTop: modeOfPayment == '' ? 35 : 7,
                paddingBottom: 25,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#EFEFEF',
                // borderColor: '#f00',
                backgroundColor: COLORS.white,
                marginBottom: 23,
              }}>
              <View style={{padding: 0, justifyContent: 'center'}}>
                <Text
                  style={{
                    color: COLORS.grey,
                    fontSize: modeOfPayment == '' ? 16 : 10,
                    lineHeight: modeOfPayment == '' ? 30 : 10,
                    marginBottom: modeOfPayment == '' ? 0 : 3,

                    // fontSize: 16,
                    // lineHeight: 30,
                    // marginBottom: 0,
                  }}>
                  How did you pay
                </Text>

                {modeOfPayment !== '' && (
                  <Text
                    style={[FONTS.body1FontStyling, {marginBottom: 'auto'}]}>
                    {modeOfPayment}
                  </Text>
                )}
              </View>
              <View
                style={{
                  height: '100%',
                  paddingTop: modeOfPayment == '' ? 0 : 12,
                }}>
                <IconFA
                  name={pressed ? 'angle-up' : 'angle-down'}
                  size={25}
                  color={COLORS.grey}
                />
              </View>
            </Pressable> */}

            <TouchableOpacity
              style={styles.customInput}
              onPress={() => {
                setShowSelectPayMethodModal(!showSelectPayMethodModal);
              }}>
              {selectedYear != '' ? (
                <Text
                  style={{
                    // fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {showSelectPayMethodModal}
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

            <Modal
              visible={pickerModalVisible}
              animationType="fade"
              transparent={true}
              onRequestClose={() => {
                setPickerModalVisible(!pickerModalVisible);
                setPressed(!pressed);
              }}>
              <View style={designs.modalWrapper}>
                <View style={designs.modalView}>
                  <View
                    style={[designs.modalHeader, {justifyContent: 'flex-end'}]}>
                    <Icon
                      onPress={() => {
                        setPickerModalVisible(!pickerModalVisible);
                        setPressed(!pressed);
                      }}
                      style={{alignSelf: 'flex-end'}}
                      name="close-outline"
                      size={30}
                      color="#465969"
                    />
                  </View>
                  <View>
                    {modeOfPaymentOptions.map((value, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setModeOfPayment(value.value);
                            setPickerModalVisible(false);
                            setPressed(!pressed);
                          }}>
                          <Text style={FONTS.body1FontStyling}>
                            {value.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            </Modal>
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
                <Text style={designs.modalBodyText}>
                  You are about to submit your finance request
                </Text>
                <TouchableOpacity
                  onPress={handleModalButtonPush}
                  // disabled={isError()}
                  style={[
                    designs.button,
                    {
                      backgroundColor: COLORS.secondary,
                      marginBottom: 37,
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
                        fontWeight: 'normal',
                      },
                    ]}>
                    SUBMIT
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('RentalLoanForm2')}
                  onPress={() => setVisible(!modalVisible)}
                  style={[
                    designs.button,
                    {
                      backgroundColor: 'white',
                      elevation: 0,
                      marginBottom: 24,
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
                        fontWeight: 'normal',
                      },
                    ]}>
                    NO, NOT NOW
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={successModal} animationType="fade" transparent={true}>
          <View style={designs.centeredModalWrapper}>
            <View style={[designs.successModal, {borderRadius: 30}]}>
              <Icon
                style={{alignSelf: 'flex-end'}}
                onPress={() => setSuccessModal(false)}
                name="close-outline"
                size={30}
                color="#D6D6D6"
              />
              <Image
                source={icons.tick}
                style={{width: 84, height: 84, marginTop: 25}}
              />
              <Text style={designs.successModalBodyText}>
                Finance Request Submitted
              </Text>
              <Text
                style={{
                  color: '#ADADAD',
                  fontSize: 12,
                  lineHeight: 15,
                  fontWeight: 'bold',
                  marginTop: 6,
                }}>
                Congratulations! your request has been submitted.
              </Text>
              <TouchableOpacity
                onPress={handleNavigation}
                style={[
                  designs.button,
                  {
                    marginTop: 30,
                    width: '100%',
                    alignSelf: 'center',
                    backgroundColor: COLORS.secondary,
                  },
                ]}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: 14,
                    lineHeight: 30,
                    textAlign: 'center',
                  }}>
                  JUST A FEW THINGS LEFT
                </Text>
              </TouchableOpacity>
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
        onClick={(value) => setSelectedYear(value)}
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
