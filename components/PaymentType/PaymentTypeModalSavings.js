import React from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {images, icons, COLORS} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PaymentTypeModalSavings(props) {
  const {visible, onRequestClose, setPaymentType, savingsType} = props;
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
              <View style={{marginTop: 70, width: '100%'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.dark,
                    fontWeight: 'bold',
                    // marginBottom: 20,
                    paddingLeft: 30,
                    backgroundColor: '#BFBFBF20',
                    paddingVertical: 20,
                    // textAlign: 'center',
                  }}>
                  Select a source to fund your savings
                </Text>
                {[
                  {
                    name: 'Debit Card',
                    icon: 'card',
                    tag: 'card',
                    subtitle:
                      'We will automatically move money from your bank account to your Kwaba savings plan based on your saving frequency',
                  },
                  {name: 'Bank Transfer', icon: 'home', tag: 'bank_transfer'},
                  {
                    name: 'Your Wallet',
                    icon: 'wallet',
                    tag: 'wallet',
                    subtitle:
                      'Money will be automatically moved from your Kwaba wallet to your Kwaba savings plan. Note, your wallet will have to be funded sufficiently for us to successfully fund your savings plan',
                  },
                ].map((item, index) => {
                  return (
                    <TouchableOpacity
                      // disabled={item.icon == 'home'}
                      onPress={() => {
                        setPaymentType(item.tag);
                        onRequestClose();
                      }}
                      key={index}
                      style={{
                        width: '100%',
                        paddingVertical: 10,
                        paddingHorizontal: 30,
                        borderTopWidth: 1,
                        borderTopColor: '#BFBFBF30',
                        flexDirection: 'row',
                        alignItems: 'center',
                        // opacity: item.icon == 'home' ? 0.4 : 1,
                      }}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          backgroundColor: '#00DC9920',
                          marginRight: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name={item.icon}
                          size={20}
                          color={COLORS.secondary}
                        />
                      </View>

                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: COLORS.dark,
                          }}>
                          {item.name}
                        </Text>
                        {item.subtitle && (
                          <Text
                            style={{
                              fontSize: 12,
                              color: COLORS.dark,
                              marginTop: 10,
                              lineHeight: 20,
                            }}>
                            {item.subtitle}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
