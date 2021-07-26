import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native';
import {icons} from '../../../util/index';
// import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AddCardModal from '../../../components/addCardModal';
import {fetchBanks} from '../../../services/network';
import AddBankAccountModal from '../../../components/addBankAccountModal';
import Spinner from 'react-native-loading-spinner-overlay';

import Modal from 'react-native-modal';
import AddPaymentCardModal from '../../../components/addPaymentCardModal';

export default function AvailableCardAndBank(props, {navigation}) {
  const [paymentCardModal, setPaymentCardModal] = useState(false);
  const [bankModalVisible, setBankModalVisible] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [clickedID, setClickedID] = useState('');
  const {allBanks, userBankAccounts} = props;

  const [paymentCards, setPaymentCards] = useState([
    {
      id: '1',
      cardnumber: '1234 3245 1234 5678',
      default: 'true',
      expires: '12/2022',
      type: 'mastercard',
    },
    {
      id: '2',
      cardnumber: '1234 3245 1234 5678',
      default: 'true',
      expires: '12/2022',
      type: 'visa',
    },
    {
      id: '3',
      cardnumber: '1234 3245 1234 5678',
      default: 'true',
      expires: '12/2022',
      type: 'mastercard',
    },
  ]);

  const handlePayment = async () => {
    console.log('Hello');
  };

  const renderPaymentCards = ({item}) => (
    <TouchableOpacity activeOpacity={0.9} style={[styles.paymentCard]}>
      <View>
        <View>
          <Text
            style={{fontSize: 14, color: COLORS.primary, fontWeight: 'bold'}}>
            ****2345
          </Text>
        </View>
        <View style={{marginTop: 100}}>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: COLORS.light}}>
            EXPIRES
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: COLORS.light}}>
            12/2022
          </Text>
        </View>
        <Image
          source={
            item.type == 'mastercard'
              ? images.mastercarddesign
              : images.visacarddesign
          }
          resizeMode="contain"
          style={{
            height: 200,
            width: 150,
            resizeMode: 'contain',
            position: 'absolute',
            right: -22,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  const renderBankAccounts = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.bankCard,
        {
          borderWidth: 2,
          borderColor: item.id == clickedID ? COLORS.secondary : 'transparent',
        },
      ]}
      onPress={() => {
        setClickedID(item.id);
      }}>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: COLORS.white,
          }}>
          {/* {item.bankAccountName} */}
          {item.user_bank_name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.light,
          }}>
          {/* {item.bankName} */}
          {item.bank_name}
        </Text>
        <Text
          style={{
            marginTop: 40,
            fontSize: 14,
            color: COLORS.white,
            opacity: 0.8,
          }}>
          {/* {item.bankAccountNumber} */}
          {item.bank_account_number}
        </Text>

        <Image
          style={{
            width: 71,
            height: 110,
            position: 'absolute',
            resizeMode: 'contain',
            right: -21,
            bottom: -20,
            borderWidth: 1,
          }}
          source={images.maskGroup24}
        />

        <View
          style={{
            width: 25,
            height: 25,
            backgroundColor: COLORS.dark,
            position: 'absolute',
            top: -10,
            right: -10,

            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
          }}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor:
                clickedID == item.id ? COLORS.secondary : 'transparent',
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}>
          <Text style={[styles.contentTitle]}>Payment Card</Text>
          <View style={[styles.contentView]}>
            {!paymentCards.length ? (
              <>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => setPaymentCardModal(true)}
                    style={[styles.addButtonEmpty]}>
                    <IconFA5 name="plus" size={15} color={COLORS.primary} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: COLORS.dark,
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}>
                    Add Payment Card
                  </Text>
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setPaymentCardModal(true)}
                  style={[styles.addButton]}>
                  <IconFA5 name="plus" size={15} color={COLORS.white} />
                </TouchableOpacity>

                <FlatList
                  data={paymentCards}
                  renderItem={renderPaymentCards}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={{
                    marginLeft: 10,
                  }}
                  contentContainerStyle={{
                    paddingVertical: 5,
                  }}
                />
              </>
            )}
          </View>
        </View>

        <View style={[styles.content]}>
          <Text style={[styles.contentTitle]}>Bank Account</Text>
          <View style={[styles.contentView]}>
            {!userBankAccounts.length ? (
              <>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => setBankModalVisible(true)}
                    style={[styles.addButtonEmpty]}>
                    <IconFA5 name="plus" size={15} color={COLORS.primary} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: COLORS.dark,
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}>
                    Add Bank Account
                  </Text>
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setBankModalVisible(true)}
                  style={[styles.addButton]}>
                  <IconFA5 name="plus" size={15} color={COLORS.white} />
                </TouchableOpacity>
                <FlatList
                  data={userBankAccounts}
                  renderItem={renderBankAccounts}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={{
                    marginLeft: 10,
                  }}
                  contentContainerStyle={{
                    paddingVertical: 5,
                  }}
                />
              </>
            )}
          </View>
        </View>

        <Modal
          isVisible={actionModal}
          onBackButtonPress={() => setActionModal(false)}
          onBackdropPress={() => setActionModal(false)}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <Text style={{color: COLORS.secondary, fontWeight: 'bold'}}>
              Card successfully added!
            </Text>
          </View>
        </Modal>
      </ScrollView>

      <AddBankAccountModal
        onRequestClose={() => setBankModalVisible(!bankModalVisible)}
        visible={bankModalVisible}
        setDisplayAllBankAccounts={(all) => allBanks(all)}
      />

      <AddPaymentCardModal
        onRequestClose={() => setPaymentCardModal(!paymentCardModal)}
        visible={paymentCardModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  content: {
    paddingLeft: 20,
    // borderWidth: 1,
    paddingVertical: 10,
    marginTop: 20,
    // backgroundColor: '#FFFFFF',
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    // marginLeft: 10,
    color: COLORS.primary,
  },
  contentView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10,
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonEmpty: {
    width: 40,
    height: 40,
    borderRadius: 40,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: COLORS.grey,
  },
  paymentCard: {
    width: 150,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
  bankCard: {
    width: 250,
    height: 140,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
});
