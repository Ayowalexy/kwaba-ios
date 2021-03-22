import {combineReducers} from 'redux';
import {loginReducer, getUserReducer} from './userReducers';
import {soloSavingReducer, getSoloSavingsReducer} from './savingsReducer';
import fileProgressReducer from './documentUploadReducers';

export const rootReducer = combineReducers({
  loginReducer: loginReducer,
  soloSavingReducer: soloSavingReducer,
  getSoloSavingsReducer: getSoloSavingsReducer,
  getUserReducer: getUserReducer,
  fileProgressReducer: fileProgressReducer,
});
