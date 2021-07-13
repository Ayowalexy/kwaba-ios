import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectBankModal from './SelectBankModal';
import SelectBankAccountType from './SelectBankAccountType';
import {COLORS} from '../util';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddPaymentCardModal(props) {
  const {onRequestClose, visible, onConfirm} = props;
  const [selectedBank, setSelectedBank] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');

  const [bankData, setBankData] = useState([]);
  const [bankCode, setBankCode] = useState('');

  const [showSelectBankModal, setShowSelectBankModal] = useState(false);

  const addAccount = async () => {
    // setSpinner(true);
    // console.log('start');
    const data = {
      bank_name: selectedBank,
      bank_account_number: bankAccountNumber,
      bank_short_code:
        bankCode.toString().length == 2 ? '0' + bankCode : bankCode,
    };

    console.log('DATA: ', data);

    verifyBankAccount(data.bank_account_number, data.bank_short_code);
  };

  return (
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onRequestClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#2A286A',
                    fontFamily: 'CircularStd',
                    fontWeight: 'bold',
                    fontSize: 18,
                    lineHeight: 19,
                  }}>
                  Payment Card
                </Text>
                <Icon
                  onPress={onRequestClose}
                  name="close-outline"
                  size={30}
                  color="#465969"
                />
              </View>

              <TextInput
                style={[styles.textInput, {marginTop: 10}]}
                placeholder="Account Number"
                keyboardType="number-pad"
                placeholderTextColor="#ADADAD"
                value={bankAccountNumber}
                onChangeText={setBankAccountNumber}
              />
              <TextInput
                style={[styles.textInput, {marginTop: 10}]}
                placeholder="Account Number"
                keyboardType="number-pad"
                placeholderTextColor="#ADADAD"
                value={bankAccountNumber}
                onChangeText={setBankAccountNumber}
              />
              <TouchableOpacity
                disabled={!bankAccountNumber ? true : false}
                onPress={addAccount}
                style={[
                  styles.btn,
                  {
                    backgroundColor: !bankAccountNumber
                      ? '#2A286A50'
                      : '#2A286A',
                  },
                ]}>
                <Text style={{color: 'white'}}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <SelectBankModal
        onRequestClose={() => setShowSelectBankModal(!showSelectBankModal)}
        visible={showSelectBankModal}
        onClick={(bank, bankCode) => {
          setSelectedBank(bank);
          setBankCode(bankCode);
        }}
        banks={bankData}
        selectedBank={selectedBank}
      />
    </>
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
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 25,
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
    paddingVertical: 15,
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
  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});
