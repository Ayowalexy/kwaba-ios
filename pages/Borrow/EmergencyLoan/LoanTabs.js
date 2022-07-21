import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {
  completeSavingsPayment,
  getEmergencyLoans,
  loanRepayment,
  verifySavingsPayment,
  verifyWalletTransaction,
} from '../../../services/network';
import {useDispatch, useSelector} from 'react-redux';
import {getMaxLoanCap} from '../../../redux/actions/savingsActions';
import {COLORS} from '../../../util';
import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';
import ActiveLoanModal from './ActiveLoanModal';
import Spinner from 'react-native-loading-spinner-overlay';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';
import AmountModalFunds from '../../../components/amountModalFunds';
import PaystackPayment from '../../../components/Paystack/PaystackPayment';
import Preloader from '../../../components/Preloader';
export default function LoanTabs(props) {
  const dispatch = useDispatch();
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const {navigation, setFundedAmount, fundedAmount} = props;
  const [spinner, setSpinner] = useState(false);
  const [repaymentList, setRepaymentList] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeLoanModal, setActiveLoanModal] = useState(false);
  const [loanID, setLoanID] = useState('');
  const [loanData, setLoanData] = useState({});

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loanRepaymentData, setLoanRepaymentData] = useState([]);
  const [showAmountModal, setShowAmountModal] = useState(false);

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [amount, setAmount] = useState('');

  const [channel, setChannel] = useState('');

  const [resData, setResData] = useState('');

  const [showPreloader, setShowPreloader] = useState(false)

  const sortStatus = {
    overdued: 1,
    pending: 2,
    active: 3,
    paid: 4,
  };

  useEffect(() => {
    handleFetchLoans();
    console.log('Hello');
  }, [getMaxLoanCap1]);

  const handleFetchLoans = async () => {
    setSpinner(true);
    try {
      const loans = await getEmergencyLoans();
      if (loans.status == 200) {
        setSpinner(false);
        // console.log('The Loan: ', loans);
        const emergencyLoans = loans?.data?.data.filter(
          (loans) => loans.loan_type == 'emergency_loan',
        );

        setRepaymentList(emergencyLoans);
        // dispatch(getMaxLoanCap());
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error);
    }
  };
  useEffect(() => {
    filterLoans('pending');
  }, []);

  const showSuccess = async () => {
    navigation.navigate('PaymentSuccessful', {
      name: 'EmergencyLoanDashBoard',
      content: 'Payment Successful',
      subText: 'Awesome! Your payment was successful',
    });
  };

  const completePayment = async (data) => {
    setSpinner(true);
    setShowPreloader(true)
    const res = await completeSavingsPayment(data);
    console.log('response', res)
    setShowPreloader(false)

    try {
      if (res.status == 200) {
        setSpinner(false);

        console.log('Complete Paymentttttttttt: ', res.data.data);
        setFundedAmount(Number(amount) + Number(fundedAmount))

        await showSuccess();
      } else {
        setSpinner(false);
        console.log('Complete Paymentttttttttt: ', res.response.data);
      }
    } catch (error) {
      setSpinner(false);
      setShowPreloader(false)

      console.log('The Error: ', error);
    }
  };

  const verifyPayment = async (data, paymentChannel) => {
    setSpinner(true);
    setShowPreloader(true)
    const res = await verifySavingsPayment(data);

    setSpinner(false);
    setShowPreloader(false)
    if (!res) {
      return [];
    }

    if (res.status == 200) {
      console.log('Verify Data: ', res?.data?.data);
      setResData(res?.data?.data);
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: amount,
          emergencyLoanId: loanRepaymentData?.id,
          channel: 'wallet',
          // reference: res?.data?.data.paymentReference,
          purpose: 'emergencyLoanRepayment',
          reference: res?.data?.data.reference,
        };

        console.log('That payload: ', payload);
        await completePayment(payload);
      } else {
        setShowPaystackPayment(true);
      }
    } else {
      setSpinner(false);
      console.log('Error: ', res.response.data);
    }
  };

  const handlePaymentRoute = async (value) => {
    console.log('Value: ', value);

    if (value == 'wallet') {
      const verifyPayload = {
        amount: amount,
        emergencyLoanId: loanRepaymentData?.id,
        channel: 'wallet',
        purpose: 'emergencyLoanRepayment',
      };

      setChannel(value); // wallet
      await verifyPayment(verifyPayload, value);
    } else {
      const verifyPayload = {
        amount: amount,
        emergencyLoanId: loanRepaymentData?.id,
        channel: 'paystack',
        purpose: 'emergencyLoanRepayment',
      };

      setChannel(value); // card or bank_transfer
      await verifyPayment(verifyPayload, value);
    }
  };

  const handlePaymentRoute2 = async (value) => {
    console.log('The Value: ', value);
    // setChannel(value);
    // setShowAmountModal(true);

    // console.log('ID: ', loanRepaymentData?.id);

    try {
      const data = {
        loan_id: loanRepaymentData?.id,
        amount: amount,
      };

      console.log('The Data loan: ', data);

      setSpinner(true);
      const response = await loanRepayment(data);
      console.log('That Resp: ', response);

      if (response.status == 200) {
        if (value == 'wallet') {
          const data = {
            payment_channel: value,
            reference: response?.data?.data?.reference,
          };
          console.log('The Datata: ', data);
          setSpinner(true);
          const verify = await verifyWalletTransaction(data);

          console.log('Verify: ', verify.response);
          if (verify.status == 200) {
            setSpinner(false);
            navigation.navigate('PaymentSuccessful', {
              name: 'Home',
              content: 'Payment Successful',
              subText: 'Awesome! Your payment was successful',
            });
          } else {
            setSpinner(false);
            Alert.alert('Oops!', verify?.response?.data.response_message);
            console.log('Oops!', verify.response);
          }
        } else {
          setChannel(value);
          setResData(response?.data?.data);
          setShowPaystackPayment(true); // show paystack
        }
      } else {
        setSpinner(false);
        // Alert.alert('Oops!', response.response.data)
        console.log('Oops!', response.response.data);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Oops', error.response);
    }
  };

  const filterLoans = (filter) => {
    let filteredLoan = repaymentList.filter(
      (item) => item.status.toLowerCase() == filter,
    );
    console.log('FL: ', filteredLoan);
  };

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={[styles.tabItem, {borderLeftWidth: i == 0 ? 0 : 1}]}
              onPress={() => setIndex(i)}
              // onPress={() => this.setState({index: i})}
            >
              <Animated.View>
                <Animated.Text
                  style={[
                    {opacity},
                    {
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      fontSize: 8,
                      color: COLORS.primary,
                    },
                  ]}>
                  {route.title}
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const RenderLoans = ({filter}) => {
    let filteredLoan = repaymentList
      .filter((item) => item.status.toLowerCase() == filter || filter == 'all')
      .sort(
        (a, b) =>
          sortStatus[a.status.toLowerCase()] -
          sortStatus[b.status.toLowerCase()],
      );
    return (
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        {filteredLoan?.map((item, index) => {
          const status = item.status.toLowerCase();
          return (
            <TouchableOpacity
              style={{
                marginBottom: 10,
                backgroundColor: COLORS.white,
                borderRadius: 5,
                elevation: 1,
                // borderWidth: 1,
                // borderColor: '#2A286A10',
                overflow: 'hidden',
              }}
              key={index}
              onPress={() => {
                console.log('Loan status', status)
                if(status.toLowerCase() !== 'pending'){
                  setActiveLoanModal(true)
                  setLoanID(item.id);
                  setLoanData({status: item.disbursement_status, id: item.id});
                }
                
              }}>
              <View style={[styles.repaymentFlex]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={[
                      styles.repaymentStatus,
                      {
                        backgroundColor:
                          status == 'active'
                            ? COLORS.secondary
                            : status == 'paid'
                            ? '#e6e6e6'
                            : status == 'pending'
                            ? 'orange'
                            : 'red',
                      },
                    ]}
                  />
                  <View>
                    <Text
                      style={[
                        styles.repaymentText,
                        {fontSize: 12, fontWeight: 'bold'},
                      ]}>
                      {item.loan_purpose}
                      {'  '}
                      <Text style={{fontSize: 10}}>
                        ₦{formatNumber(Math.ceil(item.repayment_amount))}
                      </Text>
                    </Text>
                    <Text
                      style={[
                        styles.repaymentText,
                        {
                          fontWeight: 'normal',
                          marginLeft: 2,
                          fontStyle: 'italic',
                          textTransform: 'capitalize',
                          marginTop: 5,
                        },
                      ]}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                {/* <View> */}
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    <Text
                      style={[
                        styles.repaymentText,
                        {
                          color: COLORS.secondary,
                        },
                      ]}>
                      View
                    </Text>
                    <Icon
                      name="arrow-forward"
                      color={COLORS.secondary}
                      size={12}
                      style={{marginLeft: 5}}
                    />
                  </View>
                </View>
              </View>

              {/* Using amount */}
              {(item.status.toLowerCase() == 'active') || (item.status.toLowerCase() == 'overdue') ? (
                <>
                  <View style={{marginTop: -5}}>
                    <TouchableOpacity
                      onPress={() => {
                        setLoanRepaymentData(item);
                        setShowAmountModal(true);
                      }}
                      style={{
                        backgroundColor: COLORS.primary,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: COLORS.white,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          textAlign: 'center',
                        }}>
                        Pay Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : null}

              {/* Using status */}

              {/* {status == 'active' || status == 'overdued' ? (
                <>
                  <View style={{marginTop: -5}}>
                    <TouchableOpacity
                      onPress={() => {
                        setLoanRepaymentData(item);
                        setShowAmountModal(true);
                      }}
                      style={{
                        backgroundColor: COLORS.primary,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: COLORS.white,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          textAlign: 'center',
                        }}>
                        Pay Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <></>
              )} */}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const All = () => {
    return <RenderLoans filter="all" />;
  };
  const Overdue = () => {
    return <RenderLoans filter="overdued" />;
  };
  const Pending = () => {
    return <RenderLoans filter="pending" />;
  };
  const Active = () => {
    return <RenderLoans filter="active" />;
  };
  const Paid = () => {
    return <RenderLoans filter="paid" />;
  };

  // These should be below the components
  const [routes] = useState([
    {key: 'one', title: 'All'},
    {key: 'two', title: 'Over due'},
    {key: 'three', title: 'Pending'},
    {key: 'four', title: 'Active'},
    {key: 'five', title: 'Paid'},
  ]);

  const renderScene = SceneMap({
    one: All,
    two: Overdue,
    three: Pending,
    four: Active,
    five: Paid,
  });

  return (
    <>
      <View style={[styles.container]}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: Dimensions.get('window').width}}
        />
      </View>

      <Spinner visible={false} size="large" />

      {activeLoanModal && (
        <ActiveLoanModal
          onRequestClose={() => setActiveLoanModal(!activeLoanModal)}
          visible={activeLoanModal}
          loanID={loanID}
          loanData={loanData}
          navigation={navigation}
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

      {showAmountModal && (
        <AmountModalFunds
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          setAmount={(d) => setAmount(d)}
          showCard={() => setShowPaymentModal(true)}
          data={loanRepaymentData}
        />
      )}

      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={resData}
          channel={channel}
          paymentCanceled={(e) => {
            console.log('Pay cancel', e);
            Alert.alert(e.status);
            setSpinner(false);
            // Do something
          }}
          paymentSuccessful={async (res) => {
            const data = {
              amount: amount,
              emergencyLoanId: loanRepaymentData?.id,
              channel: 'paystack',
              // reference: resData.paymentReference,
              reference: resData.reference,
              purpose: 'emergencyLoanRepayment',
            };

            console.log('amount', amount)
            setFundedAmount(Number(amount) + Number(fundedAmount))

            await showSuccess()
            await completePayment(data);
          }}
        />
      )}

        
      {/* <Spinner visible={spinner} size="small" /> */}
      {/* {spinner && <ActivityIndicator size={'large'} color={COLORS.primary} />} */}
      {showPreloader && <Preloader />}

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    // elevation: 2,
    // padding: 10,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderLeftWidth: 1,
    borderColor: '#BFBFBF50',
    borderBottomWidth: 1,
  },

  // repyament history
  repaymentListContainer: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    // backgroundColor: COLORS.white,
    // paddingHorizontal: 20,
    // paddingVertical: 20,
  },

  repaymentFlex: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF20',
  },

  repaymentText: {
    fontSize: 10,
    // fontWeight: 'bold',
    color: COLORS.dark,
  },

  repaymentStatus: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    marginRight: 10,
  },

  requestBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 10,
  },
});
