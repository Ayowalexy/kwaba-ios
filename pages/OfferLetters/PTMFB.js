import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {COLORS} from '../../util';

export default function PTMFB() {
  return (
    <View style={[styles.container]}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
          PTMFB Offer Letter
        </Text>
      </View>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
