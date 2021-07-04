import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EligibilitySalaryEarner({navigation}) {
  const handleProceedClick = async () => {
    const borrwSteps = await AsyncStorage.getItem('borrwsteps');
    const steps = JSON.parse(borrwSteps);

    //   let stepsdata={
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
      navigation.navigate('RentalLoanFormCongratulation');
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

  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{paddingVertical: 20, paddingHorizontal: 10}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={[styles.content]}>
          <Text style={[styles.heading]}>Eligibility</Text>
          <View>
            <Image
              source={images.eligibilityImage}
              style={{
                width: '100%',
                height: 250,
                resizeMode: 'contain',
                marginTop: 30,
              }}
            />
          </View>
          <View style={[styles.textContent]}>
            <Text style={[styles.redText]}>To Be Eligible, You Must</Text>
            <View style={[styles.listText]}>
              {[
                'Earn a minimum monthly income of ₦80,000',
                'Have received salary for at least 3 months',
                'Have no bad loans and a clean credit history',
                'Be above 21 years of age',
              ].map((text, index) => (
                <View style={[styles.list]} key={index}>
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 5,
                      backgroundColor: COLORS.primary,
                      marginRight: 10,
                      marginTop: 2,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: COLORS.primary,
                      lineHeight: 20,
                    }}>
                    {text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.btnContainer]}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: COLORS.white}]}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={[styles.btnText]}>Not Interested </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: COLORS.secondary}]}
          onPress={() => {
            navigation.navigate('AddressVerificationPayment');
            // navigation.navigate('PostPaymentForm3');
            // navigation.navigate('RentalLoanForm3');
            // navigation.navigate('UploadBankStatement');
            // navigation.navigate('RentalLoanFormBankStatementUploadMono');
            // navigation.navigate('RentalLoanFormBankStatementUpload');
            // navigation.navigate('RentalLoanFormCongratulation');
            // navigation.navigate('RentalLoanRequestDashBoard');
            //  handleProceedClick();
          }}>
          <Text style={[styles.btnText, {color: COLORS.white}]}>Proceed </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
    backgroundColor: '#F7F8FD',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  textContent: {
    // alignItems: 'center',
    marginTop: 10,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingBottom: 40,
    // paddingLeft: 10,
    borderRadius: 5,
  },
  redText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'red',
    opacity: 0.5,
    alignItems: 'center',
    textAlign: 'center',
  },
  listText: {
    marginTop: 20,
    paddingLeft: 20,
    // borderWidth: 1,
  },

  list: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 20,
    // marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F7F8FD',
  },

  btn: {
    width: '49%',
    paddingVertical: 20,
    // backgroundColor: COLORS.secondary,
    alignItems: 'center',
    borderRadius: 10,
  },

  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 10,
  },
});
