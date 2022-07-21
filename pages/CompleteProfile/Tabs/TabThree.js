import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import designs from './style';
import { COLORS, FONTS, images, icons } from '../../../util/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';

import { useDispatch } from 'react-redux';
import { me } from '../../../services/network';
import { baseUrl } from '../../../services/routes';
import { setLoginState } from '../../../redux/actions/userActions';

export default function TabThree(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bvn, setBvn] = useState('');

  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);

  const { } = props;

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
      const { email, telephone, bvn } = data.user;

      // auto fill input fields
      setEmail(email);
      setPhoneNumber(telephone);
      setBvn(bvn);
      // setBvn(gender);
    })();
  }, []);

  const saveLoginToStorage = async (data) => {
    // console.log(data);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) { }
  };

  const updateProfile = async () => {
    const token = await getToken();

    const updateData = {
      email: email,
      telephone: phoneNumber,
      bvn: bvn,
    };

    let userData = await getUserData();
    setSpinner(true);

    try {
      const url =
        `${baseUrl}/user/update_profile`;
      const response = await axios.put(url, JSON.stringify(updateData), {
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      if (response.status == 200) {
        setSpinner(false);
        setModal(true);
        const res = await me();

        saveLoginToStorage({
          ...userData,
          user: res.data,
          username: res.data.firstname,
        });

        dispatch(
          setLoginState({
            ...userData,
            user: res.data,
            username: res.data.firstname,
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
        style={{ marginBottom: 80 }}>
        <View style={{ marginTop: 20 }} />
        <View>
          <Text style={{ color: '#555', paddingTop: 10 }}>Email</Text>
          <TextInput
            style={[designs.textField]}
            placeholder="Email"
            placeholderTextColor="#555"
            keyboardType="default"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={{ color: '#555', paddingTop: 10 }}>Phone number</Text>
          <TextInput
            style={[designs.textField]}
            placeholder="Phone Number"
            placeholderTextColor="#555"
            keyboardType="default"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <Text style={{ color: '#555', paddingTop: 10 }}>BVN</Text>

          <TextInput
            style={[designs.textField]}
            placeholder="Bank Verification Number(BVN)"
            placeholderTextColor="#555"
            keyboardType="default"
            value={bvn}
            onChangeText={(text) => setBvn(text)}
          />
        </View>
        <View style={{ marginTop: 20 }} />
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
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ color: COLORS.secondary, fontWeight: 'bold' }}>
            Profile updated!
          </Text>
        </View>
      </Modal>
    </>
  );
}
