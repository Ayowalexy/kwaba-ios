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

export default function PasswordChangeModal(props) {
  const {
    onRequestClose,
    visible,
    onConfirm,
    oldpassword,
    setoldpassword,
    newpassword,
    setnewpassword,
    confirmnewpassword,
    setconfirmnewpassword,
  } = props;
  return (
    <View>
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
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: '#2A286A',
                  fontFamily: 'Poppins-Medium',
                  fontWeight: 'bold',
                  fontSize: 16,
                  // lineHeight: 19,
                }}>
                Change Password
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
              placeholder="Old Password"
              placeholderTextColor="#ADADAD"
              value={oldpassword}
              onChangeText={(text) => setoldpassword(text)}
              secureTextEntry
            />

            <TextInput
              style={[styles.textInput]}
              placeholder="New Password"
              placeholderTextColor="#ADADAD"
              value={newpassword}
              onChangeText={(text) => setnewpassword(text)}
              secureTextEntry
            />

            <TextInput
              style={[styles.textInput]}
              placeholder="Retype New Password"
              placeholderTextColor="#ADADAD"
              value={confirmnewpassword}
              onChangeText={(text) => setconfirmnewpassword(text)}
              secureTextEntry
            />

            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.btn, {backgroundColor: '#2A286A'}]}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                UPDATE PASSWORD
              </Text>
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
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
  },
  btn: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  textInput: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    marginTop: 10,
    // elevation: 1
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
