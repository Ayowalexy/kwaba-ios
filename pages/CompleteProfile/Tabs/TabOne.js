import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, FONTS, images, icons} from '../../../util/index';
import designs from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SelectGenderModal from '../../../components/SelectGenderModal';
import AddressModal from '../../../components/AddressModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {useSelector, useDispatch} from 'react-redux';
import {me} from '../../../services/network';
import {setLoginState, currentUser} from '../../../redux/actions/userActions';

import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';

export default function TabOne(props) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  //   const [address, setAddress] = useState('');
  const [homeAddress, setHomeAddress] = useState('');

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const [showSelectGenderModal, setShowSelectGenderModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);

  const {} = props;

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);

    // setDateOfBirth(currentDate);
    console.log(currentDate);
    // console.log('Log: ', new Date(date.toISOString()).toDateString().slice(4));
    setDateOfBirth(new Date(date.toISOString()).toDateString().slice(4));
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const data = JSON.parse(userData);
    return data;
  };

  useEffect(() => {
    (async () => {
      //   const userData = await AsyncStorage.getItem('userData');
      const data = await getUserData();
      const {firstname, lastname, gender, homeaddress, dob} = data.user;

      //   console.log('Local Data: ', data);
      //   console.log(data.);
      //   console.log('HERE:', {...data, username: 'James'});

      // auto fill input fields
      setFirstName(firstname);
      setLastName(lastname);
      setGender(gender);
      if (homeaddress != null) setHomeAddress(homeaddress);
      if (dob != null) setDateOfBirth(dob);
    })();
  }, []);

  const onConfirm = () => {
    setShowAddressModal(false);
    // console.log('DATA:', {street, city, state, country});
    let address = `${street} ${city} ${state} ${country}`;
    setHomeAddress(address);
  };

  const saveLoginToStorage = async (data) => {
    // console.log(data);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {}
  };

  const updateProfile = async () => {
    console.log('Profile updating...');
    const token = await getToken();
    console.log('Token:', token);

    const updateData = {
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      dob: dateOfBirth,
      homeaddress: homeAddress,
    };

    // console.log(updateData);
    console.log('*************************************************');

    const res = await me();
    console.log('RES:', res.user);

    // const user = await getUserData();
    // console.log('User: ', user);

    let userData = await getUserData();
    setSpinner(true);

    try {
      const url = 'http://67.207.86.39:8000/api/v1/user/update_profile';
      const response = await axios.put(url, JSON.stringify(updateData), {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      if (response.status == 200) {
        const res = await me();
        setSpinner(false);
        setModal(true);

        saveLoginToStorage({
          ...userData,
          user: res.user,
          username: res.user.firstname,
        });

        dispatch(
          setLoginState({
            ...userData,
            user: res.user,
            username: res.user.firstname,
          }),
        );
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  const uploadProfilePic = async () => {};

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 80}}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#F7F8FD',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="camera"
              size={40}
              style={{
                paddingVertical: 20,
                paddingHorizontal: 10,
                fontWeight: '900',
              }}
              color={COLORS.grey}
            />
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: COLORS.secondary,
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              Tap to change picture
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            style={[designs.textField]}
            placeholder="First Name"
            placeholderTextColor="#999"
            keyboardType="default"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />

          <TextInput
            style={[designs.textField]}
            placeholder="Last Name"
            placeholderTextColor="#999"
            keyboardType="default"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <TouchableOpacity
            style={[designs.customInput, {padding: 20}]}
            onPress={() => {
              setShowSelectGenderModal(!showSelectGenderModal);
            }}>
            {gender != '' ? (
              <Text
                style={{
                  color: '#777',
                  fontWeight: 'bold',
                }}>
                {gender}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#BABABA',
                }}>
                Gender
              </Text>
            )}
            <Icon
              name="chevron-down-outline"
              size={20}
              style={{fontWeight: 'bold'}}
              color="#BABABA"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[designs.customInput, {padding: 20}]}
            onPress={() => {
              setShowDate(true);
              // setShowSelectPayMethodModal(!showSelectPayMethodModal);
            }}>
            {dateOfBirth != '' ? (
              <Text
                style={{
                  color: '#777',
                  fontWeight: 'bold',
                }}>
                {dateOfBirth}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#BABABA',
                }}>
                Date of Birth
              </Text>
            )}
            <IconFA5
              name="calendar-alt"
              size={20}
              color="#D6D6D6"
              style={{
                position: 'absolute',
                top: 18,
                right: 20,
              }}
            />
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              onChange={handleDateSelect}
              mode="date"
              is24Hour={true}
              display="spinner"
              //   minimumDate={moment().toDate()}
            />
          )}

          <View style={{paddingVertical: 20}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                Address
              </Text>
              <TouchableOpacity
                onPress={() => setShowAddressModal(!showAddressModal)}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLORS.secondary,
                  }}>
                  Change address
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowAddressModal(true)}>
              <TextInput
                style={[designs.textField]}
                placeholder="Address"
                keyboardType="number-pad"
                editable={false}
                value={homeAddress}
                placeholderTextColor="#999"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={updateProfile}
          style={[
            {
              padding: 15,
              borderRadius: 10,
              fontSize: 14,
              fontFamily: 'CircularStd-Medium',
              fontWeight: '600',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 1,

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
            SAVE CHANGES
          </Text>
        </TouchableOpacity>
      </View>

      <SelectGenderModal
        onRequestClose={() => setShowSelectGenderModal(!showSelectGenderModal)}
        visible={showSelectGenderModal}
        onClick={(value) => setGender(value)}
      />

      <AddressModal
        onConfirm={onConfirm}
        onRequestClose={() => setShowAddressModal(!showAddressModal)}
        visible={showAddressModal}
        street={street}
        setStreet={setStreet}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        country={country}
        setCountry={setCountry}
      />

      <Spinner visible={spinner} size="large" />
      <Modal
        isVisible={modal}
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text style={{color: COLORS.secondary, fontWeight: 'bold'}}>
            Profile updated!
          </Text>
        </View>
      </Modal>
    </>
  );
}
