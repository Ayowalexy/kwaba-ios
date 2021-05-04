import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Modal} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Screen2({navigation}) {
  const [modalVisible, setVisible] = useState(false);
  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <Text style={[designs.boldText, {marginTop: 35}]}>
        How much is your target?
      </Text>

      <TextInput
        placeholder="Target savings amount"
        keyboardType="number-pad"
        placeholderTextColor="#BFBFBF"
        style={designs.textInput}
      />
      <Text style={[designs.boldText, {marginTop: 34}]}>
        How many buddies are saving with you?
      </Text>

      <TextInput
        placeholder="Number of buddies"
        placeholderTextColor="#BFBFBF"
        keyboardType="number-pad"
        style={designs.textInput}
      />
      <Text style={[designs.boldText, {marginTop: 34}]}>
        Relationship with your buddy
      </Text>
      <View style={designs.customInput}>
        <TextInput
          style={{flex: 1}}
          placeholder="Who is your buddy to you?"
          placeholderTextColor="#BFBFBF"
        />
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={designs.iconBtn}>
          <Icon name="chevron-down-outline" size={20} color="#BFBFBF" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('BuddySaving3')}
        style={[designs.button, {marginTop: 40}]}>
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
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={designs.modal}>
          <View style={designs.successModal}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setVisible(false)}
              name="close-outline"
              size={30}
              color="#465969"
            />

            <Text style={designs.boldText}>Relationship with your buddy</Text>
            <View style={designs.customInput}>
              <Icon name="search" size={20} color="#BFBFBF" />
              <TextInput
                style={{flex: 1}}
                placeholder="Search"
                placeholderTextColor="#BFBFBF"
              />
            </View>
            <TouchableOpacity style={{marginTop: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 20,
                  color: '#465969',
                  fontFamily: 'Circular Std',
                }}>
                Spouse
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 20,
                  color: '#465969',
                  fontFamily: 'Circular Std',
                }}>
                Flatmates
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 20,
                  color: '#465969',
                  fontFamily: 'Circular Std',
                }}>
                Roommates
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 20,
                  color: '#465969',
                  fontFamily: 'Circular Std',
                }}>
                Family
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 20,
                  color: '#465969',
                  fontFamily: 'Circular Std',
                }}>
                Friends
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
