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
  Permissions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../util';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');

  const token = JSON.parse(userData).token;
  return token;
};

export default function ManualUploadModal(props) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFilename, setUploadFilename] = useState('');
  const [startUpload, setStartUpload] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState([]);
  // const [response, setResponse] = useState('');

  const {onRequestClose, visible, onConfirm, navigation} = props;

  const uploadBankStatementFile = async () => {
    const file = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    const data = new FormData();
    // data.append('file', file);
    data.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });
    data.append('upload_preset', 'rental_loan_documents');
    data.append('cloud_name', 'kwaba');

    fetch('https://api.cloudinary.com/v1_1/kwaba/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUploadedFileInfo(data);
      })
      .catch((err) => {
        Alert.alert('An error occupied while uploading file');
      });
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
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: COLORS.dark}}>
                {/* {uploadFilename} */}
                {uploadedFileInfo.length != 0 &&
                  'File: ' + uploadedFileInfo.original_filename}
              </Text>
              <TouchableOpacity
                onPress={uploadBankStatementFile}
                style={[
                  styles.btn,
                  {backgroundColor: COLORS.secondary, marginTop: 10},
                ]}>
                <View
                  style={[styles.progress, {width: uploadProgress + '%'}]}
                />
                <Text
                  style={[
                    {
                      color: COLORS.white,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 12,
                      lineHeight: 50,
                    },
                  ]}>
                  {/* {startUpload &&
                    uploadProgress > 0 &&
                    'Uploading...  ' + uploadProgress + '%'} */}
                  {/* {uploadProgress == 100 && 'File has been uploaded'}
                  {!startUpload && uploadProgress == 0 && 'Choose a file'} */}
                  Choose a file
                  {/* {uploadedFileInfo.length != 0
                    ? 'File Uploaded'
                    : 'Choose a file'} */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {uploadedFileInfo.length != 0 && (
            <View style={{overflow: 'hidden'}}>
              <Animatable.View
                duration={300}
                easing="ease-in-out"
                animation="slideInUp"
                style={{overflow: 'hidden'}}>
                <TouchableOpacity
                  onPress={() => {
                    onRequestClose();
                    navigation.navigate('PostPaymentForm1');
                    //navigation.navigate('LoanRequestApproval');
                  }}
                  // disabled={isError()}
                  style={[styles.btn, {backgroundColor: COLORS.secondary}]}>
                  <Text
                    style={[
                      {
                        color: COLORS.white,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 12,
                        lineHeight: 60,
                      },
                    ]}>
                    PROCEED
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          )}
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
    // paddingVertical: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
  progress: {
    // width: '50%',
    height: '100%',
    backgroundColor: '#07BA84',
    position: 'absolute',
    left: 0,
  },
});
