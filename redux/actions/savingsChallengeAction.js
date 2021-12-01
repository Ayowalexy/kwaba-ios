import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export const setChallengeList = (data) => {
  return {
    type: types.SAVINGS_CHALLENGE_LIST,
    payload: data,
  };
};

export const getSavingsChallengeList = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + '/api/v1/list_savings_charledge';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setChallengeList(response.data.data.reverse()));
      return response.data.data
    } catch (error) {
      return error.message;
    }
  };
};
