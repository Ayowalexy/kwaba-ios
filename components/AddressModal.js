import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../util';

export default function AddressModal(props) {
  const {
    onRequestClose,
    visible,
    onConfirm,
    street,
    setStreet,
    city,
    setCity,
    state,
    setState,
    country,
    setCountry,
  } = props;

  // const checkIfInputsEmpty = () =>
  //   cardNumber.length == 0 || expiryDate.length == 0 || cvv.length == 0;

  return (
    // <View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#2A286A',
                fontFamily: 'CircularStd',
                fontWeight: 'bold',
                fontSize: 18,
                lineHeight: 19,
              }}>
              Change Address
            </Text>
            <Icon
              onPress={onRequestClose}
              name="close-outline"
              size={25}
              color="#465969"
            />
          </View>

          <TextInput
            style={[styles.textInput]}
            placeholder="Street"
            // keyboardType="number-pad"
            placeholderTextColor="#777"
            value={street}
            onChangeText={(text) => setStreet(text)}
          />
          <TextInput
            style={[styles.textInput]}
            placeholder="City"
            // keyboardType="number-pad"
            placeholderTextColor="#777"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <TextInput
            style={[styles.textInput]}
            placeholder="State"
            // keyboardType="number-pad"
            placeholderTextColor="#777"
            value={state}
            onChangeText={(text) => setState(text)}
          />
          <TextInput
            style={[styles.textInput]}
            placeholder="Country"
            // keyboardType="number-pad"
            placeholderTextColor="#777"
            value={country}
            onChangeText={(text) => setCountry(text)}
          />

          <TouchableOpacity
            onPress={onConfirm}
            style={[styles.btn, {backgroundColor: COLORS.secondary}]}>
            <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    // </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // borderColor: '#f00',
    // borderWidth: 1,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 25,
  },
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
  textInput: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 13,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    color: COLORS.primary,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
