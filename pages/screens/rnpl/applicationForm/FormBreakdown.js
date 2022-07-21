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
import designs from './styles';
import {COLORS, FONTS, images} from '../../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NumberFormat from '../../../../components/NumberFormat';
import SelectMonthModal from '../../../../components/SelectMonthModal';
import {
  formatNumber,
  unFormatNumber,
  numberWithCommas,
} from '../../../../util/numberFormatter';
import { useDispatch } from 'react-redux';
import { setCurrentStage } from '../../../../redux/reducers/store/stageActions';
import RnplStepProgress from '../RnplStepProgress';

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

const FormBreakdown = ({navigation}) => {
  const [requestAmount, setRequestAmount] = useState('');
  const [showSelectMonthModal, setShowSelectMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [preApproveAmount, setPreApproveAmount] = useState('');
  const dispatch = useDispatch();
  const [requestAmountEmpty, setRequestAmountEmpty] = useState(false);
  // const

  useEffect(() => {
    async function fetchLoanFormData() {
      const loanFormData = await AsyncStorage.getItem('rentalLoanForm');

      let data = JSON.parse(loanFormData);
      // console.log(data);
      // setRequestAmount(data.request_amount.toString());
      // setSelectedMonth(data.selected_month);
      // await monthly_payment(data.request_amount, Number(data.selected_month));

      setRequestAmount(data.amount_needed_from_kwaba.toString());
      setSelectedMonth(data.repayment_plan);
      await monthly_payment(
        data.amount_needed_from_kwaba,
        Number(data.repayment_plan),
      );
    }

    // console.log('selectedMonth:', selectedMonth);

    fetchLoanFormData();
  }, []);

  const handleAccpet = async () => {
    const data = {
      loanable_amount: preApproveAmount,
      monthly_repayment: monthlyPayment,
      amount_needed_from_kwaba: Number(unFormatNumber(requestAmount)),
      repayment_plan: selectedMonth,
    };

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');

    await AsyncStorage.setItem(
      'rentalLoanForm',
      JSON.stringify({...JSON.parse(loanFormData), ...data}),
    );

    dispatch(setCurrentStage(stepsArray))

    // console.log('loanFormData:', loanFormData);

    // console.log('data:', preApproveAmount);

    if (data.amount_needed_from_kwaba <= 0) {
      console.log('False');
      setRequestAmountEmpty(true);
    } else {
      setRequestAmountEmpty(false);
      navigation.navigate('Form2');
    }

    // navigation.navigate('RentalLoanForm2');
  };

  const monthly_payment = async (amount, timetorepay) => {
    console.log('The value', amount, timetorepay);
    // console.log('Time to repay: ', timetorepay);
    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');

    let salaryBalance;
    let data = JSON.parse(loanFormData);
    console.log(data);
    const tenure = timetorepay;

    if (data.request_amount) {
      //salaryBalance = parseFloat(data.salary_amount) - parseFloat(data.request_amount);

      salaryBalance = parseFloat(data.salary_amount);
    } else {
      salaryBalance = parseFloat(data.salary_amount);
    }

    let max_pre_approved_amount;

    let max_repayment_amount = salaryBalance * 0.4 * tenure;

    // change 0.045 to 0.039
    // Initially 0.039 was 0.045

    let temp = 0.039 * tenure + 1;

    max_pre_approved_amount = max_repayment_amount / temp;

    let pre_approved_amount = 0;

    if (amount >= max_pre_approved_amount) {
      pre_approved_amount = max_pre_approved_amount;
    } else {
      pre_approved_amount = amount;
    }

    let monthly_repayment =
      0.039 * pre_approved_amount + pre_approved_amount / tenure;

    let non_refundable_deposit = 0;
    let temp3 = 0.05 * pre_approved_amount;
    if (temp3 >= 100000000) {
      non_refundable_deposit = 100000000;
    } else {
      non_refundable_deposit = temp3;
    }

    let loanable_amount = 0;

    loanable_amount = round5(pre_approved_amount);
    setPreApproveAmount(loanable_amount);

    monthly_repayment = Math.floor(monthly_repayment);
    setMonthlyPayment(monthly_repayment);

    non_refundable_deposit = Math.floor(non_refundable_deposit);

    // console.log(amount);
  };

  const roundUp = (n) => {
    return n > 1000 ? Math.round(n / 1000) * 1000 : n;
  };

  const round5 = (x) => {
    const round5No =
      x % 5 == 0
        ? Number(Math.floor(x / 5)) * 5
        : Number(Math.floor(x / 5)) * 5 + 5;
    return round5No > 1000 ? Math.round(round5No / 1000) * 1000 : round5No;
  };

  return (
    <RnplStepProgress page={2}>
      <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 10,
            }}>
            <View style={[designs.contentWrapper, {paddingBottom: 0}]}>
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
                    marginTop: 20,
                    fontSize: 14,
                  },
                ]}>
                Rent request amount
              </Text>
              <NumberFormat
                value={requestAmount}
                onChangeText={(text) => {
                  setRequestAmount(text);
                  monthly_payment(
                    unFormatNumber(text),
                    Number(selectedMonth[0]),
                  );
                }}
              />
              {requestAmountEmpty && (
                <Text style={{fontSize: 12, color: 'red', margin: 5}}>
                  Field required
                </Text>
              )}

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
                  // console.log(selectedMonth);
                }}>
                {selectedMonth != '' ? (
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }}>
                    {selectedMonth} {selectedMonth <= 1 ? 'Month' : 'Months'}
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
                    ₦{numberWithCommas(Number(preApproveAmount))}
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
                    ₦{numberWithCommas(Number(monthlyPayment))}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text>Duration</Text>
                  <Text style={{fontWeight: 'bold', fontSize: 12}}>
                    {selectedMonth} {selectedMonth <= 1 ? 'Month' : 'Months'}
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
          onClick={(value) => {
            setSelectedMonth(value);
            monthly_payment(unFormatNumber(requestAmount), Number(value));
          }}
          selectedMonth={selectedMonth}
        />
      </View>
    </RnplStepProgress>
  );
};

export default FormBreakdown;

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


const stepsArray = [
  {
    title: 'Credit score',
    subTitle: '',
    status: 'complete',
  },
  {
    title: 'Applications',
    subTitle: '',
    status: 'complete',
  },
  {
    title: 'Documents upload',
    subTitle: '',
    status: 'complete',
  },
  {
    title: 'Offer approval breakdown',
    subTitle: '',
    status: 'locked',
  },
  {
    title: 'Property details',
    subTitle: '',
    status: 'locked',
  }
];

