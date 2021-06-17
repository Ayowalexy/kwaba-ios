import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NumberFormat from '../../components/NumberFormat';
import SelectMonthModal from '../../components/SelectMonthModal';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const RentalLoanFormDoc = ({navigation}) => {
  const [requestAmount, setRequestAmount] = useState('');
  const [showSelectMonthModal, setShowSelectMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  // const

  useEffect(() => {
    async function fetchLoanFormData() {
      const loanFormData = await AsyncStorage.getItem('rentalLoanForm');

      let data = JSON.parse(loanFormData);
      setRequestAmount(data.request_amount);
      setSelectedMonth(data.selected_month);
    }

    console.log('selectedMonth:', selectedMonth);

    fetchLoanFormData();
  }, []);

  const handleAccpet = async () => {
    const data = {
      request_amount: requestAmount,
      selected_month: selectedMonth,
    };

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');

    await AsyncStorage.setItem(
      'rentalLoanForm',
      JSON.stringify({...JSON.parse(loanFormData), ...data}),
    );

    navigation.navigate('RentalLoanForm2');
  };

  const monthly_payment = () => {
    let tenure = 6;

    let temp = 0.045 * tenure + 1;

    let max_pre_approved_amount;
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
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Text
            style={[
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 20,
              },
            ]}>
            Rent Now Pay Later
          </Text>

          <View
            style={[
              designs.contentWrapper,
              {borderWidth: 1, borderColor: COLORS.primary},
            ]}>
            <View style={designs.formHeader}>
              <Text
                style={[
                  {
                    color: COLORS.primary,
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: 16,
                  },
                ]}>
                Payment Breakdown
              </Text>
            </View>

            <Text
              style={[
                FONTS.body1FontStyling,
                {
                  color: COLORS.dark,
                  // marginBottom: 8,
                  marginTop: 20,
                  // fontWeight: 'bold',
                  fontSize: 14,
                },
              ]}>
              Rent request amount
            </Text>
            <NumberFormat
              value={requestAmount}
              onChangeText={(text) => setRequestAmount(text)}
            />

            <Text
              style={[
                FONTS.body1FontStyling,
                {
                  color: COLORS.dark,
                  marginTop: 8,
                  fontSize: 14,
                },
              ]}>
              Monthly payment plan
            </Text>

            <TouchableOpacity
              style={styles.customInput}
              onPress={() => {
                setShowSelectMonthModal(!showSelectMonthModal);
              }}>
              {selectedMonth != '' ? (
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {selectedMonth} month
                </Text>
              ) : (
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#BABABA',
                  }}>
                  Choose a month
                </Text>
              )}

              <Icon
                name="chevron-down-outline"
                size={20}
                style={{fontWeight: 'bold'}}
                color="#BABABA"
              />
            </TouchableOpacity>

            {/* <Text
              style={[
                FONTS.body1FontStyling,
                {
                  color: COLORS.dark,
                  // marginBottom: 8,
                  marginTop: 20,
                  // fontWeight: 'bold',
                  fontSize: 14,
                },
              ]}>
              Monthly payment plan
            </Text>
            <NumberFormat
              value={salaryAmount}
              onChangeText={(text) => setSalaryAmount(text)}
            /> */}

            <Text
              style={[
                FONTS.body1FontStyling,
                {
                  color: COLORS.dark,
                  marginBottom: 10,
                  marginTop: 30,
                  fontWeight: 'bold',
                  fontSize: 16,
                },
              ]}>
              Payment option
            </Text>

            <View
              style={{
                backgroundColor: '#EDECFC',
                padding: 20,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                }}>
                <Text>Pre-approved amount</Text>
                <Text style={{fontWeight: 'bold', fontSize: 12}}>
                  ₦{numberWithCommas(requestAmount)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                }}>
                <Text>Monthly payment:</Text>
                <Text style={{fontWeight: 'bold', fontSize: 12}}>
                  {/* ₦
                  {numberWithCommas(
                    Number(requestAmount) / Number(selectedMonth),
                  )} */}
                  --
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                }}>
                <Text>Tenor</Text>
                <Text style={{fontWeight: 'bold', fontSize: 12}}>
                  {selectedMonth} {selectedMonth <= 1 ? 'month' : 'months'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleAccpet}
              // disabled={isError()}
              style={[
                designs.button,
                {backgroundColor: COLORS.primary, marginTop: 20},
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
                ACCEPT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <SelectMonthModal
        onRequestClose={() => setShowSelectMonthModal(!showSelectMonthModal)}
        visible={showSelectMonthModal}
        // selectedMonth={selectedMonth}
        onClick={(value) => setSelectedMonth(value)}
      />
    </View>
  );
};

export default RentalLoanFormDoc;

const styles = StyleSheet.create({
  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});
