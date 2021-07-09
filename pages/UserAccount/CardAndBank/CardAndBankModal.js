import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {images, icons} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CardAndBankModal(props) {
  const {visible, onRequestClose, navigation, onClick} = props;
  const [addCardModal, setAddCardModal] = useState(false);

  console.log(typeof onClick);

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
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#2A2B6A',
                  fontWeight: 'bold',
                  marginVertical: 20,
                }}>
                Select type
              </Text>
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={25}
                color="#465969"
                style={{position: 'absolute', right: 0}}
              />
              <TouchableOpacity
                disabled={true}
                onPress={() => {
                  onRequestClose();
                  onClick('add-card');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f2f2f2',
                  opacity: 0.5,
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
                    Add Card
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  onRequestClose();
                  onClick('add-bank-account');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
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
                    Add Bank Account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
