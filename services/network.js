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
  const url = apiUrl + '/api/v1/cardtokenize';
  const token = await getToken();
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

const tokenizePayment = async (data) => {
  const url = apiUrl + '/api/v1/paycardtokenize';
  const token = await getToken();
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

const getTokenizeCards = async () => {
  const url = apiUrl + '/api/v1/usercards';
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const updateTokenizeCard = async (data) => {
  const url = apiUrl + '/api/v1/updatecard';
  const token = await getToken();
  try {
    const response = await axios.put(url, JSON.stringify(data), {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const deleteTokenizeCard = async (data) => {
  const url = apiUrl + '/api/v1/deletecard';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const verifyBankAccount = async (data) => {
  const url = apiUrl + '/api/v1/user/bank_details';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const createBankAccount = async (data) => {
  const url = apiUrl + '/api/v1/createbankaccount';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return message;
  }
};

const getBankAccounts = async () => {
  const url = apiUrl + '/api/v1/getuserbankaccounts';
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const updateBankAccount = async (data) => {
  const url = apiUrl + '/api/v1/updateuserbankaccount';
  const token = await getToken();
  try {
    const response = await axios.put(url, JSON.stringify(data), {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const deleteBankAccount = async (data) => {
  const url = apiUrl + '/api/v1/deletebank';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
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

// Buddy saving API
const createBuddySavings = async (data) => {
  const url = apiUrl + '/api/v1/create_buddy_savings';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const InviteBuddy = async (data) => {
  const url = apiUrl + '/api/v1/invite_buddy';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// SOLO SAVINGS
const userCreateSavings = async (data) => {
  const url = apiUrl + '/api/v1/user_create_savings';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getUserSavings = async () => {
  const url = apiUrl + '/api/v1/get_user_savings';
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getOneUserSavings = async (id) => {
  const url = apiUrl + `/api/v1/get_one_savings/${id}`;
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getSavingsHistory = async (id) => {
  const url = apiUrl + `/api/v1/get_savings_history/${id}`;
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const addFundsToSavings = async (data) => {
  const url = apiUrl + '/api/v1/add_funds_to_savings';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const verifySavingsPayment = async (data) => {
  const url = apiUrl + '/api/v1/verify_savings_payment';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Accept Offer
const acceptOffer = async (data) => {
  const url = apiUrl + '/api/v1/application/accept_offer';
  const token = await getToken();
  try {
    const response = await axios.put(url, data, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Reject Offer
const rejectOffer = async (data) => {
  const url = apiUrl + '/api/v1/application/reject';
  const token = await getToken();
  try {
    const response = await axios.put(url, data, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Delete Buddy Savings Invite
const deleteBuddySavingsInvite = async (id) => {
  const url = apiUrl + `/api/v1/buddy/deleteInvite/${id}`;
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Send Buddy Savings Bulk Invite
const sendBuddySavingsInvites = async (data) => {
  const url = apiUrl + '/api/v1/buddy/sendinvites';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// get one buddy savings
const getOneUserBuddySavings = async (id) => {
  const url = apiUrl + `/api/v1/buddy_savings_dashboard/${id}`;
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Buy Airtime
const BuyPurchaseAirtime = async (data) => {
  const url = apiUrl + '/api/v1/buy_aitime';
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// GET ALL BANKS NIP
const getAllBanks = async () => {
  const url = apiUrl + '/api/v1/get_all_banks_nip';
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Airtime

const getBillsCategory = async (serviceID) => {
  const url = apiUrl + `/api/v1/get_bills_category/${serviceID}`;
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
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
  getTokenizeCards,
  updateTokenizeCard,
  deleteTokenizeCard,
  verifyBankAccount,
  createBankAccount,
  getBankAccounts,
  updateBankAccount,
  deleteBankAccount,
  referralDetails,
  me,
  createBuddySavings,
  InviteBuddy,
  userCreateSavings,
  getUserSavings,
  getOneUserSavings,
  getSavingsHistory,
  addFundsToSavings,
  verifySavingsPayment,
  acceptOffer,
  rejectOffer,
  sendBuddySavingsInvites,
  deleteBuddySavingsInvite,
  getOneUserBuddySavings,
  BuyPurchaseAirtime,
  getAllBanks,
  getBillsCategory,
};
