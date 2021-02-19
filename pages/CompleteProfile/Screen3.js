import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import designs from './style';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Screen3({navigation}) {
  const [selectedValue, setSelectedValue] = useState('employed');
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
            Provide your employment details
          </Text>
          <View style={designs.customInput}>
            <Picker
              mode="dropdown"
              accessibilityLabel="Employment Status"
              dropdownIconColor="white"
              style={{flex: 1}}
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="employed" value="employed" />
              <Picker.Item label="self-employed" value="self-employed" />
              <Picker.Item label="unemployed" value="unemployed" />
            </Picker>
            <TouchableOpacity style={designs.iconBtn}>
              <Icon name="chevron-down-outline" size={20} color="#BFBFBF" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={designs.textField}
            placeholder="Phone Number"
            placeholderTextColor="#BFBFBF"
          />
          <TextInput
            style={designs.textField}
            placeholder="Official work email"
            placeholderTextColor="#BFBFBF"
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
            Office Address
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
          <TextInput
            style={designs.textField}
            placeholder="Country"
            placeholderTextColor="#BFBFBF"
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('CompleteProfile4')}
            style={[designs.btn, {backgroundColor: '#00DC99'}]}>
            <Text style={{color: 'white'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
