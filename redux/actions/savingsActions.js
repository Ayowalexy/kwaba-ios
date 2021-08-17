import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// export const getTotalSoloSavings = () => {
//   return async (dispatch) => {
//     const token = await getToken();
//     // console.log('token', token);
//     const url = apiUrl + '/api/v1/get_user_savings';
//     try {
//       const response = await axios.get(url, {
//         headers: {'Content-Type': 'application/json', Authorization: token},
//       });
//       dispatch(setTotalSoloSavings(response.data.data));
//       return response.data.data;
//     } catch (error) {
//       return error.message;
//     }
//   };
// };
