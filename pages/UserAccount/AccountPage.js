import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TouchableHighlight,
  Alert,
  Share,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, images, icons} from '../../util/index';
import {CustomTextInput, CustomPicker} from '../../components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import designs from './style';
import axios from 'axios';
import PasswordChangeModal from './PasswordChangeModal';
import {setLoginState} from '../../redux/actions/userActions';
import SuccessModal from '../../components/SuccessModal';
import ErrorModal from '../../components/ErrorModal';
import Intercom from '@intercom/intercom-react-native'


const width = Dimensions.get('window').width;
const AccountPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [secondPressed, setSecondPressed] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [oldpassword, setoldpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmnewpassword, setconfirmnewpassword] = useState('');
  const [WithrawmodalVisible, setWithrawModalVisible] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState('');

  const [successModal, setSuccessModal] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const login = useSelector((state) => state.loginReducer);

console.log('Resss')
  const [loanPurpose] = useState([
    {label: 'Household', value: 'Household'},
    {label: 'Personal', value: 'Personal'},
  ]);

  const [userToken, setUserToken] = useState(null);

  const LogOut = async () => {
    await AsyncStorage.removeItem('userData');

    dispatch(
      setLoginState({
        ...login,
        isLoggedIn: false,
        token: '',
      }),
    );

    // await AsyncStorage.setItem(
    //   'userData',
    //   JSON.stringify({...JSON.parse(login), isLoggedIn: false, token: ''}),
    // );
    navigation.navigate('WelcomeBack');
  };

  const accountTabsAndSettings = [
    // {
    //   iconName: 'wallet',
    //   tabTitle: 'Wallet',
    //   onClickFunction: function openCardAndBank() {
    //     // setWithrawModalVisible(true);
    //     navigation.navigate('Wallet');
    //   },
    // },
    {
      iconName: 'md-create-sharp',
      tabTitle: 'Withdraw',
      onClickFunction: function openCardAndBank() {
        // setWithrawModalVisible(true);
        navigation.navigate('Withdraw');
      },
    },
    {
      iconName: 'card',
      tabTitle: 'Card and Bank',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('CardAndBankDetails');
      },
    },
    {
      iconName: 'ios-share-social-sharp',
      tabTitle: 'Referral',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('Referral');
      },
    },
    {
      iconName: 'ios-shield-checkmark-sharp',
      tabTitle: 'Password and PIN',
      onClickFunction: function openCardAndBank() {
        // setModalVisible(true);
        navigation.navigate('PinPassword');
      },
    },
    {
      iconName: 'documents',
      tabTitle: 'Documents',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('UploadDocumentsList');
      },
    },
    {
      iconName: 'chatbox-ellipses',
      tabTitle: 'FAQs',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('LegalandFaq');
      },
    },
    {
      iconName: 'information-circle',
      tabTitle: 'About us',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('Aboutus');
      },
    },
    {
      iconName: 'chatbubble-ellipses',
      tabTitle: 'Support',
      onClickFunction: async function openCardAndBank() {
      const userres = await Intercom.displayMessenger()
      },
    },
    // {
    //   iconName: 'finger-print',
    //   tabTitle: 'Fingerprint',
    //   onClickFunction: function openCardAndBank() {
    //     navigation.navigate('Aboutus');
    //   },
    // },
  ];
  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const changePassword = async () => {
    // onConfirm={addCard}
    // onRequestClose={() => setModalVisible(!modalVisible)}
    // visible={modalVisible}
    // oldpassword={oldpassword}
    // setoldpassword={setoldpassword}
    // newpassword={newpassword}
    // setnewpassword={setnewpassword}
    // confirmnewpassword={confirmnewpassword}
    // setconfirmnewpassword={setconfirmnewpassword}

    if (newpassword != confirmnewpassword) {
      setErrorModal(true);
      setModalErrorMessage('password and confirm password must be the same.');
      return;
    }

    const token = await getToken();

    const userPasswordData = {
      oldPassword: oldpassword,
      newPassword: newpassword,
    };

    //console.log(userData);

    try {
      const url =
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/user/change_password';

      const response = await axios.put(url, JSON.stringify(userPasswordData), {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });

      console.log(response.status);
      if (response.status == 200) {
        setSuccessModalMessage('password Change successfull');
        setSuccessModal(true);
      }

      // navigation.navigate('RentalLoanOfferTest');
    } catch (error) {
      setModalErrorMessage(error.response.data.statusMsg);

      setErrorModal(true);
    }
  };

  const handleNavigation = () => {
    setSuccessModal(false);
    // navigation.navigate('GetCode');
  };

  const handleNavigation2 = () => {
    setErrorModal(false);
    // navigation.navigate('GetCode');
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log(userData);

      if (userData) {
        let {firstname, lastname} = JSON.parse(userData).user;
        let userName = firstname + ' ' + lastname;
        setFullName(userName);
        setFirstName(firstname);
        setLastName(lastname);
      }
    };
    getUserData();
  }, [login]);

  return (
    <ScrollView>
      {/* <StatusBar backgroundColor="#F7F8FD" /> */}
      <View style={{backgroundColor: '#F7F8FD', flex: 1}}>
        <View style={{paddingHorizontal: 20}}>
          <View style={{backgroundColor: '#F7F8FD', marginBottom: 22}}>
            <Text
              style={[
                {
                  color: '#2A286A',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  marginBottom: 10,
                  marginTop: 20,
                  marginLeft: 5,
                  fontSize: 20,
                },
              ]}>
              Account
            </Text>

            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                backgroundColor: '#ffffff',
                width: '100%',
                // borderColor: '#ff0',
                // borderWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderWidth: 1,

                  padding: 25,
                }}>
                {/* <Image
                style={{
                  width: 101,
                  height: 101,
                  borderRadius: 50,
                  marginRight: 11,
                  // marginLeft: 35,
                  // marginTop: 30,
                  // marginBottom: -20,
                }}
                source={images.ellipse96}
              /> */}
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 100,
                    backgroundColor: COLORS.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 20,
                  }}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 30, color: '#fff'}}>
                    {firstName.charAt(0)}
                    {lastName.charAt(0)}
                  </Text>
                </View>
                {/* <Text>JD</Text> */}
                <View style={{marginTop: 0, flex: 1}}>
                  <Text
                    numberOfLines={1}
                    style={[
                      FONTS.h3FontStyling,
                      {
                        // marginLeft: 40,
                        // marginTop: -23,
                        color: COLORS.primary,
                        fontWeight: 'bold',
                      },
                    ]}>
                    {fullName}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('profile');
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: COLORS.primary,

                      width: 100,
                      // height: 30,
                      borderRadius: 15,
                      paddingTop: 7,
                      paddingRight: 15,
                      paddingBottom: 7,
                      paddingLeft: 15,
                      // marginLeft: 40,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        // width: 78,
                        // height: 30,
                        borderRadius: 15,
                        color: COLORS.white,
                        textAlign: 'center',
                        // marginTop: 5,
                        fontWeight: 'bold',
                      }}>
                      Profile
                    </Text>
                    <IconFA
                      name="angle-right"
                      size={20}
                      color="#ffffff"
                      // style={{marginRight: 0, marginTop: 10, marginTop: }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('CreditScoreForAccountOnboarding')
              // }
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginTop: 22,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: '#2A286A',
                    // height: 40,
                    flexDirection: 'row',
                    padding: 10,
                    // display: 'none',
                  }}>
                  <Image
                    style={{width: 25, height: 25, marginRight: 5}}
                    source={icons.star}
                  />
                  <Text
                    style={[
                      FONTS.body1FontStyling,
                      {color: COLORS.white, fontSize: 12},
                    ]}>
                    credit score
                  </Text>

                  <Text
                    style={[
                      FONTS.body1FontStyling,
                      {
                        color: COLORS.white,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginHorizontal: 10,
                      },
                    ]}>
                    N/A
                  </Text>

                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Text
                      style={[
                        FONTS.body1FontStyling,
                        {
                          color: COLORS.light,
                          textAlign: 'right',
                          fontSize: 11,
                          flexShrink: 1,
                          lineHeight: 12,
                        },
                      ]}>
                      {/* You can build your credit score by saving and paying your
                    rent with Kwaba - coming soon */}
                      View and build your credit score.
                    </Text>
                    <View style={{paddingLeft: 20, justifyContent: 'center'}}>
                      <Icon
                        name="arrow-forward"
                        style={{
                          fontSize: 18,
                          color: COLORS.white,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              backgroundColor: '#ffffff',
              width: '100%',
              borderRadius: 20,
              // padding: 15,
              // paddingTop: 10,
              // paddingBottom: 10,
              // paddingRight: 20,
              // paddingLeft: 20,
            }}>
            {accountTabsAndSettings.map((value, index) => {
              return (
                <TouchableOpacity
                  style={{paddingHorizontal: 0}}
                  key={index}
                  onPress={() => {
                    value.onClickFunction();
                  }}>
                  <View
                    style={{
                      // height: 50,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderBottomColor: `${
                        index !== accountTabsAndSettings.length - 1
                          ? '#EAEAEA'
                          : 'transparent'
                      }`,
                      alignItems: 'center',
                      paddingHorizontal: 30,
                      paddingVertical: 20,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name={value.iconName}
                        size={23}
                        style={{
                          color: COLORS.primary,
                          width: 40,
                          // opacity: 0.6,
                          // borderBottomWidth: 1,
                        }}
                      />

                      <Text
                        style={[
                          FONTS.h3FontStyling,
                          {
                            // marginLeft: 40,
                            // marginTop: -23,
                            color: COLORS.primary,
                            fontSize: 14,
                            fontWeight: 'bold',
                          },
                        ]}>
                        {value.tabTitle}
                      </Text>
                    </View>
                    <View style={{}}>
                      <IconFA
                        name="chevron-right"
                        size={12}
                        color={COLORS.primary}
                        style={{opacity: 0.5}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{alignSelf: 'center', width: '100%'}}>
            <TouchableOpacity
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                paddingHorizontal: 30,
              }}
              onPress={() => {
                LogOut();
              }}>
              <View
                style={{
                  // height: 50,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 3,
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Icon
                    name="exit"
                    size={23}
                    style={{color: COLORS.red, width: 40}}
                  />
                  <Text
                    style={[
                      FONTS.h3FontStyling,
                      {color: COLORS.red, fontSize: 14, fontWeight: 'bold'},
                    ]}>
                    Logout
                  </Text>
                </View>
                <View style={{}}>
                  <IconFA name="chevron-right" size={12} color={COLORS.red} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <PasswordChangeModal
            onConfirm={changePassword}
            onRequestClose={() => setModalVisible(!modalVisible)}
            visible={modalVisible}
            oldpassword={oldpassword}
            setoldpassword={setoldpassword}
            newpassword={newpassword}
            setnewpassword={setnewpassword}
            confirmnewpassword={confirmnewpassword}
            setconfirmnewpassword={setconfirmnewpassword}
          />
        </View>

        <ErrorModal
          errorModal={errorModal}
          setErrorModal={setErrorModal}
          handlePress={handleNavigation2}
          errorHeading="Error ... "
          errorText={modalErrorMessage}
        />

        <SuccessModal
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          handlePress={handleNavigation}
          successHeading="Update Successful"
          successText={successModalMessage}
        />
      </View>
    </ScrollView>
  );
};

export default AccountPage;

const styles = StyleSheet.create({});
