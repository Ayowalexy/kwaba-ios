import { BUDDY_SAVINS_NEW_TYPES } from "./buddy-savings.types"
const INITIAL_STATE = {
    savings: []
}


const buddySavinsReducer_ = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case BUDDY_SAVINS_NEW_TYPES.ALL_BUDDY_SAVINGS:
            return {
                ...state,
                savings: action.payload
            }
        case BUDDY_SAVINS_NEW_TYPES.SET_BUDDY_SAVINGS:
            return {
                ...state,
                savings: [...state.savings, action.payload]
            }
        case BUDDY_SAVINS_NEW_TYPES.UPDATE_BUDDY:
            const _state = state.savings;
            const _savings = _state.map(e => {
                if(e.id == action.payload.id){
                    e.amount_saved = action.payload.amount_saved
                }
            })

            console.log('*'.repeat(30), _state)
            return {
                ...state,
                savings: _state
            }
        default: return state
    }
}

export default buddySavinsReducer_