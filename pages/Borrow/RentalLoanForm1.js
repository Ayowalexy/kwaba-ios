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

import NumberFormat from '../../components/NumberFormat';

const RentalLoanForm1 = ({navigation}) => {
  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [requestAmount, setRequestAmount] = useState('');
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
    // if (isError()) {
    //   return Alert.alert('Missing inputs', 'Please Fill out all fields', [
    //     {text: 'Close'},
    //   ]);
    // }

    // await AsyncStorage.setItem('rentalLoanForm', JSON.stringify(data));
    // navigation.navigate('RentalLoanThirdPartyConnection')

    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    await AsyncStorage.setItem(
      'rentalLoanForm',
      JSON.stringify({...JSON.parse(loanFormData), ...data}),
    );
    // navigation.navigate('RentalLoanThirdPartyConnection');

    navigation.navigate('RentalLoanFormDoc');
    // navigation.navigate('RentalLoanForm2');

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
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />
      <ScrollView>
        <View
          style={{
            // marginVertical: 11,
            // marginHorizontal: 16,
            paddingHorizontal: 10,
            // justifyContent: 'flex-end',
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
            Rent Now, Pay Later
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
                Payment Option
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
            <Text
              style={[
                FONTS.body1FontStyling,
                {
                  color: COLORS.dark,
                  marginBottom: 8,
                  // fontWeight: 'bold',
                  fontSize: 14,
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
                          : 'normal',
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
                          : 'normal',
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
                          : 'normal',
                    },
                  ]}>
                  I’m still searching
                </Text>
              </View>
            </TouchableOpacity>

            <Text
              style={[
                FONTS.body1FontStyling,
                {
                  color: COLORS.dark,
                  marginTop: 8,
                  fontSize: 14,
                },
              ]}>
              How much is your rent request amount?{' '}
            </Text>

            <NumberFormat
              value={salaryAmount}
              onChangeText={(text) => setSalaryAmount(text)}
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
              How much do you earn monthly?{' '}
            </Text>

            <NumberFormat
              value={requestAmount}
              onChangeText={(text) => setRequestAmount(text)}
            />
          </View>

          <TouchableOpacity
            onPress={handleNavigation}
            disabled={isError()}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
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
