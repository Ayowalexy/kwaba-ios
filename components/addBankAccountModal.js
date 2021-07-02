import React, {useState} from 'react';
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
import {COLORS} from '../util'

export default function AddBankAccountModal(props) {
  const {
    onRequestClose,
    visible,
    onConfirm,

    // bankAccountName,
    // setBankAccountName,

    bankAccountNumber,
    setBankAccountNumber,

    // bankName,
    // setBankName,

    selectedBank,
    setSelectedBank,

    selectedAccountType,
    setSelectedAccountType,

    setBankCode,
    
    bankData
  } = props;

  // const [selectAccountType, setSelectAccountType] = useState('');
  const [showSelectBankModal, setShowSelectBankModal] = useState(false);
  const [showSelectAccountTypeModal, setShowSelectAccountTypeModal] = useState(false);

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
                Add Account
              </Text>
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={30}
                color="#465969"
              />
            </View>

            <TouchableOpacity
              style={styles.customInput}
              onPress={() => {
                setShowSelectBankModal(!showSelectBankModal);
              }}>
              {selectedBank != '' ? (
                <Text
                  style={{
                    // fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {selectedBank}
                </Text>
              ) : (
                <Text
                  style={{
                    // fontWeight: 'bold',
                    color: '#aaa',
                    fontSize: 13
                  }}>
                  Select Bank
                </Text>
              )}

              <Icon
                name="chevron-down-outline"
                size={20}
                style={{fontWeight: 'bold'}}
                color="#BABABA"
              />
            </TouchableOpacity>
            <TextInput
              style={[styles.textInput, {marginTop: 10}]}
              placeholder="Account Number"
              keyboardType="number-pad"
              placeholderTextColor="#ADADAD"
              value={bankAccountNumber}
              onChangeText={setBankAccountNumber}
            />
            <TouchableOpacity
              style={styles.customInput}
              onPress={() => {
                // setShowSelectBankModal(!showSelectBankModal);
                setShowSelectAccountTypeModal(!showSelectAccountTypeModal)
              }}>
              {selectedAccountType != '' ? (
                <Text
                  style={{
                    // fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {selectedAccountType}
                </Text>
              ) : (
                <Text
                  style={{
                    // fontWeight: 'bold',
                    color: '#aaa',
                    fontSize: 13
                  }}>
                  Account Type
                </Text>
              )}

              <Icon
                name="chevron-down-outline"
                size={20}
                style={{fontWeight: 'bold'}}
                color="#BABABA"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.btn, {backgroundColor: '#2A286A'}]}>
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
        setSelectedBank(bank)
        setBankCode(bankCode)
      }}
      banks={bankData}
      selectedBank={selectedBank}
      // setBankCode={(value) => setBankCode(value)}
    />

    <SelectBankAccountType
      onRequestClose={() => setShowSelectAccountTypeModal(!showSelectAccountTypeModal)}
      visible={showSelectAccountTypeModal}
      onClick={(value) => setSelectedAccountType(value)}
      selectedAccountType={selectedAccountType}
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
