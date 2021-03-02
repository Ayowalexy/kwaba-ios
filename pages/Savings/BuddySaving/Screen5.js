import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Switch} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {images} from '../../../util/index';

const Screen5 = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const toggleSwitch = () => setIsLocked((previousState) => !previousState);

  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={35}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <Text style={[designs.boldText, {marginTop: 25}]}>
        Review your saving details
      </Text>
      <View style={designs.summaryBox}>
        <View style={designs.whiteBox}>
          <View style={{marginTop: 16}}>
            <Text
              style={{
                fontSize: 10,
                lineHeight: 15,
                fontWeight: '700',
                color: '#9D98EC',
                fontFamily: 'Circular Std',
              }}>
              BUDDY SAVING
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#2A286A',
                lineHeight: 23,
                fontFamily: 'Circular Std',
              }}>
              {new Date().getFullYear()} Rent
            </Text>
          </View>
          <Image style={{width: 61, height: 66}} source={images.maskGroup14} />
        </View>
        <View style={designs.data}>
          <View>
            <Text style={designs.key}>No. of Buddies</Text>
            <Text style={designs.value}>4</Text>
          </View>
          <View style={{marginLeft: 135}}>
            <Text style={designs.key}>Target Amount</Text>
            <Text style={designs.value}>₦2,500,000</Text>
          </View>
        </View>
        <View style={designs.data}>
          <View>
            <Text style={designs.key}>Frequency</Text>
            <Text style={designs.value}>Monthly</Text>
          </View>
          <View style={{marginLeft: 165}}>
            <Text style={designs.key}>Start Date</Text>
            <Text style={designs.value}>Dec 22, 2020</Text>
          </View>
        </View>
        <View style={designs.data}>
          <View>
            <Text style={designs.key}>End Date</Text>
            <Text style={designs.value}>Dec 22, 2021</Text>
          </View>
          <View style={{marginLeft: 125}}>
            <Text style={designs.key}>Interest Rate</Text>
            <Text style={designs.value}>2.5% P.A</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 33,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              lineHeight: 15,
              marginRight: 23,
            }}>
            Lock saving?
          </Text>
          <Switch
            trackColor={{false: 'white', true: 'white'}}
            thumbColor={isLocked ? '#00DC99' : '#ADADAD'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isLocked}
          />
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 326,
            height: 26,
            borderRadius: 13,
            backgroundColor: '#00000022',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 15,
          }}>
          <Text
            style={{
              color: '#FFE700',
              fontSize: 10,
              lineHeight: 13,
              fontWeight: 'bold',
              fontFamily: 'Circular Std',
            }}>
            You can’t withdraw your savings until the set maturity date
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 'auto',
          marginLeft: 'auto',
          marginTop: 10,
        }}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text
          style={{
            color: '#465969',
            fontSize: 12,
            lineHeight: 15,
            fontWeight: 'bold',
          }}>
          I agree to{' '}
          <Text style={{color: '#00DC99'}}>Terms and Conditions</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('BuddySaving6')}
        style={[designs.button, {marginTop: 15}]}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 30,
          }}>
          NEXT
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Screen5;
