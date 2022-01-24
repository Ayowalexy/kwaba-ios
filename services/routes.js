const stageUrl = 'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1';
const liveUrl = 'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1';

const baseUrl = stageUrl;

const urls = {
  // For live
  // auth: {
  //   LOGIN: `${baseUrl}/user/login`,
  //   REGISTER: `${baseUrl}/user/register`,
  //   USER_SET_PIN: `${baseUrl}/user/user_set_pin`,
  //   USER_LOGIN_VERIFY_PIN: `${baseUrl}/user/user_login_verify_pin`,
  //   FORGORT_PASSWORD: `${baseUrl}/user/forgot_password`,
  // },

  auth: {
    LOGIN: `${baseUrl}/users/login`,
    REGISTER: `${baseUrl}/users/register`,
    USER_SET_PIN: `${baseUrl}/users/set-pin`,
    USER_LOGIN_VERIFY_PIN: `${baseUrl}/users/verify-pin`,
    FORGORT_PASSWORD: `${baseUrl}/users/forgot-password`,
    ME: `${baseUrl}/users/me`,
    COMPLETE_PROFILE: `${baseUrl}/users/update-profile`,
  },

  savings: {
    USER_CREATE_SAVINGS: `${baseUrl}/savings/user-create-savings`,
    GET_ALL_USER_SAVINGS: `${baseUrl}/savings/get-all-user-savings`,
    ADD_PAYMENT_TO_SAVINGS: `${baseUrl}/savings/add-payment-to-savings`,
    GET_SAVINGS_INTEREST_RATE: `${baseUrl}/savings/get-savings-interest`,
    GET_TOTAL_USER_SAVINGS_AMOUNT: `${baseUrl}/savings/get-total-user-savings-amount`,

    COMPLETE_SAVINGS_PAYMENT: `${baseUrl}/payments/complete-payment`,
    VERIFY_SAVINGS_PAYMENT: `${baseUrl}/payments/verify-payment-request`,
    GET_SAVINGS_PAYMENT_HISTORY: `${baseUrl}/payments/get-savings-payment-history`,
  },

  wallet: {
    GET_USER_WALLET_TRANSACTIONS: `${baseUrl}/wallets/get-user-wallet-transactions`,
  },
};

export default urls;
