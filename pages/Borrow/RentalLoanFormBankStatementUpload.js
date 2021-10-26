import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import ManualUploadModal from '../../components/ManualUploadModal';
import {MonoProvider, useMonoConnect} from '@mono.co/connect-react-native';
import {uploadFile} from '../../redux/actions/documentUploadActions';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const ConnectWithMono = () => {
  const {init} = useMonoConnect();
  return (
    <TouchableOpacity onPress={() => init()} style={[styles.card]}>
      <Text style={[styles.title]}>Mobile/interent banking</Text>
      <Text style={[styles.body]}>
        Securely send us your bank statement from your mobile/internet banking.
        We do not have access to your login details or money in your account.
      </Text>
      <Image source={images.mobileInternetBanking} style={[styles.img]} />
    </TouchableOpacity>
  );
};

export default function RentalLoanFormBankStatementUpload(props) {
  const {navigation, route} = props;
  const item = route.params.item;
  useEffect(() => {
    console.log('The Real Item: ', item);
  }, []);
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const [showManualUploadModal, setShowManualUploadModal] = useState(false);
  const bankStatementUpload = [
    {
      title: 'Manual Upload',
      body:
        'Upload your bank statement directly from your phone if you have it handy',
      img: images.manualUpload,
    },
    {
      title: 'Mobile/interent banking',
      body:
        'Securely send us your bank statement from your mobile/internet banking. We do not have access to your login details or money in your account.',
      img: images.mobileInternetBanking,
    },
    {
      title: 'Bank request',
      body:
        'Request your bank statement directly from your bank via email seamlessly.',
      img: images.bankRequest,
    },
  ];

  const config = {
    publicKey: 'live_pk_3MSVtE6Jtj2K6ZGMrkCT',
    onClose: () => console.log('Widget closed'),
    onSuccess: async (data) => {
      const code = data.getAuthCode();
      console.log('Access code', code);
      // await postData(code);
    },
    onEvent: (eventName, data) => {
      // optional
      console.log('The Event Name: ', eventName);
      console.log('The Data: ', data);
    },
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const uploadBankStatementFile = async () => {
    try {
      setSpinner(true);
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

        // setFileProgress(20);

        const token = await getToken();
        const applicationIDCallRes = await axios.get(
          'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
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
          'https://api.cloudinary.com/v1_1/kwaba/auto/upload',
          formdata,
        );

        const data = {
          applicationId,
          file: response.data.url,
          document_type: item.id,
          filename: item.title,
        };

        try {
          dispatch(uploadFile(token, item, data));
          navigation.goBack();
          setSpinner(false);
        } catch (error) {
          console.log('The Error: ', error);
          setSpinner(false);
        }
      } else {
        console.log('File permission denied');
        // setFileProgress(0);
        setSpinner(false);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('This was canceled');
        setSpinner(false);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        setSpinner(false);
        console.log('This is the error: ', error);
        // setFileProgress(0);
      }
    }
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          fontWeight: '900',
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
        color={COLORS.primary}
      />
      <ScrollView>
        <View style={styles.content}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: COLORS.primary}}>
            Bank Statement Upload
          </Text>

          <View>
            <TouchableOpacity
              onPress={() => uploadBankStatementFile()}
              // onPress={() => setShowManualUploadModal(!showManualUploadModal)}
              style={[styles.card]}>
              <Text style={[styles.title]}>Manual Upload</Text>
              <Text style={[styles.body]}>
                Upload your bank statement directly from your phone if you have
                it handy.
              </Text>
              <Image source={images.manualUpload} style={[styles.img]} />
            </TouchableOpacity>

            <MonoProvider {...config}>
              <ConnectWithMono />
            </MonoProvider>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RentalLoanFormBankStatementUploadEmail')
              }
              style={[styles.card]}>
              <Text style={[styles.title]}>Bank request</Text>
              <Text style={[styles.body]}>
                Request your bank statement directly from your bank via email
                seamlessly.
              </Text>
              <Image source={images.bankRequest} style={[styles.img]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ManualUploadModal
        onRequestClose={() => setShowManualUploadModal(!showManualUploadModal)}
        visible={showManualUploadModal}
        navigation={navigation}
        // onClick={(value) => setSelectedPayMethod(value)}
        onClick={(value) => {
          //setSelectedPayMethod(value)
        }}
      />

      <Spinner visible={spinner} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 0.5,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },

  text: {
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 0,
    color: '#BFBFBF',
    lineHeight: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  body: {
    fontSize: 12,
    lineHeight: 20,
    color: '#ADADAD',
    marginTop: 20,
    width: '80%',
    // fontWeight: 'bold',
  },
  img: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    top: -20,
  },
});
