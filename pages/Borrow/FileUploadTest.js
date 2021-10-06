import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import fileUploadReducer from '../../redux/reducers/documentUploadReducers';
import {
  deleteUploadedFile,
  showUploadedFiles,
  uploadFile,
} from '../../redux/actions/documentUploadActions';
import RNFS from 'react-native-fs';
import axios from 'axios';
import ProgressBar from 'react-native-progress/Bar';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

const getDocuments = async () => {
  const token = await getToken();
  try {
    const uploadedDocumentsRes = await axios.get(
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/documents',
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

const FileUploadTest = ({navigation}) => {
  const [documents, setDocuments] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setName(JSON.parse(userData).username);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const showUploadedDocuments = async () => {
      const documentsUploaded = await getDocuments();
      documentsUploaded.forEach((document) => {
        const id = Number(document.document_type);
        console.log(document.filename);
        try {
          dispatch(
            showUploadedFiles(Number(document.document_type), document.id),
          );
          //console.log('here', fileProgress)
        } catch (error) {
          console.log('error', error);
        }
      });
    };

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
  //console.log(fileProgress)

  const store = useSelector((state) => state);

  const appendID = async (item) => {
    const documentsUploaded = await getDocuments();
    //console.log('blue', documentsUploaded)
    const index = await documentsUploaded.findIndex(
      (document) => Number(document.document_type) == item.id,
    );
    const id = Number(documentUploaded[index].document_type);
    try {
      dispatch(showUploadedFiles(id, documentUploaded[index].id));
      // console.log('here', fileProgress)
    } catch (error) {
      console.log('error', error);
    }
  };

  //   console.log(store);

  //   const handleSubmit = async() => {
  //     const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
  //     console.log(loanFormData);
  //     navigation.navigate('UploadDocuments')
  //   };

  const selectOneFile = async (item) => {
    //console.log('1', item);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log('work',
      //   res.uri,
      //   res.type, // mime type
      //   res.name,
      //   res.size
      // );
      const base64File = await RNFS.readFile(res.uri, 'base64');
      //console.log(base64File);
      const convertedFile = `data:${res.type},${base64File}`;
      console.log(convertedFile);

      const token = await getToken();
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      console.log(applicationIDCallRes.data.data.id);
      const applicationId = applicationIDCallRes.data.data.id;

      const data = {
        applicationId,
        file: convertedFile,
        document_type: item.id,
        filename: item.title,
      };

      try {
        dispatch(uploadFile(token, item, data));
        appendID(item);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log(err);
      }
    }
  };

  const deleteFile = async (item) => {
    const token = await getToken();
    try {
      const response = await axios.delete(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/document/delete',
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
      console.log(response);
      console.log(item.id);
      await dispatch(deleteUploadedFile(item.id));
      console.log('here', fileProgress);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = async () => {
    const documentsUploaded = await getDocuments();
    let numberOfFiles = 0;
    documentsUploaded.forEach((document) => {
      const id = Number(document.document_type);
      console.log(document.filename);
      numberOfFiles++;
    });

    console.log('number of files' + numberOfFiles);
    const borrwSteps = await AsyncStorage.getItem('borrwsteps');
    const steps = JSON.parse(borrwSteps);

    if (numberOfFiles >= 5) {
      let stepsdata = {
        documentdone: 'done',
        propertydetail: '',
        landlorddetail: '',
        refree: '',
        offeraccepted: '',
        addressverification: '',
        debitmandate: '',
        awaitingdisbursment: '',
      };

      await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));
      console.log('steps here' + JSON.stringify(steps));
      navigation.navigate('PostPaymentForm1');
    } else {
      Alert.alert('Missing files', 'Please upload all files', [
        {text: 'Close'},
      ]);
    }
  };

  return (
    <ScrollView style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{marginTop: 28, marginLeft: 25, fontWeight: '900'}}
        color={COLORS.primary}
      />
      <View
        style={{
          marginVertical: 11,
          marginHorizontal: 16,
        }}>
        <Text
          style={[
            FONTS.h1FontStyling,
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              marginBottom: 15,
            },
          ]}>
          All Documents
        </Text>

        {Object.values(fileProgress).map((item, index) => (
          <View
            key={index}
            style={[
              designs.flexRow,
              {
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingHorizontal: 18,
                paddingVertical: 20,
                elevation: 6,
                marginBottom: 25,
              },
            ]}>
            <View style={{flex: 1}}>
              <View
                style={[
                  designs.flexRow,
                  {marginBottom: 16, alignItems: 'center'},
                ]}>
                <Image
                  source={icons.featherFileText}
                  style={{width: 17, height: 21, marginRight: 8}}
                />
                <Text>{item.title}</Text>
              </View>
              <View style={designs.flexRow}>
                {!item.isUploading && (
                  <Image
                    source={
                      item.isUploaded == true
                        ? icons.group2116
                        : icons.group3743
                    }
                    style={{width: 16, height: 16, marginRight: 12}}
                  />
                )}
                {item.isUploaded && (
                  <Text
                    style={{
                      color: COLORS.secondary,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.secondary,
                    }}>
                    {name}
                    {item.title}
                  </Text>
                )}
                {item.isUploaded && (
                  <TouchableOpacity
                    style={{marginLeft: 4, alignSelf: 'center'}}
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
                        designs.flexRow,
                        {justifyContent: 'space-between', paddingHorizontal: 3},
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
            <TouchableOpacity
              onPress={() => {
                if (item.title == 'Bank Statement') {
                  console.log('redirect to upload bank statment page');
                  navigation.navigate('UploadBankStatement');
                } else {
                  selectOneFile(item);
                }
              }}>
              <Image
                source={images.group3745}
                style={{
                  width: 39,
                  height: 39,
                  alignSelf: 'flex-end',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => {
          handleNavigation();
        }}
        style={[designs.button, {backgroundColor: COLORS.secondary}]}>
        <Text style={{color: COLORS.white, textAlign: 'center'}}>FINISH</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FileUploadTest;
