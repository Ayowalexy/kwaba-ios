import { createAction } from '../../createActions'
import { WALLET_TYPES } from './wallet.type';


export const setWalletbalance = data =>
    createAction(WALLET_TYPES.SET_WALLET_BALANCE, data)