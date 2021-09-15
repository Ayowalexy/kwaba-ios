import * as types from '../actions/types';

export const getBillServicesReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_BILLS_SERVICES:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getBillCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_BILLS_CATEGORY:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getAirtimeBillTransReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_AIRTIME_BILL_TRANS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
