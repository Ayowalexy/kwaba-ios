import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import designs from './style';
import {FONTS, icons, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const Welcome = ({navigation}) => {
  const [userToken, setUserToken] = useState('');
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setstatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setstatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styled = STYLES.indexOf(statusBarStyle) + 1;
    if (styled === STYLES.length) {
      setstatusBarStyle(STYLES[0]);
    } else {
      setstatusBarStyle(STYLES[styled]);
    }
  };

  const store2 = useSelector((state) => state.loginReducer);

  useEffect(() => {}, [userToken]);

  return (
    <SafeAreaView style={designs.container}>
      <StatusBar hidden />
      <Image
        source={icons.welcomeShape1}
        style={{
          minWidth: 50,
          minHeight: 10,
          resizeMode: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      <Image
        source={icons.welcomeShape2}
        style={{
          minWidth: 50,
          minHeight: 10,
          resizeMode: 'cover',
          position: 'absolute',
          bottom: '20%',
          right: 0,
        }}
      />
      <View style={designs.logoContainer}>
        <Image source={icons.kwabalogocol} style={designs.logo} />
      </View>
      <View style={{flex: 1, padding: 20, paddingBottom: 30}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', color: '#2A286A'}}>
            Welcome to Kwaba
          </Text>
          <Text
            style={{
              width: 220,
              textAlign: 'center',
              marginTop: 5,
              color: '#2A286A',
              fontSize: 14,
              // fontWeight: 'bold',
            }}>
            The Future of rent.
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Onboarding')}
            style={{
              width: '100%',
              paddingVertical: 22,
              backgroundColor: '#00DC99',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#FFF',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#FFF',
                // color: '#2A286A',
              }}>
              Get Started
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 15}}
            onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#2A286A', fontWeight: 'bold'}}>
              Got an account? <Text style={{color: '#00DC99'}}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
