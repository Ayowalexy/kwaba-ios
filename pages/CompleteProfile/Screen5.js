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
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import Modal from '../../components/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logCurrentStorage } from '../../util/logCurrentStorage';
import moment from 'moment';



const Screen5 = ({navigation}) => {
  const [lastRentAmount, setLastRentAmount]= useState("");
  const [date, setDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('Landlord');
  const [showDate, setShowDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const isError = () => {
    if (
      (lastRentAmount.trim().length == 0 ||
        selectedValue.trim().length == 0)) {
      return true;
    } else {
      return false;
    }
  };

  const dateFormatted = moment(date).format(
    'YYYY-MM-D',
  );

  console.log(dateFormatted);

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleNavigation = async () => {
    const data = {
    last_rent_amount: lastRentAmount,
    next_rent_due: dateFormatted
    };
    if (isError()) {
      return Alert.alert('Missing inputs', 'Please Fill out all fields', [
        {text: 'Close'},
      ]);
    }
    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    await AsyncStorage.setItem('rentalLoanForm', JSON.stringify({...JSON.parse(loanFormData), ...data}));
    logCurrentStorage();
    setModalVisible(true);
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
        style={{marginTop: 28, marginLeft: 16, fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView scrollEnabled={true} style={{height: '100%'}} >
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
            Provide your rent details
          </Text>
          <TextInput
            style={designs.textField}
            placeholder="How much is your rent?"
            placeholderTextColor="#BFBFBF"
            value={lastRentAmount}
            onChangeText={(text) => setLastRentAmount(text)}
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
            When is your next rent due?
          </Text>
          <View style={designs.customInput}>
            <TextInput
              style={{flex: 1}}
              placeholder="When is your next rent due?"
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
              placeholderText="When is your next rent due?"
            />
          )}
          {/* <View style={designs.customInput}>
            <Picker
              mode="dropdown"
              dropdownIconColor="white"
              accessibilityLabel="Who do you pay your rent to?"
              style={{flex: 1}}
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Landlord" value="Landlord" />
              <Picker.Item label="Agent" value="Agent" />
            </Picker>
            <TouchableOpacity style={designs.iconBtn}>
              <Icon name="chevron-down-outline" size={20} color="#BFBFBF" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={designs.textField}
            placeholder="How long have you lived at your address?"
            placeholderTextColor="#BFBFBF"
          /> */}
        <View style={{flex: 1, justifyContent: 'flex-end'}}> 
          <TouchableOpacity
            onPress={handleNavigation}
            disabled={isError()}
            style={[designs.btn, {backgroundColor: '#00DC99'}]}>
            <Text style={{color: 'white'}}>COMPLETE</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        onRequestClose={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onSave={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default Screen5;
