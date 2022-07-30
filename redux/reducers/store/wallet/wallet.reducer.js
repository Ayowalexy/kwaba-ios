import { WALLET_TYPES } from "./wallet.type";
const INITIAL_STATE = {
    balance: 0
}
const walletReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case WALLET_TYPES.SET_WALLET_BALANCE:
            return {
                ...state,
                balance: action.payload
            }
        default: return state
    }
}


export default walletReducer