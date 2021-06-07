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
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NumberFormat from '../../components/NumberFormat';

const RentalLoanFormDoc = ({navigation}) => {
  const [salaryAmount, setSalaryAmount] = useState('');

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
              value={salaryAmount}
              onChangeText={(text) => setSalaryAmount(text)}
            />

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
                <Text style={{fontWeight: 'bold', fontSize: 12}}>--</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                }}>
                <Text>Monthly payment:</Text>
                <Text style={{fontWeight: 'bold', fontSize: 12}}>--</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                }}>
                <Text>Tenor</Text>
                <Text style={{fontWeight: 'bold', fontSize: 12}}>--</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('RentalLoanForm2')}
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
    </View>
  );
};

export default RentalLoanFormDoc;
