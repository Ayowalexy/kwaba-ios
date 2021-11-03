import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {COLORS, FONTS, images} from '../../../util/index';

export default function WithdrawalStart(props) {
  const {navigation} = props;
  return (
    <View style={[styles.content, {alignItems: 'center'}]}>
      <Image source={images.purplePiggy} style={[styles.image]} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: COLORS.primary,
        }}>
        Cheeky!
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'normal',
          color: COLORS.dark,
          lineHeight: 20,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        You know you don't have an active{'\n'}savings right?
      </Text>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate('SavingsHome')}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 12,
            lineHeight: 30,
            textTransform: 'uppercase',
          }}>
          START SAVING
        </Text>
      </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    // borderWidth: 1,
    marginVertical: 10,
    resizeMode: 'contain',
    marginTop: 50,
  },

  button: {
    width: '100%',
    padding: 15,
    // height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    marginTop: 20,
  },

  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.dark,
    marginTop: 20,
    fontSize: 12,
  },
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },

  amountButton: {
    backgroundColor: COLORS.white,
    marginTop: 15,
    height: 65,
    borderWidth: 1,
    borderColor: '#ADADAD50',
    borderRadius: 5,
  },

  bankCard: {
    width: 270,
    height: 120,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
});
