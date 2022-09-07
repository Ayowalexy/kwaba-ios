import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons} from '../../../util';
import designs from './style';

export default function InviteSentModal(props) {
  const {onRequestClose, visible, navigation} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <TouchableOpacity
            style={{
              position: 'absolute',
              right: 20,
              top: 10,
            }}>
            <Icon
              onPress={onRequestClose}
              name="close-outline"
              size={25}
              color="#465969"
            />
          </TouchableOpacity> */}

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              //   marginTop: 20,
            }}>
            <Image
              source={icons.emailSent}
              style={{width: 100, height: 100}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: '#2A286A',
                fontFamily: 'Poppins-Medium',
                fontWeight: 'bold',
                fontSize: 16,
                lineHeight: 19,
                marginTop: 10,
              }}>
              Your invite has been sent
            </Text>

            <TouchableOpacity
              onPress={onRequestClose}
              style={[
                {
                  borderRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#00DC99',
                  marginBottom: 20,

                  marginTop: 20,
                  paddingVertical: 5,
                  paddingHorizontal: 40,
                  marginBottom: 0,
                  backgroundColor: '#00DC99',
                },
              ]}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 12,
                  lineHeight: 30,
                }}>
                Okay!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 40,
  },
  modalView: {
    // flex: 1,
    width: '100%',
    maxHeight: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 25,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});
