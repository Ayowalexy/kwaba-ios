import { createSelector } from "reselect";

const walletBalance = state => state.wallet_balance;

export const selectWalletBalance = createSelector(
    [walletBalance],
    user => user.balance
)