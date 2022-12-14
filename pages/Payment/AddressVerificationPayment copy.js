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
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const AddressVerificationPayment = ({navigation}) => {
  // const response = route.params;

  const [spinner, setSpinner] = useState(false);
  const [verificationSpinner, setVerificationSpinner] = useState(false);

  const handleNavigation = async () => {
    setSpinner(true);
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };
    const token = await getToken();
    const applicationIDCallRes = await axios.get(
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    // console.log(applicationIDCallRes.data.data.non_refundable_deposit);
    // const amount = applicationIDCallRes.data.data.non_refundable_deposit;
    const amount = 2500;
    console.log('tHE RESpOnSe: ', applicationIDCallRes.data.data);
    //setSpinner(true);
    try {
      const response = await axios.post(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/payment/pay',
        {amount},
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      // setSpinner(true);
      console.log('hello here how far', response);
      if (response.status === 200) {
        setSpinner(false);
        const result = await openInAppBrowser(
          response.data.data.authorization_url,
        );
        console.log('done');
        console.log('result', result);

        if (result.type == 'cancel') {
          let data = {reference: response.data.data.reference};
          console.log('data', data);
          console.log('cancel here');

          setVerificationSpinner(true);
          const verify = await axios.put(
            'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/payment/verify',
            JSON.stringify(data),
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            },
          );

          if (verify.data.status == 'success') {
            setVerificationSpinner(false);
            // let stepsdata = {
            //   documentdone: 'done',
            //   propertydetail: 'done',
            //   landlorddetail: 'done',
            //   refree: 'done',
            //   offeraccepted: 'done',
            //   addressverification: 'done',
            //   debitmandate: '',
            //   awaitingdisbursment: '',
            // };

            // await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));
            Alert.alert(
              'Payment verified',
              'Your payment was verified. Thank you.',
            );
            navigation.navigate('OkraDebitMandate');
          } else {
            setVerificationSpinner(false);
            Alert.alert(
              'Payment Unverified',
              'Your payment was not verified. Please retry.',
            );
          }
        } else {
          console.log('maybe here ' + result.type);
          setVerificationSpinner(false);
          // Alert.alert(
          //   'Payment Unverified',
          //   'Your payment was not verified. Please retry.here',
          // );
        }
      }
    } catch (error) {
      console.log('maybe here canceled ', error.response.data);
      setVerificationSpinner(false);
      setSpinner(false);
      // Alert.alert(
      //   'Payment Unverified',
      //   'Your payment was not verified. Please retry.',
      // );
    }
  };

  const openInAppBrowser = async (url) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#2A286A',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          hasBackButton: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });

        return result;
      } else Linking.openURL(url);
    } catch (error) {
      return error.message;
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
          // marginVertical: 11,
          // marginHorizontal: 16,
          paddingHorizontal: 20,
        }}>
        <Text
          style={[
            // FONTS.h1FontStyling,
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
          {/* Make payment for Address verification */}
          {/* We will need to verify your address before we pay your rent. Please
          make payment by clicking on the button below. */}
          You???re almost done. We just need to verify your address to proceed
          with your rent payment.
        </Text>
        {/* <Text
          style={[
            FONTS.body2FontStyling,
            {
              color: '#ADADAD',
              color: COLORS.dark,
              textAlign: 'center',
              marginBottom: 30,
              fontSize: 14,
              lineHeight: 25,
              paddingHorizontal: 30,
            },
          ]}>
          You???re a step closer to paying your rent. We just need is to verify
          your address
        </Text> */}

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
        <Spinner
          visible={spinner}
          // textContent={'Initializing transactions...'}
          animation="fade"
          // textStyle={{
          //   color: '#2A286A',
          //   fontSize: 20,
          //   fontWeight: 'bold',
          //   lineHeight: 30,
          // }}
          size="large"
        />
        <Spinner
          visible={verificationSpinner}
          // textContent={'Verifying transactions...'}
          animation="fade"
          // textStyle={{
          //   color: '#2A286A',
          //   fontSize: 20,
          //   fontWeight: 'bold',
          //   lineHeight: 30,
          // }}
          size="large"
        />
      </View>
    </View>
  );
};

export default AddressVerificationPayment;
