import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import urls from '../../services/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, images } from '../../util';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { formatNumber } from '../../util/numberFormatter';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOneSoloSavings,
  getOneSoloSavingsTransaction,
} from '../../redux/actions/savingsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import PaymentTypeModal from '../../components/PaymentType/PaymentTypeModal';
import AmountModal from '../../components/amountModal';
import InsufficientModal from '../../components/PaymentType/InsufficientWalletBalance';

import Spinner from 'react-native-loading-spinner-overlay';
import {
  addFundsToSavings,
  completeSavingsPayment,
  verifySavingsPayment,
  verifyWalletTransaction,
} from '../../services/network';

export default function QuickSaveListModal(props) {
  const dispatch = useDispatch();
  const allSoloSaving = useSelector((state) => state.getSoloSavingsReducer);
  const allBuddySaving = useSelector((state) => state.getBuddySavingsReducer);
  const { onRequestClose, visible, type, navigation } = props;
  const [savingLists, setSavingLists] = useState([]);
  const [showModal, setShowModal] = useState(false)

  const [spinner, setSpinner] = useState(false);

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [showAmountModal, setShowAmountModal] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [amount, setAmount] = useState('');

  const [resData, setResData] = useState('');

  const [id, setID] = useState('');
  const [buddyId, setBuddyId] = useState('');

  const [channel, setChannel] = useState('');

  const [verifyData, setVerifyData] = useState('');

  const [allSavingsChallenges, setAllSavingschallenges] = useState([])

  useEffect(() => {
    console.log('The Type: ', type);
    checkType(); // Solo Saving or Buddy Saving
  }, [type]);

  const checkType = async () => {
    console.log('all solo saving', allSoloSaving)
    if (type == 'Solo Savings') {
      const filter = allSoloSaving.data.filter(element => element.savings_type === "solo_savings")
      console.log(filter)
      setSavingLists(filter);
    } else if (type == 'Savings Challenge') {
      const filter = allSoloSaving.data.filter(element => element.savings_type === "savings_challenge")
      setSavingLists(filter)
    }
    else {
      setSavingLists(allBuddySaving);
      // console.log('All Buddy: ', allBuddySaving);
    }
  };

  // const handlePaymentRoute = async (value) => {
  //   console.log('The Value: ', value);
  //   try {
  //     const data = {
  //       savings_id: id,
  //       amount: amount,
  //     };

  //     console.log('The Dataaaaaa: ', data);

  //     setSpinner(true);
  //     const response = await addFundsToSavings(data);
  //     if (response.status == 200) {
  //       if (value == 'wallet') {
  //         const data = {
  //           payment_channel: value,
  //           reference: response?.data?.data?.reference,
  //         };

  //         setSpinner(true);
  //         // const verify = await verifySavingsPayment(data);
  //         const verify = await verifyWalletTransaction(data);

  //         if (verify.status == 200) {
  //           onRequestClose();
  //           setSpinner(false);
  //           navigation.navigate('PaymentSuccessful', {
  //             name: 'SoloSavingDashBoard',
  //             id: id,
  //             content: 'Payment Successful',
  //             subText: 'Awesome! You have successfully funded your savings.',
  //           });
  //         } else {
  //           // onRequestClose();
  //           setSpinner(false);
  //           console.log('Verify Error: ', verify.response.data);

  //           Alert.alert('Oops!', verify?.response?.data?.response_message);
  //         }
  //       } else {
  //         setChannel(value);
  //         setResData(response?.data?.data);
  //         setShowPaystackPayment(true); // show paystack
  //       }
  //     } else {
  //       setSpinner(false);
  //       // Alert.alert('Error', 'Something went wrong, please try again later.');
  //       console.log('Response Error: ', response.response.data);
  //     }
  //   } catch (error) {
  //     setSpinner(false);
  //     // Alert.alert('Error', 'Something went wrong, please try again later.');
  //     console.log('Error error: ', error.response.data);
  //   }
  // };
  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };
  const getAllSavingsChallenges = async () => {
    const token = await getToken();
    console.log('Token: ', token);
    try {
      setSpinner(true);
      const resp = await axios.get(urls.savings.GET_ALL_CHALLENGES, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      console.log('Challenges: ', resp?.data?.data);
      setAllSavingschallenges(resp?.data?.data);


      for (let d of resp?.data?.data) {
        console.log(d?.id)
      }

      const filter = allSavings?.data?.filter(
        (item) => item.id == id,
      );

      console.log('filtered', filter)

    } catch (error) {
      console.log('Error failed: ', error?.response?.data);
    }
  };

  useEffect(() => {
    // getAllSavingsChallenges()
  }, [])

  const showSuccess = async () => {
    if (type == 'Buddy Savings') {
      navigation.navigate('PaymentSuccessful', {
        content: 'Payment Successful',
        subText: 'You have successfully funded your savings',
        name: 'SavingsHome',
        id: buddyId,
      });
    } else {
      navigation.navigate('PaymentSuccessful', {
        content: 'Payment Successful',
        subText: 'You have successfully funded your savings',
        name: 'SavingsHome',
        id: id,
      });
    }

    onRequestClose();
  };

  const savingsPayment = async (data) => {
    setSpinner(true);

    try {
      const res = await completeSavingsPayment(data);

      if (res.status == 200) {
        setSpinner(false);

        console.log('Complete Paymentttttttttt: ', res.data.data);
        await showSuccess();
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error.response.data);
    }
  };

  const verifyPaymentRequest = async (data, paymentChannel) => {
    console.log('The Data: ', data);

    setSpinner(true)

    const res = await verifySavingsPayment(data);

    setSpinner(false);
    if (!res) {
      return [];
    }

    if (res.status == 200) {
      const verifyData = res?.data?.data;
      setVerifyData({ ...verifyData, id: data.savings_id });
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: verifyData.amount,
          savings_id: data.savings_id,
          channel: 'wallet',
          reference: verifyData.reference,
          purpose: 'savings',
        };

        await savingsPayment(payload);
      } else {
        setShowPaystackPayment(true);
      }
    } else {
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
    // console.log('Value: ', value);

    console.log(showModal, '8888')
    if (value == 'wallet') {
      const verifyPayload = {
        amount: amount,
        savings_id: id,
        channel: 'wallet',
        purpose: 'savings',
      };

      setChannel(value); // wallet
      await verifyPaymentRequest(verifyPayload, value);
    } else {
      const verifyPayload = {
        amount: amount,
        savings_id: id,
        channel: 'paystack',
        purpose: 'savings',
      };

      setChannel(value);

      console.log('The value: ', value);

      await verifyPaymentRequest(verifyPayload, value);
    }
  };

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onRequestClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.heading]}>
                <TouchableOpacity
                  onPress={onRequestClose}
                  style={{
                    backgroundColor: '#46596950',
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    marginRight: 20,
                  }}>
                  <Icon
                    name="arrow-back-outline"
                    size={25}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  {type.toString().toUpperCase()}
                </Text>
              </View>

              {/*  */}

              {!savingLists?.length ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={images.purplePiggy}
                    style={{
                      width: 200,
                      height: 200,
                      // borderWidth: 1,
                      marginVertical: 10,
                      resizeMode: 'contain',
                      marginTop: 50,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      textAlign: 'center',
                      color: COLORS.dark,
                      textTransform: 'capitalize',
                    }}>
                    You have no {type} yet.
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      onRequestClose();
                      navigation.navigate(
                        type == 'Solo Savings'
                          ?
                          'SoloSaving1'
                          : type == 'Buddy Savings'
                            ? 'BuddySaving1'
                            : type == 'Savings Challenge'
                              ? 'JoinChallengeList'
                              : null
                      );
                    }}
                    style={{
                      backgroundColor: COLORS.primary,
                      paddingVertical: 15,
                      paddingHorizontal: 40,
                      marginTop: 15,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: COLORS.white,
                      }}>
                      BEGIN SAVING
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.cardContainer]}>
                  <ScrollView
                    contentContainerStyle={{
                      paddingBottom: 80,
                    }}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: 10, marginTop: 10 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: COLORS.dark,
                        }}>
                        Select the savings plan you want to {'\n'}deposit to.
                      </Text>
                    </View>
                    <>
                      {savingLists?.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={[styles.card]}
                            onPress={() => {
                              // dispatch(getOneSoloSavings(item.id));
                              // dispatch(getOneSoloSavingsTransaction(item.id));
                              // navigation.navigate('SoloSavingDashBoard', {
                              //   id: item.id,
                              // });
                              setBuddyId(item?.buddy_savings_id);
                              console.log('The ID: ', item.id);
                              console.log('challenge id', item)
                              // if(type == 'Savings Challenge'){
                              //   setID(item?.challenge_id)
                              // } else {
                              setID(item.id);
                              // }
                              setShowAmountModal(true);
                              // onRequestClose();
                            }}>
                            <View style={[styles.cardFlex]}>
                              <View style={[styles.progressContainer]}>
                                <AnimatedCircularProgress
                                  size={60}
                                  width={5}
                                  rotation={0}
                                  style={{ zIndex: 9, position: 'relative' }}
                                  fill={
                                    (Number(item.amount_saved) /
                                      Number(item.target_amount)) *
                                    100
                                  }
                                  tintColor={COLORS.light}
                                  backgroundColor="#2A286A10">
                                  {(fill) => (
                                    <View
                                      style={{
                                        backgroundColor: COLORS.white,
                                        height: 40,
                                        width: 40,
                                        borderRadius: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // elevation: 2,
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: 'Poppins-Medium',
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                          color: COLORS.dark,
                                          textAlign: 'center',
                                        }}>
                                        {fill.toFixed(0)}%
                                      </Text>
                                    </View>
                                  )}
                                </AnimatedCircularProgress>
                              </View>
                              <View style={[styles.cardText]}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text style={[styles.cardTitle]}>
                                    {item.name}
                                  </Text>
                                </View>

                                <View style={[styles.cardAmount]}>
                                  <View>
                                    <Text
                                      style={[
                                        styles.amountText,
                                        { opacity: 0.5 },
                                      ]}>
                                      Amount Saved
                                    </Text>
                                    <Text style={[styles.amountText]}>
                                      ???
                                      {formatNumber(item.amount_saved) ||
                                        '0.00'}
                                    </Text>
                                  </View>

                                  <View>
                                    <Text
                                      style={[
                                        styles.amountText,
                                        { opacity: 0.5 },
                                      ]}>
                                      Target Amount
                                    </Text>
                                    <Text style={[styles.amountText]}>
                                      ???{formatNumber(item.target_amount)}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </>
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>

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
          amount={amount}
          setShowModal={setShowModal}
          setPaymentType={(data) => {
            console.log('Hello', data);
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
            console.log('Pay cancel', e);
            onRequestClose();
            // Do something
          }}
          paymentSuccessful={async (res) => {
            await showSuccess();
          }}
        />
      )}

      <InsufficientModal
        showModal={showModal}
        setShowModal={setShowModal}
        setShowPaymentModal={setShowPaymentModal}

      />

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
  },

  heading: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardContainer: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    // backgroundColor: COLORS.primary,
    width: '100%',
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#9D98EC20',
    // backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: -5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#BFBFBF50',
  },
  cardFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginRight: 20,
  },
  cardText: {
    // borderWidth: 1,
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: COLORS.dark,
    marginRight: 20,
  },
  cardAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  amountText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: COLORS.dark,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
