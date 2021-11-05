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

export default function DepositModal(props) {
  const {
    store,
    visible,
    onRequestClose,
    navigation,
    storeData,
    showModal,
  } = props;

  useEffect(() => {
    console.log('The store: ', storeData);
  }, [storeData]);

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
                {storeData?.savings_amount > 50 && (
                  <Text
                    style={{
                      fontSize: 15,
                      width: 260,
                      color: '#465969',
                      lineHeight: 25,
                    }}>
                    You are about to deposit{' '}
                    <Text style={{color: '#00DC99', fontWeight: 'bold'}}>
                      ₦{formatNumber(storeData.savings_amount)}
                    </Text>{' '}
                    towards your rent savings.
                  </Text>
                )}

                {storeData?.savings_amount <= 50 && (
                  <Text
                    style={{
                      fontSize: 15,
                      width: 260,
                      color: '#465969',
                      lineHeight: 25,
                    }}>
                    To verify your card you will be charged{' '}
                    <Text style={{color: '#00DC99', fontWeight: 'bold'}}>
                      ₦{formatNumber(storeData.savings_amount)}.
                    </Text>{' '}
                    This money goes towards your rent savings.
                  </Text>
                )}

                <TouchableOpacity
                  onPress={() => {
                    onRequestClose();
                    showModal();
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
    </>
  );
}
