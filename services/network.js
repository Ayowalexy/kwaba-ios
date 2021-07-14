import apiUrl from './api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

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

const forgotPassword = async (data) => {
  const url = apiUrl + '/api/v1/user/forgot_password';
  try {
    const response = await axios.put(url, data, {
      headers: {'Content-Type': 'application/json'},
    });
    return response;
  } catch (error) {
    return error;
  }
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
    return response;
  } catch (error) {
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

const applyForEmergencyLoan = async (data) => {
  const token = await getToken();
  const url = apiUrl + '/api/v1/emergency_loan/apply';
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

const loanRepayment = async (data) => {
  const token = await getToken();
  const url = apiUrl + '/api/v1/emergency_loan/repay';
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

const loanPaymentVerification = async (data) => {
  const token = await getToken();
  const url = apiUrl + '/api/v1/emergency_loan/payment/verify';
  try {
    const response = await axios.put(url, JSON.stringify(data), {
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

const getEmergencyLoans = async () => {
  const token = await getToken();
  const url = apiUrl + '/api/v1/emergency_loan/all';

  try {
    const response = await axios.get(url, {
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

const getSingleLoan = async (data) => {
  const token = await getToken();
  const url = apiUrl + '/api/v1/emergency_loan/one';

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

const resolveBankAccount = async (data) => {
  const url = apiUrl + '/api/v1/user/bank_details';
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const resolveCardDetails = async (data) => {
  const url = apiUrl + '/api/v1/user/card_details';
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const tokenizeCard = async (data) => {
  const url = apiUrl + '/api/v1/payment/cardtokenize';
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const tokenizePayment = async (data) => {
  const url = apiUrl + '/api/v1/payment/cardtokenize/payment';
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const referralDetails = async () => {
  const url = apiUrl + '/api/v1/payment/referraldetails';
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {Authorization: token},
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const me = async () => {
  const url = apiUrl + '/api/v1/me';
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {Authorization: token},
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export {
  fetchBanks,
  signUp,
  login,
  forgotPassword,
  sendVerificationCode,
  verifyPhone,
  createSavingsPlan,
  subscribeToSavingsPlan,
  oneOffPayment,
  verifyPayment,
  applyForEmergencyLoan,
  loanRepayment,
  loanPaymentVerification,
  getEmergencyLoans,
  getSingleLoan,
  resolveBankAccount,
  resolveCardDetails,
  tokenizeCard,
  tokenizePayment,
  referralDetails,
  me,
};
