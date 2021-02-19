import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images} from '../../util/index';
import designs from './style';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import ScrollIndicator from '../../components/scrollIicators';

export default function Home({navigation}) {
  const [name, setName] = useState('Johnson');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [savings, setSavings] = useState(0);
  const [rentalFinance, setRentalFinance] = useState(0);
  const [instantLoan, setInstantLoan] = useState(0);

  const topCards = [
    {
      id: 1,
      title: '',
      subtitle: 'Total Saving',
      amount: `₦${savings}`,
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
      title: 'Rent savings',
      body:
        'Save towards your next rent with your\nflatmates, friends or family and earn\ninterest on every deposit.',
      image: images.maskGroup30,
    },

    {
      id: 2,
      title: 'Rent payment',
      body:
        'Get a rent top-up if you are running\nshort on your rent or obtain discounts\nif you have your complete rent when\nyou pay via Kwaba',
      image: images.maskGroup29,
    },
    {
      id: 3,
      title: 'Soft loans',
      body: 'Access quick loans to sort out\nlife emergencies',
      image: images.maskGroup44,
    },
    {
      id: 4,
      title: 'Invite friends',
      body:
        'Refer and invite your friends and family\nto stand a chance to get rent discount\nand earn money',
      image: images.giftPackage,
    },
  ];

  const goToPage = (item) => {
    if (item.title == 'Rent savings') {
      navigation.navigate('SavingsHome');
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
      <View style={designs.secondBar}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 33, height: 25, marginRight: 11}}
            source={icons.profile}
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
      <View>
        <SwiperFlatList
          index={index}
          onChangeIndex={(e) => setCurrentIndex(e.index)}
          data={topCards}
          renderItem={({item}) => (
            <View style={designs.item}>
              <ImageBackground
                style={designs.bgImage}
                source={images.instantLoanBackgroundImg}>
                <LinearGradient
                  style={designs.linearGradient}
                  colors={[
                    `${item.id == 1 ? '#2A286A' : 'white'}`,
                    `${item.id == 1 ? '#9D98EC' : 'white'}`,
                    `${item.id == 1 ? '#00DC99' : 'white'}`,
                  ]}
                  start={{x: 0, y: 1}}
                  end={{x: 0.9, y: 0.5}}
                  locations={[0.1, 0.75, 1]}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
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
                          fontSize: 20,
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
                        style={{width: 60, height: 60, borderRadius: 50}}>
                        <Image
                          style={{width: 60, height: 60, borderRadius: 50}}
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
                        fontSize: 18,
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
                </LinearGradient>
              </ImageBackground>
            </View>
          )}
        />
        <ScrollIndicator
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </View>
      <View style={designs.bottom}>
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
          {bottomCards.map((item, index) => (
            <View style={designs.cardItem} key={index}>
              <TouchableOpacity onPress={() => goToPage(item)}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#2A286A',
                        fontFamily: 'CircularStd',
                        fontSize: 18,
                        lineHeight: 23,
                        fontWeight: 'bold',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        marginTop: 9,
                        color: '#ADADAD',
                        fontFamily: 'CircularStd',
                        fontSize: 12,
                        lineHeight: 15,
                        fontWeight: '600',
                      }}>
                      {item.body}
                    </Text>
                  </View>

                  <Image
                    style={{width: 104, height: 148}}
                    source={item.image}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
