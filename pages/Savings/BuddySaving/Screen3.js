import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../../util';

export default function Screen3({navigation}) {
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date(Date.now()));
  const [startOption, setStartOption] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showWithrawalDate, setShowWithdrawalDate] = useState(false);

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    setShowWithdrawalDate(true);
  };
  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={35}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <Text style={[designs.boldText, {marginTop: 35}]}>
        How long do you want to save for?
      </Text>
      <View style={designs.options}>
        <TouchableOpacity
          onPress={() => setDuration('3 Months')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            width: 120,
            height: 54,
            backgroundColor: duration == '3 Months' ? '#9D98EC' : 'white',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: duration == '3 Months' ? 'white' : '#465969',
              lineHeight: 19,
            }}>
            3 Months
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDuration('6 Months')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            width: 120,
            height: 54,
            backgroundColor: duration == '6 Months' ? '#9D98EC' : 'white',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: duration == '6 Months' ? 'white' : '#465969',
              lineHeight: 15,
            }}>
            6 Months
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDuration('1 Year')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            width: 120,
            height: 54,
            backgroundColor: duration == '1 Year' ? '#9D98EC' : 'white',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: duration == '1 Year' ? 'white' : '#465969',
              lineHeight: 15,
            }}>
            1 Year
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[designs.boldText, {marginTop: 26}]}>
        When do you want to start saving?
      </Text>
      <View style={designs.options}>
        <TouchableOpacity
          onPress={() => setStartOption('today')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            width: 165,
            height: 54,
            backgroundColor: startOption == 'today' ? '#9D98EC' : 'white',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: startOption == 'today' ? 'white' : '#465969',
              lineHeight: 15,
            }}>
            Will start today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setStartOption('pick_date');
            setShowDate(true);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            width: 165,
            height: 54,
            backgroundColor: startOption == 'pick_date' ? '#9D98EC' : 'white',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: startOption == 'pick_date' ? 'white' : '#465969',
              lineHeight: 15,
            }}>
            Will pick a preferred date
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{alignSelf: 'flex-end', marginTop: 10, marginRight: 85}}>
        {new Date(date.toISOString()).toDateString().slice(4)}
      </Text>
      {showWithrawalDate && (
        <View style={{marginTop: 26}}>
          <Text style={designs.boldText}>Withdrawal date will be</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: 363,
              height: 54,
              borderRadius: 5,
              backgroundColor: '#2A286A',
            }}>
            <Image source={icons.calendarCheckYellow} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 18,
                color: 'white',
                marginLeft: 10,
              }}>
              {new Date(date.toISOString()).toDateString().slice(4)}
            </Text>
          </View>
        </View>
      )}
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
      <TouchableOpacity
        onPress={() => navigation.navigate('SoloSaving3')}
        style={[designs.button, {marginTop: 100}]}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 30,
          }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
