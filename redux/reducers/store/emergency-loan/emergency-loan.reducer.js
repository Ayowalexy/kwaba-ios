import { EMERGENY_LOAN_TYPES } from "./emergency-loan.type";
const INITIAL_STATE = {
    balance: 0
}

const emergencyLoansReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EMERGENY_LOAN_TYPES.SET_EMERGENCY_LOAN:
            return {
                ...state,
                balance: action.payload
            }
        default:  return state
    }
}

export default emergencyLoansReducer