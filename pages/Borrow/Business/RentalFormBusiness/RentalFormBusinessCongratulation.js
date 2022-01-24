import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import designs from '../style';
import {COLORS, FONTS, images} from '../../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {numberWithCommas} from '../../../../util/numberFormatter';
import axios from 'axios';

export default function RentalFormBusinessCongratulation({navigation}) {
  const [requestAmount, setRequestAmount] = useState('');
  useEffect(() => {
    (async () => {
      const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
      // console.log('LOAN:');
      const data = JSON.parse(loanFormData);

      // console.log(data);

      setRequestAmount(data.loanable_amount);
    })();
  }, []);

  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.navigate('Borrow');
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

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

  const handleNavigation = async () => {
    // const user = await getUser();

    // const rentalSteps = await AsyncStorage.getItem(`rentalSteps-${user.id}`);
    // const steps = JSON.parse(rentalSteps);

    // let stepsData = {
    //   application_form: 'done',
    //   congratulation: 'done',
    //   all_documents: '',
    //   verifying_documents: '',
    //   offer_breakdown: '',
    //   property_detail: '',
    //   landlord_detail: '',
    //   referee_detail: '',
    //   offer_letter: '',
    //   address_verification: '',
    //   debitmandate: '',
    //   awaiting_disbursement: '',
    //   dashboard: '',
    // };

    // await AsyncStorage.setItem(
    //   `rentalSteps-${user.id}`,
    //   JSON.stringify(stepsData),
    // );

    navigation.navigate('BusinessDocumentUpload');
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.navigate('Borrow')}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />
      <ScrollView
        contentContainerStyle={{flex: 1}}
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
                // borderWidth: 2,
                // marginTop: 20,
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
                {/* <Text style={{color: COLORS.primary}}>₦500,000</Text> has {'\n'}{' '} */}
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
                // borderWidth: 1,
                flex: 1,
                // alignItems: 'center',
                // justifyContent: 'center',
              }}>
              <Text style={[styles.text]}>
                {/* To get your rent paid faster, upload your {'\n'} latest 6 months
                bank statement. */}
                {/* Upload your documents to get your rent paid faster. If you don't
                have all documents now, no problem, just upload your latest 6
                months bank statement at least to proceed. */}
                Upload your documents to get your rent paid faster. If you don't
                have all the documents now, no problem, just upload your latest
                6 months bank statement at least to proceed.
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
            {/* UPLOAD STATEMENT */}
            UPLOAD DOCUMENTS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    color: COLORS.dark,
    lineHeight: 25,
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
    // backgroundColor: 'red',
  },
});
