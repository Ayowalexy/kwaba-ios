import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import IconOC from 'react-native-vector-icons/Octicons';

import Borrow from '../Borrow/Borrow';
import {COLORS, icons} from '../../util/index';
import NewHome from '../Home/NewHome';
import AccountPage from '../UserAccount/AccountPage';
import Mortgages from '../Mortgages/Mortgage';
import CompleteProfileModal from '../Home/CompleteProfileModal';
import Wallet from '../Wallet/Wallet';

import {TrackEvent} from '../../util/segmentEvents';

const Tab = createBottomTabNavigator();

const tabItems = [
  {
    title: 'Kwaba',
    screen: NewHome,
  },
  {
    title: 'Wallet',
    icon: 'wallet-outline',
    screen: Wallet,
  },
  {
    title: 'Rent',
    icon: 'home-outline',
    screen: Borrow,
  },

  {
    title: 'Mortgages',
    icon: 'receipt-outline',
    screen: Mortgages,
  },

  {
    title: 'More',
    icon: 'apps-outline',
    screen: AccountPage,
  },
];

const BottomNavigator = ({navigation}) => {
  const [completeProfileModal, setCompleteProfileModal] = useState(false);

  const onPress = async (title) => {
    // const event = navigation.emit({
    //   type: 'tabPress',
    //   target: route.key,
    //   canPreventDefault: true,
    // });
    // navigation.navigate(title);
    // Track clicked
    await TrackEvent(`Bottom-Navigation-${title}`);
  };

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            elevation: 50,
            borderWidth: 0,
            bottom: 0,
            borderLeftWidth: 0,
            borderWidth: 0,
            height: 60,
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
            options={{
              tabBarIcon: ({color, focused}) => (
                <>
                  {title.toLowerCase() == 'kwaba' ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                      }}>
                      <>
                        <Image
                          source={
                            focused ? icons.kwabalogocol : icons.kwabalogonocol
                          }
                          style={{
                            width: 20,
                            height: 28,
                            alignSelf: 'center',
                            marginTop: 2,
                          }}
                          resizeMode="contain"
                        />
                      </>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: focused ? COLORS.dark : COLORS.grey,
                        }}>
                        {title}
                      </Text>
                    </View>
                  ) : (
                    // <TouchableOpacity onPress={() => onPress(title)}>
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
                            color: COLORS.dark,
                            color: focused ? COLORS.dark : COLORS.grey,
                          }}
                        />
                      ) : title == 'Mortgages' ? (
                        <Image
                          source={
                            focused
                              ? icons.mortageActive
                              : icons.mortageInactive
                          }
                          style={{
                            width: 26,
                            height: 26,
                            alignSelf: 'center',
                          }}
                          resizeMode="contain"
                        />
                      ) : title.toLowerCase() == 'rent' ? (
                        <IconOC
                          name="home"
                          style={{
                            fontSize: 25,
                            color: COLORS.dark,
                            color: focused ? COLORS.dark : COLORS.grey,
                          }}
                        />
                      ) : (
                        <Icon
                          name={icon}
                          style={{
                            fontSize: 25,
                            color: COLORS.dark,
                            color: focused ? COLORS.dark : COLORS.grey,
                          }}
                        />
                      )}

                      <Text
                        style={{
                          marginTop: 2,
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: focused ? COLORS.dark : COLORS.grey,
                        }}>
                        {title}
                      </Text>
                    </View>
                    // </TouchableOpacity>
                  )}
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