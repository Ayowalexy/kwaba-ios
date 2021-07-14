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
import {
  deleteUploadedFile,
  showUploadedFiles,
  uploadFile,
} from '../../redux/actions/documentUploadActions';
import {useDispatch, useSelector} from 'react-redux';

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
  const [spinner, setSpinner] = useState(false);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const fileProgress = useSelector(
    (state) => state.fileUploadReducer.fileProgress,
  );

  useEffect(() => {
    let a = [
      {id: 1, isloading: false},
      {id: 2, isloading: false},
      {id: 3, isloading: false},
      {id: 4, isloading: false},
      {id: 5, isloading: false},
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
    const index = await documentsUpload.findIndex(
      (document) => Number(document.document_type) == item.id,
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
    console.log('Counting: ', count);
    // console.log(fileProgress);
    // const countDocuments = async () => {
    //   const token = await getToken();
    //   try {
    //     const resp = await axios.get(
    //       'http://67.207.86.39:8000/api/v1/application/documents',
    //       {
    //         headers: {'Content-Type': 'application/json', Authorization: token},
    //       },
    //     );
    //     // console.log(uploadedDocumentsRes)
    //     let ress = Object.keys(resp.data.data).map((title) => ({
    //       title,
    //       content: resp.data[title],
    //     }));
    //     var count = 0;
    //     ress.forEach((v, i) => {
    //       if (v.content.length == 0) {
    //         count += 1;
    //       }
    //     });
    //     console.log('ress', ress);
    //     return count;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // console.log('**************************');
    // console.log('Counts: ', countDocuments());

    // console.log(fileProgress);

    countDocuments();
  }, []);

  const countDocuments = async () => {
    const token = await getToken();
    try {
      const resp = await axios.get(
        'http://67.207.86.39:8000/api/v1/application/documents',
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
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const blob = {
        uri: res.uri,
        type: res.type,
        name: res.name,
      };

      console.log(blob);

      const token = await getToken();
      const applicationIDCallRes = await axios.get(
        'http://67.207.86.39:8000/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      console.log(applicationIDCallRes.data.data.id);
      const applicationId = applicationIDCallRes.data.data.id;

      const formdata = new FormData();
      formdata.append('file', blob);
      formdata.append('upload_preset', 'rental_loan_documents');
      formdata.append('cloud_name', 'kwaba');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/kwaba/auto/upload',
        formdata,
      );

      const data = {
        applicationId,
        file: response.data.url,
        document_type: item.id,
        filename: item.title,
      };

      console.log(data);
      setSpinner(true);

      try {
        dispatch(uploadFile(token, item, data));
        appendID(item);
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
    const rentalSteps = await AsyncStorage.getItem('rentalSteps');
    const steps = JSON.parse(rentalSteps);

    let stepsData = {
      application_form: 'done',
      congratulation: 'done',
      bank_statement_upload: 'done',
      all_documents: 'done',
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
    navigation.navigate('VerifyingDocuments');
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

        {/* {!documentUploads.length ? (
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
        ) : ( */}
        <Docs />
        {/* )} */}

        {count >= 5 ? (
          <View style={{paddingHorizontal: 20}}>
            <TouchableOpacity
              // onPress={() => {
              //   // setShowSelectDocumentsModal(true);
              //   // navigation.navigate('OfferApprovalBreakDown');
              //   navigation.navigate('VerifyingDocuments');
              //   // console.log(count);
              // }}
              onPress={handleProceed}
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
              {Object.values(fileProgress).map(
                (item, index) =>
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
