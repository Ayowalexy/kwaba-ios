import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  FlatList,
  Animated,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {COLORS, FONTS, images, icons} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Docs from './Docs';
import DocumentPicker from 'react-native-document-picker';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');

  const token = JSON.parse(userData).token;
  return token;
};

const getDocuments = async () => {
  const token = await getToken();
  try {
    const uploadedDocumentsRes = await axios.get(
      'http://67.207.86.39:8000/api/v1/application/documents',
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    // return uploadedDocumentsRes.data.data;
    return uploadedDocumentsRes.data.data;
  } catch (error) {
    console.log('Error :', error);
  }
};

export default function AllDocuments({navigation}) {
  const [modalVisible, setVisible] = useState(false);
  const [showSelectDocumentsModal, setShowSelectDocumentsModal] = useState(
    false,
  );
  const [showChooseFileModal, setShowChooseFileModal] = useState(false);
  const [documentUploads, setDocumentUploads] = useState([]);
  const [item, setItem] = useState('');

  const [fileProperties, setFileProperties] = useState([
    {
      id: 1,
      title: 'Bank Statement',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
    {
      id: 2,
      title: 'Government Issued ID Card',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },

    {
      id: 3,
      title: 'Work Identity ',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
    {
      id: 4,
      title: 'Passport Photo',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
    {
      id: 5,
      title: 'Employment Letter',
      isUploading: false,
      progress: 0,
      isUploaded: false,
      documentID: '',
    },
  ]);

  useEffect(() => {
    console.log('_____________________<<<>>>________________________');

    (async () => {
      const documentUploaded = await getDocuments();
      console.log('Doc :', documentUploaded);
      console.log('up:', documentUploads);
      // if (documentUploaded) setDocumentsUpload(documentUploaded);
      // documentUploaded.forEach((document) => {
      //   const id = Number(document.document_type);
      //   try {
      //     // console.log(Number(document.document_type), document.id);

      //   } catch (error) {
      //     console.log('error: ', error);
      //   }
      // });

      // if (documentUploaded != null && documentUploaded.length > 0) {
      //   let result = fileProperties.filter((f) =>
      //     documentUploaded.some((d) =>
      //       f.id == d.document_type ? (f.isUploaded = true) : '',
      //     ),
      //   );
      //   console.log('Result:', result);
      // }
    })();
  }, []);

  const handleDocumentType = async (type) => {
    setShowChooseFileModal(true);
    setShowSelectDocumentsModal(false);
    setItem(type);
  };

  const handleUploadProgress = async (id, progress) => {
    console.log(progress);
  };

  const handleSuccessUploadFile = async (id) => {
    console.log('File uploaded successfully...');
  };

  const handleFailureUploadFile = async (id) => {
    console.log('File not uploaded...');
  };

  const handleShowUploadedFiles = async (type, id) => {
    console.log(type, id);
  };

  const handleBrowseFile = async () => {
    // console.log(selectedItemType);

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
        // console.log('You can use the storage');
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

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
        console.log('App ID: ', applicationId);

        const formdata = new FormData();
        formdata.append('file', blob);
        formdata.append('upload_preset', 'rental_loan_documents');
        formdata.append('cloud_name', 'kwaba');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/kwaba/image/upload',
          formdata,
        );

        console.log('cloudinary: ', response.data.url);

        const data = {
          applicationId,
          file: response.data.url,
          document_type: item.id,
          filename: item.title,
        };

        console.log('DATA: ', data);
        console.log(item, fileProperties);

        try {
          // uploadFile(token, data)
          const config = {
            onUploadProgress: (progressEvent) => {
              const {loaded, total} = progressEvent;
              const percentageProgress = Math.floor((loaded * 100) / total);
              handleUploadProgress(item.id, percentageProgress);
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          };
          const response = await axios.post(
            'http://67.207.86.39:8000/api/v1/application/documents/upload',
            data,
            config,
          );

          if (response.status == 200) {
            // handleSuccessUploadFile(item.id);
            console.log('RESPONSE:', response.data.statusMsg);

            let file = fileProperties.find((x) => x.id == item.id);
            console.log('filleeeeeee: ', file);

            // fileProperties.find(
            //   (x) => (x.id == item.id && x.isUploaded = true),
            // );

            fileProperties.forEach((x) => {
              if (x.id == item.id) x.isUploaded = true;
            });

            // setDocumentsUpload({
            //   title: item.filename,
            //   filename: 'Joshua',
            // });

            // console.log('*******');
            // console.log(item);
          }
        } catch (error) {
          // handleFailureUploadFile(item.id);
          console.log('File not uploaded: ', error.response.data);
        }
      } else {
        console.log('File permission denied');
      }
    } catch (error) {
      console.log('Down: ', error);
    }
  };

  return (
    <>
      <View style={[styles.container]}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 15,
          }}
          color={COLORS.primary}
        />
        <Text style={[styles.heading]}>All Documents</Text>

        {!documentUploads.length ? (
          <View style={[styles.content]}>
            <View
              style={{
                width: '100%',
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: COLORS.grey,

                borderWidth: 1.5,
                borderStyle: 'dashed',
                borderColor: '#9D98EC',
                borderRadius: 10,
                // padding: 20,
                paddingHorizontal: 20,
                paddingVertical: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  marginTop: 20,
                }}>
                Add any document
              </Text>
            </View>
          </View>
        ) : (
          <Docs documentUploads={documentUploads} />
        )}

        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => {
              setShowSelectDocumentsModal(true);
            }}
            style={[styles.btn, {}]}>
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
              ADD DOCUMENT
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={showSelectDocumentsModal}
        onBackButtonPress={() => setShowSelectDocumentsModal(false)}
        onBackdropPress={() => setShowSelectDocumentsModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 5,
            paddingBottom: 50,
          }}>
          <Icon
            onPress={() => setShowSelectDocumentsModal(false)}
            name="close"
            size={25}
            style={{
              position: 'absolute',
              right: 0,
              padding: 20,
            }}
            color={COLORS.primary}
          />
          <View style={{marginTop: 30}}>
            <Text
              style={{color: COLORS.primary, fontSize: 16, fontWeight: 'bold'}}>
              Select a document to upload
            </Text>
            <View>
              {fileProperties.map(
                (item, index, arr) =>
                  item.isUploaded == false && (
                    <TouchableOpacity
                      onPress={() => {
                        handleDocumentType(item);
                      }}
                      key={index}
                      style={[
                        styles.selectBtn,
                        {
                          borderBottomColor: '#eee',
                        },
                      ]}>
                      <Text>{item.title}</Text>
                    </TouchableOpacity>
                  ),
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={showChooseFileModal}
        onBackButtonPress={() => setShowChooseFileModal(false)}
        onBackdropPress={() => setShowChooseFileModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 5,
            paddingBottom: 50,
          }}>
          <Icon
            onPress={() => setShowChooseFileModal(false)}
            name="close"
            size={25}
            style={{
              position: 'absolute',
              right: 0,
              padding: 20,
            }}
            color={COLORS.primary}
          />
          <View style={{marginTop: 40}}>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
              Choose a file to upload
            </Text>
            <TouchableOpacity style={[styles.btn]} onPress={handleBrowseFile}>
              <Text
                style={{
                  lineHeight: 60,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: COLORS.white,
                }}>
                Browse
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  signLabel: {
    marginTop: 30,
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
    backgroundColor: COLORS.secondary,
    marginBottom: 20,
  },

  selectBtn: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    // borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
});
