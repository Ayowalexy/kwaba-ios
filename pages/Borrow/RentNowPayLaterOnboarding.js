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

export default RentNowPayLaterOnboarding = ({navigation}) => {

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

      }else {

      navigation.navigate('RentalLoanForm1');
      //navigation.navigate('EmergencyLoanRequestDashBoard');
    }

  };


  return (
    <View style={styles.container}>
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
        <Image source={images.rentNowPayLaterOnboarding} style={styles.image} />
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.textWrapper}>
            <Text style={styles.heading}>Rent Now Pay Later</Text>
            <Text style={styles.content}>
              Having problem completing your rent? You can get help from your
              family, friends assist you with your rent or Kwaba can help.
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
