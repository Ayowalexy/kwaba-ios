import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../services/api';
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

  return (
    <View style={[styles.container]}>
      <Text>Notifications</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
