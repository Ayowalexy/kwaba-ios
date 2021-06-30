import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images} from '../../../util/index';
import AddCardModal from '../../../components/addCardModal';
import {useSelector} from 'react-redux';
import {
  createSavingsPlan,
  subscribeToSavingsPlan,
  oneOffPayment,
  verifyPayment,
} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

export default function Screen4({navigation}) {
  const [spinner, setSpinner] = useState(false);
  const [verificationSpinner, setVerificationSpinner] = useState(false);
  const store = useSelector((state) => state.soloSavingReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const addCard = () => {
    setModalVisible(false);
    setShowCard(true);
  };

  const handleTransactions = async () => {
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
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={35}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      {store.instant_saved_amount && store.instant_saved_amount.length > 0 && (
        <Text style={[designs.boldText, {marginTop: 35}]}>
          From your savings setup, you made a decision to make a deposit of{' '}
          <Text style={{color: 'black'}}>₦{store.instant_saved_amount}</Text> in
          addition to your savings plan. Your transactions will be handled
          all-together.
        </Text>
      )}
      <Text style={[designs.boldText, {marginTop: 35}]}>
        Choose how you want to pay
      </Text>
      {showCard && (
        <TouchableOpacity
          onPress={handleTransactions}
          style={designs.creditCard}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="folder-outline" size={20} color="#D6D6D6" />
            <Text
              style={{
                fontSize: 15,
                lineHeight: 19,
                fontWeight: '600',
                color: '#2A286A',
                marginLeft: 10,
              }}>
              {cardNumber.length
                ? cardNumber.slice(cardNumber.length - 4)
                : '_'}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 12,
                lineHeight: 15,
                fontWeight: '700',
                marginRight: 10,
              }}>
              EXPIRES{' '}
              {expiryDate
                ? `${expiryDate.substr(0, 2)}/${expiryDate.substr(2, 4)}`
                : '_'}
            </Text>
            <Image
              style={{width: 47, height: 30}}
              source={images.masterCardSymbol}
            />
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 17,
          height: 70,
          width: 380,
        }}>
        <Icon name="add" size={20} color="#00DC99" />
        <Text
          style={{
            color: '#00DC99',
            fontSize: 14,
            fontWeight: '700',
            lineHeight: 30,
          }}>
          ADD NEW CARD
        </Text>
      </TouchableOpacity>
      <Spinner
        visible={spinner}
        textContent={'Initializing transactions...'}
        animation="fade"
        textStyle={{
          color: '#2A286A',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 30,
        }}
        size="large"
      />
      <Spinner
        visible={verificationSpinner}
        textContent={'Verifying transactions...'}
        animation="fade"
        textStyle={{
          color: '#2A286A',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 30,
        }}
        size="large"
      />
      <View>
        <AddCardModal
          onConfirm={addCard}
          onRequestClose={() => setModalVisible(!modalVisible)}
          visible={modalVisible}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
          cvv={cvv}
          setCVV={setCvv}
        />
      </View>

      <Modal visible={successModal} animationType="fade" transparent={true}>
        <View style={designs.modal}>
          <View style={designs.successModal}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#465969"
            />
            <Image source={icons.tick} />
            <Text style={[designs.boldText, {marginTop: 45, fontSize: 22}]}>
              Great work
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 14,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 15,
              }}>
              Solos savings has been set up
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSuccessModal(false);
                navigation.navigate('SoloSavingDashBoard');
              }}
              style={[designs.button, {marginTop: 55, width: 340}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                }}>
                NICE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
