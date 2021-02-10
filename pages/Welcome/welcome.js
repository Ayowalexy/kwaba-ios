import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, icons, images} from '../../util/index';

const Welcome = () => {
  return (
    <View>
      <Image style={designs.image} source={images.rentBankLogo} />
      <View style={designs.bgImageContainer}>
        <ImageBackground style={designs.bgImage}>
          <View style={designs.innerView}>
            <View>
              <Text style={[FONTS.largeTitle, designs.bigText]}>
                Welcome to{'\n'}
                RentBank
              </Text>
              <Text style={[designs.smallText, FONTS.body1]}>
                The new way to{'\n'}
                save and pay your rent
              </Text>
            </View>
            <TouchableOpacity style={designs.button}>
              <Image style={designs.arrowFwd} source={icons.arrowForward} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Welcome;
