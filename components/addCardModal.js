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

const widthtouse = Dimensions.get('window').width;

export default function AddCardModal(props) {
  const {
    onRequestClose,
    visible,
    onConfirm,
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCVV,
  } = props;

  const checkIfInputsEmpty = () =>
    cardNumber.length == 0 || expiryDate.length == 0 || cvv.length == 0;

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
              Add Card
            </Text>
            <Icon
              onPress={onRequestClose}
              name="close-outline"
              size={25}
              color="#465969"
            />
          </View>

          <TextInput
            style={[styles.textInput, {marginTop: 18}]}
            placeholder="Card number"
            keyboardType="number-pad"
            placeholderTextColor="#ADADAD"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(text)}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 18,
            }}>
            <TextInput
              style={[styles.textInput, {width: '48%'}]}
              placeholder="Expiry Date"
              keyboardType="numeric"
              placeholderTextColor="#ADADAD"
              value={expiryDate}
              onChangeText={(text) => setExpiryDate(text)}
            />
            <TextInput
              style={[styles.textInput, {width: '48%'}]}
              placeholder="CVV"
              keyboardType="number-pad"
              placeholderTextColor="#ADADAD"
              value={cvv}
              onChangeText={(text) => setCVV(text)}
            />
          </View>

          <TouchableOpacity
            disabled={checkIfInputsEmpty() ? true : false}
            onPress={onConfirm}
            style={[
              styles.btn,
              {
                backgroundColor: '#2A286A',
                opacity: checkIfInputsEmpty() ? 0.5 : 1,
              },
            ]}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>CONFIRM</Text>
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
    // top: 50,
    // height: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 25,
    // paddingTop: 15,
    // shadowColor: '#BFBFBF',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 6,
  },
  btn: {
    width: '100%',
    // height: 70,
    paddingVertical: 20,
    // paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
  },
  textInput: {
    width: '100%',
    // height: 70,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 13,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#EFEFEF',
    borderWidth: 1,
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
