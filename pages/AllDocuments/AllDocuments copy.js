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

export default function AllDocuments({navigation}) {
  const [modalVisible, setVisible] = useState(false);
  const [showSelectDocumentsModal, setShowSelectDocumentsModal] = useState(
    false,
  );
  const [showChooseFileModal, setShowChooseFileModal] = useState(false);
  const [documentUploads, setDocumentsUpload] = useState([]);

  const dummy = {
    title: 'Bank Statement',
    filename: 'Joshua_Bank-ST.pdf',
  };

  // const handleAddDocument = () => {
  //   setShowChooseFileModal(false);
  //   setDocumentsUpload((prevDocs) => [...prevDocs, dummy]);
  // };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const handleDocumentType = async (type) => {
    setShowChooseFileModal(true);
    setShowSelectDocumentsModal(false);
    console.log(type);
    if (type == 'Bank Statement') {
    } else if (type == 'Government Issued ID Card') {
    } else if (type == 'Work Identity') {
    } else if (type == 'Passport Photo') {
    } else if (type == 'Employment Letter') {
    }

    // console.log(Math.floor(5.908382383 * 2.2919303929));

    const token = await getToken();
    // console.log(token);
    try {
      const uploadedDocumentsRes = await axios.get(
        // 'http://67.207.86.39:8000/api/v1/application/documents',
        'http://67.207.86.39:8000/api/v1/me',
        {
          headers: {
            // 'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNDYsImVtYWlsIjoibWlrZWpha2UwMTEwQGdtYWlsLmNvbSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjI1ODY1NDE4fQ.JYglxnBEItt4_i4yswT6B0eYKWG9BXfEvKVPFYjRPVw',
          },
        },
      );
      console.log('DATA: ', uploadedDocumentsRes.data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleBrowseFile = async () => {
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

      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        const file = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        const data = new FormData();
        data.append('file', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
        data.append('upload_preset', 'rental_loan_documents');
        data.append('cloud_name', 'kwaba');

        console.log(data);
      } else {
        console.log('File permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(documentUploads);
  }, [documentUploads]);

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
              {[
                'Bank Statement',
                'Government Issued ID Card',
                'Work Identity',
                'Passport Photo',
                'Employment Letter',
              ].map((value, index, arr) => (
                <TouchableOpacity
                  onPress={() => {
                    handleDocumentType(value);
                  }}
                  key={index}
                  style={[
                    styles.selectBtn,
                    {
                      borderBottomColor:
                        arr.length - 1 == index ? 'transparent' : '#eee',
                    },
                  ]}>
                  <Text>{value}</Text>
                </TouchableOpacity>
              ))}
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
