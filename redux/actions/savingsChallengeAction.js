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

const getUserData = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const user = JSON.parse(userData).user;
  return user;
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
    // const url = apiUrl + '/api/v1/list_savings_charledge';
    const url = urls.savings.GET_ALL_CHALLENGES;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      console.log('Store: ', response);
      dispatch(setChallengeList(response.data.data));
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  };
};

export const setSavingsUnderChallengeList = (data) => {
  return {
    type: types.SAVINGS_UNDER_CHALLENGE_LIST,
    payload: data,
  };
};

export const getSavingsUnderChallengeList = (id) => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + `/api/v1/savings_under_challedge_for_user/${id}`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      // console.log('Abracadabra: ', response.data.data);
      dispatch(setSavingsUnderChallengeList(response.data.data));
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  };
};

export const setUserSavingsChallenge = (data) => {
  return {
    type: types.USER_SAVINGS_CHALLENGE,
    payload: data,
  };
};

export const getUserSavingsChallenge = () => {
  return async (dispatch) => {
    const token = await getToken();
    const user = await getUserData();
    const url = `https://kwaba-php-api-bpplt.ondigitalocean.app/api/challedge_savings?user_id=${user.id}`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      // console.log('Abracadabra: ', response.data.data);
      dispatch(setUserSavingsChallenge(response.data.data));
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  };
};

export const setOneUserSavingsChallenge = (data) => {
  return {
    type: types.GET_ONE_USER_SAVINGS_CHALLENGE,
    payload: data,
  };
};

export const getOneUserSavingsChallenge = (savings_id) => {
  return async (dispatch) => {
    const token = await getToken();
    const user = await getUserData();
    const url = `https://kwaba-php-api-bpplt.ondigitalocean.app/api/get_one_savings_challege?user_id=${user.id}&savings_challedge_id=${savings_id}`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      // console.log('Abracadabra: ', response.data.data);
      dispatch(setOneUserSavingsChallenge(response.data.data));
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  };
};
