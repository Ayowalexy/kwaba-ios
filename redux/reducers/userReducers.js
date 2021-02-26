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
        isLoggedIn: true,
        username: action.payload.username,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
