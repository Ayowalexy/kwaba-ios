import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CustomModal(props) {
  const {onRequestClose, visible, onSave} = props;
  return (
    <View style={styles.centeredView}>
      <Modal
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              onPress={onRequestClose}
              style={{alignSelf: 'flex-end'}}
              name="close-outline"
              size={30}
              color="#465969"
            />
            <Text
              style={{
                color: '#2A286A',
                fontFamily: 'CircularStd',
                fontWeight: 'bold',
              }}>
              Confirm
            </Text>
            <Text
              style={{
                fontFamily: 'CircularStd',
                color: '#465969',
                fontWeight: '600',
                marginTop: 10,
              }}>
              You are about to save your profile details
            </Text>
            <TouchableOpacity
              onPress={onSave}
              style={[styles.btn, {backgroundColor: '#00DC99'}]}>
              <Text style={{color: 'white'}}>YES, SAVE IT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onRequestClose} style={[styles.btn]}>
              <Text style={{color: '#BFBFBF'}}>NO, NOT NOW</Text>
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
    margin: 20,
    top: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 35,
    alignItems: 'center',
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
