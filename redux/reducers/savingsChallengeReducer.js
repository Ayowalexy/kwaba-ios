import * as types from '../actions/types';

export const getSavingsChallengeReducer = (state = [], action) => {
  switch (action.type) {
    case types.SAVINGS_CHALLENGE_LIST:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
