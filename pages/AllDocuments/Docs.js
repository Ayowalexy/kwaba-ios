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
} from 'react-native';
import {COLORS, FONTS, images, icons} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import ProgressBar from 'react-native-progress/Bar';

import {
  deleteUploadedFile,
  showUploadedFiles,
  uploadFile,
} from '../../redux/actions/documentUploadActions';

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
    // console.log(uploadedDocumentsRes)
    return uploadedDocumentsRes.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default function Docs(props, {navigation}) {
  const {documentUploads} = props;
  const [modal, setModal] = useState(false);
  const [showSelectDocumentsModal, setShowSelectDocumentsModal] = useState(
    false,
  );
  const [showChooseFileModal, setShowChooseFileModal] = useState(false);
  const [item, setItem] = useState('');

  const [name, setName] = useState('');
  const [spinner, setSpinner] = useState(false);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setName(JSON.parse(userData).username);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const showUploadedDocuments = async () => {
    const documentsUploaded = await getDocuments();
    documentsUploaded.forEach((document) => {
      const id = Number(document.document_type);
      console.log(document.filename);
      try {
        dispatch(
          showUploadedFiles(Number(document.document_type), document.id),
        );
        console.log('here', document.document_type, document.id);
      } catch (error) {
        console.log('error', error);
      }
    });
  };

  useEffect(() => {
    // console.log('df',documents)
    //   documentsUploaded.forEach(document => {
    //   console.log(document, 'working')
    //   const id = Number(document.document_type);
    //   console.log(id)
    //   try{
    //   dispatch(showUploadedFiles(Number(document.document_type), document.id ))
    // console.log('end')
    // console.log('here', fileProgress)
    //   }
    //   catch(error) {
    //     console.log('error',error)
    //   }
    // })

    showUploadedDocuments();
  }, []);

  const dispatch = useDispatch();
  const fileProgress = useSelector(
    (state) => state.fileUploadReducer.fileProgress,
  );

  const handleRemove = async (item) => {
    console.log('Removing....');
    console.log('ITEM:', item);
    setItem(item);
    setModal(true);
  };

  const deleteFile = async (item) => {
    console.log('ITEM: ', item);
    setSpinner(true);
    const token = await getToken();
    try {
      const response = await axios.delete(
        'http://67.207.86.39:8000/api/v1/application/document/delete',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          data: {
            id: item.documentID,
          },
        },
      );
      // console.log('del res: ', response);
      // console.log(item.id);
      // dispatch(deleteUploadedFile(item.id));
      // dispatch(showUploadedFiles(item.id));
      console.log('here', Object.values(fileProgress));
      // getUserData();
      // showUploadedDocuments();
      Object.values(fileProgress).forEach((el) => {
        if (el.id == item.id) {
          el.isUploaded = false;
          // showUploadedDocuments();
          // console.log('here', Object.values(fileProgress));
          dispatch(deleteUploadedFile(el.id));
          setSpinner(false);
          // dispatch(showUploadedFiles(item.documentID, item.id));
          // console.log('The element:', el.isUploaded);
        }
      });
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  return (
    <>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}>
          {Object.values(fileProgress).map(
            (item, index) =>
              item.isUploaded && (
                <View
                  key={index}
                  style={[
                    styles.flexRow,
                    {
                      backgroundColor: COLORS.white,
                      borderRadius: 10,
                      paddingHorizontal: 18,
                      paddingVertical: 25,
                      elevation: 0.5,
                      marginBottom: 10,
                      // borderWidth: 1,
                      // borderColor: '#EEEEEE',
                    },
                  ]}>
                  <View style={{flex: 1}}>
                    <View
                      style={[
                        styles.flexRow,
                        {marginBottom: 0, alignItems: 'center'},
                      ]}>
                      <Image
                        source={icons.featherFileText}
                        style={{width: 17, height: 21, marginRight: 8}}
                      />
                      <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                        {item.title}
                      </Text>
                    </View>
                    <View style={styles.flexRow}>
                      {item.isUploaded && (
                        <Text
                          style={{
                            color: COLORS.secondary,
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.secondary,
                            marginTop: 5,
                          }}>
                          {name + '-'}
                          {item.title}
                        </Text>
                      )}
                      {item.isUploaded && (
                        <TouchableOpacity
                          style={{marginLeft: 10, top: 5, alignSelf: 'center'}}
                          onPress={() => deleteFile(item)}>
                          <Icon
                            name="trash-outline"
                            size={14}
                            style={{color: COLORS.grey, width: 14, height: 14}}
                          />
                        </TouchableOpacity>
                      )}
                      {!item.isUploaded && !item.isUploading && (
                        <Text style={{color: '#ADADAD'}}>No file uploaded</Text>
                      )}
                      {item.isUploading && (
                        <View style={{flex: 1, marginRight: 20}}>
                          <View
                            style={[
                              styles.flexRow,
                              {
                                justifyContent: 'space-between',
                                paddingHorizontal: 3,
                              },
                            ]}>
                            <Text style={{color: COLORS.grey}}>
                              {name}
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                              }}>{`${item.progress}%`}</Text>
                          </View>
                          <ProgressBar
                            style={{borderColor: 'transparent', height: 5}}
                            progress={item.progress}
                            color={COLORS.secondary}
                            unfilledColor={COLORS.grey}
                            width={null}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => {
                      // if (item.title == 'Bank Statement') {
                      //   // console.log('redirect to upload bank statment page');
                      //   // navigation.navigate('UploadBankStatement');
                      //   navigation.navigate('RentalLoanFormBankStatementUpload');
                      // } else {
                      //   selectOneFile(item);
                      // }
                      selectOneFile(item);
                    }}>
                    <Image
                      source={images.group3745}
                      style={{
                        width: 30,
                        height: 30,
                        alignSelf: 'flex-end',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                      }}
                    />
                  </TouchableOpacity> */}
                  {!item.isUploading && (
                    <Image
                      source={
                        item.isUploaded == true
                          ? icons.group2116
                          : icons.group3743
                      }
                      style={{width: 18, height: 18, marginRight: 0, top: 15}}
                    />
                  )}
                </View>
              ),
          )}
        </View>
      </ScrollView>

      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
        isVisible={modal}>
        <View
          style={{
            backgroundColor: '#FFF',
            paddingVertical: 40,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            Do you want to delete file?
          </Text>
          <View style={[styles.actionBtnContainer]}>
            <TouchableOpacity
              style={[styles.actionBtn]}
              onPress={() => setModal(false)}>
              <Text style={[styles.actionBtnText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn]} onPress={deleteFile}>
              <Text style={[styles.actionBtnText]}>Delete</Text>
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
    marginTop: 30,
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  documentList: {
    backgroundColor: COLORS.white,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
    // marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f9f9f9',

    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },

  actionBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  actionBtn: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 5,
  },

  actionBtnText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  // Upload style
  flexRow: {
    flexDirection: 'row',
  },
});
