import 'react-native-gesture-handler';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Welcome from './pages/Welcome/welcome';
import Onboarding from './pages/Onboarding/Onboarding';
import CompleteProfile1 from './pages/CompleteProfile/Screen1';
import CompleteProfile2 from './pages/CompleteProfile/Screen2';
import CompleteProfile3 from './pages/CompleteProfile/Screen3';
import CompleteProfile4 from './pages/CompleteProfile/Screen4';
import CompleteProfile5 from './pages/CompleteProfile/Screen5';
import CompleteProfile6 from './pages/CompleteProfile/Screen6';
import ForgotPassword from './pages/Auth/ForgotPassword';
import PasswordResetSuccess from './pages/Auth/PasswordResetSuccess';
import GetCode from './pages/Auth/GetCode';
import VerifyNumber from './pages/Auth/VerifyNumber';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import CreatePin from './pages/Auth/CreatePin';
import WelcomeBack from './pages/Auth/WelcomeBack';
import EnterPin from './pages/Auth/EnterPin';
import ResetPin from './pages/Auth/ResetPin';

import {
  SavingsHome,
  SoloSaving1,
  SoloSaving2,
  SoloSaving3,
  SoloSaving4,
  SavingLists,
  SoloSavingDashBoard,
  BuddySaving1,
  BuddySaving2,
  BuddySaving3,
  BuddySaving4,
  BuddySaving5,
  BuddySaving6,
  BuddyLists,
  BuddySavingDashBoard,
  BuddyPaymentScreen,
  AcceptInvite,
  BuddyInviteLists,
} from './pages/Savings/index';
import Borrow from './pages/Borrow/Borrow';
import RentNowPayLaterOnboarding from './pages/Borrow/RentNowPayLaterOnboarding';
import EmploymentStatus from './pages/Borrow/EmploymentStatus';
import EligibilitySalaryEarner from './pages/Borrow/EligibilitySalaryEarner';
import RentalLoanForm1 from './pages/Borrow/RentalLoanForm1';
import RentalLoanFormDoc from './pages/Borrow/RentalLoanFormDoc';
import RentalLoanForm2 from './pages/Borrow/RentalLoanForm2';
import RentalLoanForm3 from './pages/Borrow/RentalLoanForm3';
import RentalLoanFormCongratulation from './pages/Borrow/RentalLoanFormCongratulation';
import RentalLoanFormBankStatementUpload from './pages/Borrow/RentalLoanFormBankStatementUpload';
import RentalLoanFormBankStatementUploadEmail from './pages/Borrow/RentalLoanFormBankStatementUploadEmail';
import RentalLoanFormBankStatementUploadMono from './pages/Borrow/RentalLoanFormBankStatementUploadMono';
import RentNowPayLaterDashboard from './pages/Borrow/RentNowPayLaterDashboard';

