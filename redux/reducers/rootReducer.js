import {combineReducers} from 'redux';
import {loginReducer, getUserReducer} from './userReducers';
import {
  soloSavingReducer,
  getSoloSavingsReducer,
  getMaxLoanCapReducer,
  getBuddySavingsReducer,
  getOneBuddySavingsReducer,
  getOneSoloSavingsReducer,
  getOneSoloSavingsTransactionReducer,
} from './savingsReducer';
import fileUploadReducer from './documentUploadReducers';
import {applyForEmergencyLoanReducer} from './emergencyLoanReducer';
import {getBankAccountsReducer, getBankFromStorageReducer} from './bankReducer';

export const rootReducer = combineReducers({
  loginReducer: loginReducer,
  soloSavingReducer: soloSavingReducer,
  getSoloSavingsReducer: getSoloSavingsReducer,
  getUserReducer: getUserReducer,
  fileUploadReducer: fileUploadReducer,
  applyForEmergencyLoanReducer: applyForEmergencyLoanReducer,
  getMaxLoanCapReducer: getMaxLoanCapReducer,
  getBuddySavingsReducer: getBuddySavingsReducer,
  getOneBuddySavingsReducer: getOneBuddySavingsReducer,
  getOneSoloSavingsReducer: getOneSoloSavingsReducer,
  getOneSoloSavingsTransactionReducer: getOneSoloSavingsTransactionReducer,
  getBankAccountsReducer: getBankAccountsReducer,
  getBankFromStorageReducer: getBankFromStorageReducer,
});
