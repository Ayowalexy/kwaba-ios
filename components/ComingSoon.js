import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../util';

export default function ComingSoon(props) {
  const {onRequestClose, visible, name} = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Icon
              onPress={onRequestClose}
              name="arrow-back-outline"
              size={25}
              // color="#465969"
              color="#ffffff"
              style={{position: 'absolute', left: 0, top: 0}}
            />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon
                onPress={onRequestClose}
                name={
                  name.toLowerCase() == 'notification'
                    ? 'notifications-outline'
                    : name.toLowerCase() == 'business'
                    ? 'bicycle-outline'
                    : 'paw'
                }
                size={120}
                color="#ffffff"
                color={COLORS.secondary}
              />

              <Text
                style={{
                  textTransform: 'uppercase',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginTop: 10,
                }}>
                Coming Soon
              </Text>
              <Icon
                onPress={onRequestClose}
                name="ellipsis-horizontal-outline"
                size={20}
                color="#ffffff"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
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
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 20,
    backgroundColor: COLORS.primary,
  },
});
