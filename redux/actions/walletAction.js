import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export const setUserWallet = (data) => {
  return {
    type: types.GET_USER_WALLET,
    payload: data,
  };
};

export const getUserWallet = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + '/api/v1/user_wallet';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setUserWallet(response.data.data));
      // console.log('Wallet: ', response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };
};

export const setUserWalletTransactions = (data) => {
  return {
    type: types.GET_USER_WALLET_TRANSACTIONS,
    payload: data,
  };
};

export const getUserWalletTransactions = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + '/api/v1/get_wallet_transactions';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setUserWalletTransactions(response.data.data));
      console.log('Wallet Transaction: ', response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };
};
