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
    const url = apiUrl + '/api/v1/get_user_savings';
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

export const setMaxLoanCap = (data) => {
  return {
    type: types.GET_MAX_LOAN_CAP,
    payload: data,
  };
};

export const getMaxLoanCap = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + '/api/v1/get_max_loan_cap';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setMaxLoanCap(response.data.data));
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  };
};

// Buddy Savings

export const setTotalBuddySavings = (data) => {
  return {
    type: types.GET_BUDDY_SAVINGS,
    payload: data,
  };
};

export const getTotalBuddySavings = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + '/api/v1/fetch_buddy_savings';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setTotalBuddySavings(response.data.data));
      return response.data.data;
    } catch (error) {
      return error;
    }
  };
};

// ONE BUDDY SAVINGS
export const setOneBuddySavings = (data) => {
  return {
    type: types.GET_ONE_BUDDY_SAVINGS,
    payload: data,
  };
};

export const getOneBuddySavings = (id) => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + `/api/v1/buddy_savings_dashboard/${id}`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setOneBuddySavings(response.data));
      return response.data;
    } catch (error) {
      return error;
    }
  };
};

// ONE SOLO SAVINGS
export const setOneSoloSavings = (data) => {
  return {
    type: types.GET_ONE_SOLO_SAVINGS,
    payload: data,
  };
};

export const getOneSoloSavings = (id) => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + `/api/v1/get_one_savings/${id}`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setOneSoloSavings(response.data.data));
      return response.data.data;
    } catch (error) {
      return error;
    }
  };
};

// GET ALL SOLO SAVINGS TRANSACTION
// export const getAllSoloSavingsTransaction = (id) => {
//   return async (dispatch) => {
//     const token = await getToken();
//     const url = apiUrl + `/api/v1/get_one_savings/${id}`;
//     try {
//       const response = await axios.get(url, {
//         headers: {'Content-Type': 'application/json', Authorization: token},
//       });
//       dispatch(setOneSoloSavings(response.data.data));
//       return response.data.data;
//     } catch (error) {
//       return error;
//     }
//   };
// };

// GET ONE SOLO SAVINGS TRANSACTION
export const setOneSoloSavingsTransaction = (data) => {
  return {
    type: types.GET_ONE_SOLO_SAVINGS_TRANSACTION,
    payload: data,
  };
};
export const getOneSoloSavingsTransaction = (id) => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + `/api/v1/get_savings_history/${id}`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setOneSoloSavingsTransaction(response.data.data));
      return response.data.data;
    } catch (error) {
      return error;
    }
  };
};
