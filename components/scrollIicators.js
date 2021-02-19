import React from 'react';
import {View, Text} from 'react-native';

export default function ScrollIicators(props) {
  const {currentIndex, setCurrentIndex} = props;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
      <Text
        onPress={() => setCurrentIndex((currentIndex) => currentIndex + 1)}
        style={{
          backgroundColor: currentIndex == 0 ? 'white' : '#9D98EC',
          width: currentIndex == 0 ? 19 : 4,
          height: 4,
          marginRight: 4,
        }}></Text>
      <Text
        onPress={() => setCurrentIndex((currentIndex) => currentIndex + 1)}
        style={{
          backgroundColor: currentIndex == 1 ? 'white' : '#9D98EC',
          width: currentIndex == 1 ? 19 : 4,
          height: 4,
          marginRight: 4,
        }}></Text>
      <Text
        onPress={() => setCurrentIndex((currentIndex) => currentIndex + 1)}
        style={{
          backgroundColor: currentIndex == 2 ? 'white' : '#9D98EC',
          width: currentIndex == 2 ? 19 : 4,
          height: 4,
          marginRight: 4,
        }}></Text>
    </View>
  );
}
