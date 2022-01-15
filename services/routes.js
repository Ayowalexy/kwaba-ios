const stageUrl = 'https://kwaba-main-api-2-cq4v8.ondigitalocean.app';
const liveUrl = 'https://kwaba-main-api-3-cp4jm.ondigitalocean.app';

const baseUrl = stageUrl;

const urls = {
  auth: {
    LOGIN: `${baseUrl}/api/v1/user/login`,
    REGISTER: `${baseUrl}/api/v1/user/register`,
    USER_SET_PIN: `${baseUrl}/api/v1/user/user_set_pin`,
    USER_LOGIN_VERIFY_PIN: `${baseUrl}/api/v1/user/user_login_verify_pin`,
    FORGORT_PASSWORD: `${baseUrl}/api/v1/user/forgot_password`,
  },

  savings: {
    USER_CREATE_SAVINGS: `${baseUrl}/api/v1/savings/user_create_savings`,
    GET_SINGLE_USER_SAVINGS: `${baseUrl}/api/v1/savings/get_user_savings`,
    ADD_PAYMENT_TO_SAVINGS: `${baseUrl}/api/v1/savings/add_payment_to_savings`,
    VERIFY_SAVINGS_PAYMENT: `${baseUrl}/api/v1/savings/verify_savings_payment`,
    GET_SAVINGS_PAYMENT_HISTOERY: `${baseUrl}/api/v1/savings/get_savings_payment_history`,
    GET_SAVINGS_INTEREST_RATE: `${baseUrl}/api/v1/savings/get_savings_interest`,
  },
};

export default urls;
