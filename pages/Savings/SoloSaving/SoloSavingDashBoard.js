import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images, COLORS} from '../../../util/index';
import {currencyFormat} from '../../../util/numberFormatter';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useSelector, useDispatch} from 'react-redux';
import {
  getTotalSoloSavings,
  getMaxLoanCap,
  getOneSoloSavings,
  getOneSoloSavingsTransaction,
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
} from '../../../services/network';
import PaymentTypeModalForSavings from '../../../components/paymentTypeModalForSavings';
import CreditCardFormSavings from '../../../components/CreditCard/CreditCardFormSavings';
import AmountModal from '../../../components/amountModal';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';
import PaystackPayment from '../../../components/Paystack/PaystackPayment';

export default function SoloSavingDashBoard(props) {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  // const getSoloSaving = useSelector((state) => state.getSoloSavingsReducer);
  // const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const getOneSavings = useSelector((state) => state.getOneSoloSavingsReducer);
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

  const [spinner, setSpinner] = useState(false);

  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  const [autoSaving, setAutoSaving] = useState(false);

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [amount, setAmount] = useState('');

  const [resData, setResData] = useState('');

  const toggleSwitch = async () => {
    setAutoSaving((previousState) => !previousState);
  };

  // useEffect(() => {
  //   (async () => {
  //     const data = {
  //       savings_id: route.params.id,
  //       action: autoSaving ? 'auto' : 'manual',
  //     };
  //     console.log('The Data: ', data);

  //     setSpinner(true);
  //     try {
  //       const response = await changeSavingsMethod(data);
  //       if (response.status == 200) {
  //         setSpinner(false);
  //       }
  //     } catch (error) {
  //       setSpinner(false);
  //     }
  //   })();
  // }, [autoSaving]);

  useEffect(() => {
    dispatch(getOneSoloSavingsTransaction(route.params.id));
    console.log('The ID: ', route.params.id);
  }, []);

  useEffect(() => {
    // console.log('Hello world.....');
    // if (getOneSavings?.data?.length > 0) {
    setDashboardData();
    // console.log('Hello world Inner.....');
    // }
  }, [getOneSavings]);

  const setDashboardData = () => {
    if (getOneSavings && getOneSavings.data != undefined) {
      const data = getOneSavings.data[0];
      const amount_saved = Number(data?.amount_save);

      console.log('Data: ', data);

      setDate({
        startDate: data?.start_date,
        endDate: data?.end_date,
      });

      setAutoSaving(data?.auto_save);

      setTotalInterest(data?.interest);
      setLocked(data?.locked);
      setSavingTitle(data?.name);
      setSavingsTarget(data?.target_amount);
      setPercentAchieved(
        (
          (Number(data?.amount_save) / Number(data?.target_amount)) *
          100
        ).toFixed(0),
      );
      setTotalSaving(amount_saved || 0);
    }
  };

  const goback = () => {
    navigation.navigate('SavingLists');
    setSavingTitle('');
    setSavingsTarget(0);
    setPercentAchieved(0);
    setTotalSaving(0);
  };

  const handlePaymentRoute = async (value) => {
    console.log('The Value: ', value);
    try {
      const data = {
        savings_id: route?.params?.id,
        amount: amount,
      };

      console.log('The Dataaaaaa: ', data);

      setSpinner(true);
      const response = await addFundsToSavings(data);
      if (response.status == 200) {
        if (value == 'wallet') {
          const data = {
            payment_channel: value,
            reference: response?.data?.data?.reference,
          };

          console.log('The Data: ', data);

          setSpinner(true);
          // const verify = await verifySavingsPayment(data);
          const verify = await verifyWalletTransaction(data);

          if (verify.status == 200) {
            setSpinner(false);
            navigation.navigate('PaymentSuccessful', {
              name: 'SoloSavingDashBoard',
              id: route?.params?.id,
            });
          } else {
            setSpinner(false);
            Alert.alert('Oops', verify.response.data.response_message);
            // console.log('Response: ', verify.response.data);
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
      setSpinner(false);
      console.log('Error: ', error);
      Alert.alert('Error', 'Something went wrong, please try again later');
    }
  };

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
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={[styles.content]}>
          <View style={{marginBottom: 20, paddingLeft: 10}}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.primary}}>
              Solo Saving{' '}
              <Text style={{fontSize: 10, color: COLORS.dark}}>
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
                  style={{fontSize: 12, fontWeight: '700', color: COLORS.dark}}>
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
                  style={{fontSize: 12, fontWeight: '700', color: COLORS.dark}}>
                  {moment(date.endDate).format('ddd, D MMM YYYY')}
                </Text>
              </View>
            </View>
          </View>
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
            <View style={{padding: 20}}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  zIndex: 5,
                }}
                onPress={() => setShowAmountModal(true)}
                // onPress={() => setShowPaymentModal(true)}
                // onPress={() => setShowPaymentType(true)}
                // onPress={() => setQuickSaveModal(true)}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={icons.addIcon}
                />
              </TouchableOpacity>

              <Text style={{color: COLORS.white}}>You have saved</Text>
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
                    ₦{currencyFormat(Number(totalSaving))}
                  </Text>
                  <Icon
                    name={locked ? 'lock-closed' : 'lock-open'}
                    size={15}
                    style={{marginLeft: 10}}
                    color={COLORS.primary}
                  />
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

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 10, color: COLORS.white}}>
                    View savings history
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    size={15}
                    style={{color: COLORS.white, marginLeft: 10}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#ffffff20',
                flex: 1,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{alignItems: 'flex-start'}}>
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
                  ₦{currencyFormat(Number(totalInterest))}
                </Text>
              </View>

              <View />

              <View style={{alignItems: 'flex-end'}}>
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
                  ₦{currencyFormat(Number(savingsTarget)) || '0.00'}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -60,
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
                      fontFamily: 'CircularStd',
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
                      fontFamily: 'CircularStd',
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
              onPress={() => navigation.navigate('RentNowPayLaterOnboarding')}
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
                  style={{width: 80, height: 80, marginLeft: -20}}
                  source={icons.topUp}
                />
                <Text style={{fontWeight: 'bold', color: COLORS.primary}}>
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
              onPress={() => navigation.navigate('EmergencyFundOnboarding')}
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
                  style={{width: 80, height: 80, marginLeft: -20}}
                  source={icons.instantLoan}
                />
                <Text style={{fontWeight: 'bold', color: COLORS.primary}}>
                  Emergency {'\n'}Funds
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                    color: '#ADADAD',
                    lineHeight: 20,
                  }}>
                  Access instant loans to help sort out life’s emergencies.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TransactionsTab
          transactions={getOneTransaction?.data?.reverse()}
          title={savingTitle}
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
