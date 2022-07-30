import { createSelector } from "reselect";


const buddies = state => state.buddy_savings;


export const selectBuddies = createSelector(
    [buddies],
    user => user.savings
)