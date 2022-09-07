import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-animated-progress';
import { formatNumber, unFormatNumber } from '../../util/numberFormatter';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOneUserSavingsChallenge,
  getSavingsChallengeList,
  getSavingsUnderChallengeList,
  getUserSavingsChallenge,
} from '../../redux/actions/savingsChallengeAction';
import { setCurrentUserUserActionAsync } from '../../redux/reducers/store/user/user.types';
import { setUserSavingsChallenge } from '../../redux/reducers/store/savings-challenge/savings-challenge.action';
import { selectAllUserSavingsChellange } from '../../redux/reducers/store/savings-challenge/savings-challenge.selectors';
import { getTransactionsHistory } from '../../services/network';
import AmountModalChallenge from '../../components/amountModalChallenge';
import PaymentTypeModal from '../../components/PaymentType/PaymentTypeModal';
import {
  addFundsToSavings,
  verifySavingsPayment,
  verifyWalletTransaction,
  completeSavingsPayment,
} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import { getOneSoloSavingsTransaction } from '../../redux/actions/savingsActions';
import moment from 'moment';
import MoveMoneyModal from './MoveMoneyModal';
import MoveMoneyOptionModal from './MoveMoneyOptionModal';
import MoveMoneyToExistingPlanModal from './MoveMoneyToExistingPlanModal';
import { getTotalSoloSavings } from '../../redux/actions/savingsActions';
import { updateSavingsChallange } from '../../redux/reducers/store/savings-challenge/savings-challenge.action';
import { setWalletbalance } from '../../redux/reducers/store/wallet/wallet.actions';

const { width } = Dimensions.get('screen');

const highFive = require('../../assets/images/high-five.png');
const bills = require('../../assets/images/bills.png');
const piggyBank = require('../../assets/images/piggy-bank.png');
const naira = require('../../assets/images/naira.png');
const coin = require('../../assets/images/nairas.png');
const snowflake = require('../../assets/images/snowflake.png');
const snow = require('../../assets/images/snow.png');

moment.locale();

