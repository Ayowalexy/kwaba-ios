import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { icons, images, COLORS } from '../../../util/index';
import { currencyFormat } from '../../../util/numberFormatter';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTotalSoloSavings,
  getMaxLoanCap,
  getOneSoloSavings,
  getOneSoloSavingsTransaction,
  updateState,
} from '../../../redux/actions/savingsActions';


import QuickSaveModal from '../../../components/QuickSaveModal';
import moment from 'moment';

import Spinner from 'react-native-loading-spinner-overlay';

import TransactionsTab from './TransactionTabs';
import {
  getOneUserSavings,
  verifySavingsPayment,
  addFundsToSavings,
  verifyWalletTransaction,
  changeSavingsMethod,
  completeSavingsPayment,
  getSavingsHistory,
  updateUsersSavingsPlan,
} from '../../../services/network';
import PaymentTypeModalForSavings from '../../../components/paymentTypeModalForSavings';
import CreditCardFormSavings from '../../../components/CreditCard/CreditCardFormSavings';
import AmountModal from '../../../components/amountModal';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';
import PaystackPayment from '../../../components/Paystack/PaystackPayment';
import axios from 'axios';

export default function SoloSavingDashBoard(props) {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  // const getSoloSaving = useSelector((state) => state.getSoloSavingsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const getOne = useSelector((state) => state.getOneSoloSavingsReducer);
  const getOneTransaction = useSelector(
    (state) => state.getOneSoloSavingsTransactionReducer,
  );

  const [totalSaving, setTotalSaving] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [savingsTarget, setSavingsTarget] = useState(0);
  const [percentAchieved, setPercentAchieved] = useState(0);
  const [savingTitle, setSavingTitle] = useState('');
  const [quickSaveModal, setQuickSaveModal] = useState(false);
  const [locked, setLocked] = useState(true);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [channel, setChannel] = useState('');
  const [fundedAmount, setFundedAmount] = useState(0)

  const [spinner, setSpinner] = useState(false);
  const [spinner2, setSpinner2] = useState(false);

  const [verifyData, setVerifyData] = useState('');

  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  const [autoSaving, setAutoSaving] = useState(false);

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [amount, setAmount] = useState('');

  const [resData, setResData] = useState('');

  const [savingsCompleted, setSavingsCompleted] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [isReady, setIsReady] = useState(false);

  const initialRender = useRef(false)

  const [randomRefect, setRandomRefetch] = useState(0)

  useEffect(() => {
    if (initialRender.current) {
      setIsReady(false)
      setTimeout(() => {
        setIsReady(true)
      }, 5000)
    } else {
      initialRender.current = true
      setIsReady(true)
    }

  }, [])

  useEffect(() => {

    if (route?.params?.amount) {
      console.log('Params', route?.params)
      setFundedAmount(route?.params?.amount)
    }
  }, [])

  console.log('funded amount', fundedAmount)

  const refresh_in = () => {
    setDashboardValue()

  }
  const onRefresh = useCallback(() => {


    setRefreshing(true);
    refresh_in();

    setTimeout(() => {
      setRefreshing(false)
    }, 3000)
  }, []);

  console.log('Amount saved', route?.params)


  const toggleSwitch = async () => {
    setAutoSaving((previousState) => !previousState);
  };

  const setDashboardValue = () => {

    const data = getOne?.data?.data.data;
    console.log('Tahtah: ', data);
    console.log('Dat sound: ', getOneTransaction);

    const amount_saved = Number(data?.amount_saved);

    setDate({
      startDate: data?.start_date,
      endDate: data?.end_date,
    });

    setAutoSaving(data?.auto_save);
    //THIS CAN BE CHANGED LATER TO INTEREST FROM USER SAVINGS BUT CURRENTLY USING INTEREST_PAID
    // setTotalInterest(data?.interest); 
    setTotalInterest(data?.interest_paid);
    setSavingTitle(data?.name);
    setSavingsTarget(data?.target_amount);
    setPercentAchieved(
      (
        (Number(data?.amount_saved || route.params.amount) / Number(data?.target_amount)) *
        100
      ).toFixed(0),
    );
    setTotalSaving(amount_saved || 0);
    setFundedAmount(amount_saved || 0)

    if (amount_saved >= data?.target_amount) {
      setSavingsCompleted(true);
    } else {
      setSavingsCompleted(false);
    }
  };


  useEffect(() => {
    const data = {
      savings_id: route?.params?.id,
      auto_save: autoSaving
    }
    updateUsersSavingsPlan(data)
  }, [autoSaving])

  useEffect(() => {
    setDashboardValue();
  }, [getOne]);

  useEffect(() => {
    console.log('Realoading....');
    setDashboardValue();
  }, [getMaxLoanCap1]);

  const goback = () => {
      navigation.navigate('SavingLists');
      setSavingTitle('');
      setSavingsTarget(0);
      setPercentAchieved(0);
      setTotalSaving(0);

  };

  const showSuccess = async () => {

    navigation.navigate('PaymentSuccessful', {
      content: 'Payment Successful',
      subText: 'You have successfully funded your savings',
      name: 'SoloSavingDashBoard',
      id: verifyData.id,
    });
  };

  const savingsPayment = async (data) => {
    setSpinner2(true);

    try {
      const res = await completeSavingsPayment(data);

      if (String(res.status).startsWith('2')) {
        setSpinner2(false);

        console.log('Complete Paymentttttttttt: ', res.data.data);
        setDashboardValue();
        setFundedAmount(Number(fundedAmount) + Number(amount))
        await showSuccess();
      } else {
        setSpinner2(false);
      }
    } catch (error) {
      setSpinner2(false);
      console.log('The Error: ', error.response.data);
    }
  };

  const verifyPaymentRequest = async (data, paymentChannel) => {
    console.log('The Data: ', data);

    setSpinner2(true);
    const res = await verifySavingsPayment(data);

    setSpinner2(false);
    if (!res) {
      return [];
    }

    if (res.status == 200) {
      const verifyData = res?.data?.data;
      console.log('Verifying data....: ', verifyData);
      setVerifyData({ ...verifyData, id: data.savings_id });
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: verifyData.amount,
          savings_id: data.savings_id,
          channel: 'wallet',
          // reference: verifyData.paymentReference,
          reference: verifyData.reference,
          purpose: 'savings',
        };
        console.log('wallet payload', payload)

        await savingsPayment(payload);
      } else {
        setShowPaystackPayment(true);
      }
    } else {
      console.log('Error: ', res.response.data);

      if (
        res.response?.data?.meta?.error ==
        'The maximum savings amount for this savings is execeded'
      ) {
        Alert.alert(
          'Payment unsuccessful',
          `You've exceeded the target amount for this savings plan`,
        );
      } else if (
        res.response?.data?.meta?.error == 'Insufficient wallet balance'
      ) {
        Alert.alert(
          'Payment unsuccessful',
          'You do not have enough money in your wallet',
        );
      }
    }
  };

  const handlePaymentRoute = async (value) => {
    console.log('Value: ', value);

    if (value == 'wallet') {
      const verifyPayload = {
        amount: amount,
        savings_id: route?.params?.id,
        channel: 'wallet',
        purpose: 'savings',
      };

      setChannel(value); // wallet
      await verifyPaymentRequest(verifyPayload, value);
    } else {
      const verifyPayload = {
        amount: amount,
        savings_id: route?.params?.id,
        channel: 'paystack',
        purpose: 'savings',
      };

      setChannel(value); // card or bank_transfer
      await verifyPaymentRequest(verifyPayload, value);
    }
  };

  const DashBoardMockData = () => (
    <Image
      source={images.soloSavingsCard}
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    />

  )


  return (
    <View style={styles.container}>
      <Icon
        onPress={goback}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
        color="#2A286A"
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={[styles.content]}>
          <View style={{ marginBottom: 20, paddingLeft: 10 }}>
            <Text
              style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary }}>
              Solo Saving{' '}
              <Text style={{ fontSize: 10, color: COLORS.dark }}>
                {savingTitle}
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                paddingLeft: 0,
                paddingRight: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#9D98EC20',
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: COLORS.dark,
                    marginRight: 5,
                  }}>
                  Start
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: '700', color: COLORS.dark }}>
                  {moment(date.startDate).format('ddd, D MMM YYYY')}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#9D98EC20',
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: COLORS.dark,
                    marginRight: 5,
                  }}>
                  End
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: '700', color: COLORS.dark }}>
                  {moment(date.endDate).format('ddd, D MMM YYYY')}
                </Text>
              </View>
            </View>
          </View>

          {
            !isReady ?
              (
                <View style={[styles.soloSavingCard]}>
                  <Image
                    source={images.soloSavingsCard}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'stretch',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  />
                  <View style={{ padding: 20 }} />
                </View>
              ) :
              (
                <View style={[styles.soloSavingCard]}>
                  <Image
                    source={images.soloSavingsCard}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'stretch',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  />
                  <View style={{ padding: 20 }}>
                    {savingsCompleted ? (
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 20,
                          top: 20,
                          zIndex: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => setShowAmountModal(true)}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: COLORS.white,
                            fontStyle: 'italic',
                          }}>
                          Savings Completed
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 5,
                          top: 10,
                          zIndex: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => setShowAmountModal(true)}>
                        <Text style={{ fontSize: 12, color: COLORS.white }}>
                          Add Funds
                        </Text>
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            marginTop: 5,
                          }}
                          source={icons.addIcon}
                        />
                      </TouchableOpacity>
                    )}

                    <Text style={{ color: COLORS.white }}>You have saved</Text>
                    <View
                      style={{
                        // borderWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                          marginLeft: 5,
                          // borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: COLORS.white,
                          }}>
                          ???{currencyFormat(Number(fundedAmount)) || currencyFormat(Number(route?.params?.amount))}
                        </Text>
                        <Icon
                          name={locked ? 'lock-closed' : 'lock-open'}
                          size={15}
                          style={{ marginLeft: 10, marginRight: 10 }}
                          color={COLORS.primary}
                        />
                        {spinner && (
                          <ActivityIndicator size="small" color={COLORS.white} />
                        )}
                      </View>
                      {/* <View style={{display: 'flex', marginTop: 5}}>
                  <Text style={{color: COLORS.white, fontSize: 10}}>
                    Switch To {autoSaving ? 'Manual' : 'Auto'} Saving
                  </Text>
                  <Switch
                    trackColor={{false: 'white', true: 'white'}}
                    thumbColor={autoSaving ? COLORS.secondary : '#ddd'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={autoSaving}
                  />
                </View> */}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: '#FFFFFF50',
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 10,
                        }}>
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 10,
                            marginRight: 10,
                            backgroundColor: COLORS.secondary,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            marginTop: -2,
                            color: COLORS.primary,
                          }}>
                          You are doing great
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={{ color: COLORS.white, fontSize: 10 }}>
                            Switch To {autoSaving ? 'Manual' : 'Auto'} Saving
                          </Text>
                          <Switch
                            trackColor={{ false: 'white', true: 'white' }}
                            thumbColor={autoSaving ? COLORS.secondary : '#ddd'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={autoSaving}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#ffffff20',
                      flex: 1,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: COLORS.white,
                          fontWeight: '200',
                        }}>
                        Interest Earned
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.white,
                          fontWeight: 'bold',
                        }}>
                        ???{currencyFormat(Number(totalInterest) || 0.00)}
                      </Text>
                    </View>

                    <View />

                    <View style={{ alignItems: 'flex-end' }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: COLORS.white,
                          fontWeight: '200',
                        }}>
                        Saving Target
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.white,
                          fontWeight: 'bold',
                        }}>
                        ???{currencyFormat(Number(savingsTarget)) || '0.00'}
                      </Text>
                    </View>
                  </View>
                </View>

              )

          }




          <View
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -70,
              elevation: 10,
            }}>
            <AnimatedCircularProgress
              size={90}
              width={10}
              rotation={0}
              style={styles.circularProgress}
              fill={Number(percentAchieved) || 0}
              tintColor={COLORS.secondary}
              backgroundColor="#2A286A90">
              {(fill) => (
                <View
                  style={{
                    backgroundColor: '#2A286A',
                    height: 100,
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={images.darkPurpleCircle}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'stretch',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'white',
                      // lineHeight: 27,
                      textAlign: 'center',
                    }}>
                    {Math.round(fill) || 0}%
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 10,
                      fontWeight: '600',
                      color: 'white',
                      // lineHeight: 14,
                      textAlign: 'center',
                      marginTop: -5,
                    }}>
                    achieved
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>

          {/*  */}

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('RentNowPayLaterOnboarding')}
              onPress={() => navigation.navigate('Rent')}
              style={{
                width: '45%',
                minHeight: 100,
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 10,
                paddingBottom: 20,
                elevation: 1,
              }}>
              <View>
                <Image
                  style={{ width: 80, height: 80, marginLeft: -20 }}
                  source={icons.topUp}
                />
                <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>
                  Rent Now Pay {'\n'}Later
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                    color: '#ADADAD',
                    lineHeight: 20,
                  }}>
                  Can't meet up with your rent target? Let Kwaba pay for you.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EmergencyLoanDashBoard');

                // Alert.alert(
                //   'Feature currently unavailable',
                //   'We are working hard to make this available as soon as we can.',
                // );
              }}
              style={{
                width: '45%',
                minHeight: 100,
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 10,
                paddingBottom: 20,
                elevation: 1,
              }}>
              <View>
                <Image
                  style={{ width: 80, height: 80, marginLeft: -20 }}
                  source={icons.instantLoan}
                />
                <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>
                  Emergency {'\n'}Funds
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                    color: '#ADADAD',
                    lineHeight: 20,
                  }}>
                  Access instant loans to help sort out life???s emergencies.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TransactionsTab
          transactions={getOneTransaction?.data?.reverse()}
          title={savingTitle}
          id={route?.params?.id}
          refetch={randomRefect}
        />
      </ScrollView>

      {/* <QuickSaveModal
        onRequestClose={() => setQuickSaveModal(!quickSaveModal)}
        visible={quickSaveModal}
        navigation={navigation}
        redirectTo="SoloSavingDashBoard"
        ID={route.params.id}
      /> */}

      {/* {showPaymentType && (
        <PaymentTypeModalForSavings
          onRequestClose={() => setShowPaymentType(!showPaymentType)}
          visible={showPaymentType}
          setShowAmountModal={(bol) => setShowAmountModal(bol)}
          setChannel={(value) => setChannel(value)}
        />
      )} */}

      {/* {showCardModal && (
        <CreditCardFormSavings
          onRequestClose={() => setShowCardModal(!showCardModal)}
          visible={showCardModal}
          navigation={navigation}
          redirectTo="SoloSavingDashBoard"
          ID={route.params.id}
        />
      )} */}

      {showAmountModal && (
        <AmountModal
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          setAmount={(d) => setAmount(d)}
          // setData={(d) => setResData(d)}
          showCard={() => setShowPaymentModal(true)}
        />
      )}

      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
        />
      )}

      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={verifyData}
          channel={channel}
          paymentCanceled={(e) => {
            setSpinner(false);
            Alert.alert('Payment cancelled');
          }}
          paymentSuccessful={async (res) => {

            console.log('Payment data', res)
            setFundedAmount(Number(fundedAmount) + Number(amount))
            setTimeout(() => {
              setRandomRefetch(Math.random() * 1000)
            }, 4000);
            // setDashboardValue();
            // updateState();

            // showSuccess();
          }}
        />
      )}

      {/* {spinner && <ActivityIndicator size="small" color={COLORS.secondary} />} */}
      <Spinner visible={spinner2} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
    backgroundColor: '#F7F8FD',
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // backgroundColor: '#f00',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  soloSavingCard: {
    width: '100%',
    minHeight: 190,
    // marginTop: 10,
    backgroundColor: COLORS.light,
    borderRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  circularProgress: {
    width: 97,
    height: 97,
    zIndex: 9,
    position: 'relative',
  },
});
