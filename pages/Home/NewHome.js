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
} from '../../redux/actions/savingsActions';
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

export default function NewHome({navigation}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const user = useSelector((state) => state.getUserReducer);
  const login = useSelector((state) => state.loginReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
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

  const layout = useWindowDimensions();

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const data = JSON.parse(userData);
    return data;
  };

  // useEffect(() => {
  //   // console.log('Login: ', login);
  //   // onRefresh();
  // }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await me();
      if (res?.user) {
        const userData = await getUserData();
        dispatch(getTotalSoloSavings());
        dispatch(getMaxLoanCap());
        dispatch(getTotalBuddySavings());

        dispatch(
          setLoginState({
            ...userData,
            user: res.user,
            username: res.user.firstname,
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

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const userData = await AsyncStorage.getItem('userData');
  //     const data = JSON.parse(userData);
  //     // return data;
  //     // console.log('Na the data: ', data);
  //   };

  //   getUserData();
  // }, []);

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

  useEffect(() => {
    dispatch(getTotalSoloSavings());
    dispatch(getMaxLoanCap());
    dispatch(getTotalBuddySavings());
  }, []);

  useEffect(() => {
    if (getMaxLoanCap1?.data) {
      setSavings(getMaxLoanCap1.data.you_have_save);
      setInstantLoan(getMaxLoanCap1.data.total_emmegency_loan_amount_taken);
    }
  }, [getMaxLoanCap1]);

  const slides = [
    {
      title: 'Wallets',
      subtitle:
        wallet == 0
          ? 'Fund your wallet to transact on Kwaba'
          : 'Save and pay bills from yout wallet',
      amount: formatNumber(wallet),
      color: COLORS.dark,
      actionText: wallet == 0 ? 'Add Funds' : 'Deposit',
      actionClick: () =>
        wallet == 0 ? console.log('Add Funds') : console.log('Deposit Now'),
      cardClick: () => console.log('Wallet clicked'),
    },
    {
      title: 'Emergency Fund',
      subtitle: instantLoan == 0 ? 'Access instant loans' : 'Repayment amount',
      amount: formatNumber(instantLoan),
      color: '#222',
      actionText: instantLoan == 0 ? 'Apply Now' : 'Pay Now',
      actionClick: () =>
        instantLoan == 0 ? console.log('Apply Now') : console.log('Pay Now'),
      // cardClick: () =>
      //   instantLoan == 0
      //     ? console.log('Instant Loan')
      //     : navigation.navigate('EmergencyLoanDashBoard'),

      cardClick: () => {
        navigation.navigate('EmergencyLoanDashBoard');
      },
    },
    {
      title: 'Rent Now Pay Later',
      subtitle:
        rentalFinance == 0
          ? "Let's help you pay your rent"
          : 'Next payment amount',
      amount: formatNumber(rentalFinance),
      color: COLORS.dark,
      actionText: wallet == 0 ? 'Apply Now' : 'Pay Now',
      actionClick: () =>
        wallet == 0 ? console.log('Apply Now') : console.log('Pay Now'),
      cardClick: () => console.log('Rent Now Pay Later'),
    },
    {
      title: 'Total Savings',
      subtitle:
        savings > 0
          ? 'Save now to make your rent\nwork for you'
          : 'Great job on your rent savings',
      amount: formatNumber(savings),
      color: COLORS.primary,
      actionText: savings == 0 ? 'Save Now' : 'Deposit',
      actionClick: () =>
        savings == 0
          ? console.log('Save Now')
          : isProfileComplete
          ? setAddFundsToSavingsModal(true)
          : setCompleteProfileModal(true),
      cardClick: () => console.log('Total Savings'),
    },
  ];

  const quickActions = [
    {
      name: 'Emergency\nfunds',
      image: icons.ic3,
      route: () =>
        isProfileComplete
          ? navigation.navigate('EmergencyFundOnboarding')
          : setCompleteProfileModal(true),
    },
    {
      name: 'Buy Airtime',
      image: icons.ic1,
      route: () => navigation.navigate('AirtimeHome'),
    },
    {
      name: 'Pay Bills',
      image: icons.ic2,
      route: () => navigation.navigate('BillsHome'),
    },
    // {
    //   name: 'Buy now pay\nlater',
    //   image: icons.ic4,
    //   route: () => navigation.navigate('BillsHome'),
    // },
  ];

  const bottomCards = [
    {
      title: 'Savings',
      body:
        'Save for your rent or towards a down payment to buy a house. Either way, let your money work for you.',
      img: images.maskGroup30,
      // route: () =>
      //   isProfileComplete
      //     ? navigation.navigate('SavingsHome')
      //     : setCompleteProfileModal(true),
    },
    {
      title: 'Home Loans',
      body:
        'Get loans to pay your rent, rent deposit or buy a house. Let Kwaba sort you out.',
      img: images.maskGroup29,
      route: () =>
        isProfileComplete
          ? navigation.navigate('LoanScreen1')
          : setCompleteProfileModal(true),
    },
    {
      title: 'Refer and Earn',
      body:
        'Invite your friends and family to use  Kwaba and earn from every referral ',
      img: images.giftPackage,
      route: () =>
        isProfileComplete
          ? navigation.navigate('Referral')
          : setCompleteProfileModal(true),
    },
  ];

  // const cards = [
  //   { title: "Movie 1", posterUrl: require("./images/tenent.jpg") },
  //   { title: "Movie 2", posterUrl: require("./images/1917.jpg") },
  //   { title: "Movie 3", posterUrl: require("./images/spiderman.jpg") },
  //   { title: "Movie 4", posterUrl: require("./images/mando.jpg") },
  // ]

  const _renderItem = ({item, index}) => {
    // console.log('Name: ', item.name);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={item.cardClick}
        style={{
          backgroundColor: item.color,
          //   backgroundColor: COLORS.primary,
          width: '100%',
          height: 180,
          padding: 30,
          borderRadius: 10,
          //   marginTop: 10,
          overflow: 'hidden',
          borderColor: '#9D98EC50',
          borderWidth: 1,
          elevation: 5,
        }}>
        <Image
          source={images.frame}
          style={{
            width: 200,
            height: 180,
            position: 'absolute',
            right: -5,
            top: 0,
            // transform: [{scale: 1.05}],
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
            <Text style={{fontSize: 14, color: COLORS.white}}>
              {/* Current Savings */}
              {item.title}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{fontSize: 12, color: COLORS.white, marginRight: 10}}>
                {item.actionText}
              </Text>
              <TouchableOpacity
                onPress={item.actionClick}
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: COLORS.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                  elevation: 1,
                }}>
                <IconFA5 name="plus" size={10} style={{color: COLORS.grey}} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{fontSize: 12, color: COLORS.white, marginRight: 20}}>
                {item.subtitle}
              </Text>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Icon
                  name="arrow-up"
                  size={10}
                  style={{color: COLORS.secondary}}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.secondary,
                    fontWeight: 'bold',
                  }}>
                  50%
                </Text>
              </View> */}
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
              ₦{formatNumber(item.amount) || '0.00'}
            </Text>
          </View>
        </View>
        {/* <Text>{item.name}</Text> */}
      </TouchableOpacity>
    );
  };

  return (
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
              //   fontWeight: 'bold',
              lineHeight: 19,
            }}>
            Hey {name}, {greeting}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications" color={COLORS.dark} size={25} />
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
        <View
          style={{
            position: 'relative',
            flex: 1,
            marginBottom: 20,
            marginTop: 10,
            //   height: 200,
            //   backgroundColor: 'red',
          }}>
          <Carousel
            //   ref={(c) => {
            //     console.log('C: ', c);
            //   }}
            data={slides}
            renderItem={_renderItem}
            sliderWidth={layout.width}
            itemWidth={layout.width - 40}
            //   sliderHeight={layout.width}
            //   itemHeight={layout.width}
            layout={'tinder'}
            layoutCardOffset={16}
            firstItem={3}
            // loop={true}
            containerCustomStyle={{
              //   borderWidth: 1,
              //   borderColor: COLORS.secondary,
              flex: 1,
              padding: 0,
              margin: 0,
              height: 220,
            }}
            slideStyle={{overflow: 'hidden', borderRadius: 10}}
            indicatorStyle={{width: 10, backgroundColor: 'blue'}}
          />
          <ScrollIndicator currentIndex={0} setCurrentIndex={0} />
        </View>

        <View style={{width: '100%', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingVertical: 10,
              marginBottom: 10,
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
                    <Image
                      resizeMode="contain"
                      source={item.image}
                      style={{width: 25, height: 25}}
                    />
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
              paddingHorizontal: 10,
              overflow: 'hidden',
            }}>
            {bottomCards.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor:
                      index == 0 ? '#EDECFC' : index == 1 ? 'white' : '#01A573',
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
                          color: index == 2 ? 'white' : COLORS.dark,
                          fontFamily: 'CircularStd',
                          fontSize: 14,
                          lineHeight: 23,
                          fontWeight: 'bold',
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          width: '75%',
                          marginTop: 9,
                          color: index == 2 ? 'white' : COLORS.dark,
                          fontFamily: 'CircularStd',
                          fontSize: 12,
                          lineHeight: 20,
                          fontWeight: '600',
                        }}>
                        {item.body}
                      </Text>
                      {index == 0 && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                          }}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('SavingsHome')}
                            style={{
                              backgroundColor: COLORS.primary,
                              borderRadius: 10,
                              paddingVertical: 15,
                              paddingHorizontal: 25,
                              marginRight: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: COLORS.white,
                              }}>
                              Rent Savings
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('SaveToOwn')}
                            style={{
                              backgroundColor: COLORS.white,
                              borderRadius: 10,
                              paddingVertical: 15,
                              paddingHorizontal: 25,
                              marginRight: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 'bold',
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
        setShowPaymentType={(bol) => setShowPaymentType(bol)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'CircularStd',
    backgroundColor: 'white',
  },
});
