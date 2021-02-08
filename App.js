import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Onboarding1, Onboarding2, Onboarding3, Welcome } from './pages';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
      initialRouteName={"Welcome"}
    >
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      <Stack.Screen name="Onboarding1" component={Onboarding1}></Stack.Screen>
      <Stack.Screen name="Onboarding2" component={Onboarding2}></Stack.Screen>
      <Stack.Screen name="Onboarding3" component={Onboarding3}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
)

export default App;