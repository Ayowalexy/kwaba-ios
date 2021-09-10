import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {COLORS, icons, images} from '../../util/index';
import designs from './style';

export default function LinkingAccount({navigation, route}) {
  const item = route.params;
  return (
    <View
      style={[
        designs.container,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000050',
          paddingHorizontal: 21,
        },
      ]}>
      <View style={designs.cardLYA}>
        <Image style={designs.image} source={images.group4923} />
        <View style={{marginTop: 9}}>
          <Text
            style={[designs.heading, {color: '#FB8B24', textAlign: 'center'}]}>
            Linking your account
          </Text>
          <Text style={[designs.body, {textAlign: 'center'}]}>
            Linking this account to Kwaba only gives us read-only access to know
            the value of your asset in the account.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ThirdPartyLink', item)}
          style={[
            designs.buttonStyleB,
            {
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                },
                android: {
                  elevation: 3,
                },
              }),
            },
          ]}>
          <Text style={designs.btnTextB}>I UNDERSTAND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
