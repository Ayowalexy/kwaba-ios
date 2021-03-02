import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export const setLoginState = (loginData) => {
  return {
    type: types.LOGIN,
    payload: loginData,
  };
};

export const currentUser = (data) => {
  return {
    type: types.GET_CURRENT_USER,
    payload: data,
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + '/api/v1/me';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', token: token},
      });
      dispatch(currentUser(response.data.user));
      return response.data.user;
    } catch (error) {
      return error.message;
    }
  };
};
