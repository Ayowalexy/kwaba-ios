import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {COLORS, images} from '../../util';
import BankTransferModal from './BankTransferModal';
import CreditCardModalWallet from '../../components/CreditCard/CreditCardModalWallet';
import {addFundsToWallet} from '../../services/network';
import AmountModalWallet from '../../components/amountModalWallet';

const {width, height} = Dimensions.get('window');

export default function AddFundToWalletModal(props) {
  const {
    onRequestClose,
    visible,
    navigation,
    walletDetails,
    showAmountModal,
    showBankTransferModal,
    setChannel,
  } = props;
  // const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  // const [showCardModal, setShowCardModal] = useState(false);
  // const [showAmountModal, setShowAmountModal] = useState(false);

  const [info, setInfo] = useState({});

  // const transferWithCard = async () => {
  //   // console.log('Hello');
  //   setShowAmountModal(true);
  // };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={onRequestClose}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  backgroundColor: '#2A286A20',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconFA
                  name="close"
                  size={15}
                  style={{color: COLORS.primary}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                // flex: 1,
                paddingHorizontal: 20,
                // justifyContent: 'flex-start',
                padding: 0,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: COLORS.dark,
                  marginBottom: 20,
                  paddingLeft: 10,
                  lineHeight: 20,
                }}>
                {/* How would you like{'\n'}to add money? */}
                How would you like to fund{'\n'}your wallet?
              </Text>

              <View>
                {[
                  {
                    name: 'Debit Card',
                    icon: 'card',
                    title: 'Add money to your wallet using your debit card.',
                    channel: 'card',
                  },
                  {
                    name: 'Bank Transfer',
                    icon: 'home',
                    title: 'Add money to your wallet via bank transfer.',
                    channel: 'bank_transfer',
                  },
                  // {name: 'Others', icon: 'apps'},
                ].map((item, index) => {
                  return (
                    <TouchableOpacity
                      // disabled={item.icon == 'home'}
                      onPress={() => {
                        onRequestClose();
                        showAmountModal();
                        setChannel(item.channel);

                        // We might use this later - DO NOT DELETE
                        // if (item.icon == 'card') {
                        //   showAmountModal();
                        // } else {
                        //   showBankTransferModal();
                        // }
                      }}
                      key={index}
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        // marginVertical: 5,
                        borderRadius: 10,
                        borderBottomWidth: index == 0 ? 1 : 0,
                        // borderWidth: 1,
                        borderColor: '#2A286A20',
                        // elevation: 1,
                        // opacity: item.icon == 'home' ? 0.5 : 1,
                      }}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: 5,
                          backgroundColor: '#00DC9920',
                          backgroundColor: '#2A286A20',
                          marginRight: 20,
                          marginTop: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name={item.icon}
                          size={20}
                          color={COLORS.primary}
                        />
                      </View>
                      <View
                        style={{
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
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 'normal',
                            color: COLORS.dark,
                            marginTop: 4,
                            width: '70%',
                            lineHeight: 15,
                            opacity: 0.7,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* {showAmountModal && (
        <AmountModalWallet
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          setData={(d) => setInfo(d)}
          showCard={() => setShowCardModal(true)}
        />
      )}

      {showCardModal && (
        <CreditCardModalWallet
          onRequestClose={() => setShowCardModal(!showCardModal)}
          visible={showCardModal}
          info={info}
          navigation={navigation}
          redirectTo="Wallet"
        />
      )}

      {showBankTransferModal && (
        <BankTransferModal
          onRequestClose={() =>
            setShowBankTransferModal(!showBankTransferModal)
          }
          visible={showBankTransferModal}
          walletDetails={walletDetails}
        />
      )} */}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // height: height - 84,
    // backgroundColor: '#F7F8FD',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    // flex: 1,
    // justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
});
