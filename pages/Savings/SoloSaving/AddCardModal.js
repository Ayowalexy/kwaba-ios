import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

export default function AddCardModal(props) {
  const {onRequestClose, visible} = props;

  const [cardNumber, setCardNumber] = useState('2222 2222 2222 2222');
  const [expiryDate, setExpiryDate] = useState('11/21');
  const [cvv, setCVV] = useState('234');

  const [spinner, setSpinner] = useState(false);

  const store = useSelector((state) => state.soloSavingReducer);

  //   const onConfirm = async () => {
  //     if (cardNumber.length < 16 || expiryDate.length < 1 || cvv.length < 3)
  //       return false;
  //     else {
  //       await handleTransactions();
  //     }
  //   };

  const handleTransactions = async () => {
    console.log(store);
    try {
      if (store.instant_saved_amount && store.instant_saved_amount.length > 0) {
        setSpinner(true);
        const response = await makeOneOffPayment();
        if (response.status === 200) {
          setSpinner(false);
          const result = await openInAppBrowser(
            response.data.data.authorization_url,
          );
          if (result.type === 'cancel') {
            let data = {reference: response.data.data.reference};
            setVerificationSpinner(true);
            const verify = await verifyPayment(data);
            if (verify.data.status == 'success') {
              setVerificationSpinner(false);
              await createPlan();
            } else {
              setVerificationSpinner(false);
              Alert.alert(
                'Payment Unverified',
                'Your payment was not verified. Please retry.',
              );
            }
          }
        }
      } else {
        return await createPlan();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const createPlan = async () => {
    console.log('Creating...');
    const data = {
      savings_amount: Number(store.savings_amount),
      savings_frequency: store.savings_frequency.toLowerCase(),
      savings_account_number: '',
      savings_account_name: '',
      savings_bank_code: '',
      savings_tenure: Number(store.savings_tenure[0]),
      savings_title: store.savings_title,
      savings_start_date: store.savings_start_date,
      savings_end_date: store.savings_end_date,
      locked: store.locked,
    };
    try {
      setSpinner(true);
      const response = await createSavingsPlan(data);
      if (response.status === 201) {
        //On successfully creating savings plan, create a subscription
        const sub = await subscribeToSavingsPlan();

        if (sub.status === 200) {
          setSpinner(false);

          //Open InAppBrowser for paystack transaction
          const result = await openInAppBrowser(
            sub.data.data.authorization_url,
          );
          if (result.type === 'cancel') {
            let verifyData = {reference: sub.data.data.reference};
            setVerificationSpinner(true);
            const verify = await verifyPayment(verifyData);
            if (verify.data.status == 'success') {
              setVerificationSpinner(false);
              setSuccessModal(true);
            } else {
              setVerificationSpinner(false);
              Alert.alert(
                'Payment Unverified',
                'Your payment was not verified. Please retry.',
              );
            }
          }
        } else {
          setSpinner(false);
          Alert.alert('Request Failed', sub);
        }
      } else {
        setSpinner(false);
        Alert.alert('Request Failed', response);
      }
    } catch (error) {
      setSpinner(false);
      console.log('catch error', error);

      Alert.alert('Error', 'An error occurred, please retry');
    }
  };

  const makeOneOffPayment = async () => {
    const data = {
      instant_saved_amount: Number(store.instant_saved_amount),
      savings_tenure: Number(store.savings_tenure[0]),
      locked: store.locked,
    };

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
                  color: '#2A286A',
                  fontFamily: 'CircularStd',
                  fontWeight: 'bold',
                  fontSize: 18,
                  lineHeight: 19,
                }}>
                Add Card
              </Text>
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={25}
                color="#465969"
              />
            </View>

            <TextInput
              style={[styles.textInput, {marginTop: 18}]}
              placeholder="Card number"
              keyboardType="number-pad"
              placeholderTextColor="#ADADAD"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text)}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 18,
              }}>
              <TextInput
                style={[styles.textInput, {width: '48%'}]}
                placeholder="Expiry Date"
                keyboardType="numeric"
                placeholderTextColor="#ADADAD"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text)}
              />
              <TextInput
                style={[styles.textInput, {width: '48%'}]}
                placeholder="CVV"
                keyboardType="number-pad"
                placeholderTextColor="#ADADAD"
                value={cvv}
                onChangeText={(text) => setCVV(text)}
              />
            </View>

            <TouchableOpacity
              onPress={handleTransactions}
              style={[styles.btn, {backgroundColor: COLORS.secondary}]}>
              <Text style={{color: 'white'}}>CONFIRM</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Icon
                name="lock-closed"
                style={{fontSize: 20, marginRight: 10, color: COLORS.primary}}
              />
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: COLORS.primary, fontSize: 12}}>
                  Secured by
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: COLORS.primary,
                    fontSize: 12,
                  }}>
                  {' '}
                  paystack
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Spinner
        visible={spinner}
        // textContent={'Initializing transactions...'}
        animation="fade"
        // textStyle={{
        //   color: '#2A286A',
        //   fontSize: 20,
        //   fontWeight: 'bold',
        //   lineHeight: 30,
        // }}
        size="large"
      />
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    padding: 20,
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
