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
  Platform
} from 'react-native';
import {COLORS, FONTS, images, icons} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import SignatureScreen from 'react-native-signature-canvas';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { baseUrl } from '../../services/routes';
import Preloader from '../../components/Preloader';
import { getEmergencyLoans } from '../../services/network';
import { getCurrentApplication } from '../../services/network';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Signature({navigation}) {
  const [modalVisible, setVisible] = useState(false);
  const [signature, setSignature] = useState('');
  const [filename, setFilename] = useState('');
  const [spinner, setSpinner] = useState(false)
const top = useSafeAreaInsets().top;
  const [enableScroll, setEnableScroll] = useState(false);

  const ref = useRef();

  const handleSignature = (signature) => {
    // console.log('SIGN: ', signature);
    setSignature(signature);
  };

  const handleEnd = () => {
    ref.current?.readSignature();
    setEnableScroll(true);
  };

  const handleClear = () => {
    ref.current.clearSignature();
    setSignature('');
  };

  const handleBegin = () => {
    setEnableScroll(false);
  };

  const handleConfirm = async () => {
    // console.log('The sign here: ', signature);

    setSpinner(true)
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

    const path = RNFS.CachesDirectoryPath + 'sign.png';

    const token = await getToken();
    const user = await getUser();

    const getAllAloans = await getEmergencyLoans();
    const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
    const applicationIDCallRes =  await getCurrentApplication({id: loan_id})

    console.log(applicationIDCallRes.data.data.id);
    console.log(applicationIDCallRes.data.data);
    const applicationId = applicationIDCallRes.data.data.id;

    try {
      const response = await axios.put(
        `${baseUrl}/application/accept_offer`,
        {applicationId, signature},
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      if (response.status == 200) {
        const rentalSteps = await AsyncStorage.getItem('rentalSteps');
        const steps = JSON.parse(rentalSteps);
        let stepsData = {
          application_form: 'done',
          congratulation: 'done',
          all_documents: 'done',
          verifying_documents: 'done',
          offer_breakdown: 'done',
          property_detail: 'done',
          landlord_detail: 'done',
          referee_detail: 'done',
          offer_letter: 'done',
          address_verification: '',
          debitmandate: '',
          awaiting_disbursement: '',
          dashboard: '',
        };
        await AsyncStorage.setItem(
          `rentalSteps-${user.id}`,
          JSON.stringify(stepsData),
        );
        console.log('STEPS: ', steps);
        
        const rnplStep = {
          nextStage: 'Direct debit',
          completedStages: ['Credit score', 'Applications', 'Documents upload', 'Offer approval breakdown', 'Address verification', 'Property details']
        }

        await AsyncStorage.setItem('rnplSteps', JSON.stringify(rnplStep))

        setSpinner(false)
        // navigation.navigate('AddressVerificationPayment');
        navigation.navigate('PostPaymentForm1')
        // navigation.navigate('RnplDirectdebit');
      }
    } catch (error) {
      console.log(error.response.data);
    }

    console.log(path);
  };

  const style = `
    .m-signature-pad {
      flex: 1
      width: 100%;
      height: 100%;
      background-color: white;
      position: fixed;
      overflow: hidden
    }
  `;

  const attachFile = async () => {
    console.log('Awesome....');
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
        const file = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        const base64File = await RNFS.readFile(file.uri, 'base64');
        const convertedFile = `data:${file.type},${base64File}`;
        // console.log('Converted File: ', convertedFile);

        console.log('File name: ', file.name);
        setFilename(file.name);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        //  User cancelled the picker
      } else {
        console.log(error);
      }
    }
  };

  return (
    <View style={[styles.container, { marginTop: Platform.OS == 'ios' ? top : 0}]}>
      <Icon
        onPress={() => navigation.navigate('Borrow')}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
        color={COLORS.primary}
      />
      <Text style={[styles.heading]}>Signature</Text>

      <ScrollView
        scrollEnabled={enableScroll}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}>
          <View style={[styles.signLabel]}>
            {/* <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.primary}}>
              Sign Here
            </Text> */}
            <Text style={{fontSize: 14, marginTop: 0, color: COLORS.primary}}>
              Sign below to confirm your acceptance.
            </Text>
          </View>

          <View style={[styles.screen]}>
            <SignatureScreen
              ref={ref}
              onEnd={handleEnd}
              onOK={handleSignature}
              onBegin={handleBegin}
              // onEmpty={handleEmpty}
              // onClear={() => handleClear()}
              autoClear={false}
              // descriptionText={'Sign here'}
              webStyle={style}
            />
            <TouchableOpacity
              onPress={() => handleClear()}
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                paddingHorizontal: 20,
                paddingVertical: 15,
                backgroundColor: '#9D98EC30',
                zIndex: 2,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingVertical: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <View style={{width: '100%', height: 1, backgroundColor: '#999'}} />
            <View
              style={{
                backgroundColor: '#F7F8FD',
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                position: 'absolute',
                // borderWidth: 1,
              }}>
              <Text
                style={{
                  color: '#999',
                  fontWeight: 'bold',
                }}>
                Or
              </Text>
            </View>
          </View>

          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 5,
              fontSize: 12,
              color: COLORS.dark,
              fontWeight: 'bold',
            }}>
            {filename == '' ? 'Attached file name will appear here' : filename}
          </Text>

          <TouchableOpacity style={[styles.attach]} onPress={attachFile}>
            <Text
              style={{fontSize: 14, color: COLORS.primary, fontWeight: 'bold'}}>
              Attach signature file
            </Text>
            <Icon name="attach" size={25} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity style={[styles.btn]} onPress={handleConfirm}>
          <Text
            style={{
              fontSize: 12,
              color: COLORS.white,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            CONFIRM
          </Text>
        </TouchableOpacity>
      </View>
      <Spinner
        visible={spinner}
        setVisible={setSpinner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    paddingBottom: 100,
  },
  content: {
    paddingHorizontal: 20,
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

  screen: {
    backgroundColor: '#FFF',
    width: '100%',
    height: 250,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#999',
    overflow: 'hidden',
  },

  attach: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#9D98EC30',
    paddingHorizontal: 20,
    paddingVertical: 20,
    // marginHorizontal: 20,
    // elevation: 20,
    shadowColor: COLORS.secondary,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
    paddingVertical: 25,
    // marginHorizontal: 20,
    // elevation: 20,
    shadowColor: COLORS.secondary,
    marginBottom: 20,
  },
});
