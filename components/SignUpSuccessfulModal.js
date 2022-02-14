import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../util';

const {width, height} = Dimensions.get('screen');

export default function SignUpSuccessfulModal(props) {
  const {onRequestClose, visible, navigate} = props;

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={images.success}
              style={{width: 50, height: 50, marginBottom: 10}}
              resizeMode="contain"
            />
            <View style={[styles.content]}>
              <Text style={[styles.contentTitle]}>Successful</Text>

              <Text style={[styles.contentBody]}>
                You have successfully created an account, please continue by
                logging in
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.btn]}
              onPress={() => {
                navigate();
                onRequestClose();
              }}>
              <Text style={[styles.btnText]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width / 1.2,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    paddingVertical: 50,
    paddingHorizontal: 40,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
  },
  contentBody: {
    fontSize: 14,
    lineHeight: 25,
    color: COLORS.dark,
    textAlign: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: COLORS.secondary,
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
});
