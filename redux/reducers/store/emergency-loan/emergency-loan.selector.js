import { createSelector } from "reselect";

const emergency = state => state.emergency_loans;

export const selectEmergencyLoans = createSelector(
    [emergency],
    user => user.balance
)