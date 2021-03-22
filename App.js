import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {store} from './redux/store';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Welcome from './pages/Welcome/welcome';
import Onboarding from './pages/Onboarding/Onboarding';
import CompleteProfile1 from './pages/CompleteProfile/Screen1';
import CompleteProfile2 from './pages/CompleteProfile/Screen2';
import CompleteProfile3 from './pages/CompleteProfile/Screen3';
import CompleteProfile4 from './pages/CompleteProfile/Screen4';
import CompleteProfile5 from './pages/CompleteProfile/Screen5';
import GetCode from './pages/Auth/GetCode';
import VerifyNumber from './pages/Auth/VerifyNumber';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Home from './pages/Home/Home';
import {
  SavingsHome,
  SoloSaving1,
  SoloSaving2,
  SoloSaving3,
  SoloSaving4,
  SoloSavingDashBoard,
  BuddySaving1,
  BuddySaving2,
  BuddySaving3,
  BuddySaving4,
  BuddySaving5,
  BuddySaving6,
  BuddySavingDashBoard,
} from './pages/Savings/index';
import Borrow from './pages/Borrow/Borrow';
import RentalLoanForm1 from './pages/Borrow/RentalLoanForm1';
import RentalLoanForm2 from './pages/Borrow/RentalLoanForm2';
import RentalLoanForm3 from './pages/Borrow/RentalLoanForm3';
import UploadBankStatement from './pages/Borrow/UploadBankStatement';
import UploadDocuments from './pages/Borrow/UploadDocuments';
import AllDocuments from './pages/Borrow/AllDocuments';
import LoanRequestApproval from './pages/Borrow/LoanRequestApproval';
import RentalLoanOffer from './pages/Borrow/RentalLoanOffer';
import SetUpPaymentPlan from './pages/Payment/SetUpPaymentPlan';
import PostPaymentForm1 from './pages/Payment/PostPaymentForm1';
import PostPaymentForm2 from './pages/Payment/PostPaymentForm2';
import PostPaymentForm3 from './pages/Payment/PostPaymentForm3';
import PostPaymentForm4 from './pages/Payment/PostPaymentForm4';
import RentalLoanActiveDashBoard from './pages/Payment/RentalLoanActiveDashBoard';
import RentalLoanThirdPartyConnection from './pages/Borrow/RentalLoanThirdPartyConnection';
import LinkingAccount from './pages/Borrow/LinkingAccount';
import ThirdPartyLink from './pages/Borrow/ThirdPartyLink';
import RentalLoanRequestDashBoard from './pages/Borrow/RentalLoanRequestDashboard';
import PayWithSavings from './pages/Payment/PayWithSavings';
import { logCurrentStorage } from './util/logCurrentStorage';
import FileUploadTest from './pages/Borrow/FileUploadTest';
import RentalLoanOfferTest from './pages/Borrow/RentalLoanOfferTest';

const Stack = createStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getuser = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = userData != null ? JSON.parse(userData).token : null;
      const loggedInStatus =
        userData != null ? JSON.parse(userData).isLoggedIn : false;
      setIsLoggedIn(loggedInStatus);
      setUserToken(token);
    };
    getuser();
  }, [userToken]);

  logCurrentStorage();


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Welcome'}>
          {!isLoggedIn && userToken == null ? (
            <>
              <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}></Stack.Screen>
              {/* <Stack.Screen name="GetCode" component={GetCode}></Stack.Screen> */}
              {/* <Stack.Screen
                name="VerifyNumber"
                component={VerifyNumber}></Stack.Screen> */}
              <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
              <Stack.Screen name="Login" component={Login}></Stack.Screen>
              <Stack.Screen name="Home" component={Home}></Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home}></Stack.Screen>
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
                name="BuddySavingDashBoard"
                component={BuddySavingDashBoard}></Stack.Screen>
            

<Stack.Screen name="Borrow" component={Borrow}></Stack.Screen>
<Stack.Screen name="RentalLoanForm1" component={RentalLoanForm1}></Stack.Screen>
<Stack.Screen name="RentalLoanThirdPartyConnection" component={RentalLoanThirdPartyConnection}></Stack.Screen>
<Stack.Screen name="LinkingAccount" component={LinkingAccount}></Stack.Screen>
<Stack.Screen name="ThirdPartyLink" component={ThirdPartyLink}></Stack.Screen>
<Stack.Screen name="RentalLoanRequestDashBoard" component={RentalLoanRequestDashBoard}></Stack.Screen>
<Stack.Screen name="PayWithSavings" component={PayWithSavings}></Stack.Screen>
<Stack.Screen name="RentalLoanForm2" component={RentalLoanForm2}></Stack.Screen>
<Stack.Screen name="RentalLoanForm3" component={RentalLoanForm3}></Stack.Screen>
<Stack.Screen name="UploadBankStatement" component={UploadBankStatement}></Stack.Screen>
<Stack.Screen name="UploadDocuments" component={UploadDocuments}></Stack.Screen>
<Stack.Screen name="AllDocuments" component={AllDocuments}></Stack.Screen>
<Stack.Screen name="LoanRequestApproval" component={LoanRequestApproval}></Stack.Screen>
<Stack.Screen name="RentalLoanOffer" component={RentalLoanOffer}></Stack.Screen>
<Stack.Screen name="SetUpPaymentPlan" component={SetUpPaymentPlan}></Stack.Screen>
<Stack.Screen name="PostPaymentForm1" component={PostPaymentForm1}></Stack.Screen>
<Stack.Screen name="PostPaymentForm2" component={PostPaymentForm2}></Stack.Screen>
<Stack.Screen name="PostPaymentForm3" component={PostPaymentForm3}></Stack.Screen>
<Stack.Screen name="PostPaymentForm4" component={PostPaymentForm4}></Stack.Screen>
<Stack.Screen name="RentalLoanActiveDashBoard" component={RentalLoanActiveDashBoard}></Stack.Screen>
<Stack.Screen name="FileUploadTest" component={FileUploadTest}></Stack.Screen>
<Stack.Screen name="RentalLoanOfferTest" component={RentalLoanOfferTest}></Stack.Screen>


</>
          )}

              {/* <Stack.Screen
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
                name="BuddySavingDashBoard"
                component={BuddySavingDashBoard}></Stack.Screen> */}
                
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
