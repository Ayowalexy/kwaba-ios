import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {MonoProvider, useMonoConnect} from '@mono.co/connect-react-native';

const ConnectWithMono = () => {
  const {init} = useMonoConnect();
  console.log(init);
  return (
    <TouchableOpacity
      onPress={() => init()}
      style={[designs.button, {backgroundColor: COLORS.secondary}]}>
      <Text
        style={[
          designs.buttonText,
          {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'},
        ]}>
        CONNECT
      </Text>
    </TouchableOpacity>
  );
};

export default function RentalLoanFormBankStatementUpload({navigation}) {
  const config = {
    publicKey: 'live_pk_3MSVtE6Jtj2K6ZGMrkCT',
    onClose: () => alert('Widget closed'),
    onSuccess: async (data) => {
      const code = data.getAuthCode();
      console.log('Access code', code);
      await postData(code);
    },
  };

  return (
    <MonoProvider {...config}>
      <ConnectWithMono />
    </MonoProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 0.5,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },

  text: {
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 0,
    color: '#BFBFBF',
    lineHeight: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  body: {
    fontSize: 12,
    lineHeight: 20,
    color: '#ADADAD',
    marginTop: 20,
    width: '80%',
    // fontWeight: 'bold',
  },
  img: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    top: -20,
  },
});
