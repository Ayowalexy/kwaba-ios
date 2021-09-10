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
import {COLORS, FONTS, images} from '../../../util/index';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AddBankAccountModal from '../../../components/addBankAccountModal';
import Spinner from 'react-native-loading-spinner-overlay';

import Modal from 'react-native-modal';
import ActionModal from './ActionModal';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BankAccount(props, {navigation}) {
  const [bankModalVisible, setBankModalVisible] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [clickedID, setClickedID] = useState('');
  const [clickedItem, setClickedItem] = useState('');

  const {allBanks, userBankAccounts} = props;

  const handlePress = async (item) => {
    // console.log('Hello....', item.id);
    setActionModal(true);
    setClickedID(item.id);
    setClickedItem(item);
  };

  const renderBankAccounts = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.bankCard,
        {
          borderWidth: item.id == clickedID ? 2 : 0,
          borderColor: item.id == clickedID ? COLORS.secondary : 'none',
        },
      ]}
      onPress={() => {
        handlePress(item);
      }}>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: COLORS.white,
          }}>
          {item.user_bank_name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.light,
          }}>
          {item.bank_name}
        </Text>
        <Text
          style={{
            marginTop: 40,
            fontSize: 14,
            color: COLORS.white,
            opacity: 0.8,
          }}>
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

        {item.defaultbank == 1 && (
          <Icon
            name="checkbox"
            size={20}
            color={COLORS.secondary}
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}>
          <Text style={[styles.contentTitle]}>
            {userBankAccounts.length > 1 ? 'Bank Accounts' : 'Bank Account'}
          </Text>
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
          isVisible={successMsg}
          onBackButtonPress={() => setSuccessMsg(false)}
          onBackdropPress={() => setSuccessMsg(false)}>
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

      <ActionModal
        onRequestClose={() => {
          setActionModal(!actionModal);
          setClickedID('');
        }}
        visible={actionModal}
        type="account"
        clickedItem={clickedItem}
        setDeleteResponse={(data) => {
          allBanks(data.cards);
          console.log('DATA ATAD:  ', data);
        }}
        navigation={navigation}
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
