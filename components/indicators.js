import React from 'react';
import {View, Text} from 'react-native';

export default function Indicators(props) {
  const {currentIndex} = props;
  return (
    <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
      <Text
        style={{
          backgroundColor: currentIndex == 0 ? 'white' : '#FFFFFF77',
          width: 19,
          height: 4,
          marginRight: 4,
        }}></Text>
      <Text
        style={{
          backgroundColor: currentIndex == 1 ? 'white' : '#FFFFFF77',
          width: 19,
          height: 4,
          marginRight: 4,
        }}></Text>
      <Text
        style={{
          backgroundColor: currentIndex == 2 ? 'white' : '#FFFFFF77',
          width: 19,
          height: 4,
          marginRight: 4,
        }}></Text>
    </View>
  );
}
