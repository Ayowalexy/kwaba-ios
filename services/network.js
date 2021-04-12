import apiUrl from './api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchBanks = async () => {
  try {
    const banks = await axios.get(apiUrl + '/api/v1/bank', {
      headers: {'Content-Type': 'application/json'},
    });
    return banks.data;
  } catch (error) {
    return error.message;
  }
};

const signUp = async (data) => {
  const url = apiUrl + '/api/v1/user/register';
  try {
    const register = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json'},
    });
    return register;
  } catch (error) {
    return error.message;
  }
};

const login = async (data) => {
  const url = apiUrl + '/api/v1/user/login';
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json'},
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

const sendVerificationCode = async (data) => {
  const authData = await AsyncStorage.getItem('authData');
  const token = authData;
  try {
    const url = apiUrl + '/api/v1/sendSMS';
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

const verifyPhone = async (data) => {
  const authData = await AsyncStorage.getItem('authData');
  const token = authData;
  try {
    const url = apiUrl + '/api/v1/verifyPhone';
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

const createSavingsPlan = async (data) => {
  const token = await getToken();
  const url = apiUrl + '/api/v1/create_savings_plan';

  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

const subscribeToSavingsPlan = async () => {
  const token = await getToken();
  const url = apiUrl + '/api/v1/subscribe';
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    return response;
  } catch (error) {
    return error.message;
  }
};

const oneOffPayment = async (data) => {
  const url = apiUrl + '/api/v1/save';
  try {
    const token = await getToken();
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    console.log('response in network', response);
    return response;
  } catch (error) {
    console.log('one-off error', error);
    return error.message;
  }
};

const verifyPayment = async (data) => {
  const token = await getToken();
  const url = apiUrl + '/api/v1/payment/verify';
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export {
  fetchBanks,
  signUp,
  login,
  sendVerificationCode,
  verifyPhone,
  createSavingsPlan,
  subscribeToSavingsPlan,
  oneOffPayment,
  verifyPayment,
};
