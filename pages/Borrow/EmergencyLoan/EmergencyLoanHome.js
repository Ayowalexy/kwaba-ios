import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Tooltip from 'rn-tooltip';
import {useDispatch, useSelector} from 'react-redux';
import {getTotalSoloSavings} from '../../../redux/actions/savingsActions';
import {currencyFormat} from '../../../util/numberFormatter';
import {COLORS, FONTS, images} from '../../../util/index';
import designs from './style';

export default function EmergencyLoanHome({navigation}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const [savings, setSavings] = useState(0);
  const [maximumLoanAmount, setMaximumLoanAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState('');
  const [repaymentAmount, setRepaymentAmount] = useState(0);

  useEffect(() => {
    dispatch(getTotalSoloSavings());
  }, []);

  useEffect(() => {
    const totalSoloSavings =
      store.data.length > 0
        ? store.data.reduce((acc, saving) => acc + Number(saving.amount), 0)
        : 0;
    setSavings(totalSoloSavings);
    const maxLoanAmount = 0.4 * Number(totalSoloSavings);
    setMaximumLoanAmount(maxLoanAmount);
  }, []);

  const calculateRepayment = (amount) => {
    const interestRate = 0.02;
    const repayment = Number(amount) + Number(amount) * interestRate;
    return repayment;
  };

  const handleNavigation = () => {
    if (loanAmount == '') {
      return Alert.alert('', 'Please set a loan amount');
    } else if (loanAmount > maximumLoanAmount) {
      return Alert.alert(
        'Invalid Loan Amount',
        'Set a loan amount less than or equal to your maximum loan amount',
      );
    } else
      navigation.navigate('EmergencyLoanRequest', {
        loan_amount: loanAmount,
        repayment_amount: repaymentAmount,
      });
  };

  return (
    <View
      style={[
        designs.container,
        {
          backgroundColor: '#F7F8FD',
          paddingTop: 28,
          paddingHorizontal: 16,
          paddingBottom: 24,
        },
      ]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color={COLORS.primary}
      />

      <View style={{width: '100%', marginLeft: 25, marginBottom: 20}}></View>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{textAlign: 'left'}}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {color: COLORS.primary, fontWeight: 'bold'},
            ]}>
            {/* Instant Loan */}
            Emergency Fund
          </Text>
          <Text
            style={[FONTS.body1FontStyling, {color: '#ADADAD', marginTop: 6}]}>
            Based on your savings activities below the{'\n'}loan amount you can
            get again you savings
          </Text>
        </View>
        <View style={designs.rlDisplay}>
          <View style={designs.displayCard}>
            <View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{fontSize: 12, color: COLORS.white, lineHeight: 15}}>
                  You have saved
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 23,
                  color: COLORS.white,
                  lineHeight: 29,
                  fontWeight: 'bold',
                }}>
                ₦{currencyFormat(savings)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="lock-closed"
                size={15}
                style={{fontWeight: '900'}}
                color="yellow"
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 8,
              paddingBottom: 11,
              borderBottomWidth: 1,
              borderColor: '#EAEAEA',
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 12,
                  lineHeight: 15,
                  marginBottom: 1,
                }}>
                Maximum Loan Amount
              </Text>
              <Tooltip
                backgroundColor="#00DC99"
                height={42.45}
                withOverlay={false}
                containerStyle={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}
                popover={
                  <Text
                    style={{fontSize: 10, color: 'white', textAlign: 'left'}}>
                    This is the most amount{'\n'}you can get against your
                    {'\n'}savings
                  </Text>
                }>
                <Icon
                  name="information-circle"
                  size={15}
                  style={{
                    fontWeight: '900',
                    marginLeft: 4,
                    height: 15.32,
                    width: 15.32,
                  }}
                  color="#00DC99"
                />
              </Tooltip>
            </View>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 23,
                lineHeight: 29,
                fontWeight: 'bold',
              }}>
              ₦{currencyFormat(maximumLoanAmount)}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 16,
                lineHeight: 20,
                marginTop: 20,
              }}>
              How much do you want?
            </Text>
            <TextInput
              style={[
                designs.textField,
                {
                  marginTop: 8,
                  textAlign: 'left',
                  marginBottom: 0,
                },
              ]}
              placeholder="Amount"
              keyboardType="number-pad"
              placeholderTextColor="#BFBFBF"
              value={loanAmount}
              onChangeText={(text) => {
                setLoanAmount(text);
                setRepaymentAmount(calculateRepayment(text));
              }}
            />
          </View>
        </View>
        <View style={designs.repaymentTermsBox}>
          <Text
            style={{
              color: '#FB8B24',
              fontSize: 18,
              lineHeight: 23,
              marginBottom: 11,
              fontWeight: 'bold',
            }}>
            Repayment Terms
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={designs.repaymentTermsContent}>
              <Text style={designs.smallTextTitles}>Repayment Days</Text>
              <Text style={designs.repaymentTermsValues}>30 days</Text>
            </View>
            <View style={designs.repaymentTermsContent}>
              <Text style={designs.smallTextTitles}>Repayment Amount</Text>
              <Text style={designs.repaymentTermsValues}>
                ₦{currencyFormat(repaymentAmount)}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[
            designs.buttonStyleB,
            {backgroundColor: '#00DC99', width: '100%'},
          ]}
          onPress={handleNavigation}>
          <Text style={{color: COLORS.white}}>ACCESS LOAN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
