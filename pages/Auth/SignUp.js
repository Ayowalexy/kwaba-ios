import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../../util/index';
import designs from './style';

export default function SignUp({navigation}) {
  const [gender, setGender] = useState('Female');
  return (
    <View
      style={[
        designs.container,
        {paddingRight: 32, paddingLeft: 32, paddingTop: 59},
      ]}>
      <ScrollView scrollEnabled={true}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={[designs.image, {marginTop: 0, marginLeft: 0}]}
            source={images.kwabaLogoWithName}
          />
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: '#00DC99',
              fontFamily: 'Circular Std',
              fontSize: 14,
              lineHeight: 30,
              fontWeight: 'bold',
              marginRight: 20,
            }}>
            Log in
          </Text>
        </View>

        <View>
          <Text
            style={[
              designs.heading,
              {
                marginLeft: 0,
                fontSize: 30,
                fontWeight: '700',
                fontFamily: 'CircularStd',
              },
            ]}>
            Let's set you up
          </Text>
          <TextInput
            style={designs.textField}
            placeholder="First Name"
            placeholderTextColor="#BFBFBF"
          />
          <TextInput
            style={designs.textField}
            placeholder="Last Name"
            placeholderTextColor="#BFBFBF"
          />
          <TextInput
            style={designs.textField}
            placeholder="Email"
            placeholderTextColor="#BFBFBF"
          />
          <View style={designs.customInput}>
            <TextInput
              style={{flex: 1}}
              placeholder="Password"
              placeholderTextColor="#BFBFBF"
            />
            <Icon name="eye-off-outline" color="#D6D6D6" size={20} />
          </View>

          <View style={designs.customInput}>
            <TextInput
              style={{flex: 1}}
              placeholder="Confirm Password"
              placeholderTextColor="#BFBFBF"
            />
            <Icon name="eye-off-outline" color="#D6D6D6" size={20} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginLeft: 16,
              marginRight: 16,
            }}>
            <TouchableOpacity
              onPress={() => setGender('Male')}
              style={[
                designs.btn,
                {
                  backgroundColor: gender == 'Male' ? '#9D98EC' : '#FFFFFF',
                  width: 172,
                },
              ]}>
              <Text style={{color: gender == 'Male' ? 'white' : '#465969'}}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('Female')}
              style={[
                designs.btn,
                {
                  backgroundColor: gender == 'Female' ? '#9D98EC' : '#FFFFFF',
                  width: 182,
                },
              ]}>
              <Text style={{color: gender == 'Female' ? 'white' : '#465969'}}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[
              designs.btn,
              {
                backgroundColor: '#00DC99',
                marginRight: 8,
                marginLeft: 8,
                marginBottom: 20,
              },
            ]}>
            <Text style={{color: 'white', fontSize: 14, lineHeight: 32}}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
