import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {color} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../../util';

export default function BusinessAgeModal(props) {
  const {onRequestClose, visible, onClick} = props;
  const lists = [
    'Less than a year',
    '2 years',
    '3 years',
    '4 years',
    '5 years and above',
  ];

  return (
    // <View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              color: COLORS.primary,
              paddingLeft: 20,
              marginTop: 20,
            }}>
            How long have you been in business?
          </Text>
          <Icon
            onPress={onRequestClose}
            name="close-outline"
            size={25}
            color="#465959"
            style={{
              padding: 20,
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 2,
            }}
          />
          <ScrollView
            style={{marginTop: 40}}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            <View>
              {lists.map((list, index) => (
                <TouchableOpacity
                  onPress={() => {
                    onClick(list);
                    onRequestClose();
                  }}
                  key={index}
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 25,
                    color: COLORS.dark,

                    backgroundColor:
                      list.toLowerCase() == 'partnership'
                        ? COLORS.secondary
                        : 'transparent',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLORS.dark,
                      color:
                        list.toLowerCase() == 'partnership'
                          ? COLORS.white
                          : COLORS.dark,
                    }}>
                    {list}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
    // </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // borderColor: '#f00',
    // borderWidth: 1,
  },
  modalView: {
    width: '100%',
    maxHeight: '60%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    // padding: 25,
    paddingVertical: 25,
  },
  btn: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    borderColor: '#EFEFEF',
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
