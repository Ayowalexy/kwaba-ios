import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView,
  Linking,
} from 'react-native';
import {FONTS, icons, images, COLORS} from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';

const saveToOwnImage = require('../../assets/images/saveToOwn.png');
const logo = require('../../assets/images/Vector.png');

const SaveToOwn = ({navigation}) => {
  const url = 'https://mortgage.kwaba.ng';

  const handleClick = () => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View style={designs.container}>
      {/* <View style={designs.item}> */}

      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: 1}}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={25}
          color={COLORS.dark}
          style={{
            padding: 10,
            position: 'absolute',
            top: 10,
            left: 10,
          }}
        />
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
            width: 80,
            height: 80,
            zIndex: 0,
            position: 'absolute',
            top: '20%',
            right: 20,
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
            opacity: 1,
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

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            marginTop: 20,
          }}>
          <Image
            style={{
              width: 200,
              height: 200,
              top: 0,
              zIndex: 0,
            }}
            resizeMode="contain"
            source={saveToOwnImage}
          />
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: COLORS.white,
              borderRadius: 60,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 1,
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'transparent',
                borderRadius: 60,
                borderWidth: 2,
                borderColor: COLORS.secondary,
                position: 'absolute',
              }}
            />
            <Image
              style={{
                width: 30,
                height: 30,
                marginTop: -5,
              }}
              resizeMode="contain"
              source={logo}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              // fontWeight: 'bold',
              color: COLORS.dark,
              textAlign: 'center',
              marginTop: 20,
              lineHeight: 25,
              paddingHorizontal: 20,
            }}>
            Save monthly to build up a down{'\n'}payment for the home of your
            dreams
          </Text>
        </View>
        <View style={{paddingHorizontal: 20, marginBottom: 10}}>
          <TouchableOpacity
            onPress={handleClick}
            style={{
              backgroundColor: COLORS.secondary,
              borderRadius: 5,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
              JOIN WAITLIST
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </View> */}
    </View>
  );
};

export default SaveToOwn;
