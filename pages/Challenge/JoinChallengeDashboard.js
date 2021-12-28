import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {COLORS} from '../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-animated-progress';
import {formatNumber, unFormatNumber} from '../../util/numberFormatter';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOneUserSavingsChallenge,
  getSavingsChallengeList,
  getSavingsUnderChallengeList,
  getUserSavingsChallenge,
} from '../../redux/actions/savingsChallengeAction';
import AmountModalChallenge from '../../components/amountModalChallenge';
import PaymentTypeModal from '../../components/PaymentType/PaymentTypeModal';
import {
  addFundsToSavings,
  verifySavingsPayment,
  verifyWalletTransaction,
} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import {getOneSoloSavingsTransaction} from '../../redux/actions/savingsActions';

const {width} = Dimensions.get('screen');

const highFive = require('../../assets/images/high-five.png');
const bills = require('../../assets/images/bills.png');
const piggyBank = require('../../assets/images/piggy-bank.png');
const naira = require('../../assets/images/naira.png');
const coin = require('../../assets/images/nairas.png');
const snowflake = require('../../assets/images/snowflake.png');
const snow = require('../../assets/images/snow.png');

export default function JoinChallengeDashboard(props) {
  const dispatch = useDispatch();
  const getOneSavings = useSelector(
    (state) => state.getOneUserSavingsChallengeReducer,
  );
  const getOneTransaction = useSelector(
    (state) => state.getOneSoloSavingsTransactionReducer,
  );
  const {navigation, route} = props;
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [resData, setResData] = useState('');
  const [channel, setChannel] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [minimumAmount, setMinimumAmount] = useState(0);

  const [targetAmount, setTargetAmount] = useState();

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  useEffect(() => {
    console.log(route?.params?.data);
  }, []);

  useEffect(() => {
    dispatch(getOneUserSavingsChallenge(route?.params?.data?.id));
    dispatch(getOneSoloSavingsTransaction(route?.params?.data?.savings[0].id));
    // console.log('SOmething: ', getOneSavings);
    // console.log('SOmething Transact: ', getOneTransaction);

    // console.log(route?.params?.data?.id);
    // console.log('Route:', route?.params?.data?.savings[0].target_amount);
    let amount = route?.params?.data?.tartget_per_member;
    setTargetAmount(route?.params?.data?.savings[0]?.amount_save);

    if (amount == '100000') {
      setMinimumAmount(4000);
    }
    if (amount == '50000') {
      setMinimumAmount(2000);
    }
    if (amount == '25000') {
      setMinimumAmount(1000);
    }
  }, []);

  const handlePaymentRoute = async (value) => {
    console.log('The Value: ', value);
    console.log('The ID: ', route?.params?.data?.savings[0].id);
    try {
      const data = {
        savings_id: route?.params?.data?.savings[0].id,
        amount: amount,
      };

      console.log('The Dataaaaaa: ', data);

      setSpinner(true);
      const response = await addFundsToSavings(data);

      console.log('Add Funds To Savings Res: ', response);
      if (response.status == 200) {
        if (value == 'wallet') {
          const data = {
            payment_channel: value,
            reference: response?.data?.data?.reference,
          };

          setSpinner(true);
          // const verify = await verifySavingsPayment(data);
          const verify = await verifyWalletTransaction(data);

          if (verify.status == 200) {
            setSpinner(false);
            // dispatch(getUserSavingsChallenge());
            // Alert.alert('Payment Successful', 'Your payment is done.');
            console.log('Verify: ', verify.response.data);
            navigation.navigate('PaymentSuccessful', {
              name: 'JoinChallengeDashboard',
              id: route?.params?.data?.id,
              content: 'Payment Successful',
              subText: 'Awesome! You have successfully funded your savings',
            });
          } else {
            setSpinner(false);
            Alert.alert('Oops!', verify.response.data.response_message);
            console.log('Response: ', verify.response.data);
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
    }
  };

  const handleMoveToSaving = () => {
    Alert.alert('Moving..', 'Holding on we are still working on it.');
  };

  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => {
          navigation.navigate('JoinChallengeList');
          dispatch(getUserSavingsChallenge());
        }}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingBottom: 20}}
        color={COLORS.white}
      />
      <Image
        source={snowflake}
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          right: 10,
          top: 50,
          opacity: 0.2,
          zIndex: 0,
        }}
        resizeMode="contain"
      />
      <Image
        source={snow}
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          left: 0,
          bottom: 10,
          opacity: 0.2,
          zIndex: 0,
        }}
        resizeMode="contain"
      />
      <Image
        source={snow}
        style={{
          width: 50,
          height: 50,
          position: 'absolute',
          right: 0,
          bottom: 10,
          opacity: 0.2,
          zIndex: 0,
        }}
        resizeMode="contain"
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.heading]}>
          <Text style={[styles.headingTitle]}>{route?.params?.data?.name}</Text>
          <Text style={[styles.headingSub]}>
            {route?.params?.data?.description}
          </Text>
        </View>

        <View style={[styles.card]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{justifyContent: 'center', paddingRight: 20}}>
              <Image
                source={highFive}
                style={{
                  width: 40,
                  height: 40,
                }}
                resizeMode="contain"
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{fontSize: 15, fontWeight: 'bold', color: COLORS.black}}>
                {targetAmount == getOneSavings.data?.savings[0]?.target_amount
                  ? 'Awe-some!'
                  : 'High-five!'}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 20,
                  marginTop: 10,
                  color: COLORS.black,
                  opacity: 0.9,
                }}>
                {targetAmount == getOneSavings.data?.savings[0]?.target_amount
                  ? 'You have successfully completed your savings challenege!'
                  : 'You are doing just fine, keep up with the good work!'}
              </Text>
            </View>
            <View style={{justifyContent: 'center', paddingLeft: 20}}>
              <Image
                source={
                  targetAmount == getOneSavings.data?.savings[0]?.target_amount
                    ? naira
                    : piggyBank
                }
                style={{
                  width: 50,
                  height: 50,
                }}
                resizeMode="contain"
              />
            </View>
          </View>

          {getOneSavings.data?.members_joined != null && (
            <View
              style={{
                backgeoundColor: COLORS.orange,
                paddingTop: 10,
                borderRadius: 5,
                borderTopWidth: 1,
                borderTopColor: '#EEE',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.orange,
                  textAlign: 'center',
                }}>
                {getOneSavings.data?.members_joined == 1
                  ? `${getOneSavings.data?.members_joined} person is on this challenge`
                  : `${getOneSavings.data?.members_joined} people are on this challenge`}
              </Text>
            </View>
          )}
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={{marginTop: 20, width: width / 1.3}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 12, color: COLORS.white}}>
                Amount Saved
              </Text>
              <Text style={{fontSize: 12, color: COLORS.white}}>Target</Text>
            </View>
            {/* Percentage Archieved Cal
                (Amount saved / Target amount) * 100
                returns value in percent
            */}
            <ProgressBar
              progress={
                (Number(getOneSavings.data?.savings[0]?.amount_save) /
                  Number(getOneSavings.data?.savings[0]?.target_amount)) *
                  100 || 0
              }
              height={7}
              backgroundColor="#fff"
              trackColor="#ffffff10"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 12, color: COLORS.white}}>
                ₦
                {formatNumber(
                  Number(getOneSavings.data?.savings[0]?.amount_save).toFixed(
                    2,
                  ),
                )}
              </Text>
              <Text style={{fontSize: 12, color: COLORS.white}}>
                ₦
                {formatNumber(
                  Number(getOneSavings.data?.savings[0]?.target_amount).toFixed(
                    2,
                  ),
                )}
              </Text>
            </View>

            {targetAmount != getOneSavings.data?.savings[0]?.target_amount && (
              <TouchableOpacity
                style={[styles.btn]}
                onPress={() => {
                  if (
                    targetAmount ==
                    getOneSavings.data?.savings[0]?.target_amount
                  ) {
                    handleMoveToSaving();
                  } else {
                    setShowAmountModal(true);
                  }
                }}>
                <Image
                  source={snow}
                  style={{
                    width: 50,
                    height: 50,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    opacity: 0.8,
                    zIndex: 0,
                  }}
                  resizeMode="contain"
                />
                <Text style={[styles.btnText]}>
                  {targetAmount == getOneSavings.data?.savings[0]?.target_amount
                    ? 'Move to savings'
                    : 'Add Money'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={[styles.transaction]}>
          <Text style={[styles.transactionTitle]}>Recent activities</Text>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            {getOneTransaction?.data
              ?.slice(0, getOneTransaction?.data?.length)
              ?.map((item, index, arr) => {
                return (
                  <View
                    key={index}
                    style={{
                      borderLeftWidth: index == arr.length - 1 ? 0 : 2,
                      borderLeftColor:
                        item.status == 1 ? COLORS.secondary : COLORS.red,
                      paddingBottom: 40,
                    }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor:
                          item.status == 1 ? COLORS.secondary : COLORS.red,
                        borderRadius: 20,
                        position: 'absolute',
                        left: index == arr.length - 1 ? -10 : -11,
                        top: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderWidth: 1,
                      }}>
                      <Icon
                        name={item.status == 1 ? 'checkmark' : 'close'}
                        size={15}
                        // style={{fontWeight: '900', paddingBottom: 20}}
                        color={COLORS.white}
                      />
                    </View>
                    <View style={{paddingLeft: 40}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: COLORS.white,
                        }}>
                        ₦{formatNumber(item.amount)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.light,
                          marginTop: 10,
                        }}>
                        {item.reference}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: COLORS.light,
                          marginTop: 10,
                        }}>
                        {item.updated_at}
                      </Text>
                      {/* <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.light,
                        marginTop: 10,
                      }}>
                      {item.status}
                    </Text> */}
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>

      {showAmountModal && (
        <AmountModalChallenge
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          setAmount={(d) => setAmount(d)}
          // setData={(d) => setResData(d)}
          showCard={() => setShowPaymentModal(true)}
          minimumAmount={minimumAmount}
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
              // navigation.navigate('PaymentSuccessful', {
              //   name: 'SoloSavingDashBoard',
              //   id: resData?.id,
              // });
              navigation.navigate('PaymentSuccessful', {
                name: 'JoinChallengeDashboard',
                id: route?.params?.data?.id,
                content: 'Payment Successful',
                subText: 'Awesome! You have successfully funded your saving',
              });
              setSpinner(false);
            } else {
              setSpinner(false);
            }
          }}
        />
      )}

      <Spinner visible={spinner} size={'small'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#5A4CB1',
  },

  heading: {
    paddingBottom: 20,
    paddingLeft: 5,
    width: width / 1.5,
  },

  headingTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.white,
    lineHeight: 35,
  },

  headingSub: {
    fontSize: 13,
    // fontWeight: 'normal',
    color: COLORS.white,
    lineHeight: 25,
    opacity: 0.9,
    marginTop: 10,
  },

  card: {
    width: '100%',
    // height: 100,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 10,
  },

  transaction: {
    marginTop: 50,
    // paddingHorizontal: 10,
  },

  transactionTitle: {
    fontSize: 14,
    color: COLORS.white,
    // fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  btn: {
    backgroundColor: COLORS.secondary,
    // backgroundColor: COLORS.white,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    elevation: 10,
    overflow: 'hidden',
  },

  btnText: {
    color: COLORS.white,
    // color: '#5A4CB1',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
