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
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import Modal from '../../components/modal';

const Screen5 = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('Landlord');
  const [showDate, setShowDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
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
      <ScrollView scrollEnabled={true}>
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
            placeholder="Rent Amount"
            placeholderTextColor="#BFBFBF"
          />
          <View style={designs.customInput}>
            <TextInput
              style={{flex: 1}}
              placeholder="Next rent due date"
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
          <View style={designs.customInput}>
            <Picker
              mode="dropdown"
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
          />

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[designs.btn, {backgroundColor: '#00DC99', marginTop: 70}]}>
            <Text style={{color: 'white'}}>COMPLETE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        onRequestClose={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
      />
    </View>
  );
};

export default Screen5;
