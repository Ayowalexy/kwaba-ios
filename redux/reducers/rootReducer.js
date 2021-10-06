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
import businessFileUploadReducer from './businessdocumentUploadReducers';
import {applyForEmergencyLoanReducer} from './emergencyLoanReducer';
import {getBankAccountsReducer, getBankFromStorageReducer} from './bankReducer';
import {
  getBillServicesReducer,
  getBillCategoryReducer,
  getAirtimeBillTransReducer,
  getAirtimeReducer,
} from './billReducer';

export const rootReducer = combineReducers({
  loginReducer: loginReducer,
  soloSavingReducer: soloSavingReducer,
  getSoloSavingsReducer: getSoloSavingsReducer,
  getUserReducer: getUserReducer,
  fileUploadReducer: fileUploadReducer,
  businessFileUploadReducer: businessFileUploadReducer,
  applyForEmergencyLoanReducer: applyForEmergencyLoanReducer,
  getMaxLoanCapReducer: getMaxLoanCapReducer,
  getBuddySavingsReducer: getBuddySavingsReducer,
  getOneBuddySavingsReducer: getOneBuddySavingsReducer,
  getOneSoloSavingsReducer: getOneSoloSavingsReducer,
  getOneSoloSavingsTransactionReducer: getOneSoloSavingsTransactionReducer,
  getBankAccountsReducer: getBankAccountsReducer,
  getBankFromStorageReducer: getBankFromStorageReducer,
  getBillServicesReducer: getBillServicesReducer,
  getBillCategoryReducer: getBillCategoryReducer,
  getAirtimeBillTransReducer: getAirtimeBillTransReducer,
  getAirtimeReducer: getAirtimeReducer,
});
