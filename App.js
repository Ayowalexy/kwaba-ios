import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

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

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Welcome'}>
        <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
        <Stack.Screen name="Onboarding" component={Onboarding}></Stack.Screen>
        <Stack.Screen name="GetCode" component={GetCode}></Stack.Screen>
        <Stack.Screen
          name="VerifyNumber"
          component={VerifyNumber}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
