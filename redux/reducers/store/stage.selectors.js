import { createSelector } from 'reselect'

const selectStage = state => state.stage

export const selectCurrentStage = createSelector(
    [selectStage],
    stage => stage.stages
)