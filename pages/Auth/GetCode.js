import React from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {images, icons} from '../../util/index';
import designs from './style';

export default function GetCode({navigation}) {
  return (
    <View style={designs.container}>
      <Image style={designs.image} source={images.kwabaLogoWithName} />
      <Text style={designs.heading}>Enter your number</Text>
      <Text style={designs.body}>
        We will send a code to verify your number
      </Text>
      <View style={designs.customInput}>
        <Image
          style={{width: 27, height: 18, marginRight: 10}}
          source={icons.naijaFlag}
        />
        <Text
          style={{
            color: '#465969',
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 30,
          }}>
          +234
        </Text>
        <TextInput
          placeholder="Phone Number"
          style={{flex: 1, paddingLeft: 10}}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('VerifyNumber')}
        style={[designs.btn, {backgroundColor: '#00DC99'}]}>
        <Text style={{color: 'white', fontSize: 14, lineHeight: 32}}>
          GET CODE
        </Text>
      </TouchableOpacity>
    </View>
  );
}
