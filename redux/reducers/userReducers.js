import * as types from '../actions/types';

const initialLoginState = {
  isLoggedIn: false,
  username: '',
  token: '',
};

export const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: action.payload.isLoggedIn,
        username: action.payload.username,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_CURRENT_USER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
