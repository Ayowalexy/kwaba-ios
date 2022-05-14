import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  RefreshControl,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {icons, images, COLORS} from '../../util/index';
import designs from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import ScrollIndicator from '../../components/scrollIicators';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMaxLoanCap,
  getTotalSoloSavings,
  getTotalBuddySavings,
  getOneSoloSavingsTransaction,
} from '../../redux/actions/savingsActions';
import {
  getBillServices,
  getBillsCategory,
  getAirtime,
} from '../../redux/actions/billsAction';
import {
  getUserWallet,
  getUserWalletTransactions,
  getPaymentHistory,
} from '../../redux/actions/walletAction';
import {getCurrentUser} from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currencyFormat, formatNumber} from '../../util/numberFormatter';
import ComingSoon from '../../components/ComingSoon';
import QuickSaveModal from '../../components/QuickSaveModal';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import CompleteProfileModal from './CompleteProfileModal';
import {me} from '../../services/network';
import {setLoginState} from '../../redux/actions/userActions';
import AddFundsToSavingsModal from '../../components/AddFundsToSavingsModal';
import EmailVerificationModal from '../../components/EmailVerificationModal';
import SavingsOptionModal from '../../components/savingsOptionModal';
import PaymentTypeModal from '../../components/paymentTypeModal';
import AmountModal from '../../components/amountModal';
import WalletPaymentModal from '../Wallet/WalletPaymentModal';
import QuickSaveListModal from './QuickSaveListModal';
import analytics from '@segment/analytics-react-native';

import PushNotification from 'react-native-push-notification';

import {TrackEvent} from '../../util/segmentEvents';
import moment from 'moment';
import {setSteps} from '../../redux/actions/rnplActions';
import {initalState} from '../../redux/reducers/rnplReducer';
import {getUserReferrals} from '../../redux/actions/referralAction';


