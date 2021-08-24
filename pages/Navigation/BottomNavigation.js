import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';

import {AntDesign, FontAwesome, Ionicons} from 'react-native-vector-icons';

import {SavingsHome} from '../Savings';
import Borrow from '../Borrow/Borrow';
import screen1 from '../CompleteProfile/Screen1';
import {COLORS, FONTS, images, icons} from '../../util/index';
import Home from '../Home/Home';
import NewHome from '../Home/NewHome';
import EmergencyLoanRequestDashBoard from '../Borrow/EmergencyLoan/EmergencyLoanRequestDashBoard';
import Account from '../UserAccount/Account';
import AccountPage from '../UserAccount/AccountPage';
import BillsHome from '../Bills/BillsHome';
import {TabBar} from 'react-native-tab-view';
import CompleteProfileModal from '../Home/CompleteProfileModal';

const Tab = createBottomTabNavigator();

const tabItems = [
  {
    title: 'Home',
    screen: NewHome,
  },
  // {
  //   title: 'Save',
  //   icon: 'piggy-bank',
  //   screen: SavingsHome,
  // },
  {
    title: 'Rent',
    icon: 'home',
    screen: Borrow,
  },

  {
    title: 'Bills',
    icon: 'receipt',
    screen: BillsHome,
  },

  {
    title: 'Account',
    icon: 'person',
    screen: AccountPage,
  },
];

const BottomNavigator = ({navigation}) => {
  const [completeProfileModal, setCompleteProfileModal] = useState(false);

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            elevation: 50,
            borderWidth: 0,
            bottom: 0,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderWidth: 0,
            height: 70,
            // paddingLeft: 10,
            // paddingRight: 10,
            overflow: 'hidden',
          },
          showLabel: false,
          activeTintColor: COLORS.primary,
        }}
        initialRouteName="Home">
        {tabItems.map(({title, screen, icon}, index) => (
          <Tab.Screen
            key={index}
            name={title}
            component={screen}
            // listeners={({navigation, route}) => ({
            //   tabPress: (e) => {
            //     // Prevent default action
            //     e.preventDefault();
            //     if (route.name != 'Bills' && route.name != 'Account') {
            //       setCompleteProfileModal(true);
            //     } else {
            //       return false;
            //     }
            //   },
            // })}
            options={{
              tabBarIcon: ({color, focused}) => (
                <>
                  {/* <TouchableOpacity
                    onPress={() => setCompleteProfileModal(true)}> */}
                  {title.toLowerCase() == 'home' ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#EAEAEA80',
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}>
                      <>
                        {focused ? (
                          <Image
                            source={icons.kwabalogocol}
                            style={{
                              width: 25,
                              height: 25,
                              alignSelf: 'center',
                            }}
                            resizeMode="contain"
                          />
                        ) : (
                          <Image
                            source={icons.kwabalogonocol}
                            style={{
                              width: 25,
                              height: 25,
                              alignSelf: 'center',
                            }}
                            resizeMode="contain"
                          />
                        )}
                      </>
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {icon.toLowerCase() == 'piggy-bank' ? (
                        <IconFA5
                          name={icon}
                          style={{
                            fontSize: 25,
                            color: '#465969',
                            // color: focused ? '#9D98EC' : '#BFBFBF',
                            color: focused ? '#465969' : '#BFBFBF',
                          }}
                        />
                      ) : (
                        <Icon
                          // name={focused ? icon : icon + '-outline'}
                          name={icon}
                          style={{
                            fontSize: 25,
                            color: '#465969',
                            // color: focused ? '#9D98EC' : '#BFBFBF',
                            color: focused ? '#465969' : '#BFBFBF',
                          }}
                        />
                      )}

                      <Text
                        style={{
                          // marginTop: 0,
                          fontSize: 10,
                          // fontWeight: 'bold',
                          // color: '#465969',
                          // color: focused ? '#9D98EC' : '#BFBFBF',
                          color: focused ? '#465969' : '#BFBFBF',
                        }}>
                        {title}
                      </Text>
                    </View>
                  )}
                  {/* </TouchableOpacity> */}
                </>
              ),
            }}
          />
        ))}
      </Tab.Navigator>

      <CompleteProfileModal
        onRequestClose={() => setCompleteProfileModal(!completeProfileModal)}
        visible={completeProfileModal}
        navigation={navigation}
      />
    </>
  );
};

export default BottomNavigator;
