import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {COLORS, FONTS, images, icons} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import apiUrl from '../../../services/api';
import {referralDetails} from '../../../services/network';

export default function ReferralDetails({navigation}) {
  useEffect(() => {
    const getReferralDetails = async () => {
      const referral = await referralDetails();
      console.log(referral);
    };
    getReferralDetails();
  }, []);

  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
        color={COLORS.primary}
      />
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <Text style={[styles.heading]}>Referral details</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
