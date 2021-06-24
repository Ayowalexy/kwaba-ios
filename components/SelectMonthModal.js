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
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../util';

export default function SelectMonthModal(props) {
  const {onRequestClose, visible, onClick, selectedMonth} = props;
  const months = new Array(12).fill();
  useEffect(() => {
    // console.log(months);
    console.log(selectedMonth);
  }, []);
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
          {/* <Text style={{fontWeight: 'bold', fontSize: 16}}>Select Month</Text> */}
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
            // showsVerticalScrollIndicator={false}
          >
            <View>
              {months.map((number, index) => (
                <TouchableOpacity
                  onPress={() => {
                    onClick(index + 1);
                    onRequestClose();
                  }}
                  key={index}
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 25,
                    backgroundColor:
                      index + 1 == selectedMonth
                        ? COLORS.secondary
                        : 'transparent',

                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14 + index / 2,
                      // fontSize: 14,
                      fontWeight: 'bold',
                      // color: COLORS.primary,
                      color:
                        index + 1 == selectedMonth
                          ? COLORS.white
                          : COLORS.primary,
                    }}>
                    {index + 1} {index + 1 <= 1 ? 'month' : 'months'}
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
    fontFamily: 'CircularStd',
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
    fontFamily: 'CircularStd-Medium',
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
    fontFamily: 'CircularStd-Medium',
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
