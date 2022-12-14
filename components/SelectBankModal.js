import React, { useEffect, useState, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, images, icons } from '../util';
import Banks from './banks.json'
import { useTheme } from '@react-navigation/native';

export default function SelectBankModal(props) {
  const { onRequestClose, visible, onClick, banks, selectedBank,close  } = props;
  const [bankList, setBankList] = useState([])
  const [value, setValue] = useState('')
  const bankss = useRef(Banks)

  console.log('visible', visible);


  useEffect(() => {
   
    setBankList(Banks)
  }, [])


  const theme = useTheme();


  return (
    // <View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{padding: 20}}>
            <TextInput
              value={value}
              placeholder='Enter Bank Name'
              onChangeText={setValue}
              style={{
                width: '100%',
                height: 60,
                paddingLeft: 20,
                borderRadius: 10,
                color: '#000',
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}

            />
          </View>
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
            style={{ marginTop: 10 }}
            scrollEnabled
          // showsVerticalScrollIndicator={false}
          >
            <View>
              {/* {banks?.map(({name, code}, index) => ( */}
              {bankList?.data?.filter(({name}) => name.toLowerCase().includes(value.toLocaleLowerCase()))?.map(({ name, code }, index) => (
                <TouchableOpacity
                  onPress={() => {
                    onClick(name, code);
                    onRequestClose();
                  }}
                  key={index}
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 25,
                    backgroundColor:
                      name == selectedBank ? COLORS.secondary : 'transparent',

                    // alignItems: 'center',
                  }}>
                  <View
                    style={{
                      fontSize: 14,
                      // fontWeight: 'bold',
                      // color: COLORS.primary,

                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        paddingRight: 10,
                        color:
                          name == selectedBank ? COLORS.white : COLORS.primary,
                      }}>
                      {/* {index + 1 <= 9 ? '0' + (index + 1) : index + 1} */}
                    </Text>
                    <Text
                      style={{
                        color:
                          name == selectedBank ? COLORS.white : COLORS.primary,
                      }}>
                      {name}
                    </Text>
                  </View>
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
    maxHeight: '80%',
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
