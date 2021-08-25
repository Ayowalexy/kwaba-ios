import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {icons, images, COLORS} from '../../util/index';
import designs from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import ScrollIndicator from '../../components/scrollIicators';
import {useDispatch, useSelector} from 'react-redux';
import {getTotalSoloSavings} from '../../redux/actions/savingsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currencyFormat, formatNumber} from '../../util/numberFormatter';
import ComingSoon from '../../components/ComingSoon';
import QuickSaveModal from '../../components/QuickSaveModal';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import CompleteProfileModal from './CompleteProfileModal';

export default function NewHome({navigation}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const user = useSelector((state) => state.getUserReducer);
  const login = useSelector((state) => state.loginReducer);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [name, setName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [savings, setSavings] = useState(0);
  const [rentalFinance, setRentalFinance] = useState(0);
  const [instantLoan, setInstantLoan] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [quickSaveModal, setQuickSaveModal] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(false);

  const [greeting, setGreeting] = useState('');

  const layout = useWindowDimensions();

  useEffect(() => {
    const d = new Date();
    const time = d.getHours();

    if (time < 12) {
      setGreeting('Goodmorning');
    }
    if (time > 12) {
      setGreeting('Goodafternoon');
    }
    if (time == 12) {
      setGreeting('Goodmorning');
    }
  }, []);

  useEffect(() => {
    if (login) setName(login.username);

    // email verified
    if (login.user.email_verified == 0) {
      setIsProfileComplete(false);
    } else {
      setIsProfileComplete(true);
    }

    console.log('Login: ', login);
  }, [login]);

  useEffect(() => {
    dispatch(getTotalSoloSavings());
  }, []);

  useEffect(() => {
    setSavings(0);
    if (store?.data?.length) {
      const amount_saved = Number(store?.data[0].amount_save);
      setSavings(amount_saved || 0);
    }
  }, [store]);

  const slides = [
    {
      title: 'Emergency Fund',
      subtitle: 'Repayment amount',
      amount: currencyFormat(instantLoan),
      color: '#222',
      actionText: 'Pay Now',
      // route: () => setQuickSaveModal(true),
    },
    {
      title: 'Rent Now Pay Later',
      subtitle: 'Next payment amount',
      amount: currencyFormat(rentalFinance),
      color: COLORS.dark,
      actionText: 'Pay Now',
      // route: () => setQuickSaveModal(true),
    },
    {
      title: 'Total Savings',
      subtitle: 'Great job on your rent savings',
      amount: currencyFormat(savings),
      color: COLORS.primary,
      actionText: 'Deposit',
      route: () =>
        isProfileComplete
          ? setQuickSaveModal(true)
          : setCompleteProfileModal(true),
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
      title: 'Rent Savings',
      body:
        'Save for your rent or towards a down payment to buy a house. Either way, let your money work for you.',
      img: images.maskGroup30,
      route: () =>
        isProfileComplete
          ? navigation.navigate('SavingsHome')
          : setCompleteProfileModal(true),
    },
    {
      title: 'Loans',
      body:
        'Get loans to pay your rent, buy a house or cater to unexpected expenses.',
      img: images.maskGroup29,
      route: () =>
        isProfileComplete
          ? navigation.navigate('SavingsHome')
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

  const _renderItem = ({item, index}) => {
    // console.log('Name: ', item.name);
    return (
      <View
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
                // onPress={() => navigation.navigate('PaymentForm')}
                // onPress={() => setShowModal(true)}
                onPress={item.route}
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

          <View style={{marginTop: 30}}>
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
              <View
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
              </View>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
              ₦{formatNumber(item.amount)}
            </Text>
          </View>
        </View>
        {/* <Text>{item.name}</Text> */}
      </View>
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
                and get access to{'\n'}Emergency funds and Rent now pay later
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
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
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
            firstItem={2}
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

      <QuickSaveModal
        onRequestClose={() => setQuickSaveModal(!quickSaveModal)}
        visible={quickSaveModal}
        navigation={navigation}
        redirectTo="Home"
      />

      <CompleteProfileModal
        onRequestClose={() => setCompleteProfileModal(!completeProfileModal)}
        visible={completeProfileModal}
        navigation={navigation}
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
