import React, {useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {FONTS, icons, images, COLORS} from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Indicators from '../../components/indicators';

const screens = [
  {
    id: 1,
    title: 'Rent Saving',
    content: 'Save towards your rent with your \n flatmates or spouse.',
    image: icons.onboardingImage,
    loader: icons.onboardingLoader1,
  },
  {
    id: 2,
    title: 'Emergency Fund',
    content:
      'Get instant loans from Kwaba when \n you need to sort out life\n emergencies or unexpected \n expenses.',
    image: icons.onboardingImage2,
    loader: icons.onboardingLoader2,
  },
  {
    id: 3,
    title: 'Rent Now Pay Later',
    content:
      'Whether you are looking to renew \n your rent or pay for a new place, we \n can pay your bulk rent so you can \n pay back in easy monthly payments',
    image: icons.onboardingImage3,
    loader: icons.onboardingLoader3,
  },
];

const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View style={designs.container}>
      <SwiperFlatList
        index={0}
        onChangeIndex={(e) => setCurrentIndex(e.index)}
        data={screens}
        renderItem={({item}) => (
          <View style={designs.item}>
            {/* shapes around the background */}
            <Image
              style={{
                width: 50,
                height: 50,
                zIndex: 0,
                position: 'absolute',
                top: '10%',
                left: 20,
              }}
              resizeMode="stretch"
              source={require('../../assets/shapes/shape1.png')}
            />

            <Image
              style={{
                width: 100,
                height: 100,
                zIndex: 0,
                position: 'absolute',
                top: '80%',
                left: -50,
                opacity: 0.8,
              }}
              resizeMode="stretch"
              source={require('../../assets/shapes/shape1.png')}
            />

            <Image
              style={{
                width: 60,
                height: 60,
                zIndex: 0,
                position: 'absolute',
                top: '80%',
                right: 0,
              }}
              // resizeMode="stretch"
              source={require('../../assets/shapes/shape2.png')}
            />

            <View style={{flex: 1}}>
              <Image
                style={{
                  width: 280,
                  height: 280,
                  zIndex: 0,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
                resizeMode="stretch"
                source={item.image}
              />
            </View>
            <View
              style={{
                flex: 1.25,
                alignItems: 'center',
                padding: 20,
              }}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  top: 0,
                  zIndex: 0,
                }}
                resizeMode="contain"
                source={item.loader}
              />
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 10,
                    color: COLORS.dark,
                    lineHeight: 20,
                    fontSize: 14,
                  }}>
                  {item.content}
                </Text>

                <Indicators currentIndex={currentIndex} />

                {item.id == 3 ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={{
                      width: '100%',
                      paddingVertical: 20,
                      backgroundColor: '#00DC99',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#FFF',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginTop: 20,
                      position: 'absolute',
                      bottom: 0,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: '#FFF',
                      }}>
                      Get Started
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      // borderWidth: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: COLORS.primary,
                      }}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Onboarding;
