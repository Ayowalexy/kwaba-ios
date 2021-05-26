import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RentalLoanForm2 = ({navigation}) => {
  const [employersName, setEmployersName] = useState('');
  const [
    companyAddressNumberAndStreet,
    setCompanyAddressNumberAndStreet,
  ] = useState('');
  const [companyAddressCity, setCompanyAddressCity] = useState('');
  const [companyAddressState, setCompanyAddressState] = useState('');
  const [companyAddressCountry, setCompanyAddressCountry] = useState('');
  const [progress, setProgress] = useState(66);

  const isError = () => {
    if (
      employersName.trim().length == 0 ||
      companyAddressNumberAndStreet.trim().length == 0 ||
      companyAddressCity.trim().length == 0 ||
      companyAddressState.trim().length == 0 ||
      companyAddressCountry.trim().length == 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleNavigation = async () => {
    const data = {
      employer_name: employersName,
      employer_address: `${companyAddressNumberAndStreet} ${companyAddressCity} ${companyAddressState} ${companyAddressCountry} `,
    };
    if (isError()) {
      return Alert.alert('Missing inputs', 'Please Fill out all fields', [
        {text: 'Close'},
      ]);
    }
    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    await AsyncStorage.setItem(
      'rentalLoanForm',
      JSON.stringify({...JSON.parse(loanFormData), ...data}),
    );

    navigation.navigate('RentalLoanForm3');
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
      <ScrollView>
        <View
          style={{
            // marginVertical: 11,
            // marginHorizontal: 16,
            paddingHorizontal: 10,
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
            Rent Top-up
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
                Financial Details
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 15,
                    color: '#ADADAD',
                    marginRight: 15,
                  }}>
                  2 of 3
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
                {color: COLORS.dark, marginBottom: 8, fontSize: 14},
              ]}>
              What’s the name of the company you work for?{' '}
            </Text>
            <TextInput
              style={[designs.textField, {marginBottom: 17, textAlign: 'left'}]}
              placeholder="Employer's Name"
              placeholderTextColor={COLORS.grey}
              value={employersName}
              onChangeText={(text) => setEmployersName(text)}
            />

            <Text
              style={[
                FONTS.body1FontStyling,
                {color: COLORS.dark, marginBottom: 8, fontSize: 14},
              ]}>
              Address of the company?
            </Text>
            <TextInput
              style={[designs.textField, {marginBottom: 8, textAlign: 'left'}]}
              placeholder="Number and street name"
              placeholderTextColor={COLORS.grey}
              value={companyAddressNumberAndStreet}
              onChangeText={(text) => setCompanyAddressNumberAndStreet(text)}
            />

            <TextInput
              style={[designs.textField, {marginBottom: 8, textAlign: 'left'}]}
              placeholder="City"
              placeholderTextColor={COLORS.grey}
              value={companyAddressCity}
              onChangeText={(text) => setCompanyAddressCity(text)}
            />
            <TextInput
              style={[designs.textField, {marginBottom: 8, textAlign: 'left'}]}
              placeholder="State"
              placeholderTextColor={COLORS.grey}
              value={companyAddressState}
              onChangeText={(text) => setCompanyAddressState(text)}
            />
            <TextInput
              style={[designs.textField, {marginBottom: 0, textAlign: 'left'}]}
              placeholder="Country"
              placeholderTextColor={COLORS.grey}
              value={companyAddressCountry}
              onChangeText={(text) => setCompanyAddressCountry(text)}
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

export default RentalLoanForm2;
