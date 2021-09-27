import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Indicators(props) {
  const {currentIndex} = props;

  return (
    <View style={{display: 'flex', flexDirection: 'row', marginVertical: 15}}>
      <Text
        style={[
          styles.indicator,
          {
            backgroundColor: currentIndex == 0 ? '#00DC99' : '#99DC9950',
          },
        ]}></Text>
      <Text
        style={[
          styles.indicator,
          {
            backgroundColor: currentIndex == 1 ? '#00DC99' : '#99DC9950',
          },
        ]}></Text>
      <Text
        style={[
          styles.indicator,
          {
            backgroundColor: currentIndex == 2 ? '#00DC99' : '#99DC9950',
          },
        ]}></Text>
      <Text
        style={[
          styles.indicator,
          {
            backgroundColor: currentIndex == 3 ? '#00DC99' : '#99DC9950',
          },
        ]}></Text>
      <Text
        style={[
          styles.indicator,
          {
            backgroundColor: currentIndex == 4 ? '#00DC99' : '#99DC9950',
          },
        ]}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    width: 20,
    height: 5,
    marginRight: 4,
    borderRadius: 10,
  },
});
