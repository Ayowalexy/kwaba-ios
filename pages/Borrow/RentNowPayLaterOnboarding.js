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

  useEffect(() => {
    dispatch(getTotalSoloSavings());
    dispatch(getMaxLoanCap());
  }, []);

  useEffect(() => {
    const data = getMaxLoanCap1?.data;

    setSavings(data?.you_have_save);
  }, []);

  const handleRentalLoanClick = async () => {
    const borrwSteps = await AsyncStorage.getItem('borrwsteps');
    const steps = JSON.parse(borrwSteps);

    // let stepsdata={
    //   documentdone:'',
    //   propertydetail:'',
    //   landlorddetail:'',
    //   refree:'',
    //   offeraccepted:'',
    //   addressverification:'',
    //   debitmandate:'',
    //   awaitingdisbursment:'',
    // };

    // await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));

    if (steps == null) {
      navigation.navigate('RentalLoanForm1');
    } else if (steps.documentdone == '') {
      navigation.navigate('UploadDocuments');
    } else if (steps.propertydetail == '') {
      navigation.navigate('PostPaymentForm1');
    } else if (steps.landlorddetail == '') {
      navigation.navigate('PostPaymentForm2');
    } else if (steps.refree == '') {
      navigation.navigate('PostPaymentForm3');
    } else if (steps.offeraccepted == '') {
      navigation.navigate('RentalLoanOfferTest');
    } else if (steps.addressverification == '') {
      navigation.navigate('AddressVerificationPayment');
    } else if (steps.debitmandate == '') {
      navigation.navigate('OkraDebitMandate');
    } else if (steps.awaitingdisbursment == '') {
      navigation.navigate('AwaitingDisbursement');
    } else {
      navigation.navigate('RentalLoanForm1');
      //navigation.navigate('EmergencyLoanRequestDashBoard');
    }
  };

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
      {getMaxLoanCap1?.data?.you_have_save <= 0 ? (
        <NoSavingsHTML />
      ) : (
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
                  place, we can pay your bulk rent so you pay back in easy
                  monthly payments
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
      )}
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
