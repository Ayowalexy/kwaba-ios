import { EMERGENY_LOAN_TYPES } from "./emergency-loan.type";
import { createAction } from "../../createActions";


export const setEmergencyLoans = data =>
    createAction(EMERGENY_LOAN_TYPES.SET_EMERGENCY_LOAN, data)