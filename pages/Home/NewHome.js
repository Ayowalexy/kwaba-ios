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

  const layout = useWindowDimensions();

  useEffect(() => {
    console.log('Layout size: ', layout);
  }, []);

  const [slides, setSlides] = useState([
    {
      name: 'Joshua',
      amount: 5400000,
      color: COLORS.light,
    },
    {
      name: 'Jerry',
      amount: 4200000,
      color: COLORS.dark,
    },
    {
      name: 'Janet',
      amount: 3500000,
      color: COLORS.primary,
    },
  ]);

  const quickActions = [
    {
      name: 'Emergency funds',
      image: icons.quicksave,
      route: () => navigation.navigate('EmergencyFundOnboarding'),
    },
    {
      name: 'Buy Airtime',
      image: icons.buyairtime,
      route: () => navigation.navigate('AirtimeHome'),
    },
    {
      name: 'Pay Bills',
      image: icons.paybills,
      route: () => navigation.navigate('BillsHome'),
    },
  ];

  const _renderItem = ({item, index}) => {
    // console.log('Name: ', item.name);
    return (
      <View
        style={{
          //   backgroundColor: item.color,
          backgroundColor: COLORS.primary,
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
              Current Savings
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{fontSize: 12, color: COLORS.white, marginRight: 10}}>
                Deposit
              </Text>
              <TouchableOpacity
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
                Greate job on your rent savings
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
              J
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
            Hey Mark, Goodevening
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications" color={COLORS.dark} size={25} />
        </TouchableOpacity>
      </View>
      <Carousel
        ref={(c) => {
          console.log('C: ', c);
        }}
        data={slides}
        renderItem={_renderItem}
        sliderWidth={layout.width}
        itemWidth={layout.width - 40}
        layout={'tinder'}
        layoutCardOffset={16}
        firstItem={2}
        // loop={true}
        containerCustomStyle={{
          borderWidth: 1,
          borderColor: COLORS.secondary,
          flex: 1,
          padding: 0,
          margin: 0,
        }}
        slideStyle={{overflow: 'hidden', borderRadius: 10}}
      />

      <View style={{width: '100%', flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          {quickActions.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={item.route}>
                <Image
                  resizeMode="contain"
                  source={item.image}
                  style={{width: 90, height: 90}}
                />
                <Text
                  style={{
                    color: COLORS.dark,
                    fontSize: 10,
                    textAlign: 'center',
                    marginTop: -25,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'CircularStd',
    backgroundColor: '#E5E5E5',
  },
});
