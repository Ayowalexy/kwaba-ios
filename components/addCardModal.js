import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const widthtouse=Dimensions.get('window').width;

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
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 30,
        borderTopRightRadius: 30,}}
        >
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
                size={30}
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
                style={[styles.textInput, {width: 180}]}
                placeholder="Expiry Date MM/YY"
                keyboardType="numeric"
                placeholderTextColor="#ADADAD"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text)}
              />
              <TextInput
                style={[styles.textInput, {width: 180}]}
                placeholder="CVV"
                keyboardType="number-pad"
                placeholderTextColor="#ADADAD"
                value={cvv}
                onChangeText={(text) => setCVV(text)}
              />
            </View>
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.btn, {backgroundColor: '#2A286A'}]}>
              <Text style={{color: 'white'}}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    top: 50,
    height: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    padding: 35,
    paddingTop: 15,
    shadowColor: '#BFBFBF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  btn: {
    width: 380,
    height: 70,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  textInput: {
    width: 380,
    height: 70,
    borderRadius: 10,
    padding: 16,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#ADADAD',
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
