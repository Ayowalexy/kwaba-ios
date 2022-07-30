import { createSelector } from "reselect";


const savingsChallenege = state => state.savings_challenge;


export const selectAllUserSavingsChellange = createSelector(
    [savingsChallenege],
    user => user.savings
)