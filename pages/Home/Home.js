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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images, COLORS} from '../../util/index';
import designs from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import ScrollIndicator from '../../components/scrollIicators';
import {useDispatch, useSelector} from 'react-redux';
import {getTotalSoloSavings} from '../../redux/actions/savingsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currencyFormat} from '../../util/numberFormatter';
import ComingSoon from '../../components/ComingSoon';
import QuickSaveModal from '../../components/QuickSaveModal';
import axios from 'axios';

// import PushNotification from "react-native-push-notification";

// const width = Dimensions.get('window').get;

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export default function Home({navigation}) {
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

  useEffect(() => {
    if (login) setName(login.username);

    if (login.isProfileCompleted == 0) {
      setIsProfileComplete(false);
    } else {
      setIsProfileComplete(true);
    }

    // console.log('isProfile completed: ', login.isProfileCompleted);
  }, [login]);

  useEffect(() => {
    dispatch(getTotalSoloSavings());
  }, []);

  useEffect(() => {
    const totalSoloSavings = store.data?.reduce(
      (acc, saving) => acc + Number(saving.amount),
      0,
    );
    setSavings(totalSoloSavings || 0);
  }, [store]);

  // useEffect(() => {
  //   (async () => {
  //     const token = await getToken();
  //     try {
  //       const response = await axios.get('http://67.207.86.39:8000/api/v1/me', {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: token,
  //         },
  //       });
  //       console.log('ME: ', response.data.user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  const topCards = [
    {
      id: 1,
      title: '',
      subtitle: 'Total Saving',
      amount: `₦${currencyFormat(savings)}`,
      image: images.soloSavingsCard,
    },
    {
      id: 2,
      // title: 'RENTAL FINANCE',
      title: 'RENT NOW PAY LATER',
      subtitle: 'Next payment amount',
      amount: `₦${currencyFormat(rentalFinance)}`,
      image: images.rentalFinanceCard,
    },
    {
      id: 3,
      // title: 'INSTANT LOAN',
      title: 'EMERGENCY FUND',
      subtitle: 'Repayment amount',
      amount: `₦${currencyFormat(instantLoan)}`,
      image: images.instantLoanCard,
    },
  ];

  const bottomCards = [
    {
      id: 1,
      title: 'Rent Savings',
      body:
        'Save towards your next rent with your flatmates, friends or family and earn interest on every deposit.',
      image: images.maskGroup30,
    },

    {
      id: 2,
      title: 'Rent Now, Pay Later',
      body:
        "Let's help you pay your rent so you can\n pay back in easy monthly payments",
      image: images.maskGroup29,
    },
    {
      id: 3,
      title: 'Emergency Fund',
      body: 'Access quick loans to sort out \nlife emergencies',
      image: images.maskGroup44,
    },
    {
      id: 4,
      title: 'Invite Friends',
      body:
        'Refer and invite your friends and family \nto stand a chance to get rent discount \nand earn money',
      image: images.giftPackage,
    },
  ];

  const goToPage = (item) => {
    if (item.title == 'Rent Savings') {
      navigation.navigate('SavingsHome');
    } else if (item.title == 'Rent Now, Pay Later') {
      navigation.navigate('RentNowPayLaterOnboarding');
    } else if (item.title == 'Emergency Fund') {
      navigation.navigate('EmergencyFundOnboarding');
    } else {
      navigation.navigate('Referral');
    }
  };

  return (
    <View style={designs.container}>
      {/* <StatusBar translucent backgroundColor="#00000050" /> */}
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={designs.topBar}>
        <View style={designs.user}>
          {/* <Image
            style={{width: 35, height: 35, borderRadius: 50, marginRight: 11}}
            source={images.ellipse96}
          /> */}
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundColor: '#8B8AAE',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>
              {name.charAt(0)}
            </Text>
          </View>
          <Text style={{color: 'white', fontSize: 15, lineHeight: 19}}>
            Hello, {name}
          </Text>
        </View>
        <TouchableOpacity
          // onPress={() => navigation.navigate('NewAllDocuments')}
          onPress={() => navigation.navigate('Notifications')}>
          <Icon
            name="notifications"
            color="#8B8AAE"
            size={25}
            // style={{width: 21, height: 24}}
          />
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
              <Text style={{color: 'white'}}>
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
      <ScrollView
        // style={designs.container}
        showsVerticalScrollIndicator={false}
        scrollEnabled>
        <View>
          <SwiperFlatList
            index={index}
            onChangeIndex={(e) => setCurrentIndex(e.index)}
            data={topCards}
            renderItem={({item}) => (
              <View style={designs.item}>
                <View style={designs.bgImage}>
                  <LinearGradient
                    style={designs.linearGradient}
                    colors={[
                      `${item.id == 1 ? '#2A286A' : 'white'}`,
                      `${item.id == 1 ? '#9D98EC' : 'white'}`,
                      `${item.id == 1 ? '#00DC99' : 'white'}`,
                    ]}
                    start={{x: 0, y: 1}}
                    end={{x: 0.9, y: 0.5}}
                    locations={[0, 0.5, 1]}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        zIndex: 1,
                      }}>
                      {item.id == 1 ? (
                        <Image
                          style={{width: 30, height: 30, resizeMode: 'contain'}}
                          source={images.piggyBank}
                        />
                      ) : (
                        <Text
                          style={{
                            fontFamily: 'CircularStd',
                            fontSize: 16,
                            fontWeight: 'bold',
                            lineHeight: 32,
                            color:
                              item.id == 2
                                ? '#00DC99'
                                : item.id == 3
                                ? '#D23C69'
                                : '#0000007E',
                          }}>
                          {item.title}
                        </Text>
                      )}
                      {item.id == 1 ? (
                        <TouchableOpacity
                          // onPress={() => setIndex(1)}
                          onPress={() => setQuickSaveModal(true)}
                          style={{
                            // width: 60,
                            // height: 60,
                            borderRadius: 50,
                            position: 'absolute',
                            right: -20,
                            top: -20,
                            // borderWidth: 1,
                          }}>
                          <Image
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 50,
                              position: 'relative',
                              zIndex: 1,
                            }}
                            source={icons.addIcon}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Text></Text>
                      )}
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'CircularStd',
                          fontSize: 14,
                          fontWeight: '500',
                          marginTop: 10,
                          color: item.id == 1 ? 'white' : '#2A286A',
                        }}>
                        {item.subtitle}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'CircularStd',
                          fontSize: 20,
                          lineHeight: 30,
                          fontWeight: 'bold',
                          color: item.id == 1 ? 'white' : '#2A286A',
                        }}>
                        {item.amount}
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      // source={icons.quicksave}
                      source={images.instantLoanBackgroundImg}
                      style={{
                        width: '50%',
                        // height: '100%',
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                      }}
                      resizeMode="cover"
                    />
                  </LinearGradient>
                </View>
              </View>
            )}
          />
          <ScrollIndicator
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: 20,
            // marginBottom: -10,
            // padding: 10,
            paddingVertical: 20,
            // paddingLeft: 20,
            // paddingRight: 20,
          }}>
          <TouchableOpacity onPress={() => setQuickSaveModal(true)}>
            <Image
              resizeMode="contain"
              source={icons.quicksave}
              style={{width: 90, height: 90}}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                textAlign: 'center',
                marginTop: -25,
              }}>
              Quick Save
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Image
              resizeMode="contain"
              source={icons.payrent}
              style={{width: 90, height: 90}}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                textAlign: 'center',
                marginTop: -25,
              }}>
              Pay Rent
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('AirtimeHome')}>
            <Image
              resizeMode="contain"
              source={icons.buyairtime}
              style={{width: 90, height: 90}}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                textAlign: 'center',
                marginTop: -25,
              }}>
              Buy Airtime
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BillsHome')}>
            <Image
              resizeMode="contain"
              source={icons.paybills}
              style={{width: 90, height: 90}}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                textAlign: 'center',
                marginTop: -25,
              }}>
              Pay Bills
            </Text>
          </TouchableOpacity>
        </View>
        <View style={designs.bottom}>
          {/* <View> */}
          {bottomCards.map((item, index) => (
            <LinearGradient
              style={[
                designs.cardItem,
                {
                  // marginBottom: -1,
                  zIndex: index,
                },
              ]}
              colors={['#fff', '#F7F8FD']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              locations={[0.6, 1]}
              key={index}>
              <TouchableOpacity onPress={() => goToPage(item)}>
                {/* <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}> */}
                <View style={{padding: 20}}>
                  <Text
                    style={{
                      color: '#2A286A',
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
                      color: '#ADADAD',
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
                    right: -15,
                    bottom: -10,
                  }}
                  source={item.image}
                  resizeMode="contain"
                />

                {/* </View> */}
              </TouchableOpacity>
            </LinearGradient>
          ))}
          {/* </View> */}
        </View>
      </ScrollView>

      <ComingSoon
        onRequestClose={() => setShowModal(!showModal)}
        visible={showModal}
        name="notification"
      />

      <QuickSaveModal
        onRequestClose={() => setQuickSaveModal(!quickSaveModal)}
        visible={quickSaveModal}
      />
    </View>
  );
}
