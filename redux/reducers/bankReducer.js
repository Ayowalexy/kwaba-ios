import * as types from '../actions/types';

export const getBankAccountsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_BANK_ACCOUNTS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getBankFromStorageReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_BANK_FROM_STORAGE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
