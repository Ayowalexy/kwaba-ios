import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { COLORS, FONTS, images } from '../../../util/index';
import designs from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CompleteProfileModal from '../../Home/CompleteProfileModal';
import { TrackEvent } from '../../../util/segmentEvents';
import { useRoute } from '@react-navigation/native';
import urls from '../../../services/routes';
import { getEmergencyLoans } from '../../../services/network';
import { getCurrentApplication } from '../../../services/network';

export default function RentHome({ navigation }) {
  const [existingApplication, setExistingApplication] = useState('');
  const [completeProfileModal, setCompleteProfileModal] = useState(false);
  const [documentsApproved, setDocumentsApproved] = useState(false)
  const route = useRoute();

  useEffect(() => {
    getApplicationData();
  }, []);



  useEffect(() => {
    (async () => {
      const getAllAloans = await getEmergencyLoans();
      const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
      const docs = await getCurrentApplication({ id: loan_id })
      console.log('docs approved', docs?.data?.data?.status)
      setDocumentsApproved(docs?.data?.data?.status)
    })()
  }, [])

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const getApplicationData = async () => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };
    const token = await getToken();
    const user = await getUser();

    const borrwSteps = await AsyncStorage.getItem('borrwsteps');
    const steps = JSON.parse(borrwSteps);

    try {
      const applicationIDCallRes = await axios.get(
        // 'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
        urls.applications.GET_CURRENT_APPLICATION,
        {
          headers: { 'Content-Type': 'application/json', Authorization: token },
        },
      );
      const applicationId = applicationIDCallRes.data.data.id;
      const status = applicationIDCallRes.data.data.status;
      const statement = applicationIDCallRes.data.data.statement;
      if (status !== 4) {
        setExistingApplication(applicationId);
      }
    } catch (error) {
      console.log(error.response.data);
    }
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

    // return Alert.alert(
    //   'Oops',
    //   'This feature is unavailable at the moment'
    // )
    //THE RENT NOW PAY LATER FEATURE IS CURRENTLY TURNED OFF

    if (!Boolean(documentsApproved)) {
      // navigation.navigate('VerifyingDocuments')
    }

    TrackEvent('RNPL From Bottom Navigation');
    const user = await getUser();
    const getCreditScoreDetails = await AsyncStorage.getItem(
      `creditScoreDetail-${user.id}`,
    );

    console.log('DATATATATATTA: ', getCreditScoreDetails);

    // await AsyncStorage.clear();

    // navigation.navigate('RnplSteps');
    // navigation.navigate('NewAllDocuments');
    // navigation.navigate('CreditOnboard');

    const rnplStep = await AsyncStorage.getItem('rnplSteps')
    const parsed = JSON.parse(rnplStep)

    console.log('params', route?.params)
    const userDetails = await AsyncStorage.getItem(`userEmailAndBvn-${user.id}`);
   
    if (user.profile_complete == 0) {
      setCompleteProfileModal(true);
    } else {
      if (getCreditScoreDetails == null) {
        navigation.navigate('RnplOnboard');
      } else if (getCreditScoreDetails == 'creditOnboarding') {
        navigation.navigate('RnplOnboard');
        // // // navigation.navigate('CreditOnboard');
      } else if (getCreditScoreDetails == 'creditForm') {
        navigation.navigate('CreditAwaiting', JSON.parse(userDetails));
        //navigation.navigate('RnplOnboard');

      } else if (getCreditScoreDetails == 'creditAwaiting') {
        navigation.navigate('creditAwaiting');
      } else if (getCreditScoreDetails == 'creditDashboard') {
        navigation.navigate('CreditAwaiting');
      } else if (route?.params?.status == 2) {
        navigation.navigate('VerifyingDocuments')
      } else {
       
        navigation.navigate('RnplSteps');
      }
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
                style={{ fontWeight: '900' }}
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
                style={{ fontWeight: '900' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {completeProfileModal && (
        <CompleteProfileModal
          onRequestClose={() => setCompleteProfileModal(!completeProfileModal)}
          visible={completeProfileModal}
          navigation={navigation}
          screenName={route.name}
        />
      )}
    </View>
  );
}
