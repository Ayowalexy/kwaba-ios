import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../../util';

export default function ConfirmModal(props) {
  const {visible, navigation, onRequestClose} = props;

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
      transparent={true}>
      <View style={styles.centeredModalWrapper}>
        <View style={[styles.successModal, {borderRadius: 30}]}>
          <Icon
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              padding: 20,
            }}
            onPress={() => onRequestClose()}
            name="close-outline"
            size={25}
            color={COLORS.dark}
          />
          <Image
            source={icons.tick}
            style={{width: 84, height: 84, marginTop: 50}}
          />
          <Text
            style={{
              marginTop: 35,
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.primary,
              fontWeight: 'bold',
            }}>
            Request Successful
          </Text>
          <Text
            style={{
              color: COLORS.grey,
              fontSize: 12,
            }}>
            Loan will be disbursed shortly
          </Text>
          <TouchableOpacity
            onPress={() => {
              onRequestClose();
              navigation.navigate('EmergencyLoanDashBoard');
            }}
            style={[
              styles.btn,
              {
                marginTop: 30,
                width: '100%',
                alignSelf: 'center',
                backgroundColor: COLORS.secondary,
              },
            ]}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
              }}>
              GO HOME
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredModalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
    paddingBottom: 50,
    width: '90%',
    marginHorizontal: 'auto',
  },
  button: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    padding: 24,
    marginHorizontal: 20,
    elevation: 20,
    shadowColor: COLORS.secondary,
    marginBottom: 40,
  },
});
