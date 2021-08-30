import {combineReducers} from 'redux';
import {loginReducer, getUserReducer} from './userReducers';
import {
  soloSavingReducer,
  getSoloSavingsReducer,
  getMaxLoanCapReducer,
} from './savingsReducer';
import fileUploadReducer from './documentUploadReducers';
import {applyForEmergencyLoanReducer} from './emergencyLoanReducer';

export const rootReducer = combineReducers({
  loginReducer: loginReducer,
  soloSavingReducer: soloSavingReducer,
  getSoloSavingsReducer: getSoloSavingsReducer,
  getUserReducer: getUserReducer,
  fileUploadReducer: fileUploadReducer,
  applyForEmergencyLoanReducer: applyForEmergencyLoanReducer,
  getMaxLoanCapReducer: getMaxLoanCapReducer,
});
