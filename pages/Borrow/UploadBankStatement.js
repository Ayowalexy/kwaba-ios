import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {MonoProvider, useMonoConnect} from '@mono.co/connect-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fileUploadReducer from '../../redux/reducers/documentUploadReducers';
import {useDispatch, useSelector} from 'react-redux';

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

const UploadBankStatement = ({navigation}) => {
  const dispatch = useDispatch();

  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');

  const api =
    'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/bank_statement';

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const postData = async (code) => {
    const token = await getToken();
    console.log(token);

    //     try {
    //       const data = {code: code};
    //       console.log('from mono test', JSON.stringify(data))
    //       const post = await axios.post(api, JSON.stringify(data), {headers: {
    //         Authorization: token,
    //         'Content-Type': 'application/json'
    //       }});
    //       const response = await post;
    //       console.log('postdata', response);
    //       navigation.navigate('UploadDocuments', response);

    try {
      const data = {code: code};
      console.log('from mono test', JSON.stringify(data));
      console.log('start');
      const post = await axios.post(api, JSON.stringify(data), {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      console.log('end', post);
      const response = await post;
      // console.log('postdata', response);
      // console.log('postdata status', response.status);
      if (response.status == 201) {
        // dispatch(successUploadFile(1));
        navigation.navigate('FileUploadTest');
      }
    } catch (error) {
      console.log('catch error', error.response.data);
    }
  };

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
      <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{marginTop: 28, marginLeft: 25, fontWeight: '900'}}
          color={COLORS.primary}
        />
        <View
          style={{
            marginVertical: 11,
            marginHorizontal: 16,
          }}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: 134,
              },
            ]}>
            Rental Loan
          </Text>
          {/* <Image source={images.group3693} style={designs.uploadDocumentImage}/> */}
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 10,
              },
            ]}>
            Bank Statement
          </Text>
          <Text
            style={[
              FONTS.body2FontStyling,
              {color: '#ADADAD', textAlign: 'center', marginBottom: 26},
            ]}>
            Connect your salary bank account via your mobile/internet banking.{' '}
          </Text>

          <ConnectWithMono />
        </View>
      </View>
    </MonoProvider>
  );
};

export default UploadBankStatement;
