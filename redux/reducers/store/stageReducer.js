import { STAGE_TYPES } from "./stageTypes"

const INITIAL_STATE = {
    stages : [
        {
          title: 'Credit score',
          subTitle: '',
          status: 'complete',
        },
        {
          title: 'Applications',
          subTitle: '',
          status: 'start',
        },
        {
          title: 'Documents upload',
          subTitle: '',
          status: 'locked',
        },
        {
          title: 'Offer approval breakdown',
          subTitle: '',
          status: 'locked',
        },
        {
          title: 'Property details',
          subTitle: '',
          status: 'locked',
        }
      ]      
}


const stageReducer = (state =INITIAL_STATE, action) => {
    switch(action.type){
        case STAGE_TYPES.SET_CURRENT_STAGE:
            return {
                ...state,
                stages: action.payload
            }
        default: return state
    }
}

export default stageReducer