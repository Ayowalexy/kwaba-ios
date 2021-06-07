import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import {COLORS, FONTS, images, icons} from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CustomInput = (props) => {
  const {placeholder} = props;

  return (
    <>
      <View
        style={[
          {
            borderRadius: 5,
            backgroundColor: '#FFFFFF',
            borderColor: '#EFEFEF',
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 5,
            width: '100%',
            position: 'relative',
            elevation: 0.5,
          },
        ]}>
        {placeholder.toLowerCase() == 'gender' ||
        placeholder.toLowerCase() == 'employment status' ? (
          <>
            <TextInput
              style={{
                width: '100%',
                paddingVertical: 15,
                paddingHorizontal: 20,
                paddingRight: 50,
              }}
              placeholder={placeholder}
            />
            <IconFA5
              name="chevron-down"
              size={20}
              color="#D6D6D6"
              style={{
                position: 'absolute',
                top: 18,
                right: 20,
              }}
            />
          </>
        ) : placeholder.toLowerCase() == 'date of birth' ? (
          <>
            <TextInput
              style={{
                width: '100%',
                paddingVertical: 15,
                paddingHorizontal: 20,
                paddingRight: 50,
              }}
              placeholder={placeholder}
            />
            <IconFA5
              name="calendar-alt"
              size={20}
              color="#D6D6D6"
              style={{
                position: 'absolute',
                top: 18,
                right: 20,
              }}
            />
          </>
        ) : (
          <>
            <TextInput
              style={{
                width: '100%',
                paddingVertical: 15,
                paddingHorizontal: 20,
              }}
              placeholder={placeholder}
            />
          </>
        )}
      </View>
    </>
  );
};

const Space = () => <View style={{marginTop: 20}} />;

const SaveChangesBtn = () => {
  return (
    <TouchableOpacity
      // onPress={handleSubmit}
      style={[
        {
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20,
          fontSize: 14,
          fontFamily: 'CircularStd-Medium',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 1,

          backgroundColor: '#00DC99',
          width: '100%',
          borderRadius: 10,
        },
      ]}>
      <Text
        style={{
          color: 'white',
          fontSize: 12,
          lineHeight: 30,
          fontWeight: 'bold',
        }}>
        SAVE CHANGES
      </Text>
    </TouchableOpacity>
  );
};

const FirstRoute = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: '#F7F8FD',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          name="camera"
          size={40}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 10,
            fontWeight: '900',
          }}
          color={COLORS.grey}
        />
      </View>
      <TouchableOpacity>
        <Text
          style={{color: COLORS.secondary, fontWeight: 'bold', fontSize: 12}}>
          Tap to change picture
        </Text>
      </TouchableOpacity>
    </View>

    <View>
      <CustomInput placeholder="First Name" />
      <CustomInput placeholder="Last Name" />
      <CustomInput placeholder="Gender" />
      <CustomInput placeholder="Date of Birth" />

      <View style={{paddingVertical: 10}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{fontSize: 15, fontWeight: 'bold', color: COLORS.primary}}>
            Address
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.secondary,
              }}>
              Change address
            </Text>
          </TouchableOpacity>
        </View>
        <CustomInput placeholder="15 Herber Macaulay way, Yaba, Lagos, Nigeria" />
      </View>

      <TouchableOpacity
        // onPress={handleSubmit}
        style={[
          {
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 20,
            fontSize: 14,
            fontFamily: 'CircularStd-Medium',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 1,

            backgroundColor: '#00DC99',
            width: '100%',
            borderRadius: 10,
          },
        ]}>
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            lineHeight: 30,
            fontWeight: 'bold',
          }}>
          SAVE CHANGES
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <Space />
    <CustomInput placeholder="Employment Status" />
    <CustomInput placeholder="Name of Company" />
    <CustomInput placeholder="Location" />
    <SaveChangesBtn />
  </ScrollView>
);

const ThirdRoute = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <Space />
    <CustomInput placeholder="Email" />
    <CustomInput placeholder="Phone Number" />
    <CustomInput placeholder="Bank Verification Number (BVN)" />
    <SaveChangesBtn />
  </ScrollView>
);

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#9D98EC', flex: 1, height: '100%'}}
    pressColor={'transparent'}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#F7F8FD',
    }}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          color: focused ? 'white' : COLORS.grey,
          fontSize: 12,
          // fontWeight: 'bold',
        }}>
        {route.title}
      </Text>
    )}
  />
);

export default function Profile({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Personal'},
    {key: 'second', title: 'Employment'},
    {key: 'third', title: 'Security'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <View style={{flex: 1, backgroundColor: '#F7F8FD'}}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{paddingVertical: 20, paddingHorizontal: 10, fontWeight: '900'}}
        color="#2A286A"
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
          marginLeft: 10,
        }}>
        Profile
      </Text>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          tabStyle={{elevation: 0}}
        />
      </View>
    </View>
  );
}
