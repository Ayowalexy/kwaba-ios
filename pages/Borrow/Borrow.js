import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const width = Dimensions.get('window').width;

const Borrow = ({navigation}) => {
  const [existingApplication, setExistingApplication] = useState('');

  useEffect(() => {
    const getApplicationData = async () => {
      const getToken = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const token = JSON.parse(userData).token;
        return token;
      };
      const token = await getToken();

      const borrwSteps = await AsyncStorage.getItem('borrwsteps');
      const steps = JSON.parse(borrwSteps);

      console.log('steps here' + steps);
      try {
        const applicationIDCallRes = await axios.get(
          'http://67.207.86.39:8000/api/v1/application/one',
          {
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        );
        console.log(applicationIDCallRes.data.data.id);
        console.log(applicationIDCallRes.data.data);
        const applicationId = applicationIDCallRes.data.data.id;
        const status = applicationIDCallRes.data.data.status;
        const statement = applicationIDCallRes.data.data.statement;
        if (status !== 4) {
          setExistingApplication(applicationId);
          console.log('here', existingApplication);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    // console.log(error.response.data)
    getApplicationData();
  }, []);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;

    return token;
  };

  const handleRentalLoanClick = async () => {
    await AsyncStorage.removeItem('rentalSteps');

    // const token = await getToken();

    const rentalSteps = await AsyncStorage.getItem('rentalSteps');
    const steps = JSON.parse(rentalSteps);

    // console.log(steps);
    if (steps != null) {
      if (steps == null) {
        navigation.navigate('RentalLoanForm1');
      } else if (steps.congratulation == '') {
        navigation.navigate('RentalLoanFormCongratulation');
      } else if (steps.bank_statement_upload == '') {
        navigation.navigate('RentalLoanFormBankStatementUpload');
      } else if (steps.all_documents == '') {
        navigation.navigate('NewAllDocuments');
      } else if ((steps.verifying_documents = '')) {
        navigation.navigate('VerifyingDocuments');
      } else if (steps.offer_breakdown == '') {
        navigation.navigate('OfferApprovalBreakDown');
      } else if (steps.property_detail == '') {
        navigation.navigate('PostPaymentForm1');
      } else if (steps.landlord_detail == '') {
        navigation.navigate('PostPaymentForm2');
      } else if (steps.referee_detail == '') {
        navigation.navigate('PostPaymentForm3');
      } else if (steps.offer_letter == '') {
        // navigation.navigate('OfferLetter');
        // const applicationIDCallRes = await axios.get(
        //   'http://67.207.86.39:8000/api/v1/application/one',
        //   {
        //     headers: {'Content-Type': 'application/json', Authorization: token},
        //   },
        // );
        // if (applicationIDCallRes.data.data.assigned_to == 'Kwaba') {
        //   navigation.navigate('AcceptanceLetterKwaba');
        // } else {
        //   navigation.navigate('AcceptanceLetterAddosser');
        // }
        navigation.navigate('AddosserLetter');
      } else if (steps.address_verification == '') {
        // navigation.navigate('AddressVerification');
        navigation.navigate('AddressVerificationPayment');
      } else if (steps.debitmandate == '') {
        // navigation.navigate('DebitMandate');
        navigation.navigate('OkraDebitMandate');
      } else if (steps.awaiting_disbursement) {
        navigation.navigate('AwaitingDisbursement');
      }
    } else {
      navigation.navigate('RentNowPayLaterOnboarding');
    }

    // //QUICK NAVIGATIONS
    // navigation.navigate('OkraDebitMandate');
    // navigation.navigate('OfferApprovalBreakDown');
    // navigation.navigate('AwaitingDisbursement');
    // navigation.navigate('AcceptanceLetterAddosser');
    // navigation.navigate('AddosserLetter');
    // navigation.navigate('PostPaymentForm3');
    // navigation.navigate('OfferLetter');
    // navigation.navigate('VerifyingDocuments');
    // navigation.navigate('RentalLoanFormBankStatementUpload');
    // navigation.navigate('NewAllDocuments');
  };

  // const handleRentalLoanClick=()=> {
  //   if (existingApplication !== ''){
  //  navigation.navigate('UploadDocuments')}
  //  else{
  //   navigation.navigate('RentalLoanForm1')
  //  }
  // }

  return (
    <View style={[designs.container]}>
      <Image
        source={images.borrowSectionBGI}
        style={{
          width: '100%',
          height: '100%',
          right: 0,
          position: 'absolute',
          resizeMode: 'cover',
        }}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          padding: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-outline"
          size={25}
          style={{
            fontWeight: '900',
          }}
          color={COLORS.light}
        />
      </TouchableOpacity>
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={designs.contentView}>
          <View style={designs.textView}>
            <Text style={[FONTS.largeTitleFontStyling, designs.bigText]}>
              We can help you with some extra money
            </Text>
            <Text style={[FONTS.body2FontStyling, designs.smallHeaderText]}>
              Whether you need extra money to balance your rent or a quick loan
              to sort out personal stuff, we gat you!
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            // height: 54,
            // flex: 1,
            // flexDirection: 'column',
            // justifyContent: 'center',
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={handleRentalLoanClick}
            activeOpacity={0.7}
            style={[designs.button]}>
            <View style={designs.buttonInnerView}>
              <Text style={designs.buttonText}>Rent Now Pay Later</Text>
              <Icon
                name="arrow-forward-outline"
                size={20}
                color={COLORS.secondary}
                style={{fontWeight: '900'}}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('EmergencyFundOnboarding')}
            style={designs.button}>
            <View style={designs.buttonInnerView}>
              <Text style={designs.buttonText}>Emergency Funds</Text>
              <Icon
                name="arrow-forward-outline"
                size={20}
                color={COLORS.secondary}
                style={{fontWeight: '900'}}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* </ImageBackground> */}
      </ScrollView>
    </View>
  );
};

export default Borrow;
