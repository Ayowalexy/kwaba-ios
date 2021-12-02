import {act} from 'react-test-renderer';
import * as types from '../actions/types';

export const getUserWalletReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_USER_WALLET:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getUserWalletTransactionsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_USER_WALLET_TRANSACTIONS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
