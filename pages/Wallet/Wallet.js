import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../util';
import {formatNumber} from '../../util/numberFormatter';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMaxLoanCap} from '../../redux/actions/savingsActions';
import {useDispatch, useSelector} from 'react-redux';
import {SwipeablePanel} from 'rn-swipeable-panel';
import AddFundToWalletModal from './AddFundToWalletModal';
import {
  getUserWallet,
  // getUserWalletTransactions,
} from '../../redux/actions/walletAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import AmountModalWallet from '../../components/amountModalWallet';
import BankTransferModal from './BankTransferModal';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import {verifyAddFundToWallet} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import QuickSaveListModal from '../Home/QuickSaveListModal';
import QuickSaveModal from '../../components/QuickSaveModal';
import SavingsOptionModal from '../../components/savingsOptionModal';

export default function Wallet(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [addFundsModal, setAddFundsModal] = useState(false);

  const [amount, setAmount] = useState(0);

  const [transactions, setTransactions] = useState([]);

  const [toggleAmount, setToggleAmount] = useState(true);

  const [showAmountModal, setShowAmountModal] = useState(false);

  const [showBankTransferModal, setShowBankTransferModal] = useState(false);

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [resData, setResData] = useState('');

  const [spinner, setSpinner] = useState(false);

  const [showQuickSaveListModal, setShowQuickSaveListModal] = useState(false);

  const [showQuickSaveModal, setShowQuickSaveModal] = useState(false);

  const [savingType, setSavingType] = useState('');

  const [channel, setChannel] = useState('card');

  const getWallet = useSelector((state) => state.getUserWalletReducer);
  const getWalletTransactions = useSelector(
    (state) => state.getUserWalletTransactionsReducer,
  );

  useEffect(() => {
    dispatch(getUserWallet());
    // dispatch(getUserWalletTransactions());
    // dispatch(getBillsCategory('airtime'));
  }, []);

  useEffect(() => {
    setAmount(getWallet.available_balances);
  }, [getWallet]);

  // useEffect(() => {
  //   // console.log(getWalletTransactions);
  // }, [getWalletTransactions]);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const getUserWalletTransactions = async () => {
    const token = await getToken();
    const url =
      `https://kwaba-main-api-3-cp4jm.ondigitalocean.app` +
      '/api/v1/get_wallet_transactions';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      setTransactions(response.data.data);
      // console.log('Wallet Transaction New: ', response.data.data);
      // return response.data.data;
    } catch (error) {
      console.log(error);
      // return error.message;
    }
  };

  useEffect(() => {
    getUserWalletTransactions();
  }, []);

  return (
    <>
      <View style={[styles.container]}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#FFFFFF20',
            // borderTopWidth: 1,
            // borderTopColor: '#FFFFFF20',
          }}>
          <View />
          <Text
            style={{
              fontSize: 14,
              // marginLeft: 40,
              fontWeight: 'bold',
              color: COLORS.white,
            }}>
            My Wallet
          </Text>
          <View />

          {/* <TouchableOpacity
            onPress={openPanel}
            style={{
              backgroundColor: '#ffffff20',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Icon name="list-sharp" size={20} color={COLORS.white} />
          </TouchableOpacity> */}
        </View>
        <View style={[styles.content]}>
          <View
            style={{
              width: '100%',
              flex: 1,
              position: 'absolute',
              opacity: 0.05,
              backgroundColor: COLORS.primary,
            }}>
            <Icon
              name="wallet"
              size={200}
              color={COLORS.light}
              style={{
                position: 'absolute',
                right: -20,
                transform: [{rotate: '10deg'}],
              }}
            />
            <Icon
              name="wallet"
              size={100}
              color={COLORS.light}
              style={{
                position: 'absolute',
                left: -10,
                top: 50,
                transform: [{rotate: '-10deg'}],
              }}
            />
            <Icon
              name="wallet"
              size={50}
              color={COLORS.light}
              style={{
                position: 'absolute',
                left: 100,
                top: 100,
                transform: [{rotate: '-10deg'}],
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'normal',
                textAlign: 'left',
                color: COLORS.white,
                // marginLeft: 25,
              }}>
              Your Balance:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: COLORS.white,
                }}>
                <Text style={{fontSize: 15}}>₦ </Text>
                {toggleAmount
                  ? formatNumber(Number(amount).toFixed(2))
                  : formatNumber(Number(amount).toFixed(2)).replace(
                      new RegExp('[0-9]', 'g'),
                      'x',
                    )}
              </Text>

              <TouchableOpacity
                onPress={() => setToggleAmount(!toggleAmount)}
                style={{
                  backgroundColor: '#ffffff20',
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Icon
                  name={toggleAmount ? 'eye-off-outline' : 'eye-outline'}
                  size={15}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setAddFundsModal(true)}
              style={{
                backgroundColor: '#ffffff20',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginTop: 20,
              }}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
                Add Funds
              </Text>
            </TouchableOpacity>

            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                marginTop: 20,
                width: '100%',
                // flex: 1,
                paddingTop: 20,
                paddingBottom: 10,
                paddingHorizontal: 40,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: '#FFFFFF20',
              }}>
              {['Fund Savings', 'Pay Bills'].map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{marginHorizontal: 5, alignItems: 'center'}}
                    onPress={() => {
                      if (item == 'Fund Savings') {
                        // navigation.navigate('SavingsHome');
                        setShowQuickSaveModal(true);
                      } else if (item == 'Pay Bills') {
                        navigation.navigate('BillsHome');
                      }
                      // else {
                      //   navigation.navigate('EmergencyLoanHome');
                      // }
                      console.log('Clicked');
                    }}>
                    <View
                      style={{
                        width: 60,
                        height: 40,
                        // borderWidth: 1,
                        // borderColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        padding: 2,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: COLORS.white,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name={
                            item == 'Fund Savings'
                              ? 'duplicate'
                              : item == 'Pay Bills'
                              ? 'apps'
                              : 'enter-sharp'
                          }
                          size={20}
                          color={COLORS.light}
                        />
                      </View>
                    </View>

                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'normal',
                        marginTop: 5,
                        color: COLORS.white,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          {!transactions?.length ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: COLORS.grey,
                }}>
                No Transactions
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 15,
                    color: COLORS.primary,
                  }}>
                  Transaction history
                </Text>
                {transactions?.reverse().map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.lists,
                        {
                          borderLeftColor:
                            item.transaction_type == 'credit'
                              ? COLORS.success
                              : COLORS.warning,
                          borderLeftColor: COLORS.primary,
                        },
                      ]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            // padding: 10,
                            backgroundColor:
                              item.transaction_type == 'credit'
                                ? COLORS.success
                                : COLORS.warning,
                            backgroundColor: '#f7f8fd',
                            marginRight: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: COLORS.primary,
                            }}>
                            {moment(item.updated_at).format('DD')}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 'normal',
                              lineHeight: 10,
                              color: COLORS.primary,
                              // opacity: 0.5,
                            }}>
                            {moment(item.updated_at).format('MMM')}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View style={{flex: 1, paddingRight: 20}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: COLORS.primary,
                                textTransform: 'capitalize',
                              }}
                              numberOfLines={1}>
                              {item.narration}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: COLORS.grey,
                                marginTop: 5,
                              }}>
                              {moment(item.updated_at).format('DD MMM YYYY')}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: COLORS.primary,
                            }}>
                            ₦{item.amount}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          )}
        </View>
      </View>

      {showQuickSaveModal && (
        <SavingsOptionModal
          onRequestClose={() => setShowQuickSaveModal(!showQuickSaveModal)}
          visible={showQuickSaveModal}
          // setShowPaymentType={(bol) => setShowPaymentType(bol)}
          showSavingType={(data) => {
            // console.log('Done: ', data);
            setSavingType(data);
            setShowQuickSaveListModal(true);
          }}
        />
      )}

      {showQuickSaveListModal && (
        <QuickSaveListModal
          onRequestClose={() =>
            setShowQuickSaveListModal(!showQuickSaveListModal)
          }
          visible={showQuickSaveListModal}
          type={savingType}
          navigation={navigation}
        />
      )}

      {addFundsModal && (
        <AddFundToWalletModal
          onRequestClose={() => setAddFundsModal(!addFundsModal)}
          visible={addFundsModal}
          navigation={navigation}
          walletDetails={getWallet}
          showAmountModal={() => setShowAmountModal(true)}
          showBankTransferModal={() => setShowBankTransferModal(true)}
          setChannel={(c) => setChannel(c)}
        />
      )}

      {showAmountModal && (
        <AmountModalWallet
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          setData={(d) => setResData(d)}
          showCard={() => setShowPaystackPayment(true)}
        />
      )}

      {showBankTransferModal && (
        <BankTransferModal
          onRequestClose={() =>
            setShowBankTransferModal(!showBankTransferModal)
          }
          visible={showBankTransferModal}
          walletDetails={getWallet}
        />
      )}

      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={resData}
          channel={channel}
          paymentCanceled={(e) => {
            console.log('Pay cancel', e);
            // Do something
          }}
          paymentSuccessful={async (res) => {
            const data = {
              channel: 'paystack',
              reference: res.data.transactionRef.reference,
            };

            console.log('the dataatatta: ', data);

            setSpinner(true);
            const verify = await verifyAddFundToWallet(data);

            console.log('the verifyyyyy: ', verify);

            if (verify.status == 200) {
              navigation.navigate('PaymentSuccessful', {
                content: 'Funds Add To Your Wallet Successfully',
                name: 'Home',
              });
              setSpinner(false);
              // setShowQuickSaveListModal(false);
            } else {
              setSpinner(false);
              // setShowQuickSaveListModal(false);
            }
          }}
        />
      )}

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.primary,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lists: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    elevation: 1,
    marginBottom: 10,
    borderLeftWidth: 5,
  },
});
