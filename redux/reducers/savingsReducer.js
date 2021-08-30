import {act} from 'react-test-renderer';
import * as types from '../actions/types';

const initialState = {
  savings_amount: null,
  instant_saved_amount: null,
  savings_frequency: '',
  savings_account_number: '',
  savings_account_name: '',
  savings_bank_code: '',
  savings_tenure: '',
  savings_title: '',
  savings_start_date: '',
  savings_end_date: '',
  locked: false,
};

export const soloSavingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SOLO_SAVING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const getSoloSavingsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_SOLO_SAVINGS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getMaxLoanCapReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_MAX_LOAN_CAP:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
