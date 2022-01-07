import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {COLORS} from '../../util';
import {formatNumber} from '../../util/numberFormatter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnimatedGaugeProgress} from 'react-native-simple-gauge';

export default function CreditScore({navigation}) {
  const [spinner, setSpinner] = useState(false);
  const scoreMark = 80;

  return (
    <>
      <StatusBar backgroundColor={'#10131B'} />
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderBottomColor: '#2b273550',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="chevron-back"
            color={COLORS.white}
            size={20}
            onPress={() => navigation.navigate('Home')}
          />
          <Text
            style={{
              color: COLORS.white,
              // textTransform: 'uppercase',
              // fontWeight: 'bold',
              fontSize: 14,
            }}>
            Your Credit Scrore
          </Text>
          <Icon name="ellipsis-vertical" color={COLORS.white} size={20} />
        </View>

        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              flexDirection: 'row',
              alignItems: 'baseline',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#2b2735'}}>
              100
            </Text>
            <AnimatedGaugeProgress
              size={230}
              width={20}
              fill={scoreMark}
              rotation={90}
              cropDegree={90}
              tintColor={
                scoreMark < 50
                  ? COLORS.red
                  : scoreMark < 70 && scoreMark >= 50
                  ? COLORS.light
                  : COLORS.secondary //'#55588d'
              }
              delay={0}
              backgroundColor="#2b2835"
              stroke={[10, 20]} //For a equaly dashed line
              // strokeCap="circle"
            />
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#2b2735'}}>
              900
            </Text>
          </View>
          <View style={{position: 'absolute', alignItems: 'center'}}>
            <Text style={{fontSize: 35, fontWeight: 'bold', color: '#87cec8'}}>
              820
            </Text>
            <Text style={{fontSize: 12, color: '#2b2735', marginTop: -5}}>
              Credit Score
            </Text>
            {scoreMark < 50 ? (
              <Text style={[styles.status, {backgroundColor: COLORS.red}]}>
                Poor
              </Text>
            ) : scoreMark < 70 && scoreMark >= 50 ? (
              <Text style={[styles.status, {backgroundColor: COLORS.light}]}>
                Good
              </Text>
            ) : (
              <Text style={[styles.status, {backgroundColor: '#2b2735'}]}>
                Excellent
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    backgroundColor: '#10131B',
    flex: 1,
  },

  status: {
    fontWeight: 'bold',
    color: COLORS.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10,
    elevation: 5,
  },
});
