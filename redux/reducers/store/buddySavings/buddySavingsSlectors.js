import { createSelector } from "reselect";

const Buddysavings = state => state.buddySavings;


export const selectBuddySavings = createSelector(
    [Buddysavings],
    (savings) => savings.buddy_savings
)