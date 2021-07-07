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
import WithdrawModal from './WithdrawModal';
import {setLoginState} from '../../redux/actions/userActions';
import SuccessModal from '../../components/SuccessModal';
import ErrorModal from '../../components/ErrorModal';

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
    navigation.navigate('Login');
  };

  const Referral = () => {};

  const addCard = () => {
    setModalVisible(false);
    setShowCard(true);
  };

  const addWithdrawCard = () => {
    setWithdrawModalVisible(false);
    setWithdrawShowCard(true);
  };

  const accountTabsAndSettings = [
    {
      iconName: 'cash-outline',
      tabTitle: 'Withdraw',
      onClickFunction: function openCardAndBank() {
        // setWithrawModalVisible(true);
        navigation.navigate('Withdraw');
      },
    },
    {
      iconName: 'card-outline',
      tabTitle: 'Card and Bank',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('CardAndBankDetails');
      },
    },
    {
      iconName: 'share-social-outline',
      tabTitle: 'Referral',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('Referral');
      },
    },
    {
      iconName: 'lock-open-outline',
      tabTitle: 'Change Password',
      onClickFunction: function openCardAndBank() {
        setModalVisible(true);
      },
    },
    {
      iconName: 'folder-open-outline',
      tabTitle: 'Documents',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('UploadDocumentsList');
      },
    },
    {
      iconName: 'document-outline',
      tabTitle: 'Legals and FAQs',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('LegalandFaq');
      },
    },
    {
      iconName: 'information',
      tabTitle: 'About us',
      onClickFunction: function openCardAndBank() {
        navigation.navigate('Aboutus');
      },
    },
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
      const url = 'http://67.207.86.39:8000/api/v1/user/change_password';

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
        <View style={{backgroundColor: '#F7F8FD', marginBottom: 22}}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: 20,
                marginTop: 20,
                marginLeft: 20,
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
              width: width * 0.95,
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
                  backgroundColor: COLORS.light,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 30, color: '#fff'}}>
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </Text>
              </View>
              {/* <Text>JD</Text> */}
              <View style={{marginTop: 0, width: 120}}>
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
                  {/* Joshua Nwosu */}
                  {fullName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('profile');
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#9D98EC',

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
              {/* <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.secondary,
                    borderRadius: 20,
                    marginLeft: 5,
                    height: 25,
                    width: 36,
                  }}>
                  <Text
                    style={[
                      FONTS.h3FontStyling,
                      {
                        color: COLORS.primary,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      },
                    ]}>
                    65
                  </Text>
                </TouchableOpacity>
              </View> */}
              {/* <Text
                style={[
                  FONTS.body1FontStyling,
                  {color: COLORS.white, textAlign: 'center', fontSize: 14},
                ]}>
                /100
              </Text> */}
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

              <View style={{flexDirection: 'column', flex: 1}}>
                <Text
                  style={[
                    FONTS.body1FontStyling,
                    {
                      color: COLORS.light,
                      textAlign: 'right',
                      fontSize: 9,
                      flexShrink: 1,
                      lineHeight: 12,
                    },
                  ]}>
                  You can build your credit score by saving and paying your rent
                  with Kwaba - coming soon
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            backgroundColor: '#ffffff',
            width: width * 0.95,
            borderRadius: 20,
            // padding: 15,
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 20,
            paddingLeft: 20,
          }}>
          {accountTabsAndSettings.map((value, index) => {
            return (
              <TouchableOpacity
                // style={{height: 50}}
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
                    // paddingLeft: 10,
                    paddingTop: 20,
                    paddingBottom: 20,
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
                        color: COLORS.light,
                        width: 40,
                        // borderBottomWidth: 1,
                      }}
                    />

                    <Text
                      style={[
                        FONTS.h3FontStyling,
                        {
                          // marginLeft: 40,
                          // marginTop: -23,
                          color: COLORS.dark,
                          fontSize: 14,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {value.tabTitle}
                    </Text>
                  </View>
                  <View style={{}}>
                    <IconFA
                      name="angle-right"
                      size={20}
                      color="#BFBFBF"
                      // style={{marginRight: 20, marginTop: 10}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{alignSelf: 'center', width: width * 0.9}}>
          <TouchableOpacity
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 10,
              paddingRight: 10,
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
                <IconFA
                  name="sign-out"
                  size={20}
                  style={{color: COLORS.light, width: 40}}
                />
                <Text
                  style={[
                    FONTS.h3FontStyling,
                    {color: COLORS.dark, fontSize: 14, fontWeight: 'bold'},
                  ]}>
                  Logout
                </Text>
              </View>
              <View style={{}}>
                <IconFA
                  name="angle-right"
                  size={20}
                  color="#BFBFBF"
                  // style={{marginRight: 20, marginTop: 10}}
                />
              </View>
            </View>
          </TouchableOpacity>
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

        <View>
          <WithdrawModal
            onConfirm={addWithdrawCard}
            onRequestClose={() => setWithrawModalVisible(!WithrawmodalVisible)}
            visible={WithrawmodalVisible}
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
