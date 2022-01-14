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

  savings: {},
};

export default urls;
