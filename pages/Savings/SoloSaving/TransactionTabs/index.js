import {all} from 'q';
import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {COLORS} from '../../../../util';

import AllTransactions from './all.transactions.js';
import SavingsTransactions from './savings.transactions';
import WithdrawalTransactions from './withdrawal.transactions';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: COLORS.light, flex: 1, height: '100%'}}
    pressColor={'#BFBFBF50'}
    style={{
      backgroundColor: COLORS.white,
      elevation: 0,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#F7F8FD',
    }}
    tabStyle={{height: '100%', flex: 1}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          color: focused ? COLORS.white : COLORS.grey,
          fontSize: 10,
        }}>
        {route.title}
      </Text>
    )}
  />
);

export default function TransactionsTab(props) {
  const layout = useWindowDimensions();

  useEffect(() => {
    // console.log('Hist: ', props);
  }, []);

  const renderScene = SceneMap({
    first: () => <AllTransactions savingsTransactions={props.transactions} />,
    second: () => (
      <SavingsTransactions savingsTransactions={props.transactions} />
    ),
    third: () => <WithdrawalTransactions />,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'All'},
    {key: 'second', title: 'Savings'},
    {key: 'third', title: 'Withdrawal'},
  ]);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        minHeight: 400,
        marginTop: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 10,
        maxHeight: '100%',
        height: '100%',
      }}>
      <View style={{flex: 1, height: '100%'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: COLORS.primary,
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          My Transactions
        </Text>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          style={{marginTop: 10}}
          // tabStyle={{elevation: 0, height: '100%'}}
        />
      </View>
    </View>
  );
}
