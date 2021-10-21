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
  const {onRequestClose, visible, navigation} = props;
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);

  const [info, setInfo] = useState({});

  const transferWithCard = async () => {
    // console.log('Hello');
    setShowAmountModal(true);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View
            style={{
              alignItems: 'flex-end',
              padding: 20,
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
              <IconFA name="close" size={15} style={{color: COLORS.primary}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              justifyContent: 'flex-end',
              padding: 20,
              paddingBottom: 40,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: COLORS.dark,
                marginBottom: 20,
                paddingLeft: 10,
                lineHeight: 30,
              }}>
              {/* How would you like{'\n'}to add money? */}
              How would you like to{'\n'}fund your wallet?
            </Text>

            <View>
              {[
                {name: 'Debit Card', icon: 'card'},
                {name: 'Bank Transfer', icon: 'home'},
                // {name: 'Others', icon: 'apps'},
              ].map((item, index) => {
                return (
                  <TouchableOpacity
                    disabled={item.icon == 'home'}
                    onPress={() => {
                      if (item.icon == 'card') {
                        transferWithCard();
                      } else {
                        setShowBankTransferModal(true);
                      }
                    }}
                    key={index}
                    style={{
                      paddingVertical: 20,
                      paddingHorizontal: 30,
                      backgroundColor: '#00DC9920',
                      backgroundColor: '#2A286A20',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#2A286A30',
                      opacity: item.icon == 'home' ? 0.5 : 1,
                    }}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#00DC9920',
                        backgroundColor: '#2A286A20',
                        marginRight: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name={item.icon} size={20} color={COLORS.primary} />
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: COLORS.dark,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>

      {showAmountModal && (
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
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // height: height - 84,
    backgroundColor: '#F7F8FD',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    paddingVertical: 20,
    // paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
});
