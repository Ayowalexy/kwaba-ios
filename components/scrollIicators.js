import React from 'react';
import {View, Text} from 'react-native';

export default function ScrollIicators(props) {
  const {currentIndex, setCurrentIndex} = props;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        // marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
      <Text
        onPress={() => setCurrentIndex((currentIndex) => currentIndex + 1)}
        style={{
          backgroundColor: currentIndex == 0 ? '#BFBFBF' : '#BFBFBF60',
          width: currentIndex == 0 ? 10 : 4,
          height: 4,
          marginRight: 4,
          borderRadius: 4,
        }}></Text>
      <Text
        onPress={() => setCurrentIndex((currentIndex) => currentIndex + 1)}
        style={{
          backgroundColor: currentIndex == 1 ? '#BFBFBF' : '#BFBFBF60',
          width: currentIndex == 1 ? 10 : 4,
          height: 4,
          marginRight: 4,
          borderRadius: 4,
        }}></Text>
      <Text
        onPress={() => setCurrentIndex((currentIndex) => currentIndex + 1)}
        style={{
          backgroundColor: currentIndex == 2 ? '#BFBFBF' : '#BFBFBF60',
          width: currentIndex == 2 ? 10 : 4,
          height: 4,
          marginRight: 4,
          borderRadius: 4,
        }}></Text>
    </View>
  );
}
