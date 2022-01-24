import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  getTotalSoloSavings,
  getMaxLoanCap,
} from '../../redux/actions/savingsActions';

export default RentNowPayLaterOnboarding = ({navigation}) => {
  const dispatch = useDispatch();
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const [savings, setSavings] = useState(0);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    dispatch(getTotalSoloSavings());
    dispatch(getMaxLoanCap());
  }, []);

  useEffect(() => {
    const data = getMaxLoanCap1?.data;

    setSavings(data?.you_have_save);
  }, []);

  const handleRentalLoanNavigate = async () => {
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
      // navigation.navigate('RentalLoanFormBankStatementUploadEmail');
    }
  };

  useEffect(() => {
    handleRentalLoanNavigate();
  }, []);

  const NoSavingsHTML = () => {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{
            fontWeight: '900',
            paddingHorizontal: 15,
            paddingVertical: 15,
            position: 'absolute',
          }}
          color={COLORS.primary}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Image
            source={images.maskGroup44}
            style={{width: 100, height: 100, marginBottom: 20}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.primary,
              textAlign: 'center',
              lineHeight: 25,
            }}>
            To access Rent Now Pay Later,{'\n'}you need to be an active saver on
            Kwaba.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SavingsHome')}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 15,
              paddingHorizontal: 30,
              borderRadius: 5,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.white,
                textTransform: 'uppercase',
              }}>
              Begin Saving
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* {getMaxLoanCap1?.data?.you_have_save <= 0 ? (
        <NoSavingsHTML />
      ) : ( */}
      <>
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
        <ScrollView>
          <Image
            source={images.rentNowPayLaterOnboarding}
            style={styles.image}
          />
          <View style={{paddingHorizontal: 20}}>
            <View style={styles.textWrapper}>
              <Text style={styles.heading}>Rent Now Pay Later</Text>
              <Text style={styles.content}>
                Whether you are looking to renew your rent or pay for a new
                place, we can pay your bulk rent so you pay back in easy monthly
                payments
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('EmploymentStatus')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>GET STARTED</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    // paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    // right: -30,
  },
  textWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.light,
  },
  content: {
    fontSize: 14,
    color: COLORS.white,
    lineHeight: 25,
    textAlign: 'center',
  },

  button: {
    width: '100%',
    backgroundColor: COLORS.light,
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
