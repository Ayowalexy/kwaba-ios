import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import designs from './style';

export default function Screen1({navigation}) {
  const [activeOption, setActiveOption] = useState('');
  const [frequency, setFrequency] = useState('');
  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={35}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={designs.header}>
          <Text
            style={{
              color: '#00DC99',
              fontSize: 16,
              fontFamily: 'CircularStd',
              fontWeight: 'bold',
              lineHeight: 20,
            }}>
            Buddy Saving
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 10,
              fontFamily: 'CircularStd',
              fontWeight: '600',
              lineHeight: 13,
              marginTop: 1,
            }}>
            Save towards your next rent with your flatmates or spouse
          </Text>
        </View>

        <Text style={[designs.boldText, {marginTop: 20}]}>
          What's your savings title?
        </Text>
        <TextInput
          placeholder="Savings Title"
          placeholderTextColor="#BFBFBF"
          style={designs.textInput}
        />
        <Text style={[designs.boldText, {marginTop: 33}]}>
          How do you want to save?
        </Text>
        <View style={designs.options}>
          <TouchableOpacity
            onPress={() => setActiveOption('auto')}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: 13,
              borderRadius: 5,
              width: 182,
              height: 75,
              backgroundColor: activeOption == 'auto' ? '#9D98EC' : 'white',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: activeOption == 'auto' ? 'white' : '#465969',
                lineHeight: 19,
              }}>
              Automate savings
            </Text>
            <Text
              style={{
                color: activeOption == 'auto' ? 'white' : '#ADADAD',
                fontSize: 12,
                fontWeight: '600',
                lineHeight: 15,
                marginTop: 1,
              }}>
              I would like to be{'\n'}debited automatically
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveOption('manual')}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: 13,
              borderRadius: 5,
              width: 182,
              height: 75,
              backgroundColor: activeOption == 'manual' ? '#9D98EC' : 'white',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: activeOption == 'manual' ? 'white' : '#465969',
                lineHeight: 19,
              }}>
              Manual savings
            </Text>
            <Text
              style={{
                color: activeOption == 'manual' ? 'white' : '#ADADAD',
                fontSize: 12,
                fontWeight: '600',
                lineHeight: 15,
                marginTop: 1,
              }}>
              I would like to save when{'\n'}ever I want
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[designs.boldText, {marginTop: 18}]}>
          What is your saving frequency?
        </Text>
        <View style={designs.options}>
          <TouchableOpacity
            onPress={() => setFrequency('Daily')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: 120,
              height: 54,
              backgroundColor: frequency == 'Daily' ? '#9D98EC' : 'white',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: frequency == 'Daily' ? 'white' : '#465969',
                lineHeight: 19,
              }}>
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFrequency('Weekly')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: 120,
              height: 54,
              backgroundColor: frequency == 'Weekly' ? '#9D98EC' : 'white',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: frequency == 'Weekly' ? 'white' : '#465969',
                lineHeight: 19,
              }}>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFrequency('Monthly')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: 120,
              height: 54,
              backgroundColor: frequency == 'Monthly' ? '#9D98EC' : 'white',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: frequency == 'Monthly' ? 'white' : '#465969',
                lineHeight: 19,
              }}>
              Monthly
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('BuddySaving2')}
          style={designs.button}>
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
