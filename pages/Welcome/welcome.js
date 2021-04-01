import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({navigation}) => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const getuser = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = userData != null ? JSON.parse(userData).token : null;
      setUserToken(token);
    };
    getuser();
  }, []);

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
                The future of rent payment
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
              // onPress={() => navigation.navigate('GetCode')}
              onPress={() => navigation.navigate('Home')}
              style={designs.getStartedBtn}>
              <Text style={{fontWeight: '600', color: '#2A286A'}}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>

          {userToken == null && (
            <View style={designs.linkContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{color: 'white'}}>
                  Got an account? <Text style={{color: '#00DC99'}}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
      </View>
    </View>
  );
};

export default Welcome;
