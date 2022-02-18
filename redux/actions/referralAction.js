import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import urls from '../../services/routes';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export const setUserReferrals = (data) => {
  return {
    type: types.GET_USER_REFERRAL,
    payload: data,
  };
};

export const getUserReferrals = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = urls.auth.REFERRALS;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setUserReferrals(response.data.data));
      // console.log('Wallet: ', response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };
};
