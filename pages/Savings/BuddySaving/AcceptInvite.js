import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AcceptInvite({navigation}) {
  const handleAcceptInvite = () => {
    console.log('Hello: ');
    navigation.navigate('BuddySavingDashBoard');
  };
  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{marginLeft: -5}}
        color={COLORS.primary}
      />
      <ScrollView>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            marginBottom: 10,
            fontWeight: 'bold',
            color: COLORS.primary,
          }}>
          Welcome Buddy Saver
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            marginBottom: 10,
            fontWeight: 'bold',
            color: COLORS.primary,
            textAlign: 'center',
          }}>
          Review your saving details
        </Text>
        <View style={[styles.dashboard]}>
          <View style={[styles.titleBanner]}>
            <Text style={{fontSize: 10, color: COLORS.light}}>
              BUDDY Saving
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.primary,
              }}>
              2021 Rent
            </Text>
          </View>
          {/*  */}
          <View
            style={{
              //   paddingVertical: 20,
              paddingHorizontal: 20,
            }}>
            <View style={[styles.flex]}>
              <View>
                <Text style={[styles.flexTitle]}>No. of Buddies</Text>
                <Text style={[styles.flexValue]}>4</Text>
              </View>
              <View style={[styles.flexEnd]}>
                <Text style={[styles.flexTitle]}>Target Amount</Text>
                <Text style={styles.flexValue}>₦2,500,000</Text>
              </View>
            </View>

            <View style={[styles.flex]}>
              <View>
                <Text style={[styles.flexTitle]}>Frequency</Text>
                <Text style={[styles.flexValue]}>Monthly</Text>
              </View>
              <View style={[styles.flexEnd]}>
                <Text style={[styles.flexTitle]}>Start Date</Text>
                <Text style={styles.flexValue}>Dec 22, 2021</Text>
              </View>
            </View>

            <View style={[styles.flex]}>
              <View>
                <Text style={[styles.flexTitle]}>End Date</Text>
                <Text style={[styles.flexValue]}>Dec 22, 2021</Text>
              </View>
              <View style={[styles.flexEnd]}>
                <Text style={[styles.flexTitle]}>Interest Rate</Text>
                <Text style={styles.flexValue}>2.5% P.A</Text>
              </View>
            </View>

            <View style={[styles.flex]}>
              <View>
                <Text style={[styles.flexTitle]}>Your target</Text>
                <Text style={[styles.flexValue]}>₦625,000</Text>
              </View>
              <View style={[styles.flexEnd]}>
                <Text style={[styles.flexTitle]}>Amount to save</Text>
                <Text style={styles.flexValue}>₦52,000</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: COLORS.dark,
            },
          ]}>
          <Text style={[styles.btnText, {color: COLORS.dark}]}>
            EDIT PREFERENCES
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn]} onPress={handleAcceptInvite}>
          <Text style={[styles.btnText]}>JOIN SAVINGS</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  dashboard: {
    width: '100%',
    minHeight: 200,
    marginTop: 10,
    marginBottom: 50,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },

  titleBanner: {
    backgroundColor: COLORS.white,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  flexTitle: {
    fontSize: 12,
    fontWeight: 'normal',
    color: COLORS.white,
  },

  flexValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  flexEnd: {
    alignItems: 'flex-end',
  },

  btn: {
    backgroundColor: COLORS.secondary,
    padding: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // marginBottom: 20,
  },

  btnText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
