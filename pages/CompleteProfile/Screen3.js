import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import designs from './style';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Screen3({navigation}) {
  const top = useSafeAreaInsets().top;
  const [selectedValue, setSelectedValue] = useState('employed');
  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD', marginTop: Platform.OS == 'ios' ? top : 0}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View
          style={{
            marginTop: 25,
            paddingHorizontal: 10,
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
            Provide next of kin details
          </Text>
          <TextInput
            style={designs.textField}
            placeholder="Full name"
            placeholderTextColor="#BFBFBF"
          />
          <TextInput
            style={designs.textField}
            placeholder="Relationship"
            placeholderTextColor="#BFBFBF"
          />
          <TextInput
            style={designs.textField}
            placeholder="Email"
            placeholderTextColor="#BFBFBF"
          />

          <TouchableOpacity
            // onPress={handleSubmit}
            onPress={() => navigation.navigate('CompleteProfile5')}
            style={[designs.btn, {backgroundColor: '#00DC99'}]}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 30,
              }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