import UploadBankStatement from './pages/Borrow/UploadBankStatement';
import UploadDocuments from './pages/Borrow/UploadDocuments';
import AllDocuments from './pages/Borrow/AllDocuments';
import LoanRequestApproval from './pages/Borrow/LoanRequestApproval';
import RentalLoanOffer from './pages/Borrow/RentalLoanOffer';
import SetUpPaymentPlan from './pages/Payment/SetUpPaymentPlan';
import RentalLoanActiveDashBoard from './pages/Payment/RentalLoanActiveDashBoard';
import RentalLoanThirdPartyConnection from './pages/Borrow/RentalLoanThirdPartyConnection';
import LinkingAccount from './pages/Borrow/LinkingAccount';
import ThirdPartyLink from './pages/Borrow/ThirdPartyLink';
import RentalLoanRequestDashBoard from './pages/Borrow/RentalLoanRequestDashboard';
import PayWithSavings from './pages/Payment/PayWithSavings';
import {logCurrentStorage} from './util/logCurrentStorage';
import FileUploadTest from './pages/Borrow/FileUploadTest';
import RentalLoanOfferTest from './pages/Borrow/RentalLoanOfferTest';
import BottomNavigator from './pages/Navigation/BottomNavigation';
import EmergencyLoanRequestDashBoard from './pages/Borrow/EmergencyLoan/EmergencyLoanRequestDashBoard';
import EmergencyFundOnboarding from './pages/Borrow/EmergencyLoan/EmergencyFundOnboarding';
import EmergencyLoanRequest from './pages/Borrow/EmergencyLoan/EmergencyLoanRequest';
import EmergencyLoanDashBoard from './pages/Borrow/EmergencyLoan/EmergencyLoanDashBoard';
import Account from './pages/UserAccount/Account';
import {FileViewAndDelete} from './pages/Borrow/FileViewAndDelete';
import AccountPage from './pages/UserAccount/AccountPage';
import CardAndBankDetails from './pages/UserAccount/CardAndBank/CardAndBank';
import Withdraw from './pages/UserAccount/Withdraw';
import PostPaymentForm1 from './pages/Payment/PostPaymentForm1';
import PostPaymentForm2 from './pages/Payment/PostPaymentForm2';
import PostPaymentForm3 from './pages/Payment/PostPaymentForm3';
import PostPaymentForm4 from './pages/Payment/PostPaymentForm4';
import OkraDebitMandate from './pages/Payment/OkraDebitMandate';
import LoanOfferContent from './pages/Payment/LoanOfferContent';
import AddressVerificationPayment from './pages/Payment/AddressVerificationPayment';
import AwaitingDisbursement from './pages/Payment/AwaitingDisbursement';
import BillsHome from './pages/Bills/BillsHome';
import CableTvBill from './pages/Bills/CableTvBill';
import DataBill from './pages/Bills/DataBill';
import ElectricityBill from './pages/Bills/ElectricityBill';
// import
import AirtimeHome from './pages/Airtime/AirtimeHome';
import PurchaseAirtime from './pages/Airtime/PurchaseAirtime';
import PrintOfferLetter from './pages/Payment/PrintOfferLetter';
import UploadDocumentsList from './pages/UserAccount/UploadDocumentsList';
import profile from './pages/CompleteProfile/profile';
import Referral from './pages/UserAccount/Referral/Referral';
import ReferralDetails from './pages/UserAccount/Referral/ReferralDetails';
import Aboutus from './pages/UserAccount/Aboutus/Aboutus';
import LegalandFaq from './pages/UserAccount/Aboutus/LegalandFaq';
import OkraDebitMandate2 from './pages/Payment/OkraDebitMandate2';
import {setLoginState} from './redux/actions/userActions';
import Toast from 'react-native-toast-message';
import linking from './util/linking';
//import UploadBankStatementForProfile from './pages/UserAccount/UploadBankStatementForProfile';

import ApplicationProgress from './pages/Borrow/ApplicationProgress';
import UploadBankStatementDocument from './pages/Borrow/UploadBankStatementDocument';

// Notifications
import Notifications from './pages/Notifications/Notifications';

// Business Owner Route
import EligibilityBusinessOwner from './pages/Borrow/Business/EligibilityBusinessOwner';
import BusinessForm1 from './pages/Borrow/Business/BusinessForm1';
import BusinessForm2 from './pages/Borrow/Business/BusinessForm2';
import BusinessForm3 from './pages/Borrow/Business/BusinessForm3';
import BusinessForm4 from './pages/Borrow/Business/BusinessForm4';
import BusinessForm5 from './pages/Borrow/Business/BusinessForm5';
import BusinessDocumentUpload from './pages/Borrow/Business/BusinessDocumentUpload';

// Rental Form Business
import {
  RentalFormBusiness1,
  RentalFormBusiness2,
  RentalFormBusinessDoc,
  RentalFormBusinessCongratulation,
} from './pages/Borrow/Business/RentalFormBusiness/index';

// Signature
import Signature from './pages/Signature/Signature';

// New All Documents
import NewAllDocuments from './pages/AllDocuments/AllDocuments';

// OfferApprovalBreakDown
import OfferApprovalBreakDown from './pages/Borrow/OfferApprovalBreakDown';

// VerifyingDocuments
import VerifyingDocuments from './pages/Borrow/VerifyingDocuments';

// OfferLetter
import OfferLetter from './pages/Borrow/OfferLetter';

