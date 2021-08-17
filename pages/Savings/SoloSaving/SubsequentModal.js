import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../util';
import {useSelector} from 'react-redux';
import {
  createSavingsPlan,
  subscribeToSavingsPlan,
  oneOffPayment,
  verifyPayment,
} from '../../../services/network';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import Spinner from 'react-native-loading-spinner-overlay';
import {unFormatNumber} from '../../../util/numberFormatter';
import moment from 'moment';
import {savings} from '../../../util/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function SubsequentModal(props) {
  const {onRequestClose, visible, goToDashboard, savingsData} = props;
  const [subsequent, setSubsequent] = useState('');
  const subsequentOptions = ['Yes', 'No'];

  const [spinner, setSpinner] = useState(false);
  const [userID, setUserID] = useState(null);
  const store = useSelector((state) => state.soloSavingReducer);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  // const handleTransactions = async () => {
  //   await createUserSavings();
  // };

  const verifyPayment = async (data) => {
    const token = await getToken();
    const url = 'http://67.207.86.39:8000/api/v1/verify_savings_payment';
    try {
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return error.message;
    }
  };

  const handleTransactions = async () => {
    const url = 'http://67.207.86.39:8000/api/v1/user_create_savings';
    const data = savingsData;
    try {
      setSpinner(true);
      const token = await getToken();
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (response.status == 200) {
        // console.log('Response', response.data.data);
        const result = await openInAppBrowser(
          response.data.data.authorization_url,
        );
        setSpinner(false);
        onRequestClose();

        if (result.type == 'cancel') {
          let data = {reference: response.data.data.reference};
          const verify = await verifyPayment(data);

          if (verify?.data?.statusMsg == 'Savings payment verify successful') {
            // console.log('createPlan');
            goToDashboard();
          } else {
            Alert.alert(
              'Payment Unverified',
              'Your payment was not verified. Please retry.',
            );
          }
        }
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const openInAppBrowser = async (url) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#2A286A',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          hasBackButton: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });

        return result;
      } else Linking.openURL(url);
    } catch (error) {
      return error.message;
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  width: 260,
                  color: '#465969',
                  lineHeight: 25,
                }}>
                Do you want to use this payment option for subsequent rent
                saving?
              </Text>

              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={25}
                color="#465969"
              />
            </View>
            <View style={{marginTop: 20}}>
              {subsequentOptions.map((value, index) => (
                <TouchableOpacity
                  onPress={
                    value.toLowerCase() == 'yes'
                      ? handleTransactions
                      : onRequestClose
                  }
                  key={index}
                  style={{
                    paddingVertical: 15,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14 + index,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }}>
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      <Spinner visible={spinner} animation="fade" size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
});
