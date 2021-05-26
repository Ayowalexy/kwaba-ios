import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RentalLoanForm1 = ({navigation}) => {
  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [progress, setProgress] = useState(33);

  const isError = () => {
    if (
      salaryAmount.trim().length == 0 ||
      accommodationStatus.trim().length == 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleNavigation = async () => {
    const data = {
      accomodationstatus: accommodationStatus,
      salary_amount: salaryAmount,
    };

    // console.log(data);

    // await AsyncStorage.setItem('rentalLoanForm', JSON.stringify(data));
    // navigation.navigate('RentalLoanThirdPartyConnection')

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');

    await AsyncStorage.setItem(
      'rentalLoanForm',
      JSON.stringify({...JSON.parse(loanFormData), ...data}),
    );
    navigation.navigate('RentalLoanForm2');

    // try {
    //   dispatch(soloSaving(data));

    //   return navigation.navigate('SoloSaving2');
    // } catch (error) {}
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', padding: 15}}
        color={COLORS.primary}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#F7F8FD', paddingHorizontal: 15}}>
        <View
          style={{
            // marginVertical: 11,
            // marginHorizontal: 16,
            // borderWidth: 1,
            justifyContent: 'flex-end',
          }}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 20,
              },
            ]}>
            Salary Earner Loan
          </Text>
          <View style={designs.contentWrapper}>
            <View style={designs.formHeader}>
              <Text
                style={[
                  FONTS.h3FontStyling,
                  {
                    color: COLORS.primary,
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: 16,
                  },
                ]}>
                Personal information
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 15,
                    color: '#ADADAD',
                    marginRight: 15,
                  }}>
                  1 of 3
                </Text>
                <AnimatedCircularProgress
                  size={25}
                  width={5}
                  fill={progress}
                  rotation={0}
                  tintColor={COLORS.secondary}
                  backgroundColor="#D6D6D6"
                />
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <Text
                style={[
                  FONTS.body1FontStyling,
                  {
                    color: COLORS.dark,
                    marginBottom: 8,
                    fontSize: 14,
                    fontWeight: 'bold',
                  },
                ]}>
                How much do you earn monthly?{' '}
              </Text>
              <TextInput
                style={[
                  designs.textField,
                  {marginBottom: 0, textAlign: 'left'},
                ]}
                placeholder="Amount"
                keyboardType="number-pad"
                placeholderTextColor={COLORS.grey}
                value={salaryAmount}
                onChangeText={(text) => setSalaryAmount(text)}
              />
            </View>
            <View style={{marginVertical: 10}}>
              <Text
                style={[
                  FONTS.body1FontStyling,
                  {
                    color: COLORS.dark,
                    marginBottom: 8,
                    fontSize: 14,
                    fontWeight: 'bold',
                  },
                ]}>
                What’s your accommodation status?{' '}
              </Text>
              <TouchableOpacity
                style={[
                  designs.buttonStyleA,
                  {
                    borderColor:
                      accommodationStatus == 'Looking to renew my rent'
                        ? COLORS.light
                        : '#EFEFEF',
                  },
                ]}
                onPress={() =>
                  setAccommodationStatus('Looking to renew my rent')
                }>
                <View>
                  <Text
                    style={[
                      designs.btnText,
                      {
                        color:
                          accommodationStatus == 'Looking to renew my rent'
                            ? COLORS.light
                            : COLORS.grey,
                        fontWeight:
                          accommodationStatus == 'Looking to renew my rent'
                            ? 'bold'
                            : '400',
                      },
                    ]}>
                    Looking to renew my rent
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  designs.buttonStyleA,
                  {
                    borderColor:
                      accommodationStatus == 'Want to pay for a new place'
                        ? COLORS.light
                        : '#EFEFEF',
                  },
                ]}
                onPress={() =>
                  setAccommodationStatus('Want to pay for a new place')
                }>
                <View>
                  <Text
                    style={[
                      designs.btnText,
                      {
                        color:
                          accommodationStatus == 'Want to pay for a new place'
                            ? COLORS.light
                            : COLORS.grey,
                        fontWeight:
                          accommodationStatus == 'Want to pay for a new place'
                            ? 'bold'
                            : '400',
                      },
                    ]}>
                    Want to pay for a new place
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  designs.buttonStyleA,
                  {
                    borderColor:
                      accommodationStatus == 'I’m still searching'
                        ? COLORS.light
                        : '#EFEFEF',
                  },
                ]}
                onPress={() => setAccommodationStatus('I’m still searching')}>
                <View>
                  <Text
                    style={[
                      designs.btnText,
                      {
                        color:
                          accommodationStatus == 'I’m still searching'
                            ? COLORS.light
                            : COLORS.grey,
                        fontWeight:
                          accommodationStatus == 'I’m still searching'
                            ? 'bold'
                            : '400',
                      },
                    ]}>
                    I’m still searching
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleNavigation}
            disabled={isError()}
            style={[
              designs.button,
              {backgroundColor: COLORS.secondary, opacity: isError() ? 0.7 : 1},
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
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RentalLoanForm1;
