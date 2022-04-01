import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images, COLORS} from '../../../util/index';
import {
  currencyFormat,
  formatNumber,
  numberWithCommas,
} from '../../../util/numberFormatter';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentUser} from '../../../redux/actions/userActions';
import {
  getTotalSoloSavings,
  getOneBuddySavings,
} from '../../../redux/actions/savingsActions';

import QuickSaveModal from '../../../components/QuickSaveModal';
import moment from 'moment';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  getOneUserBuddySavings,
  getOneBuddy,
  verifySavingsPayment,
  completeSavingsPayment,
} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import TransactionsTab from '../SoloSaving/TransactionTabs';
import PaystackPayment from '../../../components/Paystack/PaystackPayment';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';
import AmountModal from '../../../components/amountModal';

export default function SoloSavingDashBoard(props) {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const getOneSavings = useSelector((state) => state.getOneSoloSavingsReducer);

  const [successModal, setSuccessModal] = useState(false);
  const [totalSaving, setTotalSaving] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [savingsTarget, setSavingsTarget] = useState(0);
  const [percentAchieved, setPercentAchieved] = useState(0);
  const [savingTitle, setSavingTitle] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [quickSaveModal, setQuickSaveModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [yourSavings, setYourSavings] = useState(0);
  const [buddies, setBuddies] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [savingsPlan, setSavingsPlan] = useState();
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [amount, setAmount] = useState('');
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [channel, setChannel] = useState('');
  const [verifyData, setVerifyData] = useState('');

  useEffect(() => {
    getOneBuddy(route?.params?.id)
      .then((data) => {
        setSavingsTarget(data.data?.savings_plan?.target_amount);
        setSavingTitle(data.data?.savings_plan?.name);
        setTotalSaving(data.data?.savings_plan?.amount_saved);
        setYourSavings(data.data?.savings_plan?.amount);
        setSavingsPlan(data.data?.savings_plan);
        setPercentAchieved(
          (data.data?.savings_plan?.amount_saved /
            data.data?.savings_plan?.target_amount) *
            100,
        );
        setBuddies(data.data.buddies);
      })
      .catch(console.log);
  }, []);
  const showSuccess = async () => {
    navigation.navigate('PaymentSuccessful', {
      content: 'Payment Successful',
      subText: 'You have successfully funded your savings',
      name: 'BuddySavingDashBoard',
      id: route?.params?.id,
    });
  };

  const verifyPaymentRequest = async (data, paymentChannel) => {
    try {
      console.log('The Data: ', data);

      setSpinner(true);
      const res = await verifySavingsPayment(data);
      console.log(res);
      setSpinner(false);
      if (!res) {
        return [];
      }

      if (String(res.status).startsWith('2')) {
        const verifyData = res?.data?.data;
        setVerifyData({...verifyData, id: data.buddyData.savings_id});
        if (paymentChannel == 'wallet') {
          const payload = {
            amount: verifyData.amount,
            buddyData: {
              savings_id: data.buddyData.savings_id,
              buddyId: data.buddyData.buddyId,
            },
            channel: 'wallet',
            reference: verifyData.reference,
            purpose: 'buddySavings',
          };
          const completeResponse = await completeSavingsPayment(payload);
          if (String(completeResponse.status).startsWith('2')) {
            setSpinner(false);

            showSuccess();
          }
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
    } catch (error) {
      setSpinner(false);
    }
  };

  const handlePaymentRoute = async (value) => {
    const userData = await AsyncStorage.getItem('userData');
    const mainUserEmail = JSON.parse(userData).user.email;
    const currentBuddy = buddies.find(
      (d) =>
        d.email.trim().toLowerCase() === mainUserEmail.trim().toLowerCase(),
    );

    if (value == 'wallet') {
      const verifyPayload = {
        amount: amount,
        buddyData: {
          savings_id: savingsPlan?.id,
          buddyId: currentBuddy?.id,
        },

        channel: 'wallet',
        purpose: 'buddySavings',
      };

      setChannel(value); // wallet
      await verifyPaymentRequest(verifyPayload, value);
    } else {
      const verifyPayload = {
        amount: amount,
        buddyData: {
          savings_id: savingsPlan?.id,
          buddyId: currentBuddy?.id,
        },

        channel: 'wallet',
        purpose: 'buddySavings',
      };

      setChannel(value); // card or bank_transfer
      await verifyPaymentRequest(verifyPayload, value);
    }
  };
  return (
    <View style={styles.container}>
      <Icon
        onPress={() => navigation.navigate('BuddyLists')}
        name="arrow-back-outline"
        size={25}
        style={{padding: 18, paddingHorizontal: 10}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={[styles.content]}>
          <View style={{marginBottom: 20}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLORS.primary}}>
              Buddy Saving{' '}
              <Text style={{fontSize: 10, color: '#ADADAD'}}>
                {savingTitle}
              </Text>
            </Text>
            <Text style={{fontSize: 12, fontWeight: '700', color: '#ADADAD'}}>
              {moment().format('ddd, D MMM')}
            </Text>
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
                  right: 0,
                  top: 0,
                  zIndex: 5,
                }}
                onPress={() => setShowAmountModal(true)}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={icons.addIcon}
                />
              </TouchableOpacity>

              <Text style={{color: COLORS.white}}>Total Buddy Savings</Text>
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
                  name="lock-closed"
                  size={15}
                  style={{marginLeft: 10}}
                  color={COLORS.primary}
                />
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
                    You guys are doing great
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
                  {/* ₦{currencyFormat(totalInterest)} */}₦
                  {formatNumber(Number(0)) || '0.00'}
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
                  ₦{formatNumber(Number(savingsTarget)) || '0.00'}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -50,
              elevation: 10,
            }}>
            <AnimatedCircularProgress
              size={90}
              width={10}
              rotation={0}
              style={styles.circularProgress}
              fill={percentAchieved || 0}
              tintColor={COLORS.yellow}
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

          <View
            style={{
              backgroundColor: '#9D98EC50',
              width: '85%',
              minHeight: 50,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: -50,
              borderRadius: 10,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              // paddingVertical: 5,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{fontSize: 10, fontWeight: 'bold', color: COLORS.dark}}>
                You have saved
              </Text>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: COLORS.dark}}>
                ₦{formatNumber(Number(yourSavings)) || '0.00'}
              </Text>
            </View>

            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                // alignItems: '',
                width: 120,
                height: 30,
                alignItems: 'center',
              }}>
              {buddies?.length > 0 &&
                buddies.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#CFCFCF',
                        width: 25,
                        height: 25,
                        marginLeft: 5,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: COLORS.white,
                        position: 'absolute',
                        // right: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', color: COLORS.dark}}>
                        {item.fullname.toString().charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </View>

          {/*  */}

          <View
            style={{
              marginTop: 20,
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
                  source={icons.invite}
                />
                <Text style={{fontWeight: 'bold', color: COLORS.primary}}>
                  Invite
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                    color: '#ADADAD',
                    lineHeight: 20,
                  }}>
                  Invite your friends, family or spouse to save with you
                </Text>
              </View>
            </TouchableOpacity>

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
          </View>
        </View>

        <TransactionsTab title={savingTitle} transactions={transactions} />
      </ScrollView>

      {/* <QuickSaveModal
        onRequestClose={() => setQuickSaveModal(!quickSaveModal)}
        visible={quickSaveModal}
      /> */}
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
            showSuccess();
          }}
        />
      )}
      {/* {showPaymentType && (
        <PaymentTypeModalForSavings
          onRequestClose={() => setShowPaymentType(!showPaymentType)}
          visible={showPaymentType}
          setShowAmountModal={(bol) => setShowAmountModal(bol)}
          setChannel={(value) => setChannel(value)}
        />
      )} */}
      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
        />
      )}
      {showAmountModal && (
        <AmountModal
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          setAmount={(d) => setAmount(d)}
          // setData={(d) => setResData(d)}
          showCard={() => setShowPaymentModal(true)}
        />
      )}
      {/* {showAmountModal && (
        <AmountModal
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          navigation={navigation}
          channel={channel}
          ID={route.params.id}
          redirectTo="BuddySavingsDashBoard"
          from="buddy"
        />
      )} */}

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
    minHeight: 180,
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
    // top: -50,
    // left: 50,
    // transform: [{translateX: 50}],
  },
});
