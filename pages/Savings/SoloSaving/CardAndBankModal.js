import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {images, icons} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AddCardModal from './AddCardModal';
import SubsequentModal from './SubsequentModal';
import {unFormatNumber, numberWithCommas} from '../../../util/numberFormatter';

export default function CardAndBankModal(props) {
  const {store, visible, onRequestClose, navigation} = props;
  const [addCardModal, setAddCardModal] = useState(false);
  const [subsequentModal, setSubsequentModal] = useState(false);

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
              padding: 25,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {store.saving_start_option == 'today' &&
                store.instant_saved_amount != '' &&
                store.instant_saved_amount.length > 0 && (
                  <Text
                    style={{
                      fontSize: 15,
                      width: 260,
                      color: '#465969',
                      lineHeight: 25,
                    }}>
                    You are about to deposit{' '}
                    <Text style={{color: '#00DC99', fontWeight: 'bold'}}>
                      ₦
                      {numberWithCommas(
                        unFormatNumber(store.instant_saved_amount),
                      )}
                    </Text>{' '}
                    towards your rent savings.
                  </Text>
                )}

              {store.saving_start_option == 'pick_date' && (
                <Text
                  style={{
                    fontSize: 15,
                    width: 260,
                    color: '#465969',
                    lineHeight: 25,
                  }}>
                  To verify your card you will be charged{' '}
                  <Text style={{color: '#00DC99', fontWeight: 'bold'}}>
                    ₦{numberWithCommas(50)}.
                  </Text>{' '}
                  This money goes towards your rent savings.
                </Text>
              )}
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={25}
                color="#465969"
              />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#2A2B6A',
                  fontWeight: 'bold',
                  marginVertical: 20,
                }}>
                Select a payment option
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // close add card and bank modal
                  onRequestClose();
                  // open add card modal
                  // setAddCardModal(!addCardModal);
                  setSubsequentModal(!subsequentModal);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#E0FFF6',
                    borderRadius: 50,
                    marginRight: 20,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={icons.card}
                    style={{
                      width: 15,
                      height: 15,
                      // backgroundColor: 'red',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View>
                  <Text style={{fontWeight: 'bold', color: '#465969'}}>
                    Debit card
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#E0FFF6',
                    borderRadius: 50,
                    marginRight: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={icons.bank}
                    style={{
                      width: 15,
                      height: 15,
                      // backgroundColor: 'red',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View>
                  <Text style={{fontWeight: 'bold', color: '#465969'}}>
                    Connect bank account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* <AddCardModal
        onRequestClose={() => setAddCardModal(!addCardModal)}
        visible={addCardModal}
        goToDashboard={() => {
          navigation.navigate('SoloSavingDashBoard');
        }}
      /> */}

      <SubsequentModal
        onRequestClose={() => setSubsequentModal(!subsequentModal)}
        visible={subsequentModal}
        goToDashboard={() => {
          navigation.navigate('SoloSavingDashBoard');
        }}
      />
    </>
  );
}
