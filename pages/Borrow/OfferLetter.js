import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function OfferLetter({navigation}) {
  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>Offer Letter Page</Text>

      <TouchableOpacity
        style={[styles.touchable]}
        onPress={() => navigation.navigate('GuarantorOnboarding')}>
        <Text>Reject Offer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.touchable]}
        onPress={() => navigation.navigate('Signature')}>
        <Text>Accept Offer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.touchable]}
        onPress={() => navigation.navigate('AcceptanceLetterKwaba')}>
        <Text>Acceptance Letter Kwaba</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.touchable]}
        onPress={() => navigation.navigate('AcceptanceLetterAddosser')}>
        <Text>Acceptace Letter Addosser</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginTop: 10,
    marginLeft: 10,
  },
});
