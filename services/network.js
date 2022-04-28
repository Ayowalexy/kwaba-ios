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
  try {
    const response = await axios.post(urls.auth.LOGIN, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json'},
    });
    return response;
  } catch (error) {
    return error.message;
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
  const url = apiUrl + '/api/v1/paycardtokenize';
  const token = await getToken();

  try {
    // const response = await axios.post(url, JSON.stringify(data), {
      const response = await axios.post(
        urls.savings.VERIFY_PAYMENT,
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
  console.log(token);
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
    return error;
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
    return error;
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
  const url = apiUrl + `/api/v1/buy_other_bills`;
  try {
    const response = await axios.post(url, data, {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
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
    const response = await axios.put(url, JSON.stringify(data), {
      headers: {'Content-Type': 'application/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

const requestWithdrawal = async (data) => {
  try {
    const url = apiUrl + '/api/v1/users/withdrawal-request';
    console.log(url);

    const token = await getToken();
    console.log(token);

    const response = await axios.post(
      url,
      JSON.stringify({...data, source: data.option}),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
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
  updateUsersSavingsPlan
};
