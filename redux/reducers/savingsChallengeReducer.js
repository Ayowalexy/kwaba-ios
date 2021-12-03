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

export const getSavingsUnderChallengeReducer = (state = [], action) => {
  switch (action.type) {
    case types.SAVINGS_UNDER_CHALLENGE_LIST:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getUserSavingsChallengeReducer = (state = [], action) => {
  switch (action.type) {
    case types.USER_SAVINGS_CHALLENGE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getOneUserSavingsChallengeReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_ONE_USER_SAVINGS_CHALLENGE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
