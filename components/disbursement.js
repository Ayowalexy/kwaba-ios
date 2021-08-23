import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {COLORS, FONTS, images} from '../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Disbursement({navigation}) {
  return (
    <View>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
          fontWeight: '900',
        }}
        color={COLORS.primary}
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={styles.content}>
          <Text style={styles.heading}>Add/Change Account</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
