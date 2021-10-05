import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../../util';
import {useDispatch, useSelector} from 'react-redux';
import {getMaxLoanCap} from '../../../redux/actions/savingsActions';

export default function ConfirmModal(props) {
  const {visible, navigation, onRequestClose} = props;
  const dispatch = useDispatch();
  // const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
      transparent={true}>
      <View style={styles.centeredModalWrapper}>
        <View style={[styles.successModal]}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              borderRadius: 30,
              width: 30,
              height: 30,
              backgroundColor: '#00000010',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              onPress={() => onRequestClose()}
              name="close-outline"
              size={25}
              color={COLORS.dark}
            />
          </TouchableOpacity>
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <Image source={icons.tick} style={{width: 60, height: 60}} />
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 'bold',
              color: COLORS.primary,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Request Successful
          </Text>
          <Text
            style={{
              color: COLORS.grey,
              fontSize: 14,
              textAlign: 'center',
            }}>
            Loan will be disbursed shortly
          </Text>
          <TouchableOpacity
            onPress={() => {
              onRequestClose();
              navigation.navigate('EmergencyLoanDashBoard');
              dispatch(getMaxLoanCap());
            }}
            style={[
              styles.btn,
              {
                marginTop: 30,
                width: '100%',
                alignSelf: 'center',
                backgroundColor: COLORS.secondary,
              },
            ]}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
              }}>
              CONTINUE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredModalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 30,
    paddingBottom: 50,
    width: '90%',
    marginHorizontal: 'auto',
  },
  button: {
    borderRadius: 5,
    backgroundColor: COLORS.white,
    padding: 24,
    marginHorizontal: 20,
    elevation: 20,
    // shadowColor: COLORS.secondary,
    // marginBottom: 40,
  },
});
