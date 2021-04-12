import {emergencyLoanTypes} from '../actions/emergencyLoanActions';

const initialState = {
    loan_amount: "",
    loan_purpose: "",
    disbursement_account_name: "",
    disbursement_account_number: "",
    disbursement_account_bank: ""
};

export const applyForEmergencyLoanReducer = (state = initialState, action) => {
  switch (action.type) {
    case emergencyLoanTypes.SET_EMERGENCY_LOAN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setEmergencyLoanDataReducer = (state = [], action) => {
  switch (action.type) {
    case emergencyLoanTypes.GET_EMERGENCY_LOAN:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
