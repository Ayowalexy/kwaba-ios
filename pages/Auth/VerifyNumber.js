import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {images} from '../../util/index';
import designs from './style';
import {verifyPhone} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';

export default function VerifyNumber({navigation}) {
  const [spinner, setSpinner] = useState(false);
  const [time, setTime] = useState(45);
  const [code, setCode] = useState({num1: '', num2: '', num3: '', num4: ''});

  const verify = async () => {
    const data = {code: `${code.num1}${code.num2}${code.num3}${code.num4}`};

    setSpinner(true);
    const res = await verifyPhone(data);
    if (res.status == 200) {
      setSpinner(false);
      Alert.alert(
        'SUCCESS',
        'Your phone number has been verified. You can now login',
        [{text: 'Ok', onPress: () => navigation.navigate('Login')}],
      );
      setCode({num1: '', num2: '', num3: '', num4: ''});
    } else {
      Alert.alert('VERIFICATION FAILED', res, [{text: 'Ok'}]);
    }
  };
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
        <TextInput
          keyboardType="number-pad"
          value={code.num1}
          onChangeText={(text) => setCode({...code, num1: text})}
          style={designs.codeInput}
        />
        <TextInput
          keyboardType="number-pad"
          value={code.num2}
          onChangeText={(text) => setCode({...code, num2: text})}
          style={designs.codeInput}
        />
        <TextInput
          keyboardType="number-pad"
          value={code.num3}
          onChangeText={(text) => setCode({...code, num3: text})}
          style={designs.codeInput}
        />
        <TextInput
          keyboardType="number-pad"
          value={code.num4}
          onChangeText={(text) => setCode({...code, num4: text})}
          style={designs.codeInput}
        />
      </View>
      <Spinner
        visible={spinner}
        textContent={'Sending...'}
        animation="fade"
        textStyle={{
          color: '#2A286A',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 30,
        }}
        size="large"
      />
      <TouchableOpacity
        onPress={verify}
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
