import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import {COLORS} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

import TabOne from './Tabs/TabOne';
import TabTwo from './Tabs/TabTwo';
import TabThree from './Tabs/TabThree';
import TabFour from './Tabs/TabFour';

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
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: '#F7F8FD',
    }}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          color: focused ? 'white' : '#444',
          fontSize: 10,
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
    {key: 'fourth', title: 'Rent'},
  ]);

  const renderScene = SceneMap({
    first: TabOne,
    second: TabTwo,
    third: TabThree,
    fourth: TabFour,
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
