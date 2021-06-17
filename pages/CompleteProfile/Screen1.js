import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';

export default function screen1({navigation}) {
  return (
    <View style={[designs.container, {justifyContent: 'center'}]}>
      <View style={designs.card}>
        <Image style={designs.image} source={icons.profile} />
        <View style={{marginTop: 9}}>
          <Text
            style={[designs.heading, {color: '#FB8B24', textAlign: 'center'}]}>
            Complete your profile
          </Text>
          <Text style={[designs.body, {textAlign: 'center'}]}>
            Complete your profile to access rental{'\n'} finance and other
            amazing features.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('CompleteProfile2')}
          style={[designs.btn, {backgroundColor: '#2A286A'}]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            COMPLETE PROFILE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
