import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../util';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');

  const token = JSON.parse(userData).token;
  return token;
};

export default function ManualUploadModal(props) {
  const {onRequestClose, visible, onConfirm} = props;

  const uploadBankStatementFile = async (item) => {
    // console.log('ITEM: ', item);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const base64File = await RNFS.readFile(res.uri, 'base64');

      const convertedFile = `data:${res.type},${base64File}`;

      const blob = {
        uri: res.uri,
        type: res.type,
        name: res.name,
      };

      const token = await getToken();

      const applicationIDCallRes = await axios.get(
        'http://67.207.86.39:8000/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      const applicationId = applicationIDCallRes.data.data.id;

      const formdata = new FormData();

      formdata.append('file', blob);
      formdata.append('upload_preset', 'rental_loan_documents');
      formdata.append('cloud_name', 'kwaba');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/kwaba/auto/upload',
        formdata,
      );

      console.log(
        'here is the console log  from cloudinary ',
        response.data.url,
      );

      const data = {
        applicationId,
        file: response.data.url,
        document_type: item.id,
        filename: item.title,
      };

      console.log('here is the data:', data);
    } catch (err) {
      console.log(err);
    }
  };

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

          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Bank Statements
          </Text>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 20,
              fontSize: 12,
              color: '#2A286A',
            }}>
            Upload your latest 6 months bank statement.
          </Text>

          <View
            style={{
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: '#9D98EC',
              borderRadius: 10,
              padding: 20,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Upload File
              </Text>
              <Image
                source={images.uploadDocument}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  marginTop: 20,
                }}
              />
              <TouchableOpacity
                onPress={uploadBankStatementFile}
                style={[
                  styles.btn,
                  {backgroundColor: COLORS.secondary, marginTop: 20},
                ]}>
                <Text
                  style={[
                    // designs.buttonText,
                    {
                      color: COLORS.white,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 12,
                    },
                  ]}>
                  Choose a file
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            // onPress={handleNavigation}
            // disabled={isError()}
            style={[styles.btn, {backgroundColor: COLORS.secondary}]}>
            <Text
              style={[
                // designs.buttonText,
                {
                  color: COLORS.white,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 12,
                },
              ]}>
              PROCEED
            </Text>
          </TouchableOpacity>
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
