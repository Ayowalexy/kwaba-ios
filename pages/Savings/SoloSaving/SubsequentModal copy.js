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

export default function SubsequentModal(props) {
  const {onRequestClose, visible, goToDashboard} = props;
  const [subsequent, setSubsequent] = useState('');
  const subsequentOptions = ['Yes', 'No'];

  const [spinner, setSpinner] = useState(false);
  const [userID, setUserID] = useState(null);
  const store = useSelector((state) => state.soloSavingReducer);

  // const handleTransactions = async () => {
  //   try {
  //     if (store.instant_saved_amount && store.instant_saved_amount.length > 0) {
  //       console.log('Instant Saving');
  //     } else {
  //       console.log('Not saving now');
  //     }
  //   } catch (error) {
  //     console.log('error:', error);
  //   }
  // };

  useEffect(() => {
    const getUserID = async () => {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      console.log('User ID: ', userData.user.id);
      setUserID(userData.user.id);
    };
    getUserID();
  }, []);

  const handleTransactions = async () => {
    console.log('******************************');
    // close modal
    onRequestClose();
    try {
      if (store.instant_saved_amount && store.instant_saved_amount.length > 0) {
        setSpinner(true);
        const response = await makeOneOffPayment();
        console.log('RESPONSE:', response.data.data);
        if (response.status === 200) {
          setSpinner(false);
          const result = await openInAppBrowser(
            response.data.data.authorization_url,
          );
          console.log(result.type);
          if (result.type === 'cancel') {
            let data = {reference: response.data.data.reference};
            // setVerificationSpinner(true);
            const verify = await verifyPayment(data);
            console.log('Verify', verify.data);
            // console.log('Verify: ', verify);
            if (verify.data.status == 'success') {
              console.log('createPlan');
              // setVerificationSpinner(false);
              await createPlan();
            } else {
              // setVerificationSpinner(false);
              Alert.alert(
                'Payment Unverified',
                'Your payment was not verified. Please retry.',
              );
            }
          }
        }
      } else {
        await createPlan();
      }
    } catch (error) {
      // setSpinner(false);
      console.log('error', error);
    }
  };

  const createPlan = async () => {
    console.log('Creating...');
    const data = {
      savings_amount: Number(store.savings_amount),
      // savings_target_amount: Number(store.savings_target_amount),
      savings_frequency: store.savings_frequency.toLowerCase(),
      // savings_account_number: '0094552107',
      // savings_account_name: 'JOSHUA UDO NWOSU',
      // savings_bank_code: '063',
      savings_account_number: '',
      savings_account_name: '',
      savings_bank_code: '',
      savings_tenure: Number(store.savings_tenure[0]),
      savings_title: store.savings_title,
      // savings_start_date: store.savings_start_date,
      // savings_end_date: store.savings_end_date,
      savings_start_date: '2021-07-27',
      savings_end_date: '2021-07-27',
      locked: store.locked,
      user_id: userID,
    };

    try {
      setSpinner(true);
      const response = await createSavingsPlan(data);
      if (response.status === 201) {
        //On successfully creating savings plan, create a subscription
        const sub = await subscribeToSavingsPlan();

        console.log('SUB: ', sub);

        if (sub.status === 200) {
          setSpinner(false);

          //Open InAppBrowser for paystack transaction
          const result = await openInAppBrowser(
            sub.data.data.authorization_url,
          );

          if (result.type === 'cancel') {
            let verifyData = {reference: sub.data.data.reference};
            console.log('The Verify Data: ', verifyData);
            // setVerificationSpinner(true);
            const verify = await verifyPayment(verifyData);
            if (verify.data.status == 'success') {
              // setVerificationSpinner(false);
              setSuccessModal(true);
              console.log('Payment verified');

              goToDashboard();
            } else {
              // setVerificationSpinner(false);
              // Alert.alert(
              //   'Payment Unverified',
              //   'Your payment was not verified. Please retry.',
              // );
              console.log(
                'Payment Unverified',
                'Your payment was not verified. Please retry.',
              );
            }
          }
        } else {
          setSpinner(false);
          // Alert.alert('Request Failed - Subscribe', sub);
          console.log('Request Failed - Subscribe', sub);
        }
      } else {
        setSpinner(false);
        // Alert.alert('Request Failed - Create Plan', response);
        console.log('Request Failed - Create Plan', response);
      }
    } catch (error) {
      setSpinner(false);
      // Alert.alert('Error', 'An error occurred, please retry');
      console.log('catch error', error.response);
    }
  };

  const makeOneOffPayment = async () => {
    const data = {
      instant_saved_amount: Number(unFormatNumber(store.instant_saved_amount)),
      savings_tenure: Number(store.savings_tenure[0]),
      locked: store.locked,
    };

    console.log('DATA:', data);

    try {
      const response = await oneOffPayment(data);
      return response;
    } catch (error) {
      setSpinner(false);
      console.log('catch error', error);
      Alert.alert('Error', 'An error occurred, please retry');
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
                  // onPress={() => {
                  //   onRequestClose();
                  //   handleTransactions();
                  //   // if (value.toLowerCase() === 'yes') {
                  //   //   setSubsequent(value);
                  //   // } else if (value.toLowerCase() === 'no') {
                  //   //   setSubsequent(value);
                  //   // }
                  // }}
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
