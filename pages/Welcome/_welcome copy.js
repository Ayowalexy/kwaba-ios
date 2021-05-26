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
import {useSelector, useDispatch} from 'react-redux';

const Welcome = ({navigation}) => {
  const [userToken, setUserToken] = useState(null);

  const store2 = useSelector((state) => state.loginReducer);

  useEffect(() => {
    // const getuser = async () => {
    //   const userData = await AsyncStorage.getItem('userData');
    //   const token = userData != null ? JSON.parse(userData).token : null;
    //   setUserToken(token);
    // };
    // getuser();
  }, [userToken]);

  return (
    <View style={designs.container}>
      <Image style={designs.image} source={images.kwabaLogo} />
      {/* <View
        style={{
          width: '100%',
          height: '80%',
          borderColor: '#f00',
          borderWidth: 1,
          position: 'absolute',
          bottom: 0,
        }}>
        <Image style={designs.imageBG} source={images.maskGroup6} />
      </View> */}
      <View style={designs.bgImageContainer}>
        <ImageBackground source={images.maskGroup6} style={designs.bgImage}>
          <View style={designs.innerView}>
            <View>
              <Text
                style={[
                  designs.bigText,
                  {
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: FONTS.largeTitle,
                  },
                ]}>
                Welcome to{'\n'}
                Kwaba
              </Text>
              <Text style={[designs.smallText, FONTS.body1]}>
                The new way to{'\n'} save and pay for rent
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Onboarding')}
              activeOpacity={0.5}
              style={designs.button}>
              {/* <ImageBackground */}
              {/* // style={designs.arrowFwd} */}
              {/* // source={icons.arrowForward}> */}
              <Icon name="arrow-forward-outline" size={30} color="white" />
              {/* </ImageBackground> */}
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              // marginTop: 100,
              // position: 'absolute',
              // bottom: 30,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('GetCode')}
              onPress={() => navigation.navigate('SignUp')}
              style={[designs.getStartedBtn, {marginTop: 100}]}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 12,
                  color: '#2A286A',
                }}>
                GET STARTED
              </Text>
            </TouchableOpacity>
            {/* </View> */}

            {/* {store2.token == null && ( */}
            {/* <View style={designs.linkContainer}> */}
            <TouchableOpacity
              style={{marginTop: 25, marginBottom: 25}}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: 'white'}}>
                Got an account? <Text style={{color: '#00DC99'}}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
          {/* )} */}
        </ImageBackground>
      </View>
    </View>
  );
};

export default Welcome;
