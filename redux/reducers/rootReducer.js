import {combineReducers} from 'redux';
import {loginReducer} from './userReducers';
import {soloSavingReducer} from './savingsReducer';

export const rootReducer = combineReducers({
  loginReducer: loginReducer,
  soloSavingReducer: soloSavingReducer,
});
