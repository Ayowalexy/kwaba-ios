import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';

export default function PassWordResetSuccess(props) {
  const {navigation, msg, route} = props;
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(route.params.msg);
    console.log(route);
  }, []);

  return (
    <View style={[designs.container]}>
      <Image
        style={{
          width: 200,
          height: 200,
          zIndex: 0,
          position: 'absolute',
          top: -20,
          right: -50,
          opacity: 0.8,
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
        source={require('../../assets/shapes/shape2.png')}
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Image
            style={[designs.image, {marginTop: 0}]}
            source={icons.kwabalogocol}
            resizeMode="contain"
          />
        </View>
        <View style={{alignItems: 'center', marginBottom: 0}}>
          <Image
            style={[{marginTop: 0, width: '100%', height: 300}]}
            source={icons.passwordResetSuccess}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#465969',
            lineHeight: 25,
            marginTop: 10,
            textAlign: 'center',
          }}>
          Password Reset{'\n'}Successful
        </Text>

        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              color: '#465969',
              lineHeight: 23,
              textAlign: 'center',
              width: 300,
            }}>
            {message}
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[
              designs.btn,
              {
                backgroundColor: '#00DC99',
                width: '100%',
                borderRadius: 10,
              },
            ]}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                lineHeight: 30,
                fontWeight: 'bold',
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
