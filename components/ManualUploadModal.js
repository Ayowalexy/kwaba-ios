import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../util';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {uploadFile} from '../redux/actions/documentUploadActions';

import * as Progress from 'react-native-progress';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');

  const token = JSON.parse(userData).token;
  return token;
};

const getDocuments = async () => {
  const token = await getToken();
  try {
    const uploadedDocumentsRes = await axios.get(
      'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/documents',
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return uploadedDocumentsRes.data.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteFile = async (item) => {
  const token = await getToken();

  try {
    const response = await axios.get(
      'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/document/delete',
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
        data: {
          id: item.documentID,
        },
      },
    );
    console.log('Deleted Item: ', response);
  } catch (error) {
    console.log('error here : ', error);
  }
};

export default function ManualUploadModal(props) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFilename, setUploadFilename] = useState('5212.jpg');
  const [startUpload, setStartUpload] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState([]);

  const [fileProgress, setFileProgress] = useState(0);
  // const [response, setResponse] = useState('');

  const {onRequestClose, visible, onConfirm, navigation} = props;

  useEffect(() => {
    (async () => {
      const documentUploaded = await getDocuments();
      console.log(documentUploaded);
      documentUploaded.forEach((document) => {
        const id = Number(document.document_type);
        try {
          console.log(Number(document.document_type), document.id);
        } catch (error) {
          console.log('error: ', error);
        }
      });
    })();
  }, []);

  useEffect(() => {
    if (fileProgress == 100) {
      setTimeout(() => {
        setFileProgress(0);
      }, 2000);
    }
  }, [fileProgress]);

  const uploadBankStatementFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission',
          message:
            'Kwaba needs access to your storage ' +
            'so you can upload documents.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        const blob = {
          uri: res.uri,
          type: res.type,
          name: res.name,
        };

        setFileProgress(20);

        const token = await getToken();
        const applicationIDCallRes = await axios.get(
          'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/one',
          {
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        );

        const applicationId = applicationIDCallRes.data.data.id;
        console.log('App ID: ', applicationId);

        const formdata = new FormData();
        formdata.append('file', blob);
        formdata.append('upload_preset', 'rental_loan_documents');
        formdata.append('cloud_name', 'kwaba');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/kwaba/image/upload',
          formdata,
        );

        // console.log('cloudinary: ', response.data.url);
        console.log('cloudinary: ', response.data);

        const data = {
          applicationId,
          file: response.data.url,
          document_type: '1',
          filename: 'Bank Statement',
        };

        console.log('DATA: ', data);

        try {
          // uploadFile(token, data)
          const config = {
            onUploadProgress: function (progressEvent) {
              setFileProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total),
              );
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          };

          axios
            .post(
              'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/documents/upload',
              data,
              config,
            )
            .then(function (response) {
              if (response.status == 200) {
                console.log('File uploaded successfully...');
                console.log('RESPONSE:', response.data.statusMsg);
                // console.log('DATA: ', response.data.original_filename);
                setFileUploaded(true);
              }
            });
        } catch (error) {
          console.log('File not uploaded: ', error.response.data);
          setFileProgress(0);
        }
      } else {
        console.log('File permission denied');
        setFileProgress(0);
      }
    } catch (error) {
      console.log('This is the error: ', error);
      setFileProgress(0);
    }
  };

  const handleProceed = async () => {
    const rentalSteps = await AsyncStorage.getItem('rentalSteps');
    const steps = JSON.parse(rentalSteps);

    let stepsData = {
      application_form: 'done',
      congratulation: 'done',
      bank_statement_upload: 'done',
      all_documents: '',
      verifying_documents: '',
      offer_breakdown: '',
      property_detail: '',
      landlord_detail: '',
      referee_detail: '',
      offer_letter: '',
      address_verification: '',
      debitmandate: '',
      awaiting_disbursement: '',
    };

    await AsyncStorage.setItem('rentalSteps', JSON.stringify(stepsData));

    console.log('STEPS: ', steps);

    // navigation.navigate('RentalLoanFormBankStatementUpload');

    onRequestClose();
    setFileUploaded(false);
    // navigation.navigate('PostPaymentForm1');
    //navigation.navigate('LoanRequestApproval');
    navigation.navigate('NewAllDocuments');
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
              fontSize: 14,
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

              <Progress.Bar
                progress={fileProgress / 100}
                width={200}
                height={10}
                color={COLORS.secondary}
                borderColor={COLORS.secondary}
                borderWidth={1}
                style={{marginTop: 5}}
              />

              {fileUploaded && (
                <Text
                  style={{marginVertical: 5, fontSize: 12, color: COLORS.dark}}>
                  {uploadFilename}
                </Text>
              )}

              <TouchableOpacity
                onPress={uploadBankStatementFile}
                style={[
                  styles.btn,
                  {
                    backgroundColor: COLORS.secondary,
                    marginTop: 5,
                    backgroundColor: COLORS.dark,
                  },
                ]}>
                <View style={[styles.progress]} />
                <Text
                  style={[
                    {
                      color: COLORS.white,
                      // color: COLORS.primary,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 12,
                      lineHeight: 50,
                    },
                  ]}>
                  Choose a file
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {fileUploaded && (
            <View style={{overflow: 'hidden'}}>
              <Animatable.View
                duration={300}
                easing="ease-in-out"
                animation="slideInUp"
                style={{overflow: 'hidden'}}>
                <TouchableOpacity
                  onPress={handleProceed}
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
