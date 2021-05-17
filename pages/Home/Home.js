import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images} from '../../util/index';
import designs from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import ScrollIndicator from '../../components/scrollIicators';
import {useDispatch, useSelector} from 'react-redux';
import {getTotalSoloSavings} from '../../redux/actions/savingsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currencyFormat} from '../../util/numberFormatter';

const width = Dimensions.get('window').get;
export default function Home({navigation}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [name, setName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [savings, setSavings] = useState(0);
  const [rentalFinance, setRentalFinance] = useState(0);
  const [instantLoan, setInstantLoan] = useState(0);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');

      console.log('hello here is our data ', JSON.parse(userData));
      if (userData) {
        setName(JSON.parse(userData).username);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    dispatch(getTotalSoloSavings());
  }, []);

  useEffect(() => {
    const totalSoloSavings = store.data?.reduce(
      (saving, acc) => Number(saving.amount) + Number(acc.amount),
      0,
    );
    setSavings(totalSoloSavings || 0);
  }, []);

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
      title: 'RENTAL FINANCE',
      subtitle: 'Next payment amount',
      amount: `₦${rentalFinance}`,
      image: images.rentalFinanceCard,
    },
    {
      id: 3,
      title: 'INSTANT LOAN',
      subtitle: 'Repayment amount',
      amount: `₦${instantLoan}`,
      image: images.instantLoanCard,
    },
  ];

  const bottomCards = [
    {
      id: 1,
      title: 'Save',
      body:
        'Save towards your next rent with your flatmates, friends or family and earn interest on every deposit.',
      image: images.maskGroup30,
    },

    {
      id: 2,
      title: 'Borrow',
      body:
        'Get a rent top-up if you are running short on your rent or obtain discounts if you have your complete rent when you pay via Kwaba',
      image: images.maskGroup29,
    },
    {
      id: 3,
      title: 'Soft loans',
      body: 'Access quick loans to sort out life emergencies',
      image: images.maskGroup44,
    },
    {
      id: 4,
      title: 'Invite friends',
      body:
        'Refer and invite your friends and family to stand a chance to get rent discount and earn money',
      image: images.giftPackage,
    },
  ];

  const goToPage = (item) => {
    if (item.title == 'Rent savings') {
      navigation.navigate('SavingsHome');
    } else if (item.title == 'Rent payment') {
      navigation.navigate('Borrow');
    } else {
      navigation.navigate('CompleteProfile1');
    }
  };

  return (
    <View style={designs.container}>
      <View style={designs.topBar}>
        <View style={designs.user}>
          <Image
            style={{width: 35, height: 35, borderRadius: 50, marginRight: 11}}
            source={images.ellipse96}
          />
          <Text style={{color: 'white', fontSize: 15, lineHeight: 19}}>
            Hello, {name}
          </Text>
        </View>
        <Icon
          name="notifications"
          color="#8B8AAE"
          size={20}
          style={{width: 21, height: 24}}
        />
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
                and get access to{'\n'}rental finance and instant loan
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CompleteProfile1')}>
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
                          style={{width: 50, height: 40}}
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
                          onPress={() => setIndex(1)}
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
            justifyContent: 'space-evenly',
            alignItems: 'center',
            // marginTop: 20,
            // marginBottom: -10,
            padding: 20,
            // paddingLeft: 20,
            // paddingRight: 20,
          }}>
          <TouchableOpacity>
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
          <TouchableOpacity>
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
          </TouchableOpacity>
          <TouchableOpacity>
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
          <TouchableOpacity>
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
                      fontSize: 16,
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
                      fontSize: 12.89,
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
    </View>
  );
}
