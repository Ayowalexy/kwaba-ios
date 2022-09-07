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

const widthtouse = Dimensions.get('window').width;

export default function chooseNetworkModal(props) {
  const {
    onRequestClose,
    visible,
    selectedNetwork,
    onClick,
    chooseNetwork,
  } = props;

  // console.log('This, props:', props);
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: COLORS.primary,
                }}>
                Choose network
              </Text>
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={25}
                color="#465959"
                style={{
                  padding: 10,
                  position: 'absolute',
                  top: -30,
                  right: -10,
                }}
              />
            </View>
            {/* <View style={[styles.customInput, {padding: 0}]}>
              <Icon
                onPress={() => navigation.goBack()}
                name="search"
                size={20}
                style={{
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: 20,
                  color: '#BFBFBF',
                }}
              />
              <TextInput
                style={{
                  width: '100%',
                  paddingLeft: 50,
                  paddingVertical: 16,
                  fontWeight: 'bold',
                }}
                placeholder="Search"
                placeholderTextColor="#BFBFBF"
                keyboardType="default"
              />
            </View> */}
            {chooseNetwork?.map((value, index) => (
              <TouchableOpacity
                key={index}
                disabled={value.name === selectedNetwork ? true : false}
                onPress={() => {
                  onRequestClose();
                  onClick(value);
                }}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor:
                    value.name === selectedNetwork ? '#9D98EC40' : '',
                  borderRadius: 10,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: COLORS.dark,
                    fontSize: 12,
                  }}>
                  {value.name}
                </Text>
                <Image
                  source={{uri: value.image}}
                  style={{width: 40, height: 40}}
                />
              </TouchableOpacity>
            ))}
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
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    // top: 50,
    minHeight: 200,
    maxHeight: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    // borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    // padding: 35,
    // paddingTop: 15,
    // shadowColor: '#BFBFBF',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 6,
  },
  btn: {
    width: widthtouse * 0.85,
    height: 70,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  textInput: {
    width: widthtouse * 0.85,
    height: 70,
    borderRadius: 10,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
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

  customInput: {
    borderRadius: 10,
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
