import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {images, icons} from '../../util/index';
import designs from './style';
import {sendVerificationCode} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';

import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GetCode({navigation}) {
  const [spinner, setSpinner] = useState(false);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  const handleSubmit = async () => {
    console.log(value.trim());
    // check if phone number is valid
    const checkValid = phoneInput.current?.isValidNumber(value);

    if (!checkValid) setValid(false);
    else {
      setValid(true);
      if (value.trim().length == 0) {
        setValid(false);
      }
      const data = {telephone: formattedValue};
      setSpinner(true);
      const response = await sendVerificationCode(data);

      if (response.status == 200) {
        setValue('');

        setSpinner(false);
        navigation.navigate('VerifyNumber', {
          phone_number: formattedValue,
        });
      } else {
        setSpinner(false);
        setValid(false);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F7F8FD',
        fontFamily: 'CircularStd',
        padding: 15,
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center', marginBottom: 0, marginTop: 0}}>
        <Image
          style={[designs.image, {marginTop: 0}]}
          source={icons.kwabalogocol}
          resizeMode="contain"
        />
      </View>
      <Text style={[designs.heading, {textAlign: 'center', color: '#465969'}]}>
        Enter your phone number
      </Text>
      <Text style={[designs.body, {textAlign: 'center', marginTop: 10}]}>
        We will send a code to verify your number
      </Text>

      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="NG"
        layout="first"
        placeholder="Phone number"
        onChangeText={setValue}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        renderDropdownImage={<Icon name="chevron-down" />}
        // autoFocus
        containerStyle={{
          width: '100%',
          height: 60,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#EFEFEF',
          backgroundColor: 'white',
          marginTop: 20,
        }}
        flagButtonStyle={{
          backgroundColor: 'transparent',
        }}
        codeTextStyle={{
          backgroundColor: 'transparent',
          fontSize: 14,
        }}
        textContainerStyle={{
          backgroundColor: 'transparent',
        }}
        textInputStyle={{
          fontSize: 14,
          padding: 0,
          margin: 0,
        }}
      />
      {/* {!valid && (
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 5,
          }}>
          <Text style={{color: 'pink'}}>Invalid phone number</Text>
        </View>
      )} */}
      <Spinner visible={spinner} animation="fade" size="large" />
      <TouchableOpacity
        onPress={handleSubmit}
        // disabled={value.trim().length == 0}
        style={[
          designs.btn,
          {
            backgroundColor: '#00DC99',
          },
        ]}>
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            lineHeight: 32,
            fontWeight: 'bold',
          }}>
          GET CODE
        </Text>
      </TouchableOpacity>
    </View>
  );
}
