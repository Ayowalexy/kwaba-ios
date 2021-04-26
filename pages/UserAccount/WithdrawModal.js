import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import { COLORS } from '../../util';

const widthtouse=Dimensions.get('window').width;

export default function withdrawModal(props) {

  const [selectedSavingsValue, setSelectedSavingsValue] = useState("");
  const [selectedReasonValue, setSelectedReasonValue] = useState("");

  const {
    onRequestClose,
    visible,
    onConfirm,
    oldpassword,
    setoldpassword,
    newpassword, 
    setnewpassword,
    confirmnewpassword,
    setconfirmnewpassword
    
  } = props;
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
         style={{borderTopLeftRadius: 30,
            borderTopRightRadius: 30,}}
        >
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
                Withdraw.
              </Text>
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={30}
                color="#465969"
              />
            </View>



           <Picker
              mode="dropdown"
              dropdownIconColor="white"
              accessibilityLabel="Who do you pay your rent to?"
              style={{borderColor:COLORS.grey,border:2,}}
              selectedValue={selectedSavingsValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSavingsValue(itemValue)
              }>
              <Picker.Item label="Solo Savings" value="Solo Savings" />
              <Picker.Item label="Buddy Savings" value="Buddy Savings" />
            </Picker>

            <TextInput
              style={[styles.textInput, {marginTop: 18}]}
              placeholder="full amount"
              placeholderTextColor="#ADADAD"
              value={newpassword}
              onChangeText={(text) => setnewpassword(text)}
            />

            <TextInput
              style={[styles.textInput, {marginTop: 18}]}
              placeholder="Specific amount"
              placeholderTextColor="#ADADAD"
              value={confirmnewpassword}
              onChangeText={(text) => setconfirmnewpassword(text)}
            />

            <TextInput
              style={[styles.textInput, {marginTop: 18}]}
              placeholder="Reason"
              placeholderTextColor="#ADADAD"
              value={confirmnewpassword}
              onChangeText={(text) => setconfirmnewpassword(text)}
            />

            <View>

            </View>
            
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.btn, {backgroundColor: '#00DC99'}]}>
              <Text style={{color: 'white'}}>withdraw</Text>
            </TouchableOpacity>
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
    top: 50,
    height: 600,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    padding: 35,
    paddingTop: 15,
    shadowColor: '#BFBFBF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  btn: {
    width: widthtouse*0.85,
    height: 70,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  textInput: {
    width: widthtouse*0.85,
    height: 70,
    borderRadius: 10,
    padding: 16,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#ADADAD',
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
