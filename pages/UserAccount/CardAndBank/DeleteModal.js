import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {images, icons, COLORS} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

import Modal from 'react-native-modal';

export default function DeleteModal(props) {
  const {type, showDeleteModal, setShowDeleteModal} = props;

  return (
    <>
      <Modal
        isVisible={showDeleteModal}
        onBackButtonPress={() => setShowDeleteModal(false)}
        onBackdropPress={() => setShowDeleteModal(false)}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="ios-warning" size={50} color={COLORS.red} />

            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: COLORS.dark,
                }}>
                Delete {type}
              </Text>
              <Text style={{fontSize: 13, color: COLORS.dark}}>
                This action cannot be undone.
              </Text>
            </View>
          </View>

          <View style={[styles.buttonContainer]}>
            <TouchableOpacity
              onPress={() => setShowDeleteModal(false)}
              style={[
                styles.button,
                {
                  backgroundColor: COLORS.white,
                  borderColor: '#46596950',
                },
              ]}>
              <Icon
                name="close"
                size={15}
                style={{marginRight: 10}}
                color={COLORS.dark}
              />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: COLORS.dark,
                  },
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {borderColor: COLORS.red}]}>
              <Icon
                name="trash-bin"
                size={15}
                style={{marginRight: 10}}
                color={COLORS.white}
              />
              <Text style={[styles.buttonText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: '#46596920',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
  },
  button: {
    backgroundColor: COLORS.red,
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});
