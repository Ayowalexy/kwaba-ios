import { BUDDY_SAVINGS_TYPE } from "./buddySavings.type"

const INITIAL_STATE = {
    buddy_savings: []
}


const buddySavingsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case BUDDY_SAVINGS_TYPE.CREATE_NEW_BUDDY_SAVINGS:
            return {
                ...state,
                buddy_savings: [...state.buddy_savings, action.payload]
            }
        default: return state
    }
}

export default buddySavingsReducer