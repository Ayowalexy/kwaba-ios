import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {verifyPayment} from '../../services/network';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import CreditCardModal from '../../components/CreditCard/CreditCardModal';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

const AddressVerificationPayment = ({navigation}) => {
  const [spinner, setSpinner] = useState(false);
  const [verificationSpinner, setVerificationSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const [resDataObj, setResDataObj] = useState('');

  const handleNavigation = async () => {
    setSpinner(true);
    // console.log('This has started....');

    const token = await getToken();
    const amount = 2500;

    const url = 'http://67.207.86.39:8000/api/v1/application/payment/pay';

    const data = {
      amount,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });

      if (response.status === 200) {
        setSpinner(false);
        setModal(true);
        const resData = response.data.data;

        console.log('The response: ', resData);
        setResDataObj(resData);
      }
    } catch (error) {
      console.log('Error: ', error);
      setSpinner(false);
    }
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <Text
          style={[
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 130,
            },
          ]}>
          Rent Now, Pay Later
        </Text>
        <Image
          source={images.paymentMethodPNG}
          style={designs.paymentMethodImage}
        />
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
          Address Verification
        </Text>
        <Text
          style={[
            FONTS.body2FontStyling,
            {
              color: '#ADADAD',
              color: COLORS.dark,
              textAlign: 'center',
              marginBottom: 30,
              fontSize: 14,
              lineHeight: 25,
              paddingHorizontal: 10,
            },
          ]}>
          You’re almost done. We just need to verify your address to proceed
          with your rent payment.
        </Text>
        <TouchableOpacity
          onPress={handleNavigation}
          style={[designs.button, {backgroundColor: COLORS.secondary}]}>
          <Text
            style={[
              designs.buttonText,
              {
                color: COLORS.white,
                textAlign: 'center',
                fontWeight: 'normal',
                fontSize: 12,
                fontWeight: 'bold',
              },
            ]}>
            ADDRESS VERIFICATION
          </Text>
        </TouchableOpacity>
        <Spinner visible={spinner} animation="fade" size="large" />
        <Spinner visible={verificationSpinner} animation="fade" size="large" />
      </View>

      <CreditCardModal
        onRequestClose={() => setModal(false)}
        visible={modal}
        info={resDataObj}
        navigation={navigation}
        redirectTo="OkraDebitMandate"
      />
    </View>
  );
};

export default AddressVerificationPayment;
