import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import Spinner from 'react-native-loading-spinner-overlay';

export default function MoveMoneyModal(props) {
  const {onRequestClose, visible} = props;
  const [spinner, setSpinner] = useState(true);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View
            style={{
              height: 50,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={onRequestClose}>
              <Icon name="arrow-back" size={25} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  marginLeft: 20,
                }}>
                Move To Savings Plan
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
});
