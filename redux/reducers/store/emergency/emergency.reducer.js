import { EMERGENCY_TYPE } from "./emergency.type";
const INITIAL_STATE = {
    amount: 0
}

const emergencyReducer = (state = INITIAL_STATE, action) => {
    switch(action){
        case EMERGENCY_TYPE.SET_AMOUNT:
            return {
                ...state,
                amount: action.payload
            }
        default: return state
    }
}

export default emergencyReducer