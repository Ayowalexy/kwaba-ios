import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../util';

const {width, height} = Dimensions.get('screen');

const img = require('../../assets/images/high-five.png');
const snowflake = require('../../assets/images/snowflake.png');
const snow = require('../../assets/images/snow.png');

export default function JoinChallengeDashboard() {
  return (
    <View style={[styles.container]}>
      <Image
        source={snowflake}
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          right: 10,
          top: 50,
          opacity: 0.2,
          zIndex: 0
        }}
        resizeMode="contain"
      />
       <Image
        source={snow}
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          left: 0,
          bottom: 10,
          opacity: 0.2,
          zIndex: 0
        }}
        resizeMode="contain"
      />
      <Image
        source={snow}
        style={{
          width: 50,
          height: 50,
          position: 'absolute',
          right: 0,
          bottom: 10,
          opacity: 0.2,
          zIndex: 0
        }}
        resizeMode="contain"
      />
      <View style={[styles.heading]}>
        <Text style={[styles.headingTitle]}>Double December 25k Challenge</Text>
        <Text style={[styles.headingSub]}>
          Challenge other renters to save 25k in the month of December and get
          double interest for the month
        </Text>
      </View>

      <View style={{paddingVertical: 0}}>
          <Text style={{textAlign: 'center', color: COLORS.light}}>GOAL</Text>
      </View>

      <View style={[styles.card]}>
        <View style={{justifyContent: 'center', paddingRight: 20}}>
          <Image
            source={img}
            style={{
              width: 40,
              height: 40,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: COLORS.black}}>
            High-five!
          </Text>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 20,
              marginTop: 10,
              color: COLORS.black,
              opacity: 0.9,
            }}>
            You are doing just fine, keep up with the good work!
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 20,
          }}>
          <Text style={{fontSize: 30, color: COLORS.red, fontWeight: 'bold'}}>
            25k.
          </Text>
        </View>
      </View>

      <View style={{paddingVertical: 20}}>
          <Text style={{textAlign: 'center', color: COLORS.light}}>PROGRESS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#5A4CB1',
  },

  heading: {
    paddingVertical: 20,
    paddingLeft: 5,
    width: width / 1.5,
  },

  headingTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.white,
    lineHeight: 35,
  },

  headingSub: {
    fontSize: 13,
    // fontWeight: 'normal',
    color: COLORS.white,
    lineHeight: 25,
    opacity: 0.9,
    marginTop: 10,
  },

  card: {
    width: '100%',
    // height: 100,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
