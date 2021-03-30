import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import { SavingsHome } from '../Savings';
import Borrow from '../Borrow/Borrow';
import screen1 from '../CompleteProfile/Screen1';
import {COLORS, FONTS, images} from '../../util/index';
import Home from '../Home/Home';
import EmergencyLoanRequestDashBoard from '../Borrow/EmergencyLoan/EmergencyLoanRequestDashBoard';
import Account from '../UserAccount/Account';


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          elevation: 6,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          shadowRadius: 5,
          shadowOpacity: 10
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}
      initialRouteName= 'Home'>
      <Tab.Screen
        name="Savings"
        component={SavingsHome}
        options={{
          tabBarIcon: ({color}) => (
            <Text style={{fontSize: 16, color: '#000000'}}>Savings</Text>
          ),
        }}
      />
      <Tab.Screen
        name="MyRent"
        component={Borrow}
        options={{
          tabBarIcon: ({color}) => (
            <Text style={{fontSize: 16, color: '#000000'}}>Borrow</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                
              }}>
              <Text style={{fontSize: 16, color: '#000000'}}>RentBank</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bills"
        component={EmergencyLoanRequestDashBoard}
        options={{
          tabBarIcon: ({color}) => (
            <Text style={{fontSize: 16, color: '#000000'}}>Bills</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({color}) => (
            <Text style={{fontSize: 16, color: '#000000'}}>Account</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
