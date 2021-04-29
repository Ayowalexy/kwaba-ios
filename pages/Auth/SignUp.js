import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
<<<<<<< HEAD
  Dimensions
=======
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../../util/index';
import designs from './style';
import {signUp} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessModal from '../../components/SuccessModal';
<<<<<<< HEAD
const widthTouse=Dimensions.get('window').width;
=======
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50

export default function SignUp({navigation}) {
  const [successModal, setSuccessModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('female');

  const handlePasswordCheck = (text) => {
    // if (text !== password) {
    //   return Alert.alert('Unmatched passwords', 'Your passwords do not match', [
    //     {text: 'Close'},
    //   ]);
    // }

    setConfirmPassword(text);
  };

  const isError = () => {
    if (
      (firstname.trim().length == 0 ||
        lastname.trim().length == 0 ||
        email.trim().length == 0,
      password == '' || gender.length == 0)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = async () => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      gender: gender,
    };
    if (isError()) {
      return Alert.alert('Missing inputs', 'Please Fill out all fields', [
        {text: 'Close'},
      ]);
    }

    //start spinner
    setSpinner(true);
    const res = await signUp(data);
    if (res.status == 201) {
      //stop spinner
      setSpinner(false);

      //show success alert
      setSuccessModal(true);
      await AsyncStorage.setItem('authData', res.data.authData);
      //Clear the input fields
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setSpinner(false);
      if (res == 'Request failed with status code 409') {
        Alert.alert('Request Failed', 'Email is already taken', [{text: 'Ok'}]);
      } else
        Alert.alert('Request Failed', 'An error occurred, please retry', [
          {text: 'Ok'},
        ]);
    }
  };

  const handleNavigation = () => {
    setSuccessModal(false);
    navigation.navigate('GetCode');
  };

  return (
    <View
      style={[
        designs.container,
<<<<<<< HEAD
        { paddingTop: 59},
=======
        {paddingRight: 32, paddingLeft: 32, paddingTop: 59},
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
      ]}>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={[designs.image, {marginTop: 0, marginLeft: 0}]}
            source={images.kwabaLogoWithName}
          />
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: '#00DC99',
              fontFamily: 'Circular Std',
              fontSize: 14,
              lineHeight: 30,
              fontWeight: 'bold',
              marginRight: 20,
            }}>
            Log in
          </Text>
        </View>

        <View>
          <Text
            style={[
              designs.heading,
              {
<<<<<<< HEAD
                marginLeft: 16,
=======
                marginLeft: 0,
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
                fontSize: 30,
                fontWeight: '700',
                fontFamily: 'CircularStd',
              },
            ]}>
            Let's set you up
          </Text>
          <TextInput
            style={designs.textField}
            placeholder="First Name"
            placeholderTextColor="#BFBFBF"
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
          />
          <TextInput
            style={designs.textField}
            placeholder="Last Name"
            placeholderTextColor="#BFBFBF"
            value={lastname}
            onChangeText={(text) => setLastname(text)}
          />
          <TextInput
            style={designs.textField}
            placeholder="Email"
            placeholderTextColor="#BFBFBF"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
<<<<<<< HEAD
          <View style={[designs.customInput, {width: widthTouse*0.9}]}>
            <TextInput
              style={{flex: 1,alignSelf:'center'}}
=======
          <View style={[designs.customInput, {width: 345}]}>
            <TextInput
              style={{flex: 1}}
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
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
            textContent={'Setting up...'}
            animation="fade"
            textStyle={{
              color: '#2A286A',
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 30,
            }}
            size="large"
          />
<<<<<<< HEAD
          <View style={[designs.customInput, {width: widthTouse*0.9}]}>
=======
          <View style={[designs.customInput, {width: 345}]}>
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
            <TextInput
              style={{flex: 1}}
              placeholder="Confirm Password"
              placeholderTextColor="#BFBFBF"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => handlePasswordCheck(text)}
            />
            <Icon name="eye-off-outline" color="#D6D6D6" size={20} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: 345,
            }}>
            <TouchableOpacity
              onPress={() => setGender('male')}
              style={[
                designs.btn,
                {
                  backgroundColor: gender == 'male' ? '#9D98EC' : '#FFFFFF',
                  width: 162,
                },
              ]}>
              <Text style={{color: gender == 'male' ? 'white' : '#465969'}}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('female')}
              style={[
                designs.btn,
                {
                  backgroundColor: gender == 'female' ? '#9D98EC' : '#FFFFFF',
                  width: 162,
                },
              ]}>
              <Text style={{color: gender == 'female' ? 'white' : '#465969'}}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
<<<<<<< HEAD

=======
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isError()}
            style={[
              designs.btn,
              {
                backgroundColor: !isError() ? '#00DC99' : '#EAEAEA',
<<<<<<< HEAD
                marginRight: 16,
                marginLeft: 16,
=======
                marginRight: 8,
                marginLeft: 8,
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
                marginBottom: 20,
              },
            ]}>
            <Text
              style={{
                color: !isError() ? 'white' : '#D6D6D6',
                fontSize: 14,
                lineHeight: 32,
              }}>
              SIGN UP
            </Text>
          </TouchableOpacity>
<<<<<<< HEAD

=======
>>>>>>> 687522263dd8eb1e1c9abf9339f82ee89eac6a50
        </View>
      </ScrollView>
      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
        handlePress={handleNavigation}
        successHeading="Registration Successful"
        successText="You have successfully signed up. You can now proceed to verify your identity."
      />
    </View>
  );
}
