import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  ScrollView,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {COLORS, images} from '../../../util/index';

const Screen6 = (props) => {
  const {navigation, route} = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [locked, setLocked] = useState(false);

  const toggleSwitch = () => setLocked((previousState) => !previousState);

  useEffect(() => {
    console.log('Props Data: ', route.params);
  }, []);

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
            <Image
              style={{width: 61, height: 66}}
              source={images.maskGroup14}
            />
          </View>

          <View style={[styles.flexRow]}>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>Number of Buddies</Text>
              <Text style={designs.value}>4</Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Target Amount</Text>
              <Text style={designs.value}>₦2,500,000</Text>
            </View>
          </View>

          <View style={[styles.flexRow]}>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>Frequency</Text>
              <Text style={designs.value}>Monthly</Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Start Date</Text>
              <Text style={designs.value}>Dec 22, 2020</Text>
            </View>
          </View>

          <View style={[styles.flexRow]}>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>End Date</Text>
              <Text style={designs.value}>Dec 22, 2021</Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Interest Rate</Text>
              <Text style={designs.value}>{locked ? '4.5' : '2.5'} P.A</Text>
            </View>
          </View>

          <View style={[styles.flexRow]}>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>Your Target</Text>
              <Text style={designs.value}>₦465,000</Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Amount To Save Monthly</Text>
              <Text style={designs.value}>₦2,500,000</Text>
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
              thumbColor={locked ? '#00DC99' : '#ADADAD'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={locked}
            />
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
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
        {/* <View
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
        </View> */}

        <View style={{marginTop: 50}}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('BuddySaving6')}
            style={[
              designs.button,
              {
                // backgroundColor: COLORS.white,
                backgroundColor: 'transparent',
                borderColor: '#BFBFBF50',
                borderWidth: 1,
              },
            ]}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 12,
                lineHeight: 30,
                color: COLORS.grey,
              }}>
              EDIT PREFERENCES
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('BuddySavingDashBoard')}
            style={[designs.button]}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 12,
                lineHeight: 30,
              }}>
              JOIN SAVINGS
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default Screen6;

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
});
