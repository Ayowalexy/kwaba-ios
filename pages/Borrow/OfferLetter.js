import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function OfferLetter({navigation}) {
  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>Offer Letter Page</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('GuarantorOnboarding')}>
        <Text>Reject Offer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signature')}>
        <Text>Accept Offer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('AcceptanceLetterKwaba')}>
        <Text>Acceptance Letter Kwaba</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('AcceptanceLetterAddosser')}>
        <Text>Acceptace Letter Addosser</Text>
      </TouchableOpacity>
    </View>
  );
}
