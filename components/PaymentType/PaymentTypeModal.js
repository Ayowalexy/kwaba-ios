import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {images, icons, COLORS} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMaxLoanCap} from '../../redux/actions/savingsActions';
import {useSelector, useDispatch} from 'react-redux';
import {formatNumber} from '../../util/numberFormatter';
import InsufficientModal from './InsufficientWalletBalance';

export default function PaymentTypeModal(props) {
  const dispatch = useDispatch();
  const {visible, onRequestClose, setPaymentType, disable, amount, setShowModal} = props;
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const [walletBalance, setWalletBalance] = useState(0);

  console.log('9'.repeat(40))

  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);

  useEffect(() => {
    if (getMaxLoanCap1?.data) {
      setWalletBalance(getMaxLoanCap1?.data?.wallet_available_balance);
    }
  }, [getMaxLoanCap1]);

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
                  Select a Payment Method
                </Text>
                {[
                  {name: 'Debit Card', icon: 'card', tag: 'card'},
                  {name: 'Bank Transfer', icon: 'home', tag: 'bank_transfer'},
                  {name: 'Your Wallet', icon: 'wallet', tag: 'wallet'},
                ].map((item, index) => {
                  return (
                    <TouchableOpacity
                      // disabled={item.icon == 'home'}
                      onPress={() => {

                        if((item.tag == 'wallet') && (amount > walletBalance)){
                          console.log(amount, walletBalance, '7'.repeat(30))
                          return setShowModal(true)
                        }
                        console.log('getting to this payment son!!');
                        console.log({item});
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
                        display: disable == item.tag ? 'none' : 'flex',
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
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          // justifyContent: 'space-between',
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: COLORS.dark,
                          }}>
                          {item.name}
                        </Text>
                        {item.tag == 'wallet' && (
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              marginLeft: 20,
                              color: COLORS.dark,
                              backgroundColor: '#BFBFBF20',
                              paddingVertical: 5,
                              paddingHorizontal: 7,
                              borderRadius: 3,
                            }}>
                            ₦{formatNumber(Number(walletBalance))}
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
