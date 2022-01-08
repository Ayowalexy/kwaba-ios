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

export default function CreditScoreDashboard({navigation}) {
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
            onPress={() => navigation.goBack()}
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
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#2b2735',
                paddingBottom: 50,
              }}>
              300
            </Text>
            <AnimatedGaugeProgress
              size={200}
              width={15}
              fill={scoreMark}
              rotation={90}
              cropDegree={180}
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
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#2b2735',
                paddingBottom: 50,
              }}>
              850
            </Text>
          </View>
          <View style={{position: 'absolute', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#87cec8'}}>
              800
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#2b2735',
                color: '#87cec870',
                marginTop: -5,
                paddingBottom: 5,
                lineHeight: 20,
              }}>
              Credit Score!
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

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -10,
            paddingBottom: 30,
          }}>
          <Text style={{fontSize: 12, color: '#2b2735'}}>
            updated 2 months ago
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <View
                style={[
                  styles.button,
                  {
                    marginTop: 8,
                    paddingVertical: 5,
                    paddingHorizontal: 30,
                    borderRadius: 20,
                  },
                ]}>
                <Icon
                  name="ios-shuffle-sharp"
                  color={'#536470'}
                  size={25}
                  style={{marginTop: 2, marginRight: 10}}
                />
                <Text style={styles.buttonText}>Refresh Score</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.infoContent]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.infoContent_title]}>Your credit score is</Text>
            <View style={[styles.band]}>
              <Text style={[styles.bandText]}>excellent</Text>
            </View>
          </View>
          <Text style={[styles.infoContent_body]}>
            It seems you have not taken a loan from a financial institution
            before or we just can't find any record of your credit history.
            However you can proceed to apply for rent finance.
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreditScoreDashboard')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Apply now</Text>
                <Icon
                  name="chevron-forward"
                  color={'#536470'}
                  size={14}
                  style={{marginTop: 2, marginLeft: 20}}
                />
              </View>
            </TouchableOpacity>
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
    // paddingHorizontal: 20,
  },

  status: {
    fontWeight: 'bold',
    color: COLORS.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    // marginTop: 5,
    // elevation: 5,
  },

  infoContent: {
    backgroundColor: '#151922',
    // elevation: 5,
    padding: 40,
    // marginTop: -20,
    flex: 1,
    // borderTopRightRadius: 50,
    // borderTopLeftRadius: 50,
    // borderRightWidth: 30,
    // borderRightColor: '#131720',
    // borderLeftWidth: 30,
    // borderLeftColor: '#131720',
    // elevation: 100,
  },

  infoContent_title: {
    fontSize: 20,
    color: '#a5c2d1',
    fontWeight: 'bold',
  },
  infoContent_body: {
    fontSize: 14,
    marginTop: 20,
    lineHeight: 25,
    color: '#b2b3b680',
  },

  band: {
    backgroundColor: '#10131B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 20,
  },

  bandText: {
    fontSize: 12,
    color: '#a5c2d1',
    color: '#b2b3b650',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  button: {
    backgroundColor: '#212a33',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    color: '#536470',
    textTransform: 'capitalize',
  },
});
