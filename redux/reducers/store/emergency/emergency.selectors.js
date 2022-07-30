import { createSelector } from "reselect";

const emergencyLoan = state => state.emergency


export const selectEmergency = createSelector(
    [emergencyLoan],
    (emergency) => emergency.amount
)