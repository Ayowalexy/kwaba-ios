import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {soloSaving} from '../../../redux/actions/savingsActions';
import moment from 'moment';

export default function Screen2({navigation}) {
  const dispatch = useDispatch();
  const savings = useSelector((state) => state.soloSavingReducer);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date(Date.now()));
  const [startOption, setStartOption] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [instantSaving, setInstantSaving] = useState(null);

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  console.log('Moment:', new Date().toISOString());

  const handleNavigation = () => {
    try {
      let chosenDuration =
        duration == '3 Months' ? '3M' : duration == '6 Months' ? '6M' : '1y';
      const data = {
        savings_tenure: duration,
        savings_start_date:
          startOption == 'today' ? moment().format() : moment(date).format(),
        savings_end_date: moment(date)
          .add(Number(chosenDuration[0]), chosenDuration[1])
          .format(),
        instant_saved_amount: instantSaving,
      };

      dispatch(soloSaving(data));
      navigation.navigate('SoloSaving3');
    } catch (error) {}
  };
  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
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
              width: '32%',
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
              width: '32%',
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
              width: '32%',
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
            onPress={() => {
              setStartOption('today');
              setDate(moment().format());
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: '49%',
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
              width: '49%',
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
        <Text
          style={{
            width: '100%',
            fontSize: 12,
            marginTop: 10,
            textAlign: 'right',
            paddingRight: 10,
            color: '#465969',
          }}>
          {startOption && new Date(date.toISOString()).toDateString().slice(4)}
        </Text>
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
        <Text style={[designs.boldText, {marginTop: 26}]}>
          How much do you want to save today?
        </Text>
        <TextInput
          placeholder="Amount"
          placeholderTextColor="#BFBFBF"
          style={designs.textInput}
          keyboardType="number-pad"
          value={instantSaving}
          onChangeText={(text) => setInstantSaving(text)}
        />
        <TouchableOpacity onPress={handleNavigation} style={[designs.button]}>
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
      </ScrollView>
    </View>
  );
}
