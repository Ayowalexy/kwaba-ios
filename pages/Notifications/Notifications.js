import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../services/api';
import {COLORS} from '../../util';
import Icon from 'react-native-vector-icons/Ionicons';
// import {getToken} from '../../services/network';

export default function Notifications({navigation}) {
  useEffect(() => {
    getAllNotifications();
  }, []);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const getAllNotifications = async () => {
    try {
      const token = await getToken();
      const url = apiUrl + '/api/v1/notifications';
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      console.log('RESPONSE:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getNotification = async() => {
  //   try {
  //     const token = await getToken();
  //     const url = apiUrl + '/api/v1/notification';
  //     const response = await axios.get(url, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token
  //       }
  //     })
  //     console.log('RESPONSE:', response.data);
  //   }catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleClick = async () => {
    const data = {
      savings_amount: 500000,
      savings_frequency: 'monthly',
      savings_account_number: '0094552107',
      savings_account_name: 'JOSHUA UDO NWOSU',
      savings_bank_code: '063',
      savings_tenure: 3,
      savings_title: 'My new savings',
      savings_start_date: '2021-07-14',
      savings_end_date: '2021-10-14',
      locked: 'true',
    };
    console.log('Hello:', data);
  };

  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{paddingHorizontal: 16, paddingVertical: 20, fontWeight: '900'}}
        color={COLORS.primary}
      />
      <View style={[styles.content]}>
        <Text style={[styles.text]}>No new notifications</Text>
        <TouchableOpacity style={[styles.btn]} onPress={handleClick}>
          <Icon
            name="notifications"
            size={25}
            style={{marginRight: 10, fontSize: 16}}
            color={COLORS.white}
          />
          <Text style={[styles.btnText]}>Notify me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
