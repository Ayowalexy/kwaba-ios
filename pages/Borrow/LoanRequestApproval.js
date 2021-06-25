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

const LoanRequestApproval = ({navigation}) => {
  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');

  const handleNavigation = () => {
    const data = {
      accommodationStatus: accommodationStatus,
      salaryAmount: salaryAmount,
    };
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
        style={{padding: 20, fontWeight: '900'}}
        color={COLORS.primary}
      />
      <View
        style={{
          // marginVertical: 11,
          // marginHorizontal: 16,
          paddingHorizontal: 20,
        }}>
        <Text
          style={[
            // FONTS.h1FontStyling,
            {
              color: COLORS.primary,
              textAlign: 'left',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 117,
            },
          ]}>
          Rent Now Pay Later
        </Text>
        <Image
          source={images.group3701}
          style={{
            width: 140,
            height: 140,
            marginBottom: 26,
            marginLeft: 'auto',
            marginRight: 'auto',
            resizeMode: 'contain',
          }}
        />
        <Text
          style={[
            // FONTS.h1FontStyling,
            {
              color: '#2A286A',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
            },
          ]}>
          Request is Approved
        </Text>
        <Text
          style={[
            // FONTS.body2FontStyling,
            {
              color: '#ADADAD',
              textAlign: 'center',
              paddingHorizontal: 28,
              marginBottom: 26,
            },
          ]}>
          Accept your offer to set up your rent payment.{' '}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('RentalLoanOffer')}
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
            VIEW OFFER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoanRequestApproval;
