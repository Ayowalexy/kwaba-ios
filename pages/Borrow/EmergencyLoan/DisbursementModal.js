import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, images} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

import Spinner from 'react-native-loading-spinner-overlay';
import {formatNumber} from '../../../util/numberFormatter';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getBankAccounts} from '../../../redux/actions/bankActions';
import {getMaxLoanCap} from '../../../redux/actions/savingsActions';
import AddBankAccountModal from '../../../components/addBankAccountModal';

export default function DisbursementModal(props) {
  const dispatch = useDispatch();
  const getAllBankAccount = useSelector(
    (state) => state.getBankAccountsReducer,
  );
  const {visible, onRequestClose} = props;
  const [spinner, setSpinner] = useState(false);
  const [bankModalVisible, setBankModalVisible] = useState(false);
  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [reloadBanks, setReloadBanks] = useState(false)

  //   useEffect(() => {
  //     console.log('The Bankzzz: ', userBankAccounts);
  //   });

  useEffect(() => {
    setUserBankAccounts(getAllBankAccount);
    console.log("getAllBankAccount", getAllBankAccount);
  }, []);


  useEffect(() => {
      setUserBankAccounts(getAllBankAccount)
      dispatch(getBankAccounts())
  }, [!reloadBanks])

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const storeBankAccountLocally = async (bank) => {
    const user = await getUser();
    await AsyncStorage.removeItem(`storeBank-${user.id}`);
    await AsyncStorage.setItem(`storeBank-${user.id}`, JSON.stringify(bank));
    dispatch(getMaxLoanCap());
    //   setClickedID(parsedData?.id);
  };

  const handlePress = async (item) => {
    // console.log('The Item: ', item);
    onRequestClose();
    storeBankAccountLocally(item);
  };

  const renderBankAccounts = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.bankCard,
        // {
        //   borderWidth: item.id == clickedID ? 2 : 0,
        //   borderColor: item.id == clickedID ? COLORS.secondary : 'none',
        // },
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
          {item?.user_bank_name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.light,
          }}>
          {item?.bank_name}
        </Text>
        <Text
          style={{
            marginTop: 40,
            fontSize: 14,
            color: COLORS.white,
            opacity: 0.8,
          }}>
          {item?.bank_account_number}
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

        {/* {item.defaultbank == 1 && (
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
        )} */}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
      transparent={true}>
      <View style={styles.centeredModalWrapper}>
        <View style={[styles.content]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              onPress={onRequestClose}
              name="arrow-back"
              size={25}
              style={{color: COLORS.primary, marginRight: 20, marginTop: 2}}
            />
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.primary}}>
              Disbursement Account
            </Text>
          </View>

          <View style={[styles.contentView]}>
            {!userBankAccounts?.data?.length ? (
              <>
                <TouchableOpacity
                  onPress={() => setBankModalVisible(true)}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingLeft: 10,
                  }}>
                  <View
                    style={[styles.addButtonEmpty]}>
                    <IconFA5 name="plus" size={15} color={COLORS.primary} />
                  </View>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: COLORS.dark,
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}>
                    Add Bank Account
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setBankModalVisible(true)}
                  style={[styles.addButton]}>
                  <IconFA5 name="plus" size={15} color={COLORS.white} />
                </TouchableOpacity>
                <FlatList
                  data={userBankAccounts?.data}
                  renderItem={renderBankAccounts}
                  keyExtractor={(item) => item?.id?.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={true}
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
      </View>

      {bankModalVisible && (
        <AddBankAccountModal
          onRequestClose={() => setBankModalVisible(!bankModalVisible)}
          visible={bankModalVisible}
          setReloadBanks={setReloadBanks}
          // setDisplayAllBankAccounts={(all) => allBanks(all)}
          // setDisplayAllBankAccounts={(all) => console.log('The all', all)}
          setDisplayAllBankAccounts={(all) => setUserBankAccounts({data: all})}
        />
      )}

      <Spinner visible={spinner} size="large" />
      {/* <ActivityIndicator
        size={'small'}
        color={COLORS.orange}
        animating={false}
      /> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredModalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    width: '100%',
    // flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
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
