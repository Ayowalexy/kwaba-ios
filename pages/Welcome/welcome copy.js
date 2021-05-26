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

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const Welcome = ({navigation}) => {
  const [userToken, setUserToken] = useState(null);
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

  useEffect(() => {}, [userToken || '']);

  return (
    <SafeAreaView style={designs.container}>
      {/* <StatusBar
        backgroundColor="#f00"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      /> */}
      {/* <View> */}
      <View style={designs.logoContainer}>
        <Image source={icons.kwabalogocol} style={designs.logo} />
      </View>

      {/* <Image source={images.ellipsis} style={{width: '100%', height: 400}} /> */}
      {/* content section */}
      <View style={designs.contentWrapper}>
        <View style={[designs.roundSeconday]}>
          <View style={[designs.circle, {backgroundColor: '#00DC99'}]}></View>
          <View style={[designs.roundPrimary]}>
            <View
              style={[
                designs.circle,
                {backgroundColor: '#2A286A', flex: 1},
              ]}></View>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#FFF',
                }}>
                Welcome to Kwaba
              </Text>
              <Text
                style={{
                  width: 200,
                  textAlign: 'center',
                  fontSize: 14,
                  marginTop: 10,
                  fontWeight: '200',
                  color: '#FFF',
                }}>
                The new way to save and pay your rent
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                // borderWidth: 1,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  paddingVertical: 20,
                  backgroundColor: '#FFF',
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
                    // color: '#FFF',
                    color: '#2A286A',
                  }}>
                  Get Started
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginTop: 15}}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{color: 'white'}}>
                  Got an account? <Text style={{color: '#00DC99'}}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Welcome;
