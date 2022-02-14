const stageUrl = 'https://kwaba-main-api-2-cq4v8.ondigitalocean.app';
const liveUrl = 'https://kwaba-main-api-3-cp4jm.ondigitalocean.app';
const localUrl = 'http://localhost:9000'

const baseUrl = localUrl;

const urls = {
  // For live
  // auth: {
  //   LOGIN: `${baseUrl}/api/v1/user/login`,
  //   REGISTER: `${baseUrl}/api/v1/user/register`,
  //   USER_SET_PIN: `${baseUrl}/api/v1/user/user_set_pin`,
  //   USER_LOGIN_VERIFY_PIN: `${baseUrl}/api/v1/user/user_login_verify_pin`,
  //   FORGORT_PASSWORD: `${baseUrl}/api/v1/user/forgot_password`,
  // },

  auth: {
    LOGIN: `${baseUrl}/api/v1/users/login`,
    REGISTER: `${baseUrl}/api/v1/users/register`,
    USER_SET_PIN: `${baseUrl}/api/v1/users/set-pin`,
    USER_LOGIN_VERIFY_PIN: `${baseUrl}/api/v1/users/verify-pin`,
    FORGORT_PASSWORD: `${baseUrl}/api/v1/users/forgot-password`,
  },

  savings: {
    USER_CREATE_SAVINGS: `${baseUrl}/api/v1/savings/user-create-savings`,
    GET_ALL_USER_SAVINGS: `${baseUrl}/api/v1/savings/get-all-user-savings`,
    ADD_PAYMENT_TO_SAVINGS: `${baseUrl}/api/v1/savings/add-payment-to-savings`,
    GET_SAVINGS_PAYMENT_HISTORY: `${baseUrl}/api/v1/savings/get-savings-payment-history`,
    GET_SAVINGS_INTEREST_RATE: `${baseUrl}/api/v1/savings/get-savings-interest`,

    VERIFY_SAVINGS_PAYMENT: `${baseUrl}/api/v1/payments/verify-payment-request`,
    COMPLETE_SAVINGS_PAYMENT: `${baseUrl}/api/v1/payments/complete-payment`,
    GET_TOTAL_USER_SAVINGS_AMOUNT: `${baseUrl}/api/v1/savings/get-total-user-savings-amount`,
  },
};

export default urls;
