import React, {useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {FONTS, icons, images} from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Indicators from '../../components/indicators';

const screens = [
  {
    id: 1,
    title: 'Rent Savings',
    content: 'Save towards your rent with\nyour flatmates or spouse.',
    image: images.group4580,
  },
  {
    id: 2,
    title: 'Rent Discount',
    content:
      'Pay your rent in advance via\nRentBank, you get discounts\non your rent payment',
    image: images.rentDiscountOnboardingImage,
  },
  {
    id: 3,
    title: 'Rent Top-up',
    content:
      'Let your family, friends or\ncolleagues assist you with\ntopping up your rent',
    image: images.group4578,
  },
];

const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View style={designs.container}>
      <Image style={designs.image} source={images.kwabaLogoWithName} />
      <SwiperFlatList
        index={0}
        onChangeIndex={(e) => setCurrentIndex(e.index)}
        data={screens}
        renderItem={({item}) => (
          <View style={designs.item}>
            <Image style={designs.onboardingImage} source={item.image} />
            <Text style={[FONTS.largeTitle, designs.title]}>{item.title}</Text>
            <ImageBackground source={images.maskGroup2} style={designs.bgImage}>
              <View>
                <Text style={[FONTS.body1, designs.smallText]}>
                  {item.content}
                </Text>
                <Indicators currentIndex={currentIndex} />
                {item.id == 1 ? (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                    style={designs.arrowFwd}>
                    <Icon name="arrow-back-outline" size={40} color="white" />
                  </TouchableOpacity>
                ) : (
                  <Text></Text>
                )}
                {item.id == 1 || item.id == 2 ? (
                  <View style={designs.skip}>
                    <Text
                      style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
                      Skip
                    </Text>
                  </View>
                ) : (
                  <Text></Text>
                )}
                {item.id == 3 ? (
                  <View>
                    <View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={designs.getStartedBtn}>
                        <Text style={{fontWeight: '600', color: '#2A286A'}}>
                          GET STARTED
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[designs.linkContainer],{flexDirection:'row'}}  >
                      <Text style={{color: 'white'}}>
                        Got an account ?{' '}
                        
                      </Text>
                      <TouchableOpacity onPress={() => navigation.navigate('Login')}>

                        <Text style={{color: '#00DC99'}}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

export default Onboarding;
