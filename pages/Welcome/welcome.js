import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import designs from './style';
import {FONTS, icons, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

const Welcome = ({navigation}) => {
  return (
    <View style={designs.container}>
      <Image style={designs.image} source={images.kwabaLogo} />
      <View style={designs.bgImageContainer}>
        <ImageBackground source={images.maskGroup6} style={designs.bgImage}>
          <View style={designs.innerView}>
            <View>
              <Text style={[FONTS.largeTitle, designs.bigText]}>
                Welcome to{'\n'}
                Kwaba
              </Text>
              <Text style={[designs.smallText, FONTS.body1]}>
                The new way to{'\n'}
                save and pay your rent
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Onboarding')}
              activeOpacity={0.7}
              style={designs.button}>
              <ImageBackground
                style={designs.arrowFwd}
                source={icons.arrowForward}>
                <Icon name="arrow-forward-outline" size={50} color="white" />
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 100}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('GetCode')}
              style={designs.getStartedBtn}>
              <Text style={{fontWeight: '600', color: '#2A286A'}}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
          <View style={designs.linkContainer}>
            <Text style={{color: 'white'}}>
              Got an account? <Text style={{color: '#00DC99'}}>Log in</Text>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Welcome;
