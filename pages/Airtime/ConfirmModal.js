import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {COLORS, images} from '../../util';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonRN from 'radio-buttons-react-native';

import {PayWithFlutterwave} from 'flutterwave-react-native';

const widthtouse = Dimensions.get('window').width;

export default function ConfirmModal(props) {
  const {
    onRequestClose,
    visible,
    selectedNetwork,
    selectedAmount,
    selectedPhoneNumber,
  } = props;

  console.log('This, props:', props);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              onPress={onRequestClose}
              name="close-outline"
              size={25}
              color="#465959"
              style={{
                padding: 10,
                position: 'absolute',
                top: 0,
                right: 0,
                // borderWidth: 1,
              }}
            />
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                Confirm
              </Text>
              <Text
                style={{fontSize: 14, color: COLORS.primary, marginTop: 10}}>
                You are about to buy airtime
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 20,
              }}>
              <View style={styles.info}>
                <Text style={styles.title}>Phone Number</Text>
                <Text style={styles.data}>{selectedPhoneNumber}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.title}>Network</Text>
                <Text style={styles.data}>{selectedNetwork}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.title}>Amount</Text>
                <Text style={styles.data}>₦{selectedAmount}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                console.log('Successfull, Your airtime has been purchased');
              }}
              // disabled={!isError()}
              style={[
                styles.btn,
                {
                  backgroundColor: '#00DC99',
                  width: '100%',
                  borderRadius: 10,
                  marginTop: 20,
                  // opacity: isError() ? 0 : 1,
                },
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  lineHeight: 30,
                  fontWeight: 'bold',
                }}>
                CONFIRM
              </Text>
            </TouchableOpacity>
            {/* <PayWithFlutterwave /> */}
          </View>
        </View>
      </Modal>
    </View>
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
    position: 'absolute',
    bottom: 0,
    minHeight: 200,
    maxHeight: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  info: {
    width: '50%',
    // borderWidth: 1,
    // marginVertical: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    color: '#ADADAD',
    marginBottom: 5,
  },
  data: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  btn: {
    padding: 15,
    borderRadius: 10,
    // marginTop: 20,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
});
