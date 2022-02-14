import * as types from '../actions/types';

export const getUserReferralsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_USER_REFERRAL:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
