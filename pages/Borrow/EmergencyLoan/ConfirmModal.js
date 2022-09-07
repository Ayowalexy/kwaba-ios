import React, {useEffect, useState} from 'react';
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
import {COLORS} from '../../../util';
import {currencyFormat} from '../../../util/numberFormatter';

export default function ConfirmModal(props) {
  const {onRequestClose, visible, data, onClick} = props;

  const {loanAmount, repaymentAmount, dueDate} = data;

  // console.log(loanAmount);

  const loanItems = [
    {
      title: 'Loan Amount',
      value: `₦${currencyFormat(Number(loanAmount))}`,
    },
    {
      title: 'Repayment Amount',
      value: `₦${currencyFormat(Number(repaymentAmount))}`,
    },
    {
      title: 'Due Date',
      value: `${dueDate != '' ? dueDate : '-'}`,
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
            }}
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 10,
                color: COLORS.primary,
              }}>
              Confirm
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 20,
                color: COLORS.dark,
              }}>
              Please confirm loan details
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#46596920',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 5,
            }}>
            {loanItems.map(({title, value}, index) => {
              return (
                <View key={index} style={styles.flexItem}>
                  <Text style={styles.itemTitle}>{title}</Text>
                  <Text style={styles.itemValue}>{value}</Text>
                </View>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={onClick}
            style={[
              styles.btn,
              {
                backgroundColor: COLORS.secondary,
                marginTop: 20,
                marginBottom: 10,
              },
            ]}>
            <Text
              style={[
                {
                  fontSize: 12,
                  color: COLORS.white,
                  fontWeight: 'bold',
                },
              ]}>
              YES, IT'S FINE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onRequestClose}
            style={[
              {
                backgroundColor: COLORS.white,
                paddingVertical: 20,
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  fontSize: 12,
                  color: COLORS.grey,
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
              ]}>
              CANCEL
            </Text>
          </TouchableOpacity>
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
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 15,
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

  flexItem: {},

  itemTitle: {
    color: COLORS.dark,
    fontSize: 10,
  },
  itemValue: {
    color: COLORS.dark,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 3,
  },
});
