import apiUrl from './api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import urls from './routes';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';


//NEW URL ADDITIONS
//***********START */

const getInterestRateForSavingsAndBuddy = async () => {
  try {
    const rates = await axios.get(apiUrl + '/api/v1/system/rates', {
      headers: {'Content-Type': 'application/json'},
    });
    return rates.data;
  } catch (error) {
    return error.message;
  }
}

/* ========END========*/

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
  try {
    const register = await axios.post(
      urls.auth.REGISTER,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
    return register;
  } catch (error) {
    return error.message;
  }
};

const login = async (data) => {
  console.log(data, urls.auth.LOGIN)
  try {
    const response = await axios.post(urls.auth.LOGIN, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json'},
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

// creating/Reseting PIN
const setPin = async (data) => {
  try {
    // const url = apiUrl + '/api/v1/user_set_pin';
    // const url = urls.auth.USER_SET_PIN
    const response = await axios.post(urls.auth.USER_SET_PIN, data, {
      headers: {'Content-Type': 'application/json'},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const enterPinToLogin = async (data) => {
  console.log(data, urls.auth.USER_LOGIN_VERIFY_PIN)
  try {
    const url = apiUrl + '/api/v1/user_login_verify_pin';
    const response = await axios.post(urls.auth.USER_LOGIN_VERIFY_PIN, data, {
      headers: {'Content-Type': 'application/json'},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const forgotPassword = async (data) => {
  try {
    const response = await axios.put(urls.auth.FORGORT_PASSWORD, data, {
      headers: {'Content-Type': 'application/json'},
    });
    return response;
  } catch (error) {
    return error;
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
  // const url = apiUrl + '/api/v1/emergency_loan/apply';
  const url = urls.emergencyfunds.APPLY;
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
  const url = urls.savings.VERIFY_PAYMENT
  // const url = apiUrl + '/api/v1/emergency_loan/repay';
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const loanPaymentVerification = async (data) => {
  const token = await getToken();
  const url = apiUrl + '/api/v1/emergency_loan/payment/verify';
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

const getEmergencyLoans = async () => {
  const token = await getToken();
  // const url = apiUrl + '/api/v1/emergency_loan/all';
  const url = urls.emergencyfunds.GET_LOANS;

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

const getOneLoan = async (id) => {
  const token = await getToken();
  const url = urls.emergencyfunds.GET_LOANS;

  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
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

const getAllEmergencyLoansRepayment = async () => {
  const token = await getToken();
  // const url = apiUrl + `/api/get_all_emergencyloans_repayments`;
  const url = urls.payments.EMERGENCY_FUNDS_GET_REPAYMENT;
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getSingleEmergencyLoanRepayment = async (id) => {
  const token = await getToken();
  const url = apiUrl + `/api/v1/loan_repayments/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
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
// paymeny/verify
// /payment/complete
// amount (#50)
const tokenizePayment = async (data) => {
  // const url = apiUrl + '/api/v1/paycardtokenize';
  const url = urls.savings.VERIFY_PAYMENT;
  const token = await getToken();

  try {
    // const response = await axios.post(url, JSON.stringify(data), {
      const response = await axios.post(
        url,
        JSON.stringify(data), {
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

// reference
const tokenizeCard = async (data) => {
  const url = apiUrl + '/api/v1/cardtokenize';
  const token = await getToken();
  try {
    // const response = await axios.post(url, JSON.stringify(data), {
      const response = await axios.post(
        urls.savings.COMPLETE_PAYMENT, 
        JSON.stringify(data), {
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
  // const url = apiUrl + '/api/v1/usercards';
  const url = apiUrl + '/api/v1/payments/get-tokenized-cards';
  const token = await getToken();
  try {
    const response = await axios.get(url, {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
   
    return response;
  } catch (error) {
    console.log(error)
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
  console.log(url, data)
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
    const response = await axios.get(urls.auth.ME, {
      headers: {Authorization: token},
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Buddy saving API
const createBuddySavings = async (data) => {
  // const url = apiUrl + '/api/v1/create_buddy_savings';
  const url = urls.savings.CREATE_BUDDY_SAVINGS;
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    console.log('here lies an error', error.response);
    return error;
  }
};

const InviteBuddy = async (data) => {
  // const url = apiUrl + '/api/v1/invite_buddy';
  const url = urls.savings.INVITE_BUDDY;
  const token = await getToken();
  console.log(data);
  console.log(url);
  console.log(token);
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
};

const GetAllBuddyInvites = async () => {
  const token = await getToken();
  const url = urls.savings.GET_ALL_BUDDY_INVITES;
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    
    return response;
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
}

const DeleteBuddyInvites = async (data) => {
  const token = await getToken();
  const url = urls.savings.GET_ALL_BUDDY_INVITES;
  try {
    const response = await axios.delete(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    
    return response;
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
}


const AcceptBuddyInvites = async (data) => {
  const token = await getToken();
  const url = urls.savings.ACCEPT_BUDDY_INVITE;
  try {
    const response = await axios.put(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    
    return response;
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
}


// SOLO SAVINGS
// ebuka resume here
const userCreateSavings = async (data) => {
  console.log('from user create savings');
  console.log(urls.savings.USER_CREATE_SAVINGS);

  // const url = apiUrl + '/api/v1/user_create_savings';
  const token = await getToken();

  try {
    const response = await axios.post(
      urls.savings.USER_CREATE_SAVINGS,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );

    return response;
  } catch (error) {
    console.log(error);
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

const getUserSavingsWithParam = async (type) => {
  const url = apiUrl + `/api/v1/get_user_savings?savings_type=${type}`;
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
    const response = await axios.get(
      urls.savings.GET_ALL_USER_SAVINGS + `/${id}`,
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

const getSavingsHistory = async (id) => {
  // const url = apiUrl + `/api/v1/get_savings_history/${id}`;
  const token = await getToken();
  try {
    const response = await axios.get(
      `${urls.savings.GET_SAVINGS_PAYMENT_HISTORY}/${id}`,
      {
        headers: {Authorization: token},
      },
    );
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
  console.log(urls.savings.VERIFY_PAYMENT);
  console.log(data);
  try {
    const response = await axios.post(
      urls.savings.VERIFY_PAYMENT,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    console.log('payment response, delete later', response);
    return response;
  } catch (error) {
    console.log(error.message);
    return error.response.data;
  }
};

const completeSavingsPayment = async (data) => {
  const token = await getToken();

  console.log('complete purchase', data);
  try {
    const response = await axios.post(
      urls.savings.COMPLETE_PAYMENT,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error.response;
  }
};



const addFundsToBuddySavings = async (data) => {
  const url = apiUrl + '/api/v1/add_fund_tobuddy_savings';
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

const updateUsersSavingsPlan = async (data) => {
  const url = urls.savings.UPDATE_USERS_SAVINGS_PLAN;
  const token = await getToken();
  try {
    const response = await axios.put(url, JSON.stringify(data), {
      headers: {'Content-type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }

}

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
  // const url = apiUrl + `/api/v1/buddy/deleteInvite/${id}`;
  const url = urls.savings.DELETE_INVITE + id;
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
  // const url = apiUrl + '/api/v1/buddy/sendinvites';
  const url = urls.savings.INVITE_BUDDY;
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

  const url = urls.savings.DASHBOARD + `/${id}`
  // const url = apiUrl + `/api/v1/buddy_savings_dashboard/${id}`;
  const token = await getToken();

  console.log(token, url, id)
  try {
    const response = await axios.get(url, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
const getOneBuddy = async (id) => {
  const url = apiUrl + `/api/v1/savings/buddy/${id}`;
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
// fetch user buddy invites
const fetchUserBuddyInvites = async () => {
  const url = apiUrl + `/api/v1/fetch_user_buddy_invites`;
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

// fetch user buddy invite data
const fetchUserBuddyInviteData = async (data) => {
  const url = apiUrl + '/api/v1/fetch_user_buddy_invite_data';
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

// accept buddy invite
const AcceptBuddyInvite = async (data) => {
  const url_old = apiUrl + '/api/v1/accept_buddy_savings';
  const url = urls.savings.ACCEPT_BUDDY_INVITE
  const token = await getToken();
  try {
    const response = await axios.put(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Buy Airtime
const BuyPurchaseAirtime = async (data) => {
  console.log('airtime purchase data', data);
  const url = apiUrl + '/api/v1/buy_aitime';
  const token = await getToken();
  console.log(token);
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    console.log(response);
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

// Buy Other Bills
const buyOtherBills = async (data) => {
  const token = await getToken();
  // const url = apiUrl + `/api/v1/buy_other_bills`;
  const url = urls.savings.VERIFY_PAYMENT;
  try {
    const response = await axios.post(url, data, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

// /api/v1/add_funds_to_wallet_initiate
const addFundsToWallet = async (data) => {
  const url = apiUrl + '/api/v1/add_funds_to_wallet_initiate';
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

// change password

const changePassword = async (data) => {
  try {
    // const url = apiUrl + '/api/v1/user/change_password';
    const url = urls.auth.CHANGE_PASSWORD;
    const token = await getToken();
    console.log(url, token, data)
    const response = await axios.put(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const requestWithdrawal = async (data) => {
  try {
    const url = apiUrl + '/api/v1/users/withdrawal-request';
    console.log(url);

    const token = await getToken();
    console.log(token);

    console.log('data', data)
    const response = await axios.post(
      url,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    console.log('logged error',error.response.data)
    return error;
  }
};

// Verify Bills Payment
const verifyBillsTransactions = async (data) => {
  try {
    const url = apiUrl + '/api/v1/verify_bills_transactions';
    const token = await getToken();
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

// Verify Add funds to wallet
const verifyAddFundToWallet = async (data) => {
  const url = apiUrl + '/api/v1/verify_add_fund_to_wallet';
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

const getUserReferral = async () => {
  const url = apiUrl + '/api/v1/get_user_referrer';
  const token = await getToken();
  try {
    const response = await axios.get(url, {
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

const getInterestRate = async () => {
  const url = apiUrl + '/api/v1/get_interest_rate';
  const token = await getToken();
  try {
    const response = await axios.get(url, {
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

// change_savings_method
const changeSavingsMethod = async (data) => {
  const url = apiUrl + '/api/v1/change_savings_method';
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

// Verify wallet Transaction
const verifyWalletTransaction = async (data) => {
  const url =
    'https://kwaba-php-api-bpplt.ondigitalocean.app/api/verify_wallet_transaction';
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

// Savings Challenge
const joinSavingsChallenge = async (data) => {
  // const url = apiUrl + '/api/v1/user_join_savings_charledge';
  delete data.locked;
  const token = await getToken();
  console.log(token);
  console.log(data)
  try {
    const response = await axios.post(
      urls.savings.JOIN_CHALLENGE,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Move money to savings plan

const moveMoneyToSavingsPlan = async (data) => {
  const url = apiUrl + '/api/v1/move_savings_challenge';
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

// endpoint powered by Cobble
// test endpoints from cobble for credit score

const cobbleEndpoint = {
  test: 'https://cobblescore-test.herokuapp.com/integration',
  live: 'https://api.getcobble.net/integration',
};

const creditScorePurchase = async (data) => {
  const url = `${cobbleEndpoint.test}/purchase`;
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const creditScoreFetch = async (data) => {
  const url = `${cobbleEndpoint.test}/fetch`;
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};


const getCurrentApplication = async (data) => {
  const url = urls.applications.GET_CURRENT_APPLICATION
  const token = await getToken();
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};


const checkAppRelease = async () => {
  const url = urls.app.CHECK_RELEASE;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};


const getTransactionsHistory = async () => {
  const token = await getToken();
  const url = urls.payments.GET_PAYMENT_HISTORY;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};


const getUserWalletTransactionsAsync =  async () => {
  
    const token = await getToken();
    try {
      const response = await axios.get(
        urls.wallet.GET_USER_WALLET_TRANSACTIONS,
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
    
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
};
 

export const paystackBanks = async () => {
  const url = urls.app.CHECK_RELEASE;
  try {
    const banks = {
      "status": true,
      "message": "Banks retrieved",
      "data": [
          {
              "name": "Abbey Mortgage Bank",
              "slug": "abbey-mortgage-bank",
              "code": "801",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 174,
              "createdAt": "2020-12-07T16:19:09.000Z",
              "updatedAt": "2020-12-07T16:19:19.000Z"
          },
          {
              "name": "Above Only MFB",
              "slug": "above-only-mfb",
              "code": "51204",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 188,
              "createdAt": "2021-10-13T20:35:17.000Z",
              "updatedAt": "2021-10-13T20:35:17.000Z"
          },
          {
              "name": "Access Bank",
              "slug": "access-bank",
              "code": "044",
              "longcode": "044150149",
              "gateway": "emandate",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 1,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T08:06:44.000Z"
          },
          {
              "name": "Access Bank (Diamond)",
              "slug": "access-bank-diamond",
              "code": "063",
              "longcode": "063150162",
              "gateway": "emandate",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 3,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T08:06:48.000Z"
          },
          {
              "name": "ALAT by WEMA",
              "slug": "alat-by-wema",
              "code": "035A",
              "longcode": "035150103",
              "gateway": "emandate",
              "pay_with_bank": true,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 27,
              "createdAt": "2017-11-15T12:21:31.000Z",
              "updatedAt": "2021-02-18T14:55:34.000Z"
          },
          {
              "name": "Amju Unique MFB",
              "slug": "amju-unique-mfb",
              "code": "50926",
              "longcode": "511080896",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 179,
              "createdAt": "2021-07-07T13:45:57.000Z",
              "updatedAt": "2021-07-07T13:45:57.000Z"
          },
          {
              "name": "ASO Savings and Loans",
              "slug": "asosavings",
              "code": "401",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 63,
              "createdAt": "2018-09-23T05:52:38.000Z",
              "updatedAt": "2019-01-30T09:38:57.000Z"
          },
          {
              "name": "Bainescredit MFB",
              "slug": "bainescredit-mfb",
              "code": "51229",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 181,
              "createdAt": "2021-07-12T14:41:18.000Z",
              "updatedAt": "2021-07-12T14:41:18.000Z"
          },
          {
              "name": "Bowen Microfinance Bank",
              "slug": "bowen-microfinance-bank",
              "code": "50931",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 108,
              "createdAt": "2020-02-11T15:38:57.000Z",
              "updatedAt": "2020-02-11T15:38:57.000Z"
          },
          {
              "name": "Carbon",
              "slug": "carbon",
              "code": "565",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 82,
              "createdAt": "2020-06-16T08:15:31.000Z",
              "updatedAt": "2021-08-05T15:25:01.000Z"
          },
          {
              "name": "CEMCS Microfinance Bank",
              "slug": "cemcs-microfinance-bank",
              "code": "50823",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 74,
              "createdAt": "2020-03-23T15:06:13.000Z",
              "updatedAt": "2020-03-23T15:06:28.000Z"
          },
          {
              "name": "Chanelle Microfinance Bank Limited",
              "slug": "chanelle-microfinance-bank-limited-ng",
              "code": "50171",
              "longcode": "50171",
              "gateway": "",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 284,
              "createdAt": "2022-02-10T13:28:38.000Z",
              "updatedAt": "2022-02-10T13:28:38.000Z"
          },
          {
              "name": "Citibank Nigeria",
              "slug": "citibank-nigeria",
              "code": "023",
              "longcode": "023150005",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 2,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T20:24:02.000Z"
          },
          {
              "name": "Corestep MFB",
              "slug": "corestep-mfb",
              "code": "50204",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 283,
              "createdAt": "2022-02-09T14:33:06.000Z",
              "updatedAt": "2022-02-09T14:33:06.000Z"
          },
          {
              "name": "Coronation Merchant Bank",
              "slug": "coronation-merchant-bank",
              "code": "559",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 173,
              "createdAt": "2020-11-24T10:25:07.000Z",
              "updatedAt": "2020-11-24T10:25:07.000Z"
          },
          {
              "name": "Ecobank Nigeria",
              "slug": "ecobank-nigeria",
              "code": "050",
              "longcode": "050150010",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 4,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T20:23:53.000Z"
          },
          {
              "name": "Ekondo Microfinance Bank",
              "slug": "ekondo-microfinance-bank",
              "code": "562",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 64,
              "createdAt": "2018-09-23T05:55:06.000Z",
              "updatedAt": "2018-09-23T05:55:06.000Z"
          },
          {
              "name": "Eyowo",
              "slug": "eyowo",
              "code": "50126",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 167,
              "createdAt": "2020-09-07T13:52:22.000Z",
              "updatedAt": "2020-11-24T10:03:21.000Z"
          },
          {
              "name": "Fidelity Bank",
              "slug": "fidelity-bank",
              "code": "070",
              "longcode": "070150003",
              "gateway": "emandate",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 6,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2021-08-27T09:15:29.000Z"
          },
          {
              "name": "Firmus MFB",
              "slug": "firmus-mfb",
              "code": "51314",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 177,
              "createdAt": "2021-06-01T15:33:26.000Z",
              "updatedAt": "2021-06-01T15:33:26.000Z"
          },
          {
              "name": "First Bank of Nigeria",
              "slug": "first-bank-of-nigeria",
              "code": "011",
              "longcode": "011151003",
              "gateway": "ibank",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 7,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2021-03-25T14:22:52.000Z"
          },
          {
              "name": "First City Monument Bank",
              "slug": "first-city-monument-bank",
              "code": "214",
              "longcode": "214150018",
              "gateway": "emandate",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 8,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T08:06:46.000Z"
          },
          {
              "name": "FSDH Merchant Bank Limited",
              "slug": "fsdh-merchant-bank-limited",
              "code": "501",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 112,
              "createdAt": "2020-08-20T09:37:04.000Z",
              "updatedAt": "2020-11-24T10:03:22.000Z"
          },
          {
              "name": "Gateway Mortgage Bank LTD",
              "slug": "gateway-mortgage-bank",
              "code": "812",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 287,
              "createdAt": "2022-02-24T06:04:39.000Z",
              "updatedAt": "2022-02-24T06:04:39.000Z"
          },
          {
              "name": "Globus Bank",
              "slug": "globus-bank",
              "code": "00103",
              "longcode": "103015001",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 70,
              "createdAt": "2020-02-11T15:38:57.000Z",
              "updatedAt": "2020-02-11T15:38:57.000Z"
          },
          {
              "name": "GoMoney",
              "slug": "gomoney",
              "code": "100022",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 183,
              "createdAt": "2021-08-04T11:49:46.000Z",
              "updatedAt": "2021-11-12T13:32:14.000Z"
          },
          {
              "name": "Guaranty Trust Bank",
              "slug": "guaranty-trust-bank",
              "code": "058",
              "longcode": "058152036",
              "gateway": "ibank",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 9,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2022-05-11T15:47:54.000Z"
          },
          {
              "name": "Hackman Microfinance Bank",
              "slug": "hackman-microfinance-bank",
              "code": "51251",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 111,
              "createdAt": "2020-08-20T09:32:48.000Z",
              "updatedAt": "2020-11-24T10:03:24.000Z"
          },
          {
              "name": "Hasal Microfinance Bank",
              "slug": "hasal-microfinance-bank",
              "code": "50383",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 81,
              "createdAt": "2020-02-11T15:38:57.000Z",
              "updatedAt": "2020-02-11T15:38:57.000Z"
          },
          {
              "name": "Heritage Bank",
              "slug": "heritage-bank",
              "code": "030",
              "longcode": "030159992",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 10,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T20:24:23.000Z"
          },
          {
              "name": "Ibile Microfinance Bank",
              "slug": "ibile-mfb",
              "code": "51244",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 168,
              "createdAt": "2020-10-21T10:54:20.000Z",
              "updatedAt": "2020-10-21T10:54:33.000Z"
          },
          {
              "name": "Infinity MFB",
              "slug": "infinity-mfb",
              "code": "50457",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 172,
              "createdAt": "2020-11-24T10:23:37.000Z",
              "updatedAt": "2020-11-24T10:23:37.000Z"
          },
          {
              "name": "Jaiz Bank",
              "slug": "jaiz-bank",
              "code": "301",
              "longcode": "301080020",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 22,
              "createdAt": "2016-10-10T17:26:29.000Z",
              "updatedAt": "2016-10-10T17:26:29.000Z"
          },
          {
              "name": "Kadpoly MFB",
              "slug": "kadpoly-mfb",
              "code": "50502",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 187,
              "createdAt": "2021-09-27T11:59:42.000Z",
              "updatedAt": "2021-09-27T11:59:42.000Z"
          },
          {
              "name": "Keystone Bank",
              "slug": "keystone-bank",
              "code": "082",
              "longcode": "082150017",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 11,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T20:23:45.000Z"
          },
          {
              "name": "Kredi Money MFB LTD",
              "slug": "kredi-money-mfb",
              "code": "50200",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 184,
              "createdAt": "2021-08-11T09:54:03.000Z",
              "updatedAt": "2021-08-11T09:54:03.000Z"
          },
          {
              "name": "Kuda Bank",
              "slug": "kuda-bank",
              "code": "50211",
              "longcode": "",
              "gateway": "digitalbankmandate",
              "pay_with_bank": true,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 67,
              "createdAt": "2019-11-15T17:06:54.000Z",
              "updatedAt": "2022-04-08T17:07:53.000Z"
          },
          {
              "name": "Lagos Building Investment Company Plc.",
              "slug": "lbic-plc",
              "code": "90052",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 109,
              "createdAt": "2020-08-10T15:07:44.000Z",
              "updatedAt": "2020-08-10T15:07:44.000Z"
          },
          {
              "name": "Links MFB",
              "slug": "links-mfb",
              "code": "50549",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 180,
              "createdAt": "2021-07-12T14:41:18.000Z",
              "updatedAt": "2021-07-12T14:41:18.000Z"
          },
          {
              "name": "Lotus Bank",
              "slug": "lotus-bank",
              "code": "303",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 233,
              "createdAt": "2021-12-06T14:39:51.000Z",
              "updatedAt": "2021-12-06T14:39:51.000Z"
          },
          {
              "name": "Mayfair MFB",
              "slug": "mayfair-mfb",
              "code": "50563",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 175,
              "createdAt": "2021-02-02T08:28:38.000Z",
              "updatedAt": "2021-02-02T08:28:38.000Z"
          },
          {
              "name": "Mint MFB",
              "slug": "mint-mfb",
              "code": "50304",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 178,
              "createdAt": "2021-06-01T16:07:29.000Z",
              "updatedAt": "2021-06-01T16:07:29.000Z"
          },
          {
              "name": "Paga",
              "slug": "paga",
              "code": "100002",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 185,
              "createdAt": "2021-08-31T08:10:00.000Z",
              "updatedAt": "2021-08-31T08:10:00.000Z"
          },
          {
              "name": "PalmPay",
              "slug": "palmpay",
              "code": "999991",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 169,
              "createdAt": "2020-11-24T09:58:37.000Z",
              "updatedAt": "2020-11-24T10:03:19.000Z"
          },
          {
              "name": "Parallex Bank",
              "slug": "parallex-bank",
              "code": "104",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 26,
              "createdAt": "2017-03-31T13:54:29.000Z",
              "updatedAt": "2021-10-29T08:00:19.000Z"
          },
          {
              "name": "Parkway - ReadyCash",
              "slug": "parkway-ready-cash",
              "code": "311",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 110,
              "createdAt": "2020-08-10T15:07:44.000Z",
              "updatedAt": "2020-08-10T15:07:44.000Z"
          },
          {
              "name": "Paycom",
              "slug": "paycom",
              "code": "999992",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 171,
              "createdAt": "2020-11-24T10:20:45.000Z",
              "updatedAt": "2020-11-24T10:20:54.000Z"
          },
          {
              "name": "Petra Mircofinance Bank Plc",
              "slug": "petra-microfinance-bank-plc",
              "code": "50746",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 170,
              "createdAt": "2020-11-24T10:03:06.000Z",
              "updatedAt": "2020-11-24T10:03:06.000Z"
          },
          {
              "name": "Polaris Bank",
              "slug": "polaris-bank",
              "code": "076",
              "longcode": "076151006",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 13,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2016-07-14T10:04:29.000Z"
          },
          {
              "name": "Providus Bank",
              "slug": "providus-bank",
              "code": "101",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 25,
              "createdAt": "2017-03-27T16:09:29.000Z",
              "updatedAt": "2021-02-09T17:50:06.000Z"
          },
          {
              "name": "QuickFund MFB",
              "slug": "quickfund-mfb",
              "code": "51293",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 232,
              "createdAt": "2021-10-29T08:43:35.000Z",
              "updatedAt": "2021-10-29T08:43:35.000Z"
          },
          {
              "name": "Rand Merchant Bank",
              "slug": "rand-merchant-bank",
              "code": "502",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 176,
              "createdAt": "2021-02-11T17:33:20.000Z",
              "updatedAt": "2021-02-11T17:33:20.000Z"
          },
          {
              "name": "Rubies MFB",
              "slug": "rubies-mfb",
              "code": "125",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 69,
              "createdAt": "2020-01-25T09:49:59.000Z",
              "updatedAt": "2020-01-25T09:49:59.000Z"
          },
          {
              "name": "Safe Haven MFB",
              "slug": "safe-haven-mfb-ng",
              "code": "51113",
              "longcode": "51113",
              "gateway": "",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 286,
              "createdAt": "2022-02-18T13:11:59.000Z",
              "updatedAt": "2022-02-18T13:11:59.000Z"
          },
          {
              "name": "Sparkle Microfinance Bank",
              "slug": "sparkle-microfinance-bank",
              "code": "51310",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 72,
              "createdAt": "2020-02-11T18:43:14.000Z",
              "updatedAt": "2020-02-11T18:43:14.000Z"
          },
          {
              "name": "Stanbic IBTC Bank",
              "slug": "stanbic-ibtc-bank",
              "code": "221",
              "longcode": "221159522",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 14,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T20:24:17.000Z"
          },
          {
              "name": "Standard Chartered Bank",
              "slug": "standard-chartered-bank",
              "code": "068",
              "longcode": "068150015",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 15,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T20:23:40.000Z"
          },
          {
              "name": "Stellas MFB",
              "slug": "stellas-mfb",
              "code": "51253",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 285,
              "createdAt": "2022-02-17T14:54:01.000Z",
              "updatedAt": "2022-02-17T14:54:01.000Z"
          },
          {
              "name": "Sterling Bank",
              "slug": "sterling-bank",
              "code": "232",
              "longcode": "232150016",
              "gateway": "emandate",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 16,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2021-11-02T20:35:10.000Z"
          },
          {
              "name": "Suntrust Bank",
              "slug": "suntrust-bank",
              "code": "100",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 23,
              "createdAt": "2016-10-10T17:26:29.000Z",
              "updatedAt": "2016-10-10T17:26:29.000Z"
          },
          {
              "name": "TAJ Bank",
              "slug": "taj-bank",
              "code": "302",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 68,
              "createdAt": "2020-01-20T11:20:32.000Z",
              "updatedAt": "2020-01-20T11:20:32.000Z"
          },
          {
              "name": "Tangerine Money",
              "slug": "tangerine-money",
              "code": "51269",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 186,
              "createdAt": "2021-09-17T13:25:16.000Z",
              "updatedAt": "2021-09-17T13:25:16.000Z"
          },
          {
              "name": "TCF MFB",
              "slug": "tcf-mfb",
              "code": "51211",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 75,
              "createdAt": "2020-04-03T09:34:35.000Z",
              "updatedAt": "2020-04-03T09:34:35.000Z"
          },
          {
              "name": "Titan Bank",
              "slug": "titan-bank",
              "code": "102",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 73,
              "createdAt": "2020-03-10T11:41:36.000Z",
              "updatedAt": "2020-03-23T15:06:29.000Z"
          },
          {
              "name": "Unical MFB",
              "slug": "unical-mfb",
              "code": "50871",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 282,
              "createdAt": "2022-01-10T09:52:47.000Z",
              "updatedAt": "2022-01-10T09:52:47.000Z"
          },
          {
              "name": "Union Bank of Nigeria",
              "slug": "union-bank-of-nigeria",
              "code": "032",
              "longcode": "032080474",
              "gateway": "emandate",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 17,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2020-02-18T20:22:54.000Z"
          },
          {
              "name": "United Bank For Africa",
              "slug": "united-bank-for-africa",
              "code": "033",
              "longcode": "033153513",
              "gateway": "emandate",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 18,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2022-03-09T10:28:57.000Z"
          },
          {
              "name": "Unity Bank",
              "slug": "unity-bank",
              "code": "215",
              "longcode": "215154097",
              "gateway": "emandate",
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 19,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2019-07-22T12:44:02.000Z"
          },
          {
              "name": "VFD Microfinance Bank Limited",
              "slug": "vfd",
              "code": "566",
              "longcode": "",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": false,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 71,
              "createdAt": "2020-02-11T15:44:11.000Z",
              "updatedAt": "2020-10-28T09:42:08.000Z"
          },
          {
              "name": "Wema Bank",
              "slug": "wema-bank",
              "code": "035",
              "longcode": "035150103",
              "gateway": null,
              "pay_with_bank": false,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 20,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2021-02-09T17:49:59.000Z"
          },
          {
              "name": "Zenith Bank",
              "slug": "zenith-bank",
              "code": "057",
              "longcode": "057150013",
              "gateway": "emandate",
              "pay_with_bank": true,
              "active": true,
              "is_deleted": null,
              "country": "Nigeria",
              "currency": "NGN",
              "type": "nuban",
              "id": 21,
              "createdAt": "2016-07-14T10:04:29.000Z",
              "updatedAt": "2022-04-14T11:39:38.000Z"
          }
      ]
  }
    
    return banks;
  } catch (error) {
    return error;
  }
};


export {
  AcceptBuddyInvites,
  DeleteBuddyInvites,
  GetAllBuddyInvites,
  getInterestRateForSavingsAndBuddy,
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
  getOneLoan,
  getAllEmergencyLoansRepayment,
  getSingleEmergencyLoanRepayment,
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
  getUserSavingsWithParam,
  getOneUserSavings,
  getSavingsHistory,
  addFundsToSavings,
  verifySavingsPayment,
  acceptOffer,
  rejectOffer,
  sendBuddySavingsInvites,
  deleteBuddySavingsInvite,
  getOneUserBuddySavings,
  fetchUserBuddyInvites,
  fetchUserBuddyInviteData,
  AcceptBuddyInvite,
  BuyPurchaseAirtime,
  getAllBanks,
  getBillsCategory,
  addFundsToBuddySavings,
  buyOtherBills,
  setPin,
  enterPinToLogin,
  addFundsToWallet,
  changePassword,
  requestWithdrawal,
  verifyBillsTransactions,
  verifyAddFundToWallet,
  getUserReferral,
  getInterestRate,
  changeSavingsMethod,
  verifyWalletTransaction,
  joinSavingsChallenge,
  moveMoneyToSavingsPlan,
  creditScorePurchase,
  creditScoreFetch,
  completeSavingsPayment,
  checkAppRelease,
  getOneBuddy,
  updateUsersSavingsPlan,
  getCurrentApplication,
  getTransactionsHistory,
  getUserWalletTransactionsAsync
};