export default function NewHome({navigation}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const user = useSelector((state) => state.getUserReducer);
  const login = useSelector((state) => state.loginReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const getWallet = useSelector((state) => state.getUserWalletReducer);
  const getPaymentHistoryReducer = useSelector(
    (state) => state.getPaymentHistoryReducer,
  );

  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [name, setName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [savings, setSavings] = useState(0);
  const [rentalFinance, setRentalFinance] = useState(0);
  const [instantLoan, setInstantLoan] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [quickSaveModal, setQuickSaveModal] = useState(false);
  const [addFundsToSavingsModal, setAddFundsToSavingsModal] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(false);
  const [emailVerificationModal, setEmailVerificationModal] = useState(false);
  const [clickedID, setClickedID] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const [greeting, setGreeting] = useState('');

  const [showPaymentType, setShowPaymentType] = useState(false);

  const [showAmountModal, setShowAmountModal] = useState(false);

  const [showWalletModal, setShowWalletModal] = useState(false);

  const [showQuickSaveListModal, setShowQuickSaveListModal] = useState(false);

  const [savingType, setSavingType] = useState('');

  const layout = useWindowDimensions();

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'test-channel',
        channelName: 'Test Channel'
      }
    )
  }

  useEffect(() => {
    createChannel()
  }, [])

  const handleNotification = (item) => {
    console.log('loooooooooool')
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Notification',
      message: '',
    });
  };

  useEffect(() => {
    async function fetchData() {
      const storage = await AsyncStorage.getItem('RnplSteps');
      if (storage !== null) {
        const payload = JSON.parse(storage);
        dispatch(setSteps(payload));
        // console.log('Payload: ', payload);
      } else {
        await AsyncStorage.setItem('RnplSteps', JSON.stringify(initalState));
        dispatch(setSteps(initalState));
        // console.log('Initial: ', initalState);
      }
    }
    fetchData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const data = JSON.parse(userData);
    return data;
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await me();
      console.log('The me res: ', res.data);
      if (res?.data) {
        const userData = await getUserData();
        dispatch(getTotalSoloSavings());
        dispatch(getMaxLoanCap());
        // dispatch(getTotalBuddySavings());
        // dispatch(getUserWallet());

        dispatch(
          setLoginState({
            ...userData,
            user: res.data,
            username: res.data.firstname,
          }),
        );

        if (store) {
          setRefreshing(false);
        }
      }
    } catch (error) {
      setRefreshing(false);
      console.log('Error: ', error);
    }
  }, [refreshing]);

  useEffect(() => {
    const d = new Date();
    const time = d.getHours();

    if (time < 12) {
      setGreeting('Good Morning');
    }

    if (time > 12 && time < 16) {
      setGreeting('Good Afternoon');
    }

    if (time > 16) {
      setGreeting('Good Evening');
    }
  }, []);

  useEffect(() => {
    // console.log('Login: ', login);
    if (login) setName(login.username);
    // complete profile
    if (
      login.user.profile_complete == 0 ||
      login.user.profile_complete == null
    ) {
      setIsProfileComplete(false);
    } else {
      setIsProfileComplete(true);
    }
    // email verified
    if (login.user.email_verified == 0 || login.user.email_verified == null) {
      setIsEmailVerified(false);
    } else {
      setIsEmailVerified(true);
    }
  }, [login]);

  // dispatch events here
  useEffect(() => {
    dispatch(getTotalSoloSavings());
    dispatch(getMaxLoanCap());
    dispatch(getTotalBuddySavings());
    dispatch(getBillServices());
    dispatch(getAirtime());
    dispatch(getUserWallet());
    dispatch(getUserWalletTransactions());
    dispatch(getUserReferrals());
    dispatch(getBillsCategory('airtime'));
    dispatch(getPaymentHistory());

    // dispatch(getOneSoloSavingsTransaction(489));
  }, []);

  useEffect(() => {
    if (getMaxLoanCap1?.data) {
      setSavings(getMaxLoanCap1?.data?.total_savings);
      setWallet(getMaxLoanCap1?.data?.wallet_available_balance);
     
      setInstantLoan(
        Number(getMaxLoanCap1?.data?.emergency_loan_amount_to_repay),
      );
    }
  }, [getMaxLoanCap1]);

  // useEffect(() => {
  //   console.log('The Wallet: ', getWallet);
  //   setWallet(getWallet?.data?.available_balances);
  // }, [getWallet]);

  const slides = [
    {
      title: 'Total Savings',
      subtitle:
        savings <= 0
          ? 'Save now to make your rent work for you'
          : 'Great job on your rent savings',
      amount: savings ? formatNumber(Number(savings).toFixed(2)) : '0.00',
      color: COLORS.primary,
      actionText: savings == 0 ? 'Save Now' : 'Fund savings',
      actionClick: () =>
        savings == 0
          ? navigation.navigate('SavingsHome')
          : isProfileComplete
          ? setAddFundsToSavingsModal(true)
          : setCompleteProfileModal(true),
      cardClick: () => {
        TrackEvent('Home-Card-Savings');
        navigation.navigate('SavingsHome');
      },
    },

    {
      title: 'Wallet Balance',
      subtitle:
        wallet <= 0
          ? 'Fund your wallet to transact on Kwaba'
          : 'Save and pay bills from your wallet',
      amount: wallet ? formatNumber(Number(wallet).toFixed(2)) : '0.00',
      color: COLORS.dark,
      actionText: wallet == 0 ? 'Add Funds' : 'Deposit',
      actionClick: () => {
        // wallet == 0 ? setShowWalletModal(true) : setShowWalletModal(true);
        navigation.navigate('Wallet');
      },
      cardClick: () => {
        TrackEvent('Home-Card-Wallet');
        navigation.navigate('Wallet');
        // Alert.alert(
        //   'Feature currently unavailable',
        //   'We are working hard to make this available as soon as we can.',
        // );
      },
    },

    {
      title: 'Emergency Fund',
      subtitle:
        instantLoan <= 0 ? 'Access instant loans' : 'Total amount to repay',
      amount: instantLoan
        ? formatNumber(Number(instantLoan).toFixed(2))
        : '0.00',
      color: '#222',
      actionText: instantLoan == 0 ? 'Apply Now' : 'Pay Now',
      actionClick: () =>
        instantLoan == 0
          ? navigation.navigate('EmergencyLoanHome')
          : navigation.navigate('EmergencyLoanDashBoard'),
      cardClick: () => {
        TrackEvent('Home-Card-Emergencyloan');
        navigation.navigate('EmergencyLoanDashBoard');

        // instantLoan == 0
        //   ? navigation.navigate('EmergencyLoanHome')
        //   : navigation.navigate('EmergencyLoanDashBoard');

        // Alert.alert(
        //   'Feature currently unavailable',
        //   'We are working hard to make this available as soon as we can.',
        // );
      },
    },

    {
      title: 'Rent Now Pay Later',
      subtitle:
        rentalFinance <= 0
          ? "Let's help you pay your rent"
          : 'Next payment amount',
      amount: rentalFinance
        ? formatNumber(Number(rentalFinance).toFixed(2))
        : '0.00',
      color: '#5A4CB1',
      actionText: rentalFinance == 0 ? 'Apply Now' : 'Pay Now',
      actionClick: () =>
        !isProfileComplete
          ? setCompleteProfileModal(true)
          : rentalFinance == 0
          ? navigation.navigate('Rent') //RentNowPayLaterOnboarding
          : navigation.navigate('RentNowPayLaterDashboard'),
      cardClick: () => {
        TrackEvent('Home-Card-RNPL');
        !isProfileComplete
          ? setCompleteProfileModal(true)
          : rentalFinance == 0
          ? navigation.navigate('Rent') //RentNowPayLaterOnboarding
          : navigation.navigate('RentNowPayLaterDashboard');
      },
    },
  ];

  useEffect(() => {
    console.log('The Wallet: ', wallet);
  }, []);

  const quickActions = [
    {
      name: 'Emergency\nfunds',
      // name: 'Emergency',
      image: icons.ic3,
      route: () => {
        TrackEvent('Emergency Funds Home Quick Action');
        if (instantLoan == 0) {
          navigation.navigate('EmergencyFundOnboarding');
        } else {
          navigation.navigate('EmergencyLoanDashBoard');
        }

        // Alert.alert(
        //   'Feature currently unavailable',
        //   'We are working hard to make this available as soon as we can.',
        // );
      },
    },
    {
      name: 'Buy Airtime',
      image: icons.ic1,
      route: () => {
        navigation.navigate('AirtimeHome');
        TrackEvent('Buy Airtime Home Quick Action');
        // Alert.alert(
        //   'Feature currently unavailable',
        //   'We are working hard to make this available as soon as we can.',
        // );
      },
    },
    {
      name: 'Pay Bills',
      image: icons.ic2,
      route: () => {
        navigation.navigate('BillsHome');
        TrackEvent('Pay Bills Home Quick Action');
        // Alert.alert(
        //   'Feature currently unavailable',
        //   'We are working hard to make this available as soon as we can.',
        // );
      },
    },
    // {
    //   // name: 'Buy now pay\nlater',
    //   name: 'Wallets',
    //   image: icons.ic4,
    //   route: () => navigation.navigate('Wallet'),
    // },
  ];

  const bottomCards = [
    // {
    //   title: 'Savings',
    //   body:
    //     'Save for your rent or towards a down payment to buy a house. Either way, let your money work for you.',
    //   img: images.maskGroup30,
    // },
    {
      title: 'Join a Savings Challenge',
      body:
        'Use creative ways to reach your home savings goals. Join a challenge now to explore exciting ways to save.',
      img: images.maskGroup29,
      route: () => navigation.navigate('JoinChallengeList'),
      // route: () => {
      //   Alert.alert(
      //     'Feature currently unavailable',
      //     'We are working hard to make this available as soon as we can.',
      //   );
      // },
    },
  ];

  const newCard = [
    {
      img: images.maskGroup30,
      title: 'Save for rent',
      // content: 'Save for rent with solo or buddy savings with friends',
      content: 'Save towards your next rent alone or with friends and family',
      route: () => navigation.navigate('SavingsHome'),
    },
    {
      img: images.maskGroup29,
      title: 'Pay for rent',
      content:
        // 'Apply for rental finanace and pay back in easy monthly installments',
        'Split your bulk rent into easy monthly payments.',
      // route: () => navigation.navigate('SaveToOwn'),
      route: () => navigation.navigate('Rent'),
    },
  ];

  

  const OFFSET = 30;
  const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 4;
  const ITEM_HEIGHT = 180;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const TransactionHistory = () => {
    const slicedTransaction = getPaymentHistoryReducer?.data?.slice(0, 7);
    return (
      <View style={{paddingHorizontal: 25, paddingBottom: 20, marginTop: 20}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: COLORS.dark}}>
          Recent Transactions
        </Text>
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 20,
          }}>
          {slicedTransaction?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  borderLeftWidth: 2,
                  borderLeftColor:
                    index == slicedTransaction.length - 1
                      ? 'transparent'
                      : '#46596950',
                  paddingBottom: 30,
                }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: COLORS.dark,
                    borderRadius: 15,
                    position: 'absolute',
                    left: -9,
                    top: 0,
                  }}
                />
                <View style={{paddingLeft: 40, marginTop: -5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: COLORS.dark,
                      }}>
                      ₦{formatNumber(Number(item.amount).toFixed(2))}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.dark,
                      }}>
                      {moment(item.updated_at).format('DD MMM YYYY')}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLORS.dark,
                      marginTop: 20,
                      lineHeight: 20,
                    }}>
                    {item.reason}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        <View style={designs.topBar}>
          <View style={designs.user}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                backgroundColor: COLORS.dark,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 15, color: COLORS.white}}>
                {name.charAt(0)}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={{
                color: COLORS.dark,
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 19,
              }}>
              {/* Hi {name}, {greeting} */}
              Hi, {name}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingLeft: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={async () => {
              // navigation.navigate('BuddyPaymentScreen');
              // navigation.navigate('Notifications');
              navigation.navigate('Referral');
              // navigation.navigate('AppUpdate');
              // TrackEvent('Invite Friends');
              // handleNotification({
              //   name: 'Invite Frineds',
              //   sub:
              //     'You just clicked on invite friends, do you want to invite your friends?',
              // });
            }}>
            <Icon name="people-sharp" color={COLORS.dark} size={25} />

            <Text
              style={{
                fontSize: 14,
                color: COLORS.dark,
                marginLeft: 5,
                marginTop: 0,
              }}>
              Invite friends
            </Text>
          </TouchableOpacity>
        </View>
        {!isProfileComplete && (
          <View style={designs.secondBar}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{width: 25, marginRight: 11}}
                source={icons.profile}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 10,
                  lineHeight: 12,
                  color: '#FB8B24',
                  fontWeight: 'bold',
                }}>
                Complete your profile{' '}
                <Text style={{color: COLORS.dark}}>
                  to unlock the full {'\n'}power of Kwaba.
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('CompleteProfile2')}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'CircularStd',
                    fontSize: 10,
                    fontWeight: 'bold',
                    lineHeight: 13,
                    color: '#00DC99',
                  }}>
                  Complete Profile
                </Text>
                <Icon name="chevron-forward" color="#00DC99" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        {!isEmailVerified && (
          <View style={designs.secondBar}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="md-mail-unread"
                size={26}
                color={COLORS.orange}
                style={{marginRight: 11}}
              />
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 10,
                  lineHeight: 12,
                  color: '#FB8B24',
                  fontWeight: 'bold',
                }}>
                Verify your E-mail{' '}
                <Text style={{color: COLORS.dark}}>
                  to better secure{'\n'}your account.
                </Text>
              </Text>
            </View>
            <TouchableOpacity onPress={() => setEmailVerificationModal(true)}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'CircularStd',
                    fontSize: 10,
                    fontWeight: 'bold',
                    lineHeight: 13,
                    color: '#00DC99',
                  }}>
                  Verify Email
                </Text>
                <Icon name="chevron-forward" color="#00DC99" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView
          scrollEnabled
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[COLORS.primary, COLORS.secondary]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <View style={{width: '100%', marginVertical: 10}}>
            <ScrollView
              horizontal={true}
              decelerationRate={'normal'}
              snapToInterval={ITEM_WIDTH}
              style={{paddingHorizontal: 0}}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              disableIntervalMomentum
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false},
              )}
              scrollEventThrottle={12}>
              {slides.map((item, idx) => {
                const inputRange = [
                  (idx - 1) * ITEM_WIDTH,
                  idx * ITEM_WIDTH,
                  (idx + 1) * ITEM_WIDTH,
                ];
                const translate = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.95, 1, 0.95],
                });
                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [1, 1, 1],
                });
                return (
                  <Animated.View
                    key={idx}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT - 30,
                      marginLeft: idx === 0 ? OFFSET : undefined,
                      marginRight:
                        idx === slides.length - 1 ? OFFSET : undefined,
                      opacity: opacity,
                      transform: [{scale: translate}],
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={item.cardClick}
                      style={{
                        backgroundColor: item.color,
                        // backgroundColor: COLORS.primary,
                        width: '100%',
                        height: '100%',
                        paddingHorizontal: 30,
                        paddingVertical: 10,
                        borderRadius: 10,
                        overflow: 'hidden',
                        borderColor: '#9D98EC',
                        borderWidth: 1,
                        elevation: 5,
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={images.frame}
                        style={{
                          width: 200,
                          height: 180,
                          position: 'absolute',
                          right: -5,
                          top: 0,
                        }}
                        resizeMode="contain"
                      />
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: COLORS.white,
                              fontWeight: 'bold',
                            }}>
                            {item.title}
                          </Text>

                          {/* <TouchableOpacity
                          onPress={item.actionClick}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: COLORS.white,
                              marginRight: 10,
                            }}>
                            {item.actionText}
                          </Text>

                          <View
                            style={{
                              width: 25,
                              height: 25,
                              backgroundColor: COLORS.white,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 30,
                              elevation: 1,
                            }}>
                            <IconFA5
                              name="plus"
                              size={10}
                              style={{color: COLORS.grey}}
                            />
                          </View>
                        </TouchableOpacity> */}
                        </View>

                        <View style={{marginTop: 10}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: COLORS.white,
                                marginRight: 20,
                              }}>
                              {item.subtitle}
                            </Text>
                          </View>
                        </View>

                        <View style={{marginTop: 10}}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                              color: COLORS.white,
                            }}>
                            ₦{item.amount || '0.00'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </ScrollView>
            {/* <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            {slides.map((item, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    width: 8,
                    height: 4,
                    marginHorizontal: 2,
                    borderRadius: 2,
                    backgroundColor: COLORS.grey,
                  }}
                />
              );
            })}
          </View> */}
          </View>

          <View style={{width: '100%', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                // paddingVertical: 10,
                marginBottom: 20,
              }}>
              {quickActions.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      //   marginHorizontal: 10,
                      width: 80,
                      //   justifyContent: 'flex-start',
                      //   borderWidth: 1,
                    }}>
                    <TouchableOpacity
                      onPress={item.route}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#EDECFC',
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {item.name == 'Wallets' ? (
                        <Icon name="wallet" size={25} color={COLORS.light} />
                      ) : (
                        <Image
                          resizeMode="contain"
                          source={item.image}
                          style={{width: 25, height: 25}}
                        />
                      )}
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: COLORS.dark,
                        fontSize: 10,
                        //   fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 5,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              {newCard.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={item.route}
                    key={index}
                    style={{
                      backgroundColor: COLORS.primary,
                      padding: 20,
                      width: '48%',
                      borderRadius: 20,
                      borderBottomLeftRadius: 0,
                    }}>
                    <View
                      style={{
                        backgroundColor: COLORS.white,
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                      }}>
                      <Image
                        resizeMode="cover"
                        source={item.img}
                        style={{width: 25, height: 25, borderRadius: 25}}
                      />
                    </View>
                    <View style={{marginTop: 20}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: COLORS.white,
                          fontWeight: 'bold',
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: COLORS.white,
                          marginTop: 10,
                          lineHeight: 20,
                        }}>
                        {item.content}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                overflow: 'hidden',
              }}>
              {bottomCards.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor:
                        item.title == 'Savings' ? '#EDECFC' : '#5A4CB1',
                      marginBottom: 10,
                      borderRadius: 10,
                      elevation: 0.5,
                      borderWidth: 1,
                      borderColor: '#EDECFC',
                    }}>
                    <TouchableOpacity
                      onPress={item.route}
                      // onPress={() => {
                      //   if (item.route) {
                      //     item.route();
                      //   } else {
                      //     setCompleteProfileModal(true);
                      //   }
                      // }}
                      style={{overflow: 'hidden', borderRadius: 10}}>
                      <View style={{padding: 20}}>
                        <Text
                          style={{
                            color:
                              item.title == 'Savings'
                                ? COLORS.dark
                                : COLORS.white,
                            fontFamily: 'CircularStd',
                            fontSize: 15,
                            lineHeight: 23,
                            fontWeight: 'bold',
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            width: '75%',
                            marginTop: 9,
                            color:
                              item.title == 'Savings'
                                ? COLORS.dark
                                : COLORS.white,
                            fontFamily: 'CircularStd',
                            fontSize: 12,
                            lineHeight: 20,
                            fontWeight: '600',
                          }}>
                          {item.body}
                        </Text>
                        {item.title == 'Savings' && (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 20,
                            }}>
                            <TouchableOpacity
                              onPress={async () => {
                                navigation.navigate('SavingsHome');

                                TrackEvent('Rent Savings From Home Screen');
                              }}
                              style={{
                                backgroundColor: COLORS.primary,
                                borderRadius: 5,
                                paddingVertical: 15,
                                paddingHorizontal: 25,
                                marginRight: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: 'normal',
                                  color: COLORS.white,
                                }}>
                                Rent Savings
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => navigation.navigate('SaveToOwn')}
                              style={{
                                backgroundColor: COLORS.white,
                                borderRadius: 5,
                                paddingVertical: 15,
                                paddingHorizontal: 25,
                                marginRight: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: 'normal',
                                  color: COLORS.dark,
                                }}>
                                Save to own
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>

                      <Image
                        style={{
                          width: '40%',
                          height: 100,
                          position: 'absolute',
                          right: -40,
                          bottom: -8,
                        }}
                        source={item.img}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>

          {/* {getWalletTransactions &&
          getWalletTransactions?.data &&
          getWalletTransactions?.data?.length && <TransactionHistory />} */}
          <TransactionHistory />
        </ScrollView>

        {quickSaveModal && (
          <QuickSaveModal
            onRequestClose={() => setQuickSaveModal(!quickSaveModal)}
            visible={quickSaveModal}
            navigation={navigation}
            redirectTo="Home"
            ID={clickedID}
          />
        )}

        {/* <AddFundsToSavingsModal
        onRequestClose={() =>
          setAddFundsToSavingsModal(!addFundsToSavingsModal)
        }
        visible={addFundsToSavingsModal}
        onClick={(id) => {
          setClickedID(id);
          setAddFundsToSavingsModal(false);
          setQuickSaveModal(true);

          // console.log(id)
        }}
      /> */}

        <EmailVerificationModal
          onRequestClose={() =>
            setEmailVerificationModal(!emailVerificationModal)
          }
          visible={emailVerificationModal}
          email={login?.user?.email}
        />

        <CompleteProfileModal
          onRequestClose={() => setCompleteProfileModal(!completeProfileModal)}
          visible={completeProfileModal}
          navigation={navigation}
        />

        <SavingsOptionModal
          onRequestClose={() =>
            setAddFundsToSavingsModal(!addFundsToSavingsModal)
          }
          visible={addFundsToSavingsModal}
          // setShowPaymentType={(bol) => setShowPaymentType(bol)}
          showSavingType={(data) => {
            // console.log('Done: ', data);
            setSavingType(data);
            setShowQuickSaveListModal(true);
          }}
        />

        <QuickSaveListModal
          onRequestClose={() =>
            setShowQuickSaveListModal(!showQuickSaveListModal)
          }
          visible={showQuickSaveListModal}
          type={savingType}
          navigation={navigation}
        />

        <PaymentTypeModal
          onRequestClose={() => setShowPaymentType(!showPaymentType)}
          visible={showPaymentType}
          setAddFundsToSavingsModal={(bol) => setAddFundsToSavingsModal(bol)}
          setShowAmountModal={(bol) => setShowAmountModal(bol)}
        />

        <AmountModal
          onRequestClose={() => setShowAmountModal(!showAmountModal)}
          visible={showAmountModal}
          // setShowPaymentType={(bol) => setShowPaymentType(bol)}
        />

        {showWalletModal && (
          <WalletPaymentModal
            onRequestClose={() => setShowWalletModal(!showWalletModal)}
            visible={showWalletModal}
            // setAddFundsToSavingsModal={(bol) => setAddFundsToSavingsModal(bol)}
            // setShowAmountModal={(bol) => setShowAmountModal(bol)}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'CircularStd',
    backgroundColor: 'white',
  },
});
