import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {images} from '../../util/index';
import designs from './style';

export default function VerifyNumber({navigation}) {
  const [time, setTime] = useState(45);

  return (
    <View style={designs.container}>
      <Image
        style={[designs.image, {marginLeft: 20}]}
        source={images.kwabaLogoWithName}
      />
      <Text style={designs.heading}>Verify your phone number</Text>
      <Text style={designs.body}>
        Please enter verification code sent to your number
      </Text>
      <View style={designs.codeInputContainer}>
        <TextInput keyboardType="number-pad" style={designs.codeInput} />
        <TextInput keyboardType="number-pad" style={designs.codeInput} />
        <TextInput keyboardType="number-pad" style={designs.codeInput} />
        <TextInput keyboardType="number-pad" style={designs.codeInput} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={[designs.btn, {backgroundColor: '#00DC99'}]}>
        <Text style={{color: 'white', fontSize: 14, lineHeight: 32}}>
          VERIFY
        </Text>
      </TouchableOpacity>
      <View style={designs.counter}>
        <Text>{time}sec</Text>
      </View>
    </View>
  );
}
