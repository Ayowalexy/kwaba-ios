import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const VerifyingDocuments = ({navigation, route}) => {
  const response = route.params;

  const [verificationStatus, setVerificationStatus] = useState(false);
  const [salaryAmount, setSalaryAmount] = useState('');
  const [existingApplication, setExistingApplication] = useState('');
  const [finalApproval, setfinalApproval] = useState('');
  const [spinner, setSpinner] = useState(false);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const getApplicationData = async () => {
    const token = await getToken();
    setSpinner(true);

    const user = await getUser();

    try {
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      console.log('APp status: ', applicationIDCallRes.data.data.status);
      console.log('APp: ', applicationIDCallRes.data.data);

      const applicationStatus = applicationIDCallRes.data.data.status;

      // setExistingApplication(applicationId);
      // console.log('here', applicationIDCallRes.data.data.approvedamount);
      // setSpinner(false);

      if (applicationStatus == 3) {
        setSpinner(false);
        let stepsData = {
          application_form: 'done',
          congratulation: 'done',
          all_documents: 'done',
          verifying_documents: 'done',
          offer_breakdown: '',
          property_detail: '',
          landlord_detail: '',
          referee_detail: '',
          offer_letter: '',
          address_verification: '',
          debitmandate: '',
          awaiting_disbursement: '',
          dashboard: '',
        };

        await AsyncStorage.setItem(
          `rentalSteps-${user.id}`,
          JSON.stringify(stepsData),
        );
        navigation.navigate('OfferApprovalBreakDown');
      } else {
        setSpinner(false);
        console.log('Nah ');
        Alert.alert(
          'Document Verification',
          'We are still verifiying your documents, please check back later.',
        );
      }
    } catch (error) {
      setSpinner(false);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getApplicationData();
    //getDocuments();
  }, []);

  // const handleNavigation = () => {
  //   if (finalApproval > 0) {
  //     // navigation.navigate('SoloSaving2');
  //     navigation.navigate('OkraDebitMandate');
  //   }
  // };

  // const countDocuments = async () => {
  //   const token = await getToken();
  //   try {
  //     const resp = await axios.get(
  //       'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/documents',
  //       {
  //         headers: {'Content-Type': 'application/json', Authorization: token},
  //       },
  //     );
  //     // console.log(uploadedDocumentsRes)

  //     let ress = Object.keys(resp.data.data).map((title) => ({
  //       title,
  //       content: resp.data[title],
  //     }));

  //     var count = 0;

  //     ress.forEach((v, i) => {
  //       if (v.content.length == 0) {
  //         count += 1;
  //       }
  //     });

  //     console.log('ress', ress);
  //     return count;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      {/* <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{padding: 15, paddingVertical: 15, fontWeight: '900'}}
        color={COLORS.primary}
      /> */}
      <View
        style={{
          // marginVertical: 11,
          marginHorizontal: 16,
          marginTop: 20,
        }}>
        <Text
          style={[
            // FONTS.h1FontStyling,
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              marginBottom: 134,
              fontSize: 18,
            },
          ]}>
          Rent Now Pay Later
        </Text>
        {/* <Image source={images.group3693} style={designs.uploadDocumentImage}/> */}
        <Image
          source={images.group3693}
          style={{height: 100, width: 100, alignSelf: 'center'}}
        />
        <Text
          style={[
            // FONTS.h1FontStyling,
            {
              marginTop: 10,
              fontSize: 20,
              color: '#2A286A',
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: 10,
            },
          ]}>
          Verifying Documents
        </Text>
        <Text
          style={[
            // FONTS.body2FontStyling,
            {
              color: COLORS.dark,
              textAlign: 'center',
              marginBottom: 26,
              lineHeight: 25,
              paddingHorizontal: 20,
            },
          ]}>
          We are verifying your documents. Once we are done, you will be able to
          proceed.
        </Text>

        <TouchableOpacity
          onPress={getApplicationData}
          style={{
            width: '100%',
            backgroundColor: COLORS.secondary,
            padding: 20,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: COLORS.white,
            }}>
            Check Verification Status
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('NewAllDocuments')}
          style={{
            width: '100%',
            backgroundColor: COLORS.white,
            padding: 20,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            elevation: 1,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: COLORS.dark,
            }}>
            Edit Documents
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
            onPress={() => navigation.navigate('AllDocuments', response)}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>UPLOAD DOCUMENTS</Text>
          </TouchableOpacity> */}

        {/* <TouchableOpacity
            onPress={() => {handleNavigation}}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text style={[designs.buttonText, {color: COLORS.white, textAlign: 'center', fontWeight: 'normal'}]}>Check Status</Text>
          </TouchableOpacity> */}

        <Spinner visible={spinner} size="large" />
      </View>
    </View>
  );
};

export default VerifyingDocuments;
