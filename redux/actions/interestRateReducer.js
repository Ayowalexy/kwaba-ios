import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

// SET AIRTiME BILLS TRANSACTION
export const setInterestRate = (data) => {
  return {
    type: types.GET_AIRTIME_BILL_TRANS,
    payload: data,
  };
};

export const getInterestRate = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + `/api/v1/get_interest_rate`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'applictaion/json', Authorization: token},
      });
      dispatch(setInterestRate(response.data.data));
      return response.data.data;
      // console.log('Airtime Bills Trans: ', response.data.data);
    } catch (error) {
      return error;
    }
  };
};
