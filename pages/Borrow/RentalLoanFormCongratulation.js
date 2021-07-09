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
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {numberWithCommas} from '../../util/numberFormatter';
import axios from 'axios';

export default function RentalLoanFormCongratulation({navigation}) {
  const [requestAmount, setRequestAmount] = useState('');
  useEffect(() => {
    (async () => {
      const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
      // console.log('LOAN:');
      const data = JSON.parse(loanFormData);

      // console.log(data);

      setRequestAmount(data.pre_approved_amount);
    })();
  }, []);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const handleNavigation = async () => {
    // const token = await getToken();
    // // console.log(token);
    // const application = await axios.get(
    //   'http://67.207.86.39:8000/api/v1/application/one',
    //   {
    //     headers: {'Content-Type': 'application/json', Authorization: token},
    //   },
    // );

    // console.log(application.data);

    // if (application.data.data.verified) {
    //   Alert.alert('Application approval');
    //   setTimeout(() => {
    //     navigation.navigate('RentalLoanFormBankStatementUpload');
    //   }, 1000);
    // } else {
    //   Alert.alert('Awating approval');
    //   // navigation.navigate('RentalLoanFormBankStatementUpload');
    // }

    // console.log(application.data.data.id);

    navigation.navigate('RentalLoanFormBankStatementUpload');
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={{paddingHorizontal: 20, marginBottom: 100}}>
          <View style={[styles.card]}>
            <Image
              source={images.congratulation}
              style={{
                width: '100%',
                height: 200,
                resizeMode: 'contain',
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
              <Text style={[styles.text]}>
                Your rent payment request of{' '}
                {/* <Text style={{color: COLORS.primary}}>₦500,000</Text> has {'\n'}{' '} */}
                <Text style={{color: COLORS.primary}}>
                  ₦{numberWithCommas(requestAmount)}
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

            <View>
              <Text style={[styles.text]}>
                To get your rent paid faster, upload your {'\n'} latest 6 months
                bank statement.
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
            UPLOAD STATEMENT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 30,
  },

  text: {
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 0,
    color: COLORS.dark,
    lineHeight: 20,
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
