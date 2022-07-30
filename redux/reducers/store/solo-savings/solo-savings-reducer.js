import { SOLO_SAVINGS_TYPES } from "./solo-savings.types";
const INITIAL_STATE = {
    allSoloSavings: [],
    stats: {},
    allBuddySavings: [],
    allSavingsChallenge: []
}


const newSoloSavingsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SOLO_SAVINGS_TYPES.TOTAL_SAVINGS: 
            return {
                ...state,
                stats: action.payload
            }
        case SOLO_SAVINGS_TYPES.ALL_BUDDY_SAVINGS:
            return {
                ...state,
                allBuddySavings: action.payload
            }
        case SOLO_SAVINGS_TYPES.ALL_SAVINGS_CHALLENGE:
            return {
                ...state,
                allSavingsChallenge: action.payload
            }
     
        default: return state
    }
}

export default newSoloSavingsReducer