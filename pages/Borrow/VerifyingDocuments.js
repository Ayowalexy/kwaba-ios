import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const VerifyingDocuments = ({navigation, route}) => {
  const response = route.params;

  const [verificationStatus, setVerificationStatus] = useState(false);
  const [salaryAmount, setSalaryAmount] = useState('');
  const [existingApplication, setExistingApplication] = useState('');
  const [finalApproval, setfinalApproval] = useState('');

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  useEffect(() => {
    const getApplicationData = async () => {
      const token = await getToken();

      try {
        const applicationIDCallRes = await axios.get(
          'http://67.207.86.39:8000/api/v1/application/one',
          {
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        );
        const applicationId = applicationIDCallRes.data.data.id;

        setExistingApplication(applicationId);
        console.log('here', applicationIDCallRes.data.data.approvedamount);

        if (applicationId == 3) {
          // const rentalSteps = await AsyncStorage.getItem('rentalSteps');
          // const steps = JSON.parse(rentalSteps);
          // let stepsData = {
          //   application_form: 'done',
          //   congratulation: 'done',
          //   bank_statement_upload: 'done',
          //   all_documents: 'done',
          //   verifying_documents: 'done',
          //   offer_breakdown: '',
          //   property_detail: '',
          //   landlord_detail: '',
          //   referee_detail: '',
          //   offer_letter: '',
          //   address_verification: '',
          //   debitmandate: '',
          //   awaiting_disbursement: '',
          // };
          // await AsyncStorage.setItem('rentalSteps', JSON.stringify(stepsData));
          // console.log('STEPS: ', steps);
          //navigation.navigate('OfferApprovalBreakDown');
        }

        const rentalSteps = await AsyncStorage.getItem('rentalSteps');
        const steps = JSON.parse(rentalSteps);

        let stepsData = {
          application_form: 'done',
          congratulation: 'done',
          bank_statement_upload: 'done',
          all_documents: 'done',
          verifying_documents: 'done',
          offer_breakdown: 'done',
          property_detail: '',
          landlord_detail: '',
          referee_detail: '',
          offer_letter: '',
          address_verification: '',
          debitmandate: '',
          awaiting_disbursement: '',
        };

        await AsyncStorage.setItem('rentalSteps', JSON.stringify(stepsData));

        console.log('STEPS: ', steps);

        navigation.navigate('OfferApprovalBreakDown');
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getApplicationData();
    //getDocuments();
  });

  const handleNavigation = () => {
    if (finalApproval > 0) {
      // navigation.navigate('SoloSaving2');
      navigation.navigate('OkraDebitMandate');
    }
  };

  const countDocuments = async () => {
    const token = await getToken();
    try {
      const resp = await axios.get(
        'http://67.207.86.39:8000/api/v1/application/documents',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      // console.log(uploadedDocumentsRes)

      let ress = Object.keys(resp.data.data).map((title) => ({
        title,
        content: resp.data[title],
      }));

      var count = 0;

      ress.forEach((v, i) => {
        if (v.content.length == 0) {
          count += 1;
        }
      });

      console.log('ress', ress);
      return count;
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        <Image
          source={images.group3693}
          style={{height: 190, width: 190, alignSelf: 'center'}}
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
          Verifying Documents
        </Text>
        <Text
          style={[
            FONTS.body2FontStyling,
            {color: '#ADADAD', textAlign: 'center', marginBottom: 26},
          ]}>
          We are verifying your documents you will be able to Proceed when we
          are done verifying.
        </Text>

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
      </View>
    </View>
  );
};

export default VerifyingDocuments;
