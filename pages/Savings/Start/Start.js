import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../../../util/index';
import designs from './style';

export default function Start({navigation}) {
  return (
    <View style={designs.container}>
      <ImageBackground style={designs.backgroundImg} source={images.group4585}>
        <View>
          <Text
            style={{
              fontFamily: 'CircularStd',
              fontSize: 25,
              fontWeight: 'bold',
              color: '#00DC99',
              marginTop: 50,
              lineHeight: 32,
            }}>
            Savings
          </Text>
          <Text
            style={{
              fontFamily: 'CircularStd',
              fontSize: 12,
              fontWeight: '600',
              color: 'white',
              marginTop: 4,
              lineHeight: 15,
            }}>
            Save towards your next rent with your{'\n'}flatmates, friends or
            family and earn interest{'\n'}on every deposit.
          </Text>
        </View>
        <View style={designs.scrollContainer}>
          <ScrollView scrollEnabled horizontal>
            <View style={designs.smallBox}>
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 9,
                  fontWeight: '600',
                  lineHeight: 11,
                  color: 'white',
                }}>
                Total Balance
              </Text>
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 17,
                  fontWeight: 'bold',
                  lineHeight: 22,
                  color: 'white',
                  marginTop: 4,
                }}>
                ₦0.00
              </Text>
            </View>
            <View style={designs.smallBox}>
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 9,
                  fontWeight: '600',
                  lineHeight: 11,
                  color: 'white',
                }}>
                Total Savings
              </Text>
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 17,
                  fontWeight: 'bold',
                  lineHeight: 22,
                  color: 'white',
                  marginTop: 4,
                }}>
                ₦0.00
              </Text>
            </View>
            <View style={designs.smallBox}>
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 9,
                  fontWeight: '600',
                  lineHeight: 11,
                  color: 'white',
                }}>
                Total Interest Earned
              </Text>
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 17,
                  fontWeight: 'bold',
                  lineHeight: 22,
                  color: 'white',
                  marginTop: 4,
                }}>
                ₦0.00
              </Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
      <View style={designs.card}>
        <View style={designs.cardFlex}>
          <View>
            <Text style={designs.cardHeader}>Solo{'\n'}Saving</Text>
            <Text style={designs.bodyText}>
              Save towards your next{'\n'}rent alone
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SoloSaving1')}
              style={[
                designs.cardFlex,
                {
                  marginTop: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 27,
                  borderRadius: 21,
                  backgroundColor: '#F7F8FD',
                  width: 131,
                },
              ]}>
              <Text
                style={[
                  designs.bodyText,
                  {
                    marginTop: 0,
                    fontSize: 16,
                    color: '#9D98EC',
                    fontWeight: '600',
                    marginRight: 8,
                  },
                ]}>
                Start saving
              </Text>
              <Icon name="arrow-forward" color="#9D98EC" size={15} />
            </TouchableOpacity>
          </View>
          <Image
            style={{width: 146, height: 146}}
            source={images.maskGroup15}
          />
        </View>
      </View>
      <View style={designs.card}>
        <View style={designs.cardFlex}>
          <View>
            <Text style={designs.cardHeader}>Buddy{'\n'}Saving</Text>
            <Text style={designs.bodyText}>
              Save towards your next rent with{'\n'}your flatmates or spouse
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('BuddySaving1')}
              style={[
                designs.cardFlex,
                {
                  marginTop: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 27,
                  borderRadius: 21,
                  backgroundColor: '#F7F8FD',
                  width: 131,
                },
              ]}>
              <Text
                style={[
                  designs.bodyText,
                  {
                    marginTop: 0,
                    fontSize: 16,
                    color: '#9D98EC',
                    fontWeight: '600',
                    marginRight: 8,
                  },
                ]}>
                Start saving
              </Text>
              <Icon name="arrow-forward" color="#9D98EC" size={15} />
            </TouchableOpacity>
          </View>
          <Image
            style={{width: 146, height: 146}}
            source={images.maskGroup14}
          />
        </View>
      </View>
    </View>
  );
}