export default function JoinChallengeDashboard(props) {
  const dispatch = useDispatch();
  const allSavings = useSelector((state) => state.getSoloSavingsReducer);

  const getOneSavings = useSelector(
    (state) => state.getOneUserSavingsChallengeReducer,
  );
  const getOneTransaction = useSelector(
    (state) => state.getOneSoloSavingsTransactionReducer,
  );

  console.log('get One Transaction', getOneSavings)
  const { navigation, route } = props;
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [resData, setResData] = useState('');
  const [channel, setChannel] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [rand, setRand] = useState(0)
  const [fundedAmount, setFundedAmount] = useState(0)
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);


  const [targetAmount, setTargetAmount] = useState();

  const [walletBalance, setWalletBalance] = useState(0);


  const dash = useSelector(selectAllUserSavingsChellange)

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [challengeEnd, setChallengeEnd] = useState(false);

  const [showMoveMoneyModal, setShowMoveMoneyModal] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [actvities, setActivities] = useState([])

  const [current_id, set_current_id] = useState(0)

  const [showMoveMoneyOptionModal, setShowMoveMoneyOptionModal] =
    useState(false);

  const [dashboardData, setDashboardData] = useState({});
  const [verifyData, setVerifyData] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(1)


  const [
    showMoveMoneyToExistingPlanModal,
    setShowMoveMoneyToExistingPlanModal,
  ] = useState(false);

  // useEffect(() => {
  //   const data = route?.params?.data;
  //   var today = moment().format('yyyy-MM-DD');

  //   console.log(
  //     'The Real Format: ',
  //     checkDateFormat(data?.savings[0].end_date),
  //     checkDateFormat(data?.savings[0].start_date),
  //   );

  //   let challenge_start = checkDateFormat(data?.savings[0].start_date);
  //   let challenge_end = checkDateFormat(data?.savings[0].end_date);

  //   setStartDate(challenge_start);
  //   setEndDate(challenge_end);

  //   var numberOfDays = moment(today).diff(moment(challenge_start), 'days');
  //   console.log('Number Of Days: ', numberOfDays);

  //   if (numberOfDays >= 30) {
  //     setChallengeEnd(true);
  //   } else {
  //     setChallengeEnd(false);
  //   }
  // }, []);

  console.log('Dash', dash)

  useEffect(() => {
    dispatch(getTotalSoloSavings());
    dispatch(setCurrentUserUserActionAsync())
  }, [])

  useEffect(() => {
    if (getMaxLoanCap1?.data) {
      setWalletBalance(getMaxLoanCap1?.data?.wallet_available_balance);
    }
  }, [getMaxLoanCap1]);

  useEffect(() => {
    set_current_id(props?.route?.params?.id)
  }, [])

  useEffect(() => {
    (async () => {
      // item.savings_type == 'savings_challenge'

      const filter = allSavings.data.filter(
        (item) => {
          if (!(Object.is(item, null)) && (item.savings_type == 'savings_challenge')) {
            return item
          }
        });

      console.log('All Savings challeng', filter)

      console.log("filter", props.route.params.id)
      for (let d of filter) {
        console.log(d.challenge_id, props.route.params.id)
      }

      const data = dash.filter(
        (item) => item?.challenge_id == props?.route?.params?.id || item?.challenge_id == current_id,
      )[0];
      console.log('The ID: ', data);



      let challenge_start = moment(data?.start_date, 'YYYY-MM-DD').format(
        'YYYY-MM-DD',
      );
      let challenge_end = moment(data?.end_date, 'YYYY-MM-DD').format(
        'YYYY-MM-DD',
      );

      setStartDate(challenge_start);
      setEndDate(challenge_end);
      setDashboardData(data);
      setFundedAmount(data?.amount_saved)
      console.log('days', challenge_start, challenge_end)

      const numberOfDays = moment(challenge_end).diff(moment(challenge_start), 'days');
      console.log('Number Of Days: ', numberOfDays)
      setNumberOfDays(numberOfDays)

      const history = await getTransactionsHistory();
      const filtered = history?.data?.data?.filter(d => d?.savings_id == data?.id)
      setActivities(filtered)

    })()
  }, [dash, amount]);

 

  const handleActivities = async () => {
    const filter = allSavings.data.filter(
      (item) => {
        if (!(Object.is(item, null)) && (item.savings_type == 'savings_challenge')) {
          return item
        }
      });

      const data = filter.filter(
        (item) => item.challenge_id == props?.route?.params?.id || item.challenge_id == current_id,
      )[0];

      const history = await getTransactionsHistory();
      const filtered = history?.data?.data?.filter(d => d?.savings_id == data?.id)
      console.log('handle activities', filtered)
      setActivities(filtered)
  }




  useEffect(() => {
    dispatch(getOneUserSavingsChallenge(route?.params?.data?.id));
    dispatch(getOneSoloSavingsTransaction(route?.params?.data?.savings[0].id));

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

  console.log('challenge id', current_id)
  // ebuka, here!!!!!
  const showSuccess = () => {
    navigation.navigate('PaymentSuccessful', {
      content: 'Payment Successful',
      subText: 'You have successfully funded your savings challenge',
      name: 'JoinChallengeDashboard',
      id: dashboardData.id,
    });
  };
  const createSavings = async (paymentChannel) => {
    setSpinner(true);
    try {
      const { challenge_id, id } = dashboardData;

      const payloadData = {
        channel: paymentChannel,
        purpose: 'savingsChallenge',
        amount: route?.params?.amount || amount,
        savingsChallengeData: {
          savings_id: id,
          challenge_id,
        },
      };
      const verifiedResponse = await verifySavingsPayment(payloadData);

      if (verifiedResponse.status === 200) {
        const tempData = verifiedResponse?.data?.data;

        setVerifyData(tempData);
        if (paymentChannel == 'wallet') {
          const payload = {
            // ...payloadData,
            reference: tempData.reference,
            channel: 'wallet',
          };
          console.log({ payload });
          const completedResponse = await completeSavingsPayment(payload);
          console.log('completed payment response', completedResponse.data);
          if (completedResponse.status == 200) {
            setFundedAmount(Number(fundedAmount) + Number(amount))
            dispatch(updateSavingsChallange({
              ...dashboardData,
              amount_saved: Number(dashboardData.amount_saved) + Number(amount)
            }))
            dispatch(setWalletbalance(walletBalance - amount))

            console.log('Complete Paymentttttttttt: ', completedResponse?.data);
            showSuccess();
          }
        } else {
          setShowPaystackPayment(true);
          console.log('Hello here');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };


  const handlePaymentRoute = async (value) => {
    setSpinner(true);
    if (value == 'wallet') {
      if(amount > walletBalance){
        setSpinner(false)
        return Alert.alert('Error', "Your balance is insufficent to complete this transaction")
      }
      createSavings(value);
    } else {
      setChannel(value);
      createSavings('paystack');
    }
  };

  const handleMoveToSaving = () => {
    setShowMoveMoneyOptionModal(true);
  };

  return (
    <View style={[styles.container, { marginTop: Platform.OS == 'ios' ? statusBarHeight : 0}]}>
      <Icon
        onPress={() => {
          navigation.navigate('JoinChallengeList');
          dispatch(getUserSavingsChallenge());
        }}
        name="arrow-back-outline"
        size={25}
        style={{ fontWeight: '900', paddingBottom: 20 }}
        color={COLORS.white}
      />
      {/* <Image
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
      /> */}
      {/* <Image
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
      /> */}
      {/* <Image
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
      /> */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.heading]}>
          <Text style={[styles.headingTitle]}>{dashboardData?.name}</Text>
          <Text style={[styles.headingSub]}>{dashboardData?.description}</Text>
        </View>

        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            // padding: 20,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                color: COLORS.secondary,
                marginBottom: 5,
                textTransform: 'uppercase',
              }}>
              Start Date
            </Text>
            <View
              style={{
                width: 70,
                height: 50,
                backgroundColor: COLORS.white,
                borderRadius: 5,
                borderTopWidth: 5,
                borderTopColor: COLORS.secondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.light }}>
                {startDate ? moment(startDate).format('DD') : '--'}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: COLORS.light,
                  fontWeight: 'bold',
                  opacity: 0.5,
                }}>
                {startDate ? moment(startDate).format('MMM YYYY') : '--'}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                color: COLORS.orange,
                marginBottom: 5,
                textTransform: 'uppercase',
              }}>
              End Date
            </Text>
            <View
              style={{
                width: 70,
                height: 50,
                backgroundColor: COLORS.white,
                borderRadius: 5,
                borderTopWidth: 5,
                borderTopColor: COLORS.orange,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: COLORS.light,
                }}>
                {endDate ? moment(endDate).format('DD') : '--'}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: COLORS.light,
                  fontWeight: 'bold',
                  opacity: 0.5,
                }}>
                {endDate ? moment(endDate).format('MMM YYYY') : '--'}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', paddingRight: 20 }}>
              <Image
                source={highFive}
                style={{
                  width: 40,
                  height: 40,
                }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.black }}>
                {
                  // targetAmount == getOneSavings.data?.savings[0]?.target_amount
                  challengeEnd ? 'Awe-some!' : 'High-five!'
                }
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 20,
                  marginTop: 10,
                  color: COLORS.black,
                  opacity: 0.9,
                }}>
                {
                  // targetAmount == getOneSavings.data?.savings[0]?.target_amount
                  challengeEnd
                    ? 'You have successfully completed your savings challenge!'
                    : 'You are doing just fine, keep up with the good work!'
                }
              </Text>
            </View>
            <View style={{ justifyContent: 'center', paddingLeft: 20 }}>
              <Image
                source={
                  // targetAmount == getOneSavings.data?.savings[0]?.target_amount
                  challengeEnd ? naira : piggyBank
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

        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 20, width: width / 1.3 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{ fontSize: 12, color: COLORS.white }}>
                Amount Saved
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.white }}>Target</Text>
            </View>
            {/* Percentage Archieved Cal
                (Amount saved / Target amount) * 100
                returns value in percent
            */}
            <ProgressBar
              progress={
                (Number(dashboardData?.amount_saved) /
                  Number(dashboardData?.target_amount)) *
                100
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
              <Text style={{ fontSize: 12, color: COLORS.white }}>
                ₦
                {
                dashboardData?.amount_saved
                ?
                formatNumber(Number(dashboardData?.amount_saved).toFixed(2)) 
                :
                  '0.00'}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.white }}>
                ₦{formatNumber(Number(dashboardData?.target_amount).toFixed(2))}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.btn]}
              onPress={() => {
                if (
                  // targetAmount ==
                  // getOneSavings.data?.savings[0]?.target_amount
                  // numberOfDays == 0
                  !dashboardData.status
                ) {
                  handleMoveToSaving();
                } else {
                  if(dashboardData?.amount_saved >= dashboardData?.target_amount){
                    Alert.alert('Savings Complete', 'Your savings target has be achieved. You can not fund this savings challenge until it is rolled over on the maturity date.')
                  } else {
                    setShowAmountModal(true);
                  }
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
                {/* {numberOfDays == 0 ? 'Move Money to savings' : 'Add Money'} */}
                {!dashboardData?.status ? 'Move Money to savings' : 'Add Money'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.transaction]}>
          <Text style={[styles.transactionTitle]}>Recent activities</Text>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            {/* {getOneTransaction?.data
              ?.slice(0, getOneTransaction?.data?.length)
              ?.map((item, index, arr) => { */}
            {actvities
              ?.reverse()
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
                    <View style={{ paddingLeft: 40 }}>
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
                        {item.reason}
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
          setAmount={(d) => {
             
              setAmount(d)

          }}
          // setData={(d) => setResData(d)}
          showCard={(d) => {
            if((Number(dashboardData?.amount_saved) + Number(d)) > Number(dashboardData?.target_amount)){
              return Alert.alert('Overfunding', `The target amount is ${formatNumber(dashboardData?.target_amount)}, please check the amount and try again`)
             } else {
              setTimeout(() => {
                setShowPaymentModal(true)
              }, Platform.OS === 'ios' ? statusBarHeight : 0);
            }
          }}
          target={Math.floor(dashboardData?.target_amount)}
          minimumAmount={dashboardData?.periodic_savings_amount}
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

      {/*  */}
      {showMoveMoneyModal && (
        <MoveMoneyModal
          onRequestClose={() => setShowMoveMoneyModal(!showMoveMoneyModal)}
          visible={showMoveMoneyModal}
          savingsData={route?.params?.data}
          navigation={navigation}
        />
      )}

      {showMoveMoneyOptionModal && (
        <MoveMoneyOptionModal
          onRequestClose={() =>
            setShowMoveMoneyOptionModal(!showMoveMoneyOptionModal)
          }
          visible={showMoveMoneyOptionModal}
          showWhereToMoveMoneyBasedOnID={(id) => {
            console.log('The IDIID: ', id);
            id == 0
              ? setShowMoveMoneyToExistingPlanModal(true)
              : id == 1
                ? setShowMoveMoneyModal(true)
                : null;
          }}
        />
      )}

      {showMoveMoneyToExistingPlanModal && (
        <MoveMoneyToExistingPlanModal
          onRequestClose={() =>
            setShowMoveMoneyToExistingPlanModal(
              !showMoveMoneyToExistingPlanModal,
            )
          }
          visible={showMoveMoneyToExistingPlanModal}
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
            console.log('savings successful');
            setSpinner(false);

           dispatch(updateSavingsChallange({
            ...dashboardData,
            amount_saved: Number(dashboardData.amount_saved) + Number(amount)
          }))

            console.log('data now'.repeat(100), {
              ...dashboardData,
              amount_saved: Number(dashboardData?.amount_saved) + Number(amount)
            })

            setFundedAmount(Number(fundedAmount) + Number(amount))
            setTimeout(async() => {
              await handleActivities()
            }, 4000);
            showSuccess();
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
    paddingBottom: 10,
    paddingLeft: 5,
    width: width / 1.2,
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
