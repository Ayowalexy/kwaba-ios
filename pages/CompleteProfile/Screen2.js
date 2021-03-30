import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const Screen2 = ({navigation}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [bvn, setBVN] = useState('');
  const [country, setCountry] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const isError = () => {
    if (
      bvn.trim().length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const dateFormatted = moment(date).format(
    'YYYY-MM-DD',
  );

  const handleNavigation = async () => {
    const data = {
    bvn,
    dob: dateFormatted
    };
    if (isError()) {
      return Alert.alert('Missing inputs', 'Please Fill out all fields', [
        {text: 'Close'},
      ]);
    }
    await AsyncStorage.setItem('rentalLoanForm', JSON.stringify(data));
    navigation.navigate('CompleteProfile5')

    // try {
    //   dispatch(soloSaving(data));

    //   return navigation.navigate('SoloSaving2');
    // } catch (error) {}
  };

  const onSelect = (country) => {
    setCountry(country.name);
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={35}
        style={{marginTop: 28, marginLeft: 16, fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View
          style={{
            marginTop: 25,
            marginBottom: 49,
            marginLeft: 16,
            marginRight: 16,
          }}>
          <Text
            style={[
              designs.heading,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontSize: 25,
                lineHeight: 32,
              },
            ]}>
            Complete your profile
          </Text>
          <Text
            style={[
              designs.body,
              {
                color: '#465969',
                textAlign: 'left',
                fontSize: 15,
                lineHeight: 19,
              },
            ]}>
            Provide your personal details
          </Text>
          <Text
            style={[
              designs.heading,
              {
                fontSize: 15,
                color: '#2A286A',
                textAlign: 'left',
                lineHeight: 19,
                marginTop: 29,
              },
            ]}>
            Bank Verification Number 
          </Text>
          <TextInput
            style={designs.textField}
            placeholder="BVN"
            placeholderTextColor="#BFBFBF"
            value={bvn}
            onChangeText={(text) => setBVN(text)}
          />
          <Text
            style={[
              designs.heading,
              {
                fontSize: 15,
                color: '#2A286A',
                textAlign: 'left',
                lineHeight: 19,
                marginTop: 29,
              },
            ]}>
            Date of Birth
          </Text>
          <View style={designs.customInput}>
            <TextInput
              style={{flex: 1}}
              placeholder="Date of Birth"
              placeholderTextColor="#BFBFBF"
              value={date.toLocaleDateString()}
            />
            <TouchableOpacity
              onPress={() => setShowDate(true)}
              style={designs.iconBtn}>
              <Image
                style={{width: 20, height: 20}}
                source={icons.dateTimePicker}
              />
            </TouchableOpacity>
          </View>
          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              onChange={handleDateSelect}
              mode="date"
              is24Hour={true}
              display="default"
            />
          )}
          {/* <Text
            style={[
              designs.heading,
              {
                fontSize: 15,
                color: '#2A286A',
                textAlign: 'left',
                lineHeight: 19,
                marginTop: 29,
              },
            ]}>
            Address
          </Text>
          <TextInput
            style={designs.textField}
            placeholder="Street"
            placeholderTextColor="#BFBFBF"
          />
          <TextInput
            style={designs.textField}
            placeholder="City"
            placeholderTextColor="#BFBFBF"
          />
          <TextInput
            style={designs.textField}
            placeholder="State"
            placeholderTextColor="#BFBFBF"
          />
          <View style={designs.customInput}>
            <TextInput
              style={{flex: 1}}
              placeholder="Country"
              placeholderTextColor="#BFBFBF"
              value={country}
            />
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={designs.iconBtn}>
              <Icon name="chevron-down-outline" size={20} color="#BFBFBF" />
            </TouchableOpacity>
          </View>
          <CountrySelect
            onSelect={onSelect}
            onOpen={() => setVisible(true)}
            onClose={() => setVisible(false)}
            visible={visible}
          /> */}
          <TouchableOpacity
            onPress={handleNavigation}
            disabled={isError()}
            style={[designs.btn, {backgroundColor: '#00DC99'}]}>
            <Text style={{color: 'white'}}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Screen2;
