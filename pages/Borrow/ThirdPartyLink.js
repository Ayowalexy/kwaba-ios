import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images} from '../../util/index';
import designs from './style';
import {signUp} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessModal from '../../components/SuccessModal';

export default function ThirdPartyLink({navigation, route}) {
  const item = route.params;
  
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//   const isError = () => {
//     if (
//       (
//         email.trim().length == 0,
//       password == '' )
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   const handleSubmit = async () => {
//     const data = {
//       email: email,
//       password: password,
      
//     };
//     if (isError()) {
//       return Alert.alert('Missing inputs', 'Please Fill out all fields', [
//         {text: 'Close'},
//       ]);
//     }

//   const handleNavigation = () => {
//     navigation.navigate('GetCode');
//   };

  return (
    <View
      style={[
        designs.container,
        {backgroundColor: '#F7F8FD', paddingTop: 28, paddingHorizontal: 16},
      ]}>
      
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
              <View style={{width: '100%', marginLeft: 25, marginBottom: 40}}>
        <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={20}
        style={{ fontWeight: '900'}}
        color= {COLORS.primary}
      />
      </View>
          <Image
            style={[designs.image, {width: 163, height: 157}]}
            source={item.logo}
          />
        </View>

        <View>
          <Text
            style= {[FONTS.h3FontStyling, {color: COLORS.primary, fontWeight:'bold', textAlign: 'center', marginTop: 14, marginBottom: 28}] }>
            Login to your account
          </Text>
          <View style={designs.customInput}>
          <Icon name='mail-outline' color='#EAEAEA' size={25} />
          <TextInput
            style={{flex: 1}}
            placeholder="Email"
            placeholderTextColor="#BFBFBF"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          </View>
          <View style={designs.customInput}>
          <Icon name='lock-closed-outline' color='#EAEAEA' size={25}/>
            <TextInput
              style={{flex: 1}}
              placeholder="Password"
              placeholderTextColor="#BFBFBF"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Icon name="eye-off-outline" color="#D6D6D6" size={20} />
          </View>
          <Spinner
            visible={spinner}
            textContent={'Connecting...'}
            animation="fade"
            textStyle={{
              color: '#2A286A',
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 30,
            }}
            size="large"
          />
          
           
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
            }}>
            
          <TouchableOpacity
            style={[
              designs.buttonStyleB,
              {
                backgroundColor: COLORS.light,
                width: '100%'
              },
            ]}
            onPress={() => navigation.navigate('RentalLoanRequestDashBoard')}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Circular Std',
                lineHeight: 30,
                color: COLORS.white
              }}>
              LOG IN
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}
