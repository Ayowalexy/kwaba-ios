import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../util';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getTokenizeCards,
  tokenizeCard,
  tokenizePayment,
  verifyPayment,
} from '../services/network';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

export default function AddPaymentCardModal(props) {
  const {onRequestClose, visible, onConfirm, setDisplayAllPaymentCards} = props;

  const [paymentCards, setPaymentCards] = useState([]);

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

  const addAccount = async () => {
    console.log('Opening paystack...');

    const data = {
      amount: 50,
    };

    try {
      const res = await tokenizePayment(data);
      // console.log('RES: ', res.data.data);
      if (res.status == 200) {
        const result = await openInAppBrowser(res.data.data.authorization_url);
        if (result.type == 'cancel') {
          let data = {reference: res.data.data.reference};
          const verify = await verifyPayment(data);

          if (verify.status == 200) {
            const card = await tokenizeCard(data);

            if (card.data.status == 'success') {
              setPaymentCards([...paymentCards, card.data.card]);
            }
          } else {
            console.log('Your payment was not verified. Please retry.');
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDisplayAllPaymentCards(paymentCards);
  }, [paymentCards]);

  useEffect(() => {
    const getAllCards = async () => {
      try {
        const res = await getTokenizeCards();
        setPaymentCards(res.data.cards);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCards();
  }, []);

  return (
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onRequestClose}>
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
                    color: COLORS.dark,
                    fontFamily: 'CircularStd',
                    fontWeight: 'bold',
                    fontSize: 18,
                    lineHeight: 19,
                  }}>
                  Payment Card
                </Text>
                <Icon
                  onPress={onRequestClose}
                  name="close-outline"
                  size={30}
                  color="#465969"
                />
              </View>

              <View style={{marginVertical: 20}}>
                <Text
                  style={{
                    fontSize: 15,
                    width: '100%',
                    color: '#465969',
                    lineHeight: 25,
                    paddingRight: 80,
                  }}>
                  To verify your card you will be charged{' '}
                  <Text style={{color: '#00DC99', fontWeight: 'bold'}}>
                    ₦50.
                  </Text>{' '}
                  This money goes towards your rent savings.
                </Text>
              </View>

              <TouchableOpacity
                onPress={addAccount}
                style={[
                  styles.btn,
                  {
                    backgroundColor: COLORS.secondary,
                  },
                ]}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                  ADD CARD
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
    paddingVertical: 15,
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
  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});
