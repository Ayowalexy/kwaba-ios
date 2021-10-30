import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CompleteProfileModal from '../Home/CompleteProfileModal';
import {TrackEvent} from '../../util/segmentEvents';

const Borrow = ({navigation}) => {
  const [existingApplication, setExistingApplication] = useState('');
  const [completeProfileModal, setCompleteProfileModal] = useState(false);

  useEffect(() => {
    getApplicationData();
  }, []);

  const getApplicationData = async () => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };
    const token = await getToken();

    const borrwSteps = await AsyncStorage.getItem('borrwsteps');
    const steps = JSON.parse(borrwSteps);

    // console.log('steps here' + steps);
    try {
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      // console.log(applicationIDCallRes.data.data.id);
      // console.log(applicationIDCallRes.data.data);
      const applicationId = applicationIDCallRes.data.data.id;
      const status = applicationIDCallRes.data.data.status;
      const statement = applicationIDCallRes.data.data.statement;
      if (status !== 4) {
        setExistingApplication(applicationId);
        // console.log('here', applicationId);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

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

  useEffect(() => {
    (async () => {
      const user = await getUser();
      const rentalSteps = await AsyncStorage.getItem(`rentalSteps-${user.id}`);
      const steps = JSON.parse(rentalSteps);
      console.log('The stepp:', steps);
    })();
  }, []);

  const handleRentalLoanClick = async () => {
    TrackEvent('RNPL From Bottom Navigation');
    const user = await getUser();
    if (user.profile_complete == 0) {
      setCompleteProfileModal(true);
    } else {
      // await AsyncStorage.removeItem(`rentalSteps-${user.id}`);

      const rentalSteps = await AsyncStorage.getItem(`rentalSteps-${user.id}`);
      const steps = JSON.parse(rentalSteps);
      console.log('The stepp:', steps);

      // TODO function check if payment disbusrsed,
      // TODO function check if payment address payment,
      // TODO function check if payment document verification,

      if (steps != null) {
        if (steps == null) {
          navigation.navigate('RentalLoanForm1');
        } else if (steps.congratulation == '') {
          navigation.navigate('RentalLoanFormCongratulation');
        } else if (steps.all_documents == '') {
          navigation.navigate('NewAllDocuments');
        } else if (steps.verifying_documents == '') {
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
          navigation.navigate('PTMFB');
        } else if (steps.address_verification == '') {
          navigation.navigate('AddressVerificationPayment');
        } else if (steps.debitmandate == '') {
          navigation.navigate('OkraDebitMandate');
        } else if (steps.awaiting_disbursement == '') {
          navigation.navigate('AwaitingDisbursement');
        } else if (steps.dashboard == '') {
          navigation.navigate('RentNowPayLaterDashboard');
        } else {
          navigation.navigate('RentNowPayLaterDashboard');
        }
      } else {
        navigation.navigate('RentNowPayLaterOnboarding');
      }

      // //QUICK NAVIGATIONS
      // navigation.navigate('RentalFormBusiness1');
      // navigation.navigate('BusinessForm1');
      // navigation.navigate('BusinessDocumentUpload');
      // navigation.navigate('OkraDebitMandate');
      // navigation.navigate('AddressVerificationPayment');
    }
  };

  const handleSavingClick = async () => {
    navigation.navigate('SavingsHome');
    TrackEvent('Rent Savings From Bottom Navigation');
  };

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
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          padding: 20,
        }}
        onPress={() => navigation.navigate('Home')}>
        <Icon
          name="arrow-back-outline"
          size={25}
          style={{
            fontWeight: '900',
          }}
          color={COLORS.light}
        />
      </TouchableOpacity> */}
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
              Let's help you pay your rent conveniently.
            </Text>
            <Text style={[FONTS.body2FontStyling, designs.smallHeaderText]}>
              Whether you are struggling to pay your rent, or looking to save
              towards your next rent, we've got you covered.
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
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

          <TouchableOpacity onPress={handleSavingClick} style={designs.button}>
            <View style={designs.buttonInnerView}>
              <Text style={designs.buttonText}>Rent Savings</Text>
              <Icon
                name="arrow-forward-outline"
                size={20}
                color={COLORS.secondary}
                style={{fontWeight: '900'}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CompleteProfileModal
        onRequestClose={() => setCompleteProfileModal(!completeProfileModal)}
        visible={completeProfileModal}
        navigation={navigation}
      />
    </View>
  );
};

export default Borrow;
