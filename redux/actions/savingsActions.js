import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getOneUserSavings, getUserSavings} from '../../services/network';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export const setSoloSaving = (savingsData) => {
  return {
    type: types.SOLO_SAVING,
    payload: savingsData,
  };
};

export const soloSaving = (savingInputs) => {
  return (dispatch) => {
    dispatch(setSoloSaving(savingInputs));
  };
};

export const setTotalSoloSavings = (data) => {
  return {
    type: types.GET_SOLO_SAVINGS,
    payload: data,
  };
};

export const getTotalSoloSavings = () => {
  return async (dispatch) => {
    const token = await getToken();
    // console.log('token', token);
    const url = apiUrl + '/api/v1/savings';
    // const url = apiUrl + '/api/v1/get_user_savings';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setTotalSoloSavings(response.data.data));
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  };
};

// export const userSavings = (savingInputs) => {
//   return (dispatch) => {
//     dispatch(setGetUserSoloSavings(savingInputs))
//   }
// }

// export const setGetUserSoloSavings = (data) => {
//   return {
//     type: types.GET_USER_SOLO_SAVINGS,
//     payload: data
//   }
// }

// export const getUserSoloSavings = () => {
//   return async (dispatch) => {
//     try {
//       const response = await getUserSavings();
//       if (response.status == 200) {
//         const savings_id = response.data.data[0].id;
//         const one_savings = await getOneUserSavings(savings_id);

//         console.log('One Savings Here: ', one_savings.data.data);
//         dispatch(setGetUserSoloSavings(one_savings.data.data));
//         return one_savings.data.data;
//       }
//     } catch (error) {
//       console.log('Error: ', error);
//     }
//   };
// };
