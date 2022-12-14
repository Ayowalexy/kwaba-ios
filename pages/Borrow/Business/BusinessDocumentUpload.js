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
import {COLORS, FONTS, images, icons} from '../../../util/index';
import { baseUrl } from '../../../services/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Docs from './Docs';
import DocumentPicker from 'react-native-document-picker';
import { getEmergencyLoans } from '../../../services/network';
import { getCurrentApplication } from '../../../services/network';
import {
  deleteUploadedFile,
  showUploadedFiles,
  uploadFile,
} from '../../../redux/actions/documentUploadActions';
import {useDispatch, useSelector} from 'react-redux';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

const getUser = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const user = JSON.parse(userData).user;
  return user;
};

const getDocuments = async () => {
  const token = await getToken();
  try {
    const uploadedDocumentsRes = await axios.get(

      `${baseUrl}/application/documents`,
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return uploadedDocumentsRes.data.data;
  } catch (error) {
    console.log('Error :', error);
  }
};

export default function BusinessDocumentUpload({navigation}) {
  const [modalVisible, setVisible] = useState(false);
  const [showSelectDocumentsModal, setShowSelectDocumentsModal] = useState(
    false,
  );
  const [showChooseFileModal, setShowChooseFileModal] = useState(false);
  const [documentUploads, setDocumentUploads] = useState([]);
  const [item, setItem] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [count, setCount] = useState(0);
  const [isBankStatement, setIsBankStatement] = useState(false);

  const dispatch = useDispatch();
  const fileProgress = useSelector(
    (state) => state.businessFileUploadReducer.fileProgress,
  );

  useEffect(() => {
    console.log('file: ', fileProgress);
  }, [fileProgress]);

  useEffect(() => {
    let a = [
      {id: 1, isloading: false},
      {id: 2, isloading: false},
      {id: 3, isloading: false},
      {id: 4, isloading: false},
    ];

    a.some((x) => {
      if (x.isloading == true) {
        console.log('Check...:');
      }
    });
  }, []);

  const store = useSelector((state) => state);

  const appendID = async (item) => {
    const documentsUpload = await getDocuments();
    console.log('#'.repeat(30))
    console.log("documentsUpload", documentsUpload)
    const index = await documentsUpload.findIndex(
      (document) => Number(document?.document_type) == item.id,
    );
    const id = Number(documentsUpload[index].document_type);
    // console.log('Document: ', documentsUpload);
    console.log('ID: ', id);
    try {
      dispatch(showUploadedFiles(id, documentsUpload[index].id));
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    // console.log('Counting: ', count);
    Object.values(fileProgress).map((item) => {
      if (item.isUploaded && item.title == 'Bank Statement') {
        console.log('The ITEM: ', item);
        setIsBankStatement(true);
      }
    });
    countDocuments();
  }, [fileProgress]);

  useEffect(() => {
    console.log('Count: ', count);
    countDocuments();
  }, []);

  const countDocuments = async () => {
    const token = await getToken();
    try {
      const resp = await axios.get(
        `${baseUrl}/application/documents`,
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      setCount(resp.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDocumentType = async (item) => {
    setShowChooseFileModal(true);
    setShowSelectDocumentsModal(false);
    setItem(item);
    // console.log(item);
  };

  const handleBrowseFile = async () => {
    setShowChooseFileModal(false);
    const getAllAloans = await getEmergencyLoans();
      const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
      const applicationIDCallRes =  await getCurrentApplication({id: loan_id})
  
      console.log('Application status', applicationIDCallRes.data.data.status)
     
      console.log('The Application ID: ', applicationIDCallRes.data.data.id);
      const applicationId = applicationIDCallRes.data.data.id;


    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const blob = {
        uri: res.uri,
        type: res.type,
        name: res.name,
      };
      setSpinner(true);

      console.log( blob);

      const token = await getToken();
      // const applicationIDCallRes = await axios.get(
      //   `${baseUrl}/application/one`,
      //   {
      //     headers: {'Content-Type': 'application/json', Authorization: token},
      //   },
      // );
      // console.log("applicationIDCallRes", applicationIDCallRes);
      // const applicationId = applicationIDCallRes.data.data.id;

      const formdata = new FormData();
      formdata.append('file', blob);
      formdata.append('upload_preset', 'rental_loan_documents');
      formdata.append('cloud_name', 'kwaba');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/kwaba/auto/upload',
        formdata,
      );

      console.log("cloudinary", response)

      const data = {
        applicationId,
        file: response.data.url,
        document_type: item.id,
        filename: item.title,
      };

      console.log("processed data", data);

      try {
        dispatch(uploadFile(token, item, data));

        console.log('item', item)
        appendID(item
          // {"documentID": "17", "id": 2, "isUploaded": false, "isUploading": false, "progress": 0, "title": "Utility Bill"}
        );
        setSpinner(false);

        countDocuments();
      } catch (error) {
        console.log(error);
        setSpinner(false);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setSpinner(false);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log(err);
        setSpinner(false);
      }
    }
  };

  const handleProceed = async () => {

  
    const rnplStep = {
      nextStage: 'Offer approval breakdown',
      completedStages: ['Credit score', 'Applications', 'Documents upload']
    }
    await AsyncStorage.setItem('rnplSteps', JSON.stringify(rnplStep))

    navigation.navigate('VerifyingDocuments');
  };

  return (
    <>
      <View style={[styles.container]}>
        <Icon
          onPress={() => navigation.navigate('Home')}
          name="arrow-back-outline"
          size={25}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 15,
          }}
          color={COLORS.primary}
        />
        <Text style={[styles.heading]}>All Documents</Text>

        {count == 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={images.uploadDocument}
              style={{
                width: 100,
                height: 100,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.dark,
                opacity: 0.5,
                marginTop: 10,
              }}>
              UPLOAD YOUR DOCUMENTS NOW
            </Text>
          </View>
        ) : (
          <Docs />
        )}

        {count >= 4 ? (
          <View style={{paddingHorizontal: 20}}>
            <TouchableOpacity onPress={handleProceed} style={[styles.btn, {}]}>
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
          </View>
        ) : (
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
        )}
      </View>

      <Modal
        isVisible={showSelectDocumentsModal}
        onBackButtonPress={() => setShowSelectDocumentsModal(false)}
        onBackdropPress={() => setShowSelectDocumentsModal(false)}
        style={{paddingHorizontal: 20}}>
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
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 's',
              alignItems: 'center',
              marginTop: 40,
            }}> */}
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 14,
              fontWeight: 'bold',
              // textTransform: 'uppercase',
              textAlign: 'center',
              marginTop: 50,
            }}>
            Select a document to upload
          </Text>
          {/* </View> */}
          <View style={{marginTop: 10}}>
            <View>
              {Object.values(fileProgress).map(
                (item, index) =>
                  item.isUploaded == false &&
                  item.id && (
                    <TouchableOpacity
                      // onPress={() => {
                      //   if (item.title == 'Bank Statement') {
                      //     handleBankStatementUpload();
                      //   } else {
                      //     handleDocumentType(item);
                      //   }
                      // }}
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
        onBackdropPress={() => setShowChooseFileModal(false)}
        style={{paddingHorizontal: 20}}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 5,
            paddingBottom: 0,
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

      <Spinner visible={spinner} size="large" />
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
  },
  heading: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  signLabel: {
    marginTop: 30,
  },
  btn: {
    width: '100%',
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
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
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
});
