import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Screen4({navigation}) {
  const top = useSafeAreaInsets().top;
  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD', marginTop: Platform.OS == 'ios' ? top : 0}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{marginTop: 28, marginLeft: 16, fontWeight: '900'}}
        color="#2A286A"
      />
      <View
        style={{
          marginTop: 25,
          marginBottom: 49,
          marginLeft: 16,
          marginRight: 16,
        }}>
        <Text
          style={[
            designs.heading,
            {
              color: '#2A286A',
              textAlign: 'left',
              fontSize: 25,
              lineHeight: 32,
            },
          ]}>
          Complete your profile
        </Text>
        <Text
          style={[
            designs.body,
            {
              color: '#465969',
              textAlign: 'left',
              fontSize: 15,
              lineHeight: 19,
            },
          ]}>
          Provide your BVN, this is for verification purpose
        </Text>
        <TextInput
          style={designs.textField}
          placeholder="BVN"
          placeholderTextColor="#BFBFBF"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('CompleteProfile5')}
          style={[designs.btn, {backgroundColor: '#00DC99', top: 300}]}>
          <Text style={{color: 'white'}}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
