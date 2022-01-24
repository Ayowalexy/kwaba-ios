import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, TouchableOpacity} from 'react-native';
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
import {RentHome, RnplSteps} from '../screens/rnpl';

const Tab = createBottomTabNavigator();

const BottomNavigator = ({navigation}) => {
  const [completeProfileModal, setCompleteProfileModal] = useState(false);

  const MyTabBar = ({state, descriptors, navigation}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.white,
          borderTopColor: '#F7F8FD',
          borderTopWidth: 1,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = async () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
              await TrackEvent(`Bottom-Navigation-${route.name}`);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Wallet') {
            iconName = 'wallet-outline';
          } else if (route.name === 'Rent') {
            iconName = 'home';
          } else if (route.name === 'More') {
            iconName = 'apps-outline';
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                // backgroundColor: isFocused ? '#F7F8FD' : COLORS.white,
                // borderWidth: 0,
                // borderRightWidth: 1,
                // borderColor: '#F7F8FD',
              }}>
              <>
                {route.name == 'Home' ? (
                  <Image
                    source={
                      isFocused ? icons.kwabalogocol : icons.kwabalogonocol
                    }
                    style={{
                      width: 20,
                      height: 28,
                      alignSelf: 'center',
                      marginTop: 2,
                    }}
                    resizeMode="contain"
                  />
                ) : route.name == 'Rent' ? (
                  <IconOC
                    name={iconName}
                    size={26}
                    color={isFocused ? COLORS.dark : COLORS.grey}
                  />
                ) : route.name == 'Mortgages' ? (
                  <Image
                    source={
                      isFocused ? icons.mortageActive : icons.mortageInactive
                    }
                    style={{
                      width: 26,
                      height: 26,
                      alignSelf: 'center',
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Icon
                    name={iconName}
                    size={26}
                    color={isFocused ? COLORS.dark : COLORS.grey}
                  />
                )}
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: isFocused ? COLORS.dark : COLORS.grey,
                  }}>
                  {label}
                </Text>
              </>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={NewHome} />
        <Tab.Screen name="Wallet" component={Wallet} />
        {/* <Tab.Screen name="Rent" component={Borrow} /> */}
        <Tab.Screen name="Rent" component={RentHome} />
        <Tab.Screen name="Mortgages" component={Mortgages} />
        <Tab.Screen name="More" component={AccountPage} />
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