// Guarantor
import GuarantorOnboarding from './pages/Guarantor/GuarantorOnboarding';
import GuarantorForm from './pages/Guarantor/GuarantorForm';

// Decline and Reject screens
import Decline from './pages/Decline/Decline';
import Reject from './pages/Decline/Reject';

// Acceptance Letter
import AcceptanceLetterAddosser from './pages/Borrow/AcceptanceletterAddosser';
import AcceptanceLetterKwaba from './pages/Borrow/AcceptanceLetterKwaba';

// Offer Letters
import {KwabaLetter, AddosserLetter, PTMFB} from './pages/OfferLetters';

// Disbursement
import Disbursement from './components/disbursement';

// payment form screen
import PaymentForm from './pages/Home/PaymentForm';

// payment successful screen
import PaymentSuccessful from './pages/Home/PaymentSuccessful';

// Mortgages screen
import Mortgages from './pages/Mortgages/Mortgage';
import SaveToOwn from './pages/Mortgages/SaveToOwn';

// Loans
import {LoanScreen1} from './pages/Loans';

// Wallet
import Wallet from './pages/Wallet/Wallet';

// Challenge
import JoinChallengeList from './pages/Challenge/JoinChallengeList';
import JoinChallengeDashboard from './pages/Challenge/JoinChallengeDashboard';
import JoinedSuccessful from './pages/Challenge/JoinedSuccessful';

import {useSelector, useDispatch} from 'react-redux';
import MonoDebitMandate from './pages/Payment/MonoDebitMandate';
import EmergencyLoanHome from './pages/Borrow/EmergencyLoan/EmergencyLoanHome';
import {View, Text, StatusBar, Linking, AppState, LogBox} from 'react-native';
import {COLORS} from './util/index';

import NetInfo from '@react-native-community/netinfo';

import Instabug from 'instabug-reactnative';

import {PinPassword} from './pages/UserAccount/PinPassword';

import analytics from '@segment/analytics-react-native';

import AppUpdate from './pages/AppUpdate/AppUpdate';

import CreditScoreDashboard from './pages/CreditScore/CreditScoreDashboard';

// import PushNotification from 'react-native-push-notification';

// import CodePush from 'react-native-code-push';
import CreditScoreOnboarding from './pages/CreditScore/CreditScoreOnboarding';
import CreditScoreForm from './pages/CreditScore/CreditScoreForm';
import CreditScoreAwaiting from './pages/CreditScore/CreditScoreAwaiting';


import {
  CreditScoreCheckFormForAccount,
  CreditScoreCheckFormForAwaiting,
  CreditScoreForAccountOnboarding,
} from './pages/CreditScore/ForAccount';
import {
  RnplEligibility,
  RnplOnboard,
  RnplSteps,
  RnplViews,
  Form1,
  Form2,
  Form3,
  FormBreakdown,
  RnplEmploymentStatus,
  RnplDirectdebit,
  RentHome,
} from './pages/screens/rnpl';
import {
  CreditAwaiting,
  CreditDashboard,
  CreditForm,
  CreditOnboard,
} from './pages/screens/rnpl/creditscore';
import {checkAppRelease} from './services/network';
import useInterval from './components/Hooks/useCountdown';

// import Smartlook from 'smartlook-react-native-wrapper';
// Smartlook.setupAndStartRecording('9847f227c510f58084716be56872e47cdbef5f54');

// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

const Stack = createStackNavigator();

// const linking = {
//   prefixes: ['https://kwaba.ng', 'kwaba://'],
//   config: {
//     screens: {
//       BuddyInviteLists: 'BuddyInviteLists',
//       AcceptInvite: 'AcceptInvite',
//       BuddyLists: 'BuddyLists',
//       SavingLists: 'SavingLists',
//       AirtimeHome: 'AirtimeHome',
//     },
//   },
// };

// let CodePushOptions = {
//   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
//   installMode: CodePush.InstallMode.IMMEDIATE,
// };

const Demo = () => {
  useInterval(() => {
    console.log('*'.repeat(50))
    console.log('Change')
    console.log('*'.repeat(50))
  }, 2000)
  return null
}

const App = () => {
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);

  const [appUpdateAvailable, setAppUpdateAvailable] = useState(false);

  const store2 = useSelector((state) => state.loginReducer);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const login = useSelector((state) => state.loginReducer);
  

  const d_1 = useRef(0)
  const d_2 = useRef(0)
  const inittialRender = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async nextAppState => {
      if(inittialRender.current){
          appState.current = nextAppState;
        if(appState.current === 'active'){
          d_1.current = Date.now()
          if(d_1.current - d_2.current > 60000){
            console.log('Inactive for more than one minutes')
            await AsyncStorage.removeItem('userData');
            dispatch(
              setLoginState({
                ...login,
                isLoggedIn: false,
                token: '',
              }),
            );
            // navigation.navigate('WelcomeBack');
            
          } else {
            console.log('Active under 1 minutes')
          }
        }

        if(appState.current === 'background'){
          console.log('new background')
          d_2.current = Date.now()
        }
      } else {
        inittialRender.current = true
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

 

  const createChannel = () => {
    // PushNotification.createChannel({
    //   channelId: 'test-channel',
    //   channelName: 'Test Channel',
    // });
  };

  useEffect(() => {
    (async () => {
      await analytics.setup('C0BVBjco2Aev69fXdUJfCpkBFvjHRZle', {
        recordScreenViews: true,
        trackAppLifecycleEvents: true,
      });
    })();

    Instabug.startWithToken('b47303822745b8ff58541cc8f3a54f23', [
      Instabug.invocationEvent.shake,
    ]);

    setTimeout(function () {
      SplashScreen.hide();
    }, 1000);

    var pkg = require('./package.json');
    console.log('pkg: ', pkg.version);

    createChannel();

    // logCurrentStorage();
  }, []);

  const getuser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = userData != null ? JSON.parse(userData).token : null;

    dispatch(setLoginState(JSON.parse(userData)));
    const loggedInStatus =
      userData != null ? JSON.parse(userData)?.isLoggedIn : false;
    setIsLoggedIn(loggedInStatus);
    setUserToken(token);
  };

  useEffect(() => {
    getuser();
  }, [store2.token]);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  const toastConfig = {
    success: ({text1, text2, props, ...rest}) => (
      <View
        style={{
          height: 60,
          width: '90%',
          backgroundColor: COLORS.primary,
          paddingLeft: 7,
        }}>
        <Text style={{color: COLORS.white, fontFamily: 'Poppins-Medium'}}>
          {text1}
        </Text>
        <Text style={{color: COLORS.white, fontFamily: 'Poppins-Medium'}}>
          {text2}
        </Text>
      </View>
    ),
    error: () => {},
    info: () => {},
    any_custom_type: () => {},
  };

  useEffect(() => {
    appRelease();
  }, []);

  const appRelease = async () => {
    const res = await checkAppRelease();
    console.log('Res: ', res);

    try {
      if (res.status == 200) {
        if (res?.data[0].version > '3.0.2') {
          setAppUpdateAvailable(true);
          console.log('Banger: ', res?.data);
        } else {
          setAppUpdateAvailable(false);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

 
  

  return (
    <>
      {!appUpdateAvailable ? (
        <AppUpdate
          openStore={() => {
            Linking.openURL('market://details?id=com.kwaba_mobile_app');
          }}
        />
      ) : (
        <NavigationContainer 
        linking={linking}
        // fallback={<ActivityIndicator color="blue" size="large" />}
        >
          <StatusBar
            backgroundColor={COLORS.primary}
            barStyle={'light-content'}
          />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,

            }}
            // initialRouteName={'CreditScoreAwaiting'}
            initialRouteName={'Welcome'}>
            {!store2?.isLoggedIn && store2?.token == '' ? (
              <>
                <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
                <Stack.Screen
                  name="Onboarding"
                  component={Onboarding}></Stack.Screen>
                <Stack.Screen name="Login" component={Login}></Stack.Screen>
                <Stack.Screen
                  name="CreatePin"
                  component={CreatePin}></Stack.Screen>
                <Stack.Screen
                  name="EnterPin"
                  component={EnterPin}></Stack.Screen>
                <Stack.Screen
                  name="WelcomeBack"
                  component={WelcomeBack}></Stack.Screen>
                <Stack.Screen
                  name="ResetPin"
                  component={ResetPin}></Stack.Screen>
                <Stack.Screen name="GetCode" component={GetCode}></Stack.Screen>
                <Stack.Screen
                  name="VerifyNumber"
                  component={VerifyNumber}></Stack.Screen>
                <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}></Stack.Screen>
                <Stack.Screen
                  name="PasswordResetSuccess"
                  component={PasswordResetSuccess}></Stack.Screen>
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={BottomNavigator}></Stack.Screen>
                <Stack.Screen
                  name="CompleteProfile1"
                  component={CompleteProfile1}></Stack.Screen>
                <Stack.Screen
                  name="CompleteProfile2"
                  component={CompleteProfile2}></Stack.Screen>
                <Stack.Screen
                  name="CompleteProfile3"
                  component={CompleteProfile3}></Stack.Screen>
                <Stack.Screen
                  name="CompleteProfile4"
                  component={CompleteProfile4}></Stack.Screen>
                <Stack.Screen
                  name="CompleteProfile5"
                  component={CompleteProfile5}></Stack.Screen>
                <Stack.Screen
                  name="CompleteProfile6"
                  component={CompleteProfile6}></Stack.Screen>
                <Stack.Screen
                  name="SavingsHome"
                  component={SavingsHome}></Stack.Screen>
                <Stack.Screen
                  name="SoloSaving1"
                  component={SoloSaving1}></Stack.Screen>
                <Stack.Screen
                  name="SoloSaving2"
                  component={SoloSaving2}></Stack.Screen>
                <Stack.Screen
                  name="SoloSaving3"
                  component={SoloSaving3}></Stack.Screen>
                <Stack.Screen
                  name="SoloSaving4"
                  component={SoloSaving4}></Stack.Screen>
                <Stack.Screen
                  name="SavingLists"
                  component={SavingLists}></Stack.Screen>
                <Stack.Screen
                  name="SoloSavingDashBoard"
                  component={SoloSavingDashBoard}></Stack.Screen>
                <Stack.Screen
                  name="BuddySaving1"
                  component={BuddySaving1}></Stack.Screen>
                <Stack.Screen
                  name="BuddySaving2"
                  component={BuddySaving2}></Stack.Screen>
                <Stack.Screen
                  name="BuddySaving3"
                  component={BuddySaving3}></Stack.Screen>
                <Stack.Screen
                  name="BuddySaving4"
                  component={BuddySaving4}></Stack.Screen>
                <Stack.Screen
                  name="BuddySaving5"
                  component={BuddySaving5}></Stack.Screen>
                <Stack.Screen
                  name="BuddySaving6"
                  component={BuddySaving6}></Stack.Screen>
                <Stack.Screen
                  name="BuddyLists"
                  component={BuddyLists}></Stack.Screen>
                <Stack.Screen
                  name="BuddySavingDashBoard"
                  component={BuddySavingDashBoard}></Stack.Screen>
                <Stack.Screen
                  name="BuddyPaymentScreen"
                  component={BuddyPaymentScreen}></Stack.Screen>

                <Stack.Screen
                  name="AcceptInvite"
                  component={AcceptInvite}></Stack.Screen>

                <Stack.Screen
                  name="BuddyInviteLists"
                  component={BuddyInviteLists}></Stack.Screen>

                <Stack.Screen name="Borrow" component={Borrow}></Stack.Screen>
                <Stack.Screen
                  name="RentNowPayLaterOnboarding"
                  component={RentNowPayLaterOnboarding}></Stack.Screen>
                <Stack.Screen
                  name="EmploymentStatus"
                  component={EmploymentStatus}></Stack.Screen>
                <Stack.Screen
                  name="EligibilitySalaryEarner"
                  component={EligibilitySalaryEarner}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanForm1"
                  component={RentalLoanForm1}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanFormDoc"
                  component={RentalLoanFormDoc}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanForm2"
                  component={RentalLoanForm2}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanForm3"
                  component={RentalLoanForm3}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanThirdPartyConnection"
                  component={RentalLoanThirdPartyConnection}></Stack.Screen>
                <Stack.Screen
                  name="LinkingAccount"
                  component={LinkingAccount}></Stack.Screen>
                <Stack.Screen
                  name="ThirdPartyLink"
                  component={ThirdPartyLink}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanRequestDashBoard"
                  component={RentalLoanRequestDashBoard}></Stack.Screen>
                <Stack.Screen
                  name="PayWithSavings"
                  component={PayWithSavings}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanFormCongratulation"
                  component={RentalLoanFormCongratulation}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanFormBankStatementUpload"
                  component={RentalLoanFormBankStatementUpload}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanFormBankStatementUploadEmail"
                  component={
                    RentalLoanFormBankStatementUploadEmail
                  }></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanFormBankStatementUploadMono"
                  component={
                    RentalLoanFormBankStatementUploadMono
                  }></Stack.Screen>
                <Stack.Screen
                  name="RentNowPayLaterDashboard"
                  component={RentNowPayLaterDashboard}></Stack.Screen>
                <Stack.Screen
                  name="UploadBankStatement"
                  component={UploadBankStatement}></Stack.Screen>
                <Stack.Screen
                  name="UploadDocuments"
                  component={UploadDocuments}></Stack.Screen>
                <Stack.Screen
                  name="AllDocuments"
                  component={AllDocuments}></Stack.Screen>
                <Stack.Screen
                  name="LoanRequestApproval"
                  component={LoanRequestApproval}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanOffer"
                  component={RentalLoanOffer}></Stack.Screen>
                <Stack.Screen
                  name="SetUpPaymentPlan"
                  component={SetUpPaymentPlan}></Stack.Screen>
                <Stack.Screen
                  name="PostPaymentForm1"
                  component={PostPaymentForm1}></Stack.Screen>
                <Stack.Screen
                  name="PostPaymentForm2"
                  component={PostPaymentForm2}></Stack.Screen>
                <Stack.Screen
                  name="PostPaymentForm3"
                  component={PostPaymentForm3}></Stack.Screen>
                <Stack.Screen
                  name="PostPaymentForm4"
                  component={PostPaymentForm4}></Stack.Screen>
                <Stack.Screen
                  name="OkraDebitMandate"
                  component={OkraDebitMandate}></Stack.Screen>
                <Stack.Screen
                  name="LoanOfferContent"
                  component={LoanOfferContent}></Stack.Screen>
                <Stack.Screen
                  name="AwaitingDisbursement"
                  component={AwaitingDisbursement}></Stack.Screen>
                <Stack.Screen
                  name="AddressVerificationPayment"
                  component={AddressVerificationPayment}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanActiveDashBoard"
                  component={RentalLoanActiveDashBoard}></Stack.Screen>
                <Stack.Screen
                  name="FileUploadTest"
                  component={FileUploadTest}></Stack.Screen>
                <Stack.Screen
                  name="RentalLoanOfferTest"
                  component={RentalLoanOfferTest}></Stack.Screen>
                <Stack.Screen
                  name="PrintOfferLetter"
                  component={PrintOfferLetter}></Stack.Screen>
                <Stack.Screen
                  name="UploadDocumentsList"
                  screenOptions={{headerShown: Platform.OS == 'ios' ? true : false}}
                  component={UploadDocumentsList}></Stack.Screen>
                <Stack.Screen
                  name="BottomNavigation"
                  component={BottomNavigator}></Stack.Screen>
                <Stack.Screen
                  name="EligibilityBusinessOwner"
                  component={EligibilityBusinessOwner}></Stack.Screen>
                <Stack.Screen
                  name="BusinessForm1"
                  component={BusinessForm1}></Stack.Screen>
                <Stack.Screen
                  name="BusinessForm2"
                  component={BusinessForm2}></Stack.Screen>
                <Stack.Screen
                  name="BusinessForm3"
                  component={BusinessForm3}></Stack.Screen>
                <Stack.Screen
                  name="BusinessForm4"
                  component={BusinessForm4}></Stack.Screen>
                <Stack.Screen
                  name="BusinessForm5"
                  component={BusinessForm5}></Stack.Screen>
                <Stack.Screen
                  name="BusinessDocumentUpload"
                  component={BusinessDocumentUpload}></Stack.Screen>
                <Stack.Screen
                  name="RentalFormBusinessCongratulation"
                  component={RentalFormBusinessCongratulation}></Stack.Screen>
                <Stack.Screen
                  name="RentalFormBusiness1"
                  component={RentalFormBusiness1}
                />
                <Stack.Screen
                  name="RentalFormBusiness2"
                  component={RentalFormBusiness2}
                />
                <Stack.Screen
                  name="RentalFormBusinessDoc"
                  component={RentalFormBusinessDoc}
                />
                <Stack.Screen
                  name="EmergencyLoanHome"
                  component={EmergencyLoanHome}></Stack.Screen>
                <Stack.Screen
                  name="EmergencyFundOnboarding"
                  component={EmergencyFundOnboarding}></Stack.Screen>
                <Stack.Screen
                  name="EmergencyLoanRequestDashBoard"
                  component={EmergencyLoanRequestDashBoard}></Stack.Screen>
                <Stack.Screen
                  name="EmergencyLoanRequest"
                  component={EmergencyLoanRequest}></Stack.Screen>
                <Stack.Screen
                  name="EmergencyLoanDashBoard"
                  component={EmergencyLoanDashBoard}></Stack.Screen>
                <Stack.Screen name="Account" component={Account}></Stack.Screen>
                <Stack.Screen
                  name="FileViewAndDelete"
                  component={FileViewAndDelete}></Stack.Screen>
                <Stack.Screen
                  name="AccountPage"
                  component={AccountPage}></Stack.Screen>
                <Stack.Screen
                  name="CardAndBankDetails"
                  component={CardAndBankDetails}></Stack.Screen>
                <Stack.Screen
                  name="Withdraw"
                  component={Withdraw}></Stack.Screen>
                <Stack.Screen
                  name="BillsHome"
                  component={BillsHome}></Stack.Screen>
                <Stack.Screen
                  name="CableTvBill"
                  component={CableTvBill}></Stack.Screen>
                <Stack.Screen
                  name="DataBill"
                  component={DataBill}></Stack.Screen>
                <Stack.Screen
                  name="ElectricityBill"
                  component={ElectricityBill}></Stack.Screen>
                <Stack.Screen
                  name="PurchaseAirtime"
                  component={PurchaseAirtime}></Stack.Screen>
                <Stack.Screen
                  name="AirtimeHome"
                  component={AirtimeHome}></Stack.Screen>
                <Stack.Screen name="profile" component={profile}></Stack.Screen>
                <Stack.Screen
                  name="Referral"
                  component={Referral}></Stack.Screen>
                <Stack.Screen
                  name="ReferralDetails"
                  component={ReferralDetails}></Stack.Screen>
                <Stack.Screen name="Aboutus" component={Aboutus}></Stack.Screen>
                <Stack.Screen
                  name="LegalandFaq"
                  component={LegalandFaq}></Stack.Screen>
                <Stack.Screen
                  name="OkraDebitMandate2"
                  component={OkraDebitMandate2}></Stack.Screen>
                <Stack.Screen
                  name="MonoDebitMandate"
                  component={MonoDebitMandate}></Stack.Screen>
                <Stack.Screen
                  name="ApplicationProgress"
                  component={ApplicationProgress}></Stack.Screen>
                <Stack.Screen
                  name="UploadBankStatementDocument"
                  component={UploadBankStatementDocument}></Stack.Screen>

                <Stack.Screen name="Notifications" component={Notifications} />

                <Stack.Screen name="Signature" component={Signature} />

                <Stack.Screen
                  name="NewAllDocuments"
                  component={NewAllDocuments}
                />

                <Stack.Screen
                  name="OfferApprovalBreakDown"
                  component={OfferApprovalBreakDown}
                />

                <Stack.Screen
                  name="VerifyingDocuments"
                  component={VerifyingDocuments}
                />

                <Stack.Screen name="OfferLetter" component={OfferLetter} />

                <Stack.Screen
                  name="GuarantorOnboarding"
                  component={GuarantorOnboarding}
                />

                <Stack.Screen name="GuarantorForm" component={GuarantorForm} />

                <Stack.Screen
                  name="AcceptanceLetterKwaba"
                  component={AcceptanceLetterKwaba}
                />

                <Stack.Screen
                  name="AcceptanceLetterAddosser"
                  component={AcceptanceLetterAddosser}
                />

                <Stack.Screen name="Decline" component={Decline} />
                <Stack.Screen name="Reject" component={Reject} />

                <Stack.Screen name="KwabaLetter" component={KwabaLetter} />
                <Stack.Screen
                  name="AddosserLetter"
                  component={AddosserLetter}
                />
                <Stack.Screen name="PTMFB" component={PTMFB} />

                <Stack.Screen name="Disbursement" component={Disbursement} />

                <Stack.Screen name="PaymentForm" component={PaymentForm} />

                <Stack.Screen
                  name="PaymentSuccessful"
                  component={PaymentSuccessful}
                />

                <Stack.Screen name="Mortgages" component={Mortgages} />
                <Stack.Screen name="SaveToOwn" component={SaveToOwn} />

                <Stack.Screen name="LoanScreen1" component={LoanScreen1} />

                <Stack.Screen name="Wallet" component={Wallet} />

                <Stack.Screen name="PinPassword" component={PinPassword} />

                {/* <Stack.Screen name="AppUpdate" component={AppUpdate} /> */}

                <Stack.Screen
                  name="JoinChallengeList"
                  component={JoinChallengeList}
                />

                <Stack.Screen
                  name="JoinChallengeDashboard"
                  component={JoinChallengeDashboard}
                />

                <Stack.Screen
                  name="JoinedSuccessful"
                  component={JoinedSuccessful}
                />

                <Stack.Screen
                  name="CreditScoreOnboarding"
                  component={CreditScoreOnboarding}
                />

                <Stack.Screen
                  name="CreditScoreForm"
                  component={CreditScoreForm}
                />

                <Stack.Screen
                  name="CreditScoreDashboard"
                  component={CreditScoreDashboard}
                />

                <Stack.Screen
                  name="CreditScoreAwaiting"
                  component={CreditScoreAwaiting}
                />

                <Stack.Screen
                  name="CreditScoreForAccountOnboarding"
                  component={CreditScoreForAccountOnboarding}
                />

                <Stack.Screen
                  name="CreditScoreCheckFormForAccount"
                  component={CreditScoreCheckFormForAccount}
                />

                <Stack.Screen
                  name="CreditScoreCheckFormForAwaiting"
                  component={CreditScoreCheckFormForAwaiting}
                />

                <Stack.Screen name="RnplOnboard" component={RnplOnboard} />
                <Stack.Screen
                  name="RnplEligibility"
                  component={RnplEligibility}
                />
                <Stack.Screen name="RnplSteps" component={RnplSteps} />
                <Stack.Screen name="RnplViews" component={RnplViews} />
                <Stack.Screen
                  name="RnplEmploymentStatus"
                  component={RnplEmploymentStatus}
                />

                <Stack.Screen name="CreditOnboard" component={CreditOnboard} />
                <Stack.Screen name="CreditForm" component={CreditForm} />
                <Stack.Screen
                  name="CreditDashboard"
                  component={CreditDashboard}
                />
                <Stack.Screen
                  name="CreditAwaiting"
                  component={CreditAwaiting}
                />

                {/* applications */}
                <Stack.Screen name="Form1" component={Form1} />
                <Stack.Screen name="Form2" component={Form2} />
                <Stack.Screen name="Form3" component={Form3} />
                <Stack.Screen name="FormBreakdown" component={FormBreakdown} />
                <Stack.Screen
                  name="RnplDirectdebit"
                  component={RnplDirectdebit}
                />

                <Stack.Screen name="Rent" component={RentHome} />
              </>
            )}
          </Stack.Navigator>

          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
// export default CodePush(CodePushOptions)(App);
