import { SOLO_SAVINGS_TYPES } from "./solo-savings.types"

const INITIAL_STATE = {
    savings: []
}


const soloSavinsReducer_ = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SOLO_SAVINGS_TYPES.ALL_SOLO_SAVINGS:
            return {
                ...state,
                savings: action.payload
            }
        case SOLO_SAVINGS_TYPES.SET_SOLO_SAVINGS:
            return {
                ...state,
                savings: [...state.savings, action.payload]
            }
        case SOLO_SAVINGS_TYPES.UPDATE_SAVINGS:
            const _state = state.savings;
            const _savings = _state.map(e => {
                if(e.id == action.payload.id){
                    e.amount_saved = action.payload.amount_saved
                }
            })
          
            return {
                ...state,
                savings: _state
            }
        default: return state
    }
}

export default soloSavinsReducer_