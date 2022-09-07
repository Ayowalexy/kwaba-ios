import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../util';

export default function ConfirmModal(props) {
  const {onRequestClose, visible, goNaviagte} = props;
  return (
    // <View style={styles.centeredView}>
    <Modal
      style={
        {
          // borderTopLeftRadius: 16,
          // borderTopRightRadius: 16,
        }
      }
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
            color="#D6D6D6"
          />
          <Text
            style={{
              color: '#2A286A',
              fontFamily: 'Poppins-Medium',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Your profile has been completed
          </Text>
          <View
            style={{
              width: '100%',
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.passwordResetSuccess}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: COLORS.grey,
                fontSize: 13,
                // fontWeight: 'bold',
                textAlign: 'center',
                paddingHorizontal: 20,
                lineHeight: 20,
              }}>
              Now you can access Kwaba's amazing features!!!
            </Text>
            <TouchableOpacity
              onPress={goNaviagte}
              style={[styles.btn, {backgroundColor: '#00DC99', marginTop: 20}]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 'bold',
                  lineHeight: 25,
                }}>
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    // </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // borderColor: '#f00',
    // borderWidth: 1,
    padding: 20,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  btn: {
    width: '100%',
    // height: 70,
    padding: 18,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
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
