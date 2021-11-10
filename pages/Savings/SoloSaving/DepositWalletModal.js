import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {images, icons, COLORS} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AddCardModal from './AddCardModal';
import SubsequentModal from './SubsequentModal';
import {
  unFormatNumber,
  numberWithCommas,
  formatNumber,
} from '../../../util/numberFormatter';
import designs from './style';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DepositWalletModal(props) {
  const {
    store,
    visible,
    onRequestClose,
    navigation,
    savingsData,
    channel,
  } = props;
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    console.log('The store: ', savingsData);
    console.log('The channel: ', channel);
  }, []);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const verifyPayment = async (data) => {
    const token = await getToken();
    const url =
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/verify_savings_payment';
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
    const url =
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/user_create_savings';
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
        setSpinner(false);
        onRequestClose();
        // setModal(true);

        const resData = response.data.data;
        // setResDataObj(resData);
        console.log('Res Data: ', resData);

        const data = {
          reference: response.data.data.reference,
          channel: channel,
        };

        const verify = await verifyPayment(data);

        console.log('Verify: ', verify);

        if (verify.status == 200) {
          setSpinner(false);
          console.log('Done Verify Payment');
          navigation.navigate('PaymentSuccessful', {
            name: 'SoloSavingDashBoard',
            id: response.data.data.id,
          });
        }

        console.log('The DATA OBJ: ', data);
      }
    } catch (error) {
      console.log('Error: ', error);
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
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            fontFamily: 'CircularStd',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              minHeight: 200,
              backgroundColor: '#fff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              //   padding: 25,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={onRequestClose}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: COLORS.grey,
                  borderRadius: 30,
                  position: 'absolute',
                  right: 20,
                  top: 20,

                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0.3,
                }}>
                <Icon name="close" size={25} color={COLORS.dark} />
              </TouchableOpacity>

              <View
                style={{marginTop: 70, width: '100%', paddingHorizontal: 25}}>
                {savingsData?.savings_amount > 50 && (
                  <Text
                    style={{
                      fontSize: 15,
                      width: 260,
                      color: '#465969',
                      lineHeight: 25,
                    }}>
                    You are about to deposit{' '}
                    <Text style={{color: '#00DC99', fontWeight: 'bold'}}>
                      ₦{formatNumber(savingsData.savings_amount)}
                    </Text>{' '}
                    towards your rent savings.
                  </Text>
                )}

                {/* {savingsData?.savings_amount <= 50 && (
                  <Text
                    style={{
                      fontSize: 15,
                      width: 260,
                      color: '#465969',
                      lineHeight: 25,
                    }}>
                    To verify your card you will be charged{' '}
                    <Text style={{color: '#00DC99', fontWeight: 'bold'}}>
                      ₦{formatNumber(savingsData.savings_amount)}.
                    </Text>{' '}
                    This money goes towards your rent savings.
                  </Text>
                )} */}

                <TouchableOpacity
                  onPress={() => {
                    handleTransactions();
                    console.log('Yhis is JoshuA');
                  }}
                  style={[
                    designs.button,
                    {
                      marginTop: 15,
                      backgroundColor: '#00DC99',
                    },
                  ]}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 12,
                      lineHeight: 30,
                    }}>
                    CONFIRM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />
    </>
  );
}
