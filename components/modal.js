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

export default function CustomModal(props) {
  const {onRequestClose, visible, goHome, email} = props;
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
              fontFamily: 'CircularStd',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Please confirm your email
          </Text>
          <View
            style={{
              width: '100%',
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.emailSent}
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
                fontFamily: 'CircularStd',
                color: COLORS.grey,
                fontSize: 13,
                // fontWeight: 'bold',
                textAlign: 'center',
                paddingHorizontal: 20,
                lineHeight: 20,
              }}>
              Follow the link in the email we will send to{' '}
              <Text
                style={{
                  color: COLORS.secondary,
                  fontWeight: 'bold',
                  fontSize: 12,
                }}>
                {email}
              </Text>{' '}
              to verify your mail address and help secure your account
            </Text>
            <TouchableOpacity
              onPress={goHome}
              style={[styles.btn, {backgroundColor: '#00DC99', marginTop: 20}]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 'bold',
                  lineHeight: 25,
                }}>
                GOT IT!
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={onRequestClose} style={[styles.btn]}>
              <Text
                style={{
                  color: '#BFBFBF',
                  fontSize: 12,
                  fontWeight: 'bold',
                  lineHeight: 25,
                }}>
                NO, NOT NOW
              </Text>
            </TouchableOpacity> */}
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
    fontFamily: 'CircularStd',
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
