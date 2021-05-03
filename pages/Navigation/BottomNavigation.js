import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text,Image} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

import { SavingsHome } from '../Savings';
import Borrow from '../Borrow/Borrow';
import screen1 from '../CompleteProfile/Screen1';
import {COLORS, FONTS, images,icons} from '../../util/index';
import Home from '../Home/Home';
import EmergencyLoanRequestDashBoard from '../Borrow/EmergencyLoan/EmergencyLoanRequestDashBoard';
import Account from '../UserAccount/Account';
import AccountPage from '../UserAccount/AccountPage';
import BillsHome from '../Bills/BillsHome';


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          elevation: 6,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          shadowRadius: 5,
          shadowOpacity: 10,
          height:60
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}
      initialRouteName= 'Home'>
      <Tab.Screen
        name="Savings"
        component={SavingsHome}
        options={{
          tabBarIcon: ({color,focused}) => (

            <View style={{flex:1,justifyContent:'center'}} >
              <>
              {focused?<Image source={icons.savingslight} style={{width:25,height:25,alignSelf:'center'}}/>
              :<Image source={icons.savings} style={{width:25,height:25,alignSelf:'center'}}/>}
              </>
              {/* <Image source={icons.savings} style={{width:25,height:25,alignSelf:'center'}}/> */}
              <Text style={{fontSize: 16, color:focused? '#9D98EC':'#BFBFBF'}}>Savings</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyRent"
        component={Borrow}
        options={{
          tabBarIcon: ({color,focused}) => (
            <View style={{flex:1,justifyContent:'center'}}>

              <>
              {focused?<Image source={icons.myrentlight} style={{width:25,height:25,alignSelf:'center'}}/>
              :<Image source={icons.myrent} style={{width:25,height:25,alignSelf:'center'}}/>}
              </>
             
              <Text style={{fontSize: 16, color: focused? '#9D98EC':'#BFBFBF'}}>Borrow</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color,focused}) => (
            <View style={{flex:1,justifyContent:'center'}}>

              <>
              {focused?<Image source={icons.kwabalogocol} style={{width:60,height:60,alignSelf:'center'}}/>
              :<Image source={icons.kwabalogonocol} style={{width:60,height:60,alignSelf:'center'}}/>}
              </>
               
              {/* <Text style={{fontSize: 16, color: '#000000'}}>RentBank</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bills"
        component={BillsHome}
        options={{
          tabBarIcon: ({color,focused}) => (
            <View style={{flex:1,justifyContent:'center'}}>

              <>
              {focused?<Image source={icons.billslight} style={{width:25,height:25,alignSelf:'center'}}/>
              :<Image source={icons.billsicon} style={{width:25,height:25,alignSelf:'center'}}/>}
              </>
              
              <Text style={{fontSize: 16, color: focused? '#9D98EC':'#BFBFBF'}}>Bills</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountPage}
        options={{
          tabBarIcon: ({color,focused}) => (
            <View style={{flex:1,justifyContent:'center'}}>

              <>
              {focused?<Image source={icons.accountlight} style={{width:25,height:25,alignSelf:'center'}}/>
              :<Image source={icons.account} style={{width:25,height:25,alignSelf:'center'}}/>}
              </>

              <Text style={{fontSize: 16, color: focused? '#9D98EC':'#BFBFBF'}}>Account</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
