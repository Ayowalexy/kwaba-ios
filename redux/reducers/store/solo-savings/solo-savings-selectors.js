import { createSelector } from "reselect";


const solo_savings = state => state.solo_savings;


export const selectAllSoloSavings = createSelector(
    [solo_savings],
    (savings) => savings.allSoloSavings
)

export const seletAllSavingsStats = createSelector(
    [solo_savings],
    user => user.stats
)

export const selectAllBuddySavings = createSelector(
    [solo_savings],
    savings => savings.allBuddySavings
)

export const selectAllSavingsChallenge = createSelector(
    [solo_savings],
    savings => savings.allSavingsChallenge
)



const solo_ = state => state.soloSavings;


export const selectSolo = createSelector(
    [solo_],
    user => user.savings
)