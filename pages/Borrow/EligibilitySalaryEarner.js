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
import axios from 'axios';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export default function EligibilitySalaryEarner({navigation}) {
  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem('rentalLoanForm');
      console.log('HERE: ', await AsyncStorage.getItem('rentalLoanForm'));
    })();
  }, []);

  const handleProceedClick = async () => {
    // await AsyncStorage.removeItem('rentalSteps');

    const token = await getToken();

    const rentalSteps = await AsyncStorage.getItem('rentalSteps');
    const steps = JSON.parse(rentalSteps);

    console.log(steps);

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
      const applicationIDCallRes = await axios.get(
        'http://67.207.86.39:8000/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      // console.log(applicationIDCallRes.data.data.assigned_to);

      if (applicationIDCallRes.data.data.assigned_to == 'Kwaba') {
        navigation.navigate('AcceptanceLetterKwaba');
      } else {
        navigation.navigate('AcceptanceLetterAddosser');
      }
    } else if (steps.address_verification == '') {
      navigation.navigate('AddressVerification');
    } else if (steps.debitmandate == '') {
      navigation.navigate('DebitMandate');
    } else if (steps.awaiting_disbursement) {
      navigation.navigate('AwaitingDisbursement');
    }
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

    // console.log('steps here' + steps);
    // console.log(borrwSteps);

    // try {
    //   const applicationIDCallRes = await axios.get(
    //     'http://67.207.86.39:8000/api/v1/application/one',
    //     {
    //       headers: {'Content-Type': 'application/json', Authorization: token},
    //     },
    //   );
    //   let status = applicationIDCallRes.data.data.status;
    //   if (status == 1) {
    //     // application exists
    //     navigation.navigate('RentalLoanFormCongratulation');
    //   }else {

    //   }
    //   console.log(applicationIDCallRes.data);
    // } catch (error) {
    //   // error message
    //   console.log(error.response.data);
    // }

    // if (steps == null) {
    //   navigation.navigate('RentalLoanForm1');
    // } else if (steps.documentdone == '') {
    //   navigation.navigate('RentalLoanFormCongratulation');
    // } else if (steps.propertydetail == '') {
    //   navigation.navigate('PostPaymentForm1');
    // } else if (steps.landlorddetail == '') {
    //   navigation.navigate('PostPaymentForm2');
    // } else if (steps.refree == '') {
    //   navigation.navigate('PostPaymentForm3');
    // } else if (steps.offeraccepted == '') {
    //   navigation.navigate('RentalLoanOfferTest');
    // } else if (steps.addressverification == '') {
    //   navigation.navigate('AddressVerificationPayment');
    // } else if (steps.debitmandate == '') {
    //   navigation.navigate('OkraDebitMandate');
    // } else if (steps.awaitingdisbursment == '') {
    //   navigation.navigate('AwaitingDisbursement');
    // } else {
    //   navigation.navigate('RentalLoanForm1');
    // }
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
                height: 170,
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
            // navigation.navigate('AddressVerificationPayment');
            // navigation.navigate('PostPaymentForm3');
            // navigation.navigate('RentalLoanOfferTest');
            // navigation.navigate('RentalLoanForm3');
            // navigation.navigate('UploadBankStatement');
            // navigation.navigate('RentalLoanFormBankStatementUploadMono');
            // navigation.navigate('RentalLoanFormBankStatementUpload');
            // navigation.navigate('RentalLoanFormCongratulation');
            // navigation.navigate('LoanOfferContent');
            // navigation.navigate('NewAllDocuments');
            handleProceedClick();
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
