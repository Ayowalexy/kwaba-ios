import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
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
  getUserWalletTransactions,
} from '../../redux/actions/walletAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import AmountModalWallet from '../../components/amountModalWallet';
import BankTransferModal from './BankTransferModal';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import {
  completeSavingsPayment,
  verifyAddFundToWallet,
} from '../../services/network';
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

  const [ledgerBalance, setLedgerBalance] = useState(0);

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
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);

  useEffect(() => {
    // dispatch(getUserWallet());
    dispatch(getUserWalletTransactions());
    dispatch(getMaxLoanCap());
  }, []);

  useEffect(() => {
    // setAmount(getWallet?.data?.available_balances || 0);
    // setLedgerBalance(getWallet?.data?.ledger_balances || 0);
    // console.log('The Wallet Value: ', getWallet);
    console.log('Hello....', getWalletTransactions);
  }, []);

  useEffect(() => {
    if (getMaxLoanCap1?.data) {
      setAmount(getMaxLoanCap1?.data?.wallet_available_balance);
    }
  }, [getMaxLoanCap1]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        // key={index}
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.dark,
                  textTransform: 'capitalize',
                }}
                numberOfLines={1}>
                {item.narration}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.dark,
                  marginTop: 5,
                }}>
                {moment(item.updated_at).format('DD MMM YYYY')}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.dark,
              }}>
              ₦{formatNumber(Number(item.amount).toFixed(2))}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
        </View>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}> */}
        <SafeAreaView style={{flex: 1}}>
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
              <View style={{paddingHorizontal: 40}}>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    justifyContent: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'normal',
                        textAlign: 'left',
                        color: COLORS.white,
                      }}>
                      Available Balance:
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 0,
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
                    </View>
                  </View>
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
                    marginTop: 10,
                    // width: 200,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLORS.white,
                    }}>
                    Add Funds
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 30,
                  width: '100%',

                  paddingHorizontal: 40,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  flexDirection: 'row',
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

              <View
                style={{
                  backgroundColor: '#00000020',
                  padding: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}>
                <Text
                  style={{color: COLORS.grey, fontSize: 10, lineHeight: 17}}>
                  You can fund your savings, buy airtime and pay bills from your
                  wallet. Please note, you can’t withdraw from your wallet
                </Text>
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
              marginBottom: 40,
            }}>
            {!getWalletTransactions?.data?.length ? (
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
              <View style={{flex: 1}}>
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
                </View>

                <FlatList
                  data={getWalletTransactions?.data?.slice(0, 5)}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />

                {getWalletTransactions?.data?.length > 5 && (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: COLORS.primary}}>
                      View all Transactions
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          {/* </ScrollView> */}
        </SafeAreaView>
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
          channel={'paystack'} //TODO
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
              amount: resData.amount,
              channel: 'paystack',
              reference: resData.paymentReference,
              wallet: true,
            };

            console.log('the dataatatta: ', data);
            console.log('This complete data: ', data);
            try {
              setSpinner(true);
              const res = await completeSavingsPayment(data);
              // console.log('Complete Out: ', res);

              if (res.status == 201) {
                setSpinner(false);
                console.log('Complete Payment: ', res.data.data);

                navigation.navigate('PaymentSuccessful', {
                  content: 'Payment Successful',
                  subText: 'You have successfully funded your wallet',
                  name: 'Home',
                });
              } else {
                setSpinner(false);
              }
            } catch (error) {
              setSpinner(false);
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
    // paddingHorizontal: 20,
    paddingTop: 20,
    // paddingBottom: 10,
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
    paddingVertical: 10,
    // borderRadius: 5,
    // elevation: 1,
    marginBottom: 10,
    borderLeftWidth: 5,
  },
});
