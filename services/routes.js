const kwaba = {
  staging: 'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1',
  live: 'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1',
};

const cobble = {
  test: 'https://cobblescore-test.herokuapp.com/integration',
  live: 'https://api.getcobble.net/integration',
};

// export const baseUrl = kwaba.live;
export const baseUrl = kwaba.staging;



const urls = {
  auth: {
    LOGIN: `${baseUrl}/users/login`,
    REGISTER: `${baseUrl}/users/register`,
    USER_SET_PIN: `${baseUrl}/users/set-pin`,
    USER_LOGIN_VERIFY_PIN: `${baseUrl}/users/verify-pin`,
    FORGORT_PASSWORD: `${baseUrl}/users/forgot-password`,
    ME: `${baseUrl}/users/me`,
    COMPLETE_PROFILE: `${baseUrl}/users/update-profile`,
    SEND_EMAIL_VERIFICATION: `${baseUrl}/users/send-email-verification`,
    REFERRALS: `${baseUrl}/users/referrals`,
    CHANGE_PASSWORD: `${baseUrl}/user/change_password`,
  },

  savings: {
    USER_CREATE_SAVINGS: `${baseUrl}/savings/create-user-savings`,
    GET_ALL_USER_SAVINGS: `${baseUrl}/savings/get-all-user-savings`,
    ADD_PAYMENT_TO_SAVINGS: `${baseUrl}/savings/add-payment-to-savings`,
    GET_SAVINGS_INTEREST_RATE: `${baseUrl}/savings/get-savings-interest`,
    GET_TOTAL_USER_SAVINGS_AMOUNT: `${baseUrl}/savings/get-total-user-savings-amount`,

    // Payments
    // COMPLETE_PAYMENT: `${baseUrl}/payments/complete-payment`,
    // VERIFY_PAYMENT: `${baseUrl}/payments/verify-payment-request`,
    COMPLETE_PAYMENT: `${baseUrl}/payments/complete`,
    VERIFY_PAYMENT: `${baseUrl}/payments/verify`,
    GET_SAVINGS_PAYMENT_HISTORY: `${baseUrl}/payments/get-savings-payment-history`,

    // Savings Challenge
    CREATE_SAVINGS_CHALLENGE: `${baseUrl}/savings/challenges/create-savings-challenge`,
    // JOIN_CHALLENGE: `${baseUrl}/savings/challenges/join-challenge`,
    JOIN_CHALLENGE: `${baseUrl}/savings/challenges/join`,
    GET_CHALLENGE_BY_ID: `${baseUrl}/savings/challenges/get-all-challenges/`,
    // GET_ALL_CHALLENGES: `${baseUrl}/savings/challenges/get-all-challenges`,
    GET_ALL_CHALLENGES: `${baseUrl}/savings/challenges/`,

    //USER SAVINGS PLAN, MANUAL OR AUTOMATIC
    UPDATE_USERS_SAVINGS_PLAN: `${baseUrl}/savings/update-user-savings`,

    //Interest rate for savings(Both Savings Challenge and Buddy savings)

    GET_INTEREST_RATE_SAVINGS_AND_BUDDY: `${baseUrl}/system/rates`,

    // Buddy savings
    // CREATE_BUDDY_SAVINGS: `${baseUrl}/savings/buddy/create-buddy-savings`,
    CREATE_BUDDY_SAVINGS: `${baseUrl}/savings/buddy/`,
    UPDATE_BUDDY_SAVINGS: `${baseUrl}/savings/buddy/update-buddy-savings`,
    DASHBOARD: `${baseUrl}/savings/buddy/dashboard`, // /:id
    GET_BUDDIES: `${baseUrl}/savings/buddy/get-buddies`, // /:id
    UPDATE_BUDDY: `${baseUrl}/savings/buddy/update-buddy`,
    // INVITE_BUDDY: `${baseUrl}/savings/buddy/invite-buddy`,
    INVITE_BUDDY: `${baseUrl}/savings/buddy/invite`,
    ACCEPT_BUDDY_INVITE: `${baseUrl}/savings/buddy/join`,
    GET_USER_BUDDY_INVITES: `${baseUrl}/savings/buddy/get-user-buddy-invites`,
    DELETE_INVITE: `${baseUrl} /savings/buddy/deleteInvite/`,
    GET_ALL_BUDDY_INVITES: `${baseUrl}/savings/buddy/invite`,
  },

  wallet: {
    GET_USER_WALLET_TRANSACTIONS: `${baseUrl}/wallets/get-user-wallet-transactions`,
  },

  payments: {
    TOKENIZED_CARDS: `${baseUrl}/payments/get-tokenized-cards`,
    EMERGENCY_FUNDS_GET_REPAYMENT: `${baseUrl}/payments/get-repayments`,
    GET_PAYMENT_HISTORY: `${baseUrl}/payments/get-payment-history`,
  },

  applications: {
    NEW_APPLICATION: `${baseUrl}/application/new`,
    UPLOAD_BANK_STATEMENT: `${baseUrl}/application/bank_statement`,
    ACCEPT_OFFER: `${baseUrl}/application/accept_offer`,
    GET_CURRENT_APPLICATION: `${baseUrl}/application/one`,
    UPLOAD_DOCUMENTS: `${baseUrl}/application/documents/upload`,
    GET_DOCUMENTS: `${baseUrl}/application/documents`,
    DELETE_APPLICATION_DOCUMENT: `${baseUrl}/application/document/delete`,
    ADD_LANDLORD_AND_PROPERTY_DETAILS: `${baseUrl}/application/update/landlord_and_property`,
    REJECT_OFFER: `${baseUrl}/application/reject`,
    ADD_REFEREE_DETAILS: `${baseUrl}/application/update/referee`,
    UPDATE_REMITA_DETAILS: `${baseUrl}/user/update/remita_details`,
    ADD_REMITA_DIRECT_DEBIT: `${baseUrl}/application/update/remita_link`,
    LINK_CUSTOMERS_BANK_ACCOUNT: `${baseUrl}/application/link_account`,
    INITIALIZE_OKRA_DIRECT_DEBIT: `${baseUrl}/application/direct_debit`,
    VERIFY_REPAYMENT: `${baseUrl}/application/repayment/verify`,
  },

  creditScore: {
    PURCHASE: `${cobble.test}/purchase`,
    FETCH: `${cobble.test}/fetch`,
  },

  emergencyfunds: {
    APPLY: `${baseUrl}/emergency-loans/apply`,
    GET_LOANS: `${baseUrl}/loans/get-loans`,
  },

  bills: {
    GET_BILLS_SERVICES: `${baseUrl}/bills/get-bills-services`,
    GET_BILLS_CATEGORY: `${baseUrl}/bills/get-bills-category`,
    GET_BILLS_ITEMS: `${baseUrl}/bills/get-bills-items`,
    GET_AIRTIME_BILLS: `${baseUrl}/bills/get-airtime-bills`,
  },

  // buddySavings: {
  //   CREATE_BUDDY_SAVINGS: `${baseUrl}/savings/buddy/create-buddy-savings`,
  //   UPDATE_BUDDY_SAVINGS: `${baseUrl}/savings/buddy/update-buddy-savings`,
  //   DASHBOARD: `${baseUrl}/savings/buddy/dashboard`, // /:id
  //   GET_BUDDIES: `${baseUrl}/savings/buddy/get-buddies`, // /:id
  //   UPDATE_BUDDY: `${baseUrl}/savings/buddy/update-buddy`,
  //   INVITE_BUDDY: `${baseUrl}/savings/buddy/invite-buddy`,
  //   ACCEPT_BUDDY_INVITE: `${baseUrl}/savings/buddy/accept-buddy-invite`,
  //   GET_USER_BUDDY_INVITES: `${baseUrl}/savings/buddy/get-user-buddy-invites`,
  //   DELETE_INVITE: `${baseUrl} /savings/buddy/deleteInvite/`,
  // },

  app: {
    CHECK_RELEASE: `${baseUrl}/stable-front-end-version`,
  },
};

export default urls;
