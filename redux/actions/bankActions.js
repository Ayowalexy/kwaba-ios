import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

// GET BANK ACCOUNT
export const setBankAccounts = (data) => {
  return {
    type: types.GET_BANK_ACCOUNTS,
    payload: data,
  };
};

export const getBankAccounts = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + '/api/v1/getuserbankaccounts';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setBankAccounts(response.data.userBanks));
      //   console.log('Redux Bank Res: ', response.data.userBanks);
      return response.data.userBanks;
    } catch (error) {
      return error;
    }
  };
};

// LOCAL BANK FROM STORAGE
export const setBankFromStorage = (data) => {
  return {
    type: types.GET_BANK_FROM_STORAGE,
    payload: data,
  };
};
