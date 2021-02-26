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
        // savings_amount: action.payload.savings_amount,
        // instant_saved_amount: action.payload.instant_saved_amount,
        // savings_frequency: action.payload.savings_frequency,
        // savings_account_number: action.payload.savings_account_number,
        // savings_account_name: action.payload.savings_account_name,
        // savings_bank_code: action.payload.savings_bank_code,
        // savings_tenure: action.payload.savings_tenure,
        // savings_title: action.payload.savings_title,
        // savings_start_date: action.payload.savings_start_date,
        // savings_end_date: action.payload.savings_end_date,
        // locked: action.payload.locked,
      };
    default:
      return state;
  }
};
