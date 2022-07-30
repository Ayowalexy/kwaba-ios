import { SAVINGS_CHALLENGE_TYPES } from "./savings-challenge.type";
import produce from "immer";


const INITIAL_STATE = {
    savings: []
}

const savingChellengeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SAVINGS_CHALLENGE_TYPES.ALL_SAVINGS_CHALLENGE:
            return {
                ...state,
                savings: action.payload
            }
        case SAVINGS_CHALLENGE_TYPES.SET_SAVINGS_CHELLENGE:
            return {
                ...state,
                savings: [...state.savings, action.payload]
            }
        case 'savings/UPDATE_SAVINGS_CHALLENGE':
            const _state = state.savings;
            const _savings = _state.map(e => {
                if(e.id == action.payload.id){
                    e.amount_saved = action.payload.amount_saved
                }
            })

            console.log('update'.repeat(220), _state)
            return {
                ...state,
                savings: _state
            }
        default: return state

    }
}

export default savingChellengeReducer