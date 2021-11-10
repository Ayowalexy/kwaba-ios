import React, {useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {formatNumber} from '../../util/numberFormatter';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOneSoloSavings,
  getOneSoloSavingsTransaction,
} from '../../redux/actions/savingsActions';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import PaymentTypeModal from '../../components/PaymentType/PaymentTypeModal';
import AmountModal from '../../components/amountModal';

import Spinner from 'react-native-loading-spinner-overlay';
import {addFundsToSavings, verifySavingsPayment} from '../../services/network';

export default function QuickSaveListModal(props) {
  const dispatch = useDispatch();
  const allSoloSaving = useSelector((state) => state.getSoloSavingsReducer);
  const allBuddySaving = useSelector((state) => state.getBuddySavingsReducer);
  const {onRequestClose, visible, type, navigation} = props;
  const [savingLists, setSavingLists] = useState([]);

  const [spinner, setSpinner] = useState(false);

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [showAmountModal, setShowAmountModal] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [amount, setAmount] = useState('');

  const [resData, setResData] = useState('');

  const [id, setID] = useState('');

  const [channel, setChannel] = useState('');

  useEffect(() => {
    console.log('The Type: ', type);
    checkType(); // Solo Saving or Buddy Saving
  }, [type]);

  const checkType = async () => {
    if (type == 'Solo Savings') {
      setSavingLists(allSoloSaving);
    } else {
      setSavingLists(allBuddySaving);
      // console.log('All Buddy: ', allBuddySaving);
    }
  };

  const handlePaymentRoute = async (value) => {
    console.log('The Value: ', value);
    try {
      const data = {
        savings_id: id,
        amount: amount,
      };

      console.log('The Dataaaaaa: ', data);

      setSpinner(true);
      const response = await addFundsToSavings(data);
      if (response.status == 200) {
        if (value == 'wallet') {
          const data = {
            channel: value,
            reference: response?.data?.data?.reference,
          };

          setSpinner(true);
          const verify = await verifySavingsPayment(data);

          if (verify.status == 200) {
            setSpinner(false);
            navigation.navigate('PaymentSuccessful', {
              name: 'SoloSavingDashBoard',
              id: resData?.id,
            });
          } else {
            setSpinner(false);
            Alert.alert('Insufficient fund', 'Please fund your wallet');
          }
        } else {
          setChannel(value);
          setResData(response?.data?.data);
          setShowPaystackPayment(true); // show paystack
        }
      } else {
        setSpinner(false);
      }
    } catch (error) {
      console.log('Error: ', error);
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

              {!savingLists?.data?.length ? (
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
                        type == 'Solo Savings' ? 'SoloSaving1' : 'BuddySaving1',
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
                    <View style={{paddingVertical: 10, marginTop: 10}}>
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
                      {savingLists?.data?.map((item, index) => {
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
                              console.log('The ID: ', item.id);
                              setID(item.id);
                              setShowAmountModal(true);
                              // onRequestClose();
                            }}>
                            <View style={[styles.cardFlex]}>
                              <View style={[styles.progressContainer]}>
                                <AnimatedCircularProgress
                                  size={60}
                                  width={5}
                                  rotation={0}
                                  style={{zIndex: 9, position: 'relative'}}
                                  fill={
                                    (Number(item.amount_save) /
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
                                          fontFamily: 'CircularStd',
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
                                  {/* <Icon
                        name={item.locked ? 'lock-closed' : 'lock-open'}
                        size={12}
                        color={COLORS.light}
                      /> */}
                                </View>

                                <View style={[styles.cardAmount]}>
                                  <Text style={[styles.amountText]}>
                                    ₦{formatNumber(item.amount_save) || '0.00'}
                                  </Text>
                                  <Text
                                    style={[styles.amountText, {opacity: 0.5}]}>
                                    ₦{formatNumber(item.target_amount)}
                                  </Text>
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
          setPaymentType={(data) => {
            console.log('Hello', data);
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
        />
      )}

      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={resData}
          channel={channel}
          paymentCanceled={(e) => {
            setSpinner(false);
            console.log('Pay cancel', e);
            // Do something
          }}
          paymentSuccessful={async (res) => {
            // console.log('Pay done', res);

            const data = {
              channel: 'paystack',
              reference: res.data.transactionRef.reference,
            };

            console.log('the dataatatta: ', data);

            setSpinner(true);
            const verify = await verifySavingsPayment(data);

            // console.log('the verifyyyyy: ', verify);

            if (verify.status == 200) {
              // console.log('Success: Bills Payment Verified', res);
              navigation.navigate('PaymentSuccessful', {
                name: 'SoloSavingDashBoard',
                id: resData?.id,
              });
              setSpinner(false);
            } else {
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
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
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
