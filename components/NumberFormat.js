import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {icons, images, COLORS} from '../util/index';
import {formatNumber} from '../util/numberFormatter';

export default function NumberFormat(props, {navigation}) {
  const {value, onChangeText, editable, ...otherProps} = props;
  // console.log(props);

  return (
    <View style={[styles.customInput, {padding: 0}]}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 14,
          position: 'absolute',
          left: 20,
          color: COLORS.dark,
        }}>
        ₦
      </Text>
      <TextInput
        style={{
          width: '100%',
          paddingLeft: 50,
          paddingVertical: 16,
          // fontWeight: 'bold',
        }}
        placeholder="Amount"
        placeholderTextColor="#BFBFBF"
        keyboardType="number-pad"
        // keyboardType="decimal-pad"
        value={formatNumber(value)}
        onChangeText={(text) => onChangeText(text.replace(/\D/g, ''))}
        editable={editable}
        {...otherProps}
        // {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  customInput: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});
