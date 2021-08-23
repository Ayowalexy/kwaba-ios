import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {COLORS} from '../../../../util';

export default function WithdrawalTransactions() {
  return (
    <View
      style={{
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopColor: '#BFBFBF50',
        borderTopWidth: 1,
        marginTop: 20,
      }}>
      <Text style={{fontSize: 14, color: COLORS.grey, textAlign: 'center'}}>
        No Transactions
      </Text>
    </View>
  );
}
