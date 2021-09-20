import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, FONTS, images, icons} from '../../../util/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';

import {useDispatch} from 'react-redux';
import {me} from '../../../services/network';
import {setLoginState} from '../../../redux/actions/userActions';
import {formatNumber} from '../../../util/numberFormatter';
import moment from 'moment';

export default function TabFour(props) {
  const dispatch = useDispatch();
  const [rentAmount, setRentAmount] = useState('');
  const [rentDate, setRentDate] = useState('');

  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);

  const {} = props;

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
      const data = await getUserData();
      const {how_much_is_your_rent, when_is_your_next_rent_due} = data.user;

      console.log(
        'From the local: ',
        how_much_is_your_rent,
        when_is_your_next_rent_due,
      );

      // auto fill input fields
      setRentAmount(formatNumber(how_much_is_your_rent));
      setRentDate(moment(when_is_your_next_rent_due).format('DD/MM/YYYY'));
    })();
  }, []);

  const saveLoginToStorage = async (data) => {
    // console.log(data);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {}
  };

  const updateProfile = async () => {
    const token = await getToken();

    const updateData = {
      work_place: companyName,
      location: '',
    };

    let userData = await getUserData();
    setSpinner(true);

    try {
      const url = 'http://67.207.86.39:8000/api/v1/user/update_profile';
      const response = await axios.put(url, JSON.stringify(updateData), {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      if (response.status == 200) {
        setSpinner(false);
        setModal(true);
        const res = await me();

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

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 80}}>
        <View style={{marginTop: 20}} />
        <View>
          <TextInput
            style={[designs.textField]}
            placeholder="How much is your rent"
            placeholderTextColor="#555"
            keyboardType="default"
            value={rentAmount}
            onChangeText={(text) => setRentAmount(text)}
          />
          <TextInput
            style={[designs.textField]}
            placeholder="When is your next rent due"
            placeholderTextColor="#555"
            keyboardType="default"
            value={rentDate}
            onChangeText={(text) => setRentDate(text)}
          />
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
