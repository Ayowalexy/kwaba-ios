import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { COLORS } from '../../util';
import { useNavigation } from '@react-navigation/native';

export default function InsufficientModal(props) {
  const {
    showModal,
    setShowModal,
    setShowPaymentModal
  } = props;

  const navigation = useNavigation();

  return (
    <>
      <Modal
        isVisible={showModal}
        onBackButtonPress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="ios-warning" size={50} color={COLORS.red} />

            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: COLORS.dark,
                }}>
                Insufficient Wallet Balance
              </Text>
              <Text style={{fontSize: 13, color: COLORS.dark}}>
                You might need to use other means of payment
              </Text>
            </View>
          </View>

          <View style={[styles.buttonContainer]}>
           
            <TouchableOpacity
              onPress={() => {
                  setShowModal(false)
                  setShowPaymentModal(false)
                  navigation.navigate('Wallet')
              }}
              style={[styles.button, {borderColor: COLORS.red}]}>
              <Icon
                name="close"
                size={15}
                style={{marginRight: 10}}
                color='#fff'
              />
              
                  <Text style={[styles.buttonText]}>Fund Savings</Text> 
                
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <Spinner visible={spinner} size="large" /> */}
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: '#46596920',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 20,
  },
  button: {
    backgroundColor: COLORS.red,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});
