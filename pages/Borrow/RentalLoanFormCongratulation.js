import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import designs from './style';
import {COLORS, images} from '../../util/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {numberWithCommas} from '../../util/numberFormatter';
import RnplStepProgress from '../screens/rnpl/RnplStepProgress';

export default function RentalLoanFormCongratulation({navigation}) {
  const [requestAmount, setRequestAmount] = useState('');
  useEffect(() => {
    (async () => {
      const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
      const data = JSON.parse(loanFormData);
      setRequestAmount(data.loanable_amount);
    })();
  }, []);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const handleNavigation = async () => {
    const user = await getUser();

    const rentalSteps = await AsyncStorage.getItem(`rentalSteps-${user.id}`);
    const steps = JSON.parse(rentalSteps);

    let stepsData = {
      application_form: 'done',
      congratulation: 'done',
      all_documents: '',
      verifying_documents: '',
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

    navigation.navigate('NewAllDocuments');
  };

  return (
    <RnplStepProgress>
      <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
        <ScrollView
          contentContainerStyle={{flex: 1, paddingVertical: 20}}
          showsVerticalScrollIndicator={false}
          scrollEnabled>
          <View style={{flex: 1, paddingHorizontal: 20, marginBottom: 100}}>
            <View style={[styles.card]}>
              <Image
                source={images.congratulation}
                style={{
                  width: '100%',
                  height: 100,
                  resizeMode: 'contain',
                }}
              />

              <View
                style={{
                  padding: 20,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  Congratulations
                </Text>
                <Text style={[styles.text, {marginTop: 10}]}>
                  Your rent payment request of{' '}
                  <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                    ₦{numberWithCommas(requestAmount || 0)}
                  </Text>{' '}
                  has {'\n'} been pre-approved
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#EBEFDB',
                  marginVertical: 30,
                }}
              />

              <View
                style={{
                  paddingHorizontal: 20,
                  flex: 1,
                }}>
                <Text style={[styles.text]}>
                 Upload your documents to get your rent paid faster. If you
                  don't have all the documents now, no problem, just upload your
                  latest 6 months bank statement at least to proceed.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.btnContainer]}>
          <TouchableOpacity
            onPress={handleNavigation}
            style={[
              designs.button,
              {backgroundColor: COLORS.secondary, marginBottom: 0},
            ]}>
            <Text
              style={[
                designs.buttonText,
                {
                  color: COLORS.white,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 12,
                },
              ]}>
              UPLOAD DOCUMENTS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RnplStepProgress>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 30,
  },

  text: {
    fontSize: 14,
    fontWeight: '200',
    // fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    color: COLORS.primary,
    lineHeight: 25,
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F7F8FD',
  },
});
