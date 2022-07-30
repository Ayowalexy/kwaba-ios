import {combineReducers} from 'redux';
import {loginReducer, getUserReducer} from './userReducers';
import emergencyReducer from './store/emergency/emergency.reducer';
import {
  soloSavingReducer,
  getSoloSavingsReducer,
  getMaxLoanCapReducer,
  getBuddySavingsReducer,
  getOneBuddySavingsReducer,
  getOneSoloSavingsReducer,
  getOneSoloSavingsTransactionReducer,
  updateStateReducer,
} from './savingsReducer';

import walletReducer from './store/wallet/wallet.reducer';
import soloSavinsReducer_ from './store/solo-savings/soloSavingsReducer';
import buddySavingsReducer from './store/buddySavings/buddySavings.reducer';
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
import {
  getUserWalletReducer,
  getUserWalletTransactionsReducer,
  getPaymentHistoryReducer,
} from './walletReducer';

import {
  getSavingsChallengeReducer,
  getSavingsUnderChallengeReducer,
  getUserSavingsChallengeReducer,
  getOneUserSavingsChallengeReducer,
} from './savingsChallengeReducer';

import savingChellengeReducer from './store/savings-challenge/savings-challenge.reducer';

import stageReducer from './store/stageReducer';
import emergencyLoansReducer from './store/emergency-loan/emergency-loan.reducer'; 

import newSoloSavingsReducer from './store/solo-savings/solo-savings-reducer';
import buddySavinsReducer_ from './store/buddy-savings/buddy.savings.reducer';
import {stepsReducer} from './rnplReducer';
import {getUserReferralsReducer} from './referralReducer';

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
  getUserWalletReducer: getUserWalletReducer,
  getUserWalletTransactionsReducer: getUserWalletTransactionsReducer,
  getSavingsChallengeReducer: getSavingsChallengeReducer,
  getSavingsUnderChallengeReducer: getSavingsUnderChallengeReducer,
  getUserSavingsChallengeReducer: getUserSavingsChallengeReducer,
  getOneUserSavingsChallengeReducer: getOneUserSavingsChallengeReducer,
  stepsReducer: stepsReducer,
  getUserReferralsReducer: getUserReferralsReducer,
  getPaymentHistoryReducer: getPaymentHistoryReducer,
  updateStateReducer: updateStateReducer,
  stage: stageReducer,
  emergency: emergencyReducer,




  //NEW BUDDY STATE
  buddySavings: buddySavingsReducer,
  solo_savings: newSoloSavingsReducer,
  soloSavings: soloSavinsReducer_,
  buddy_savings: buddySavinsReducer_,
  savings_challenge: savingChellengeReducer,
  wallet_balance: walletReducer,
  emergency_loans: emergencyLoansReducer
});
