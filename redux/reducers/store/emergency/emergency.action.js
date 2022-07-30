import { createAction } from "../../createActions";
import { EMERGENCY_TYPE } from "./emergency.type";


export const getEmergencyAmount = () =>
    createAction(EMERGENCY_TYPE.GET_AMOUNT)


export const setEmergencyAmount = (amount) => 
    createAction(EMERGENCY_TYPE.SET_AMOUNT, amount)


