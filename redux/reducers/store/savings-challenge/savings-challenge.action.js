import { createAction } from "../../createActions";
import { SAVINGS_CHALLENGE_TYPES } from "./savings-challenge.type";


export const getAllUserSavingsChallenge = data =>
    createAction(SAVINGS_CHALLENGE_TYPES.ALL_SAVINGS_CHALLENGE, data)


export const setUserSavingsChallenge = data =>
    createAction(SAVINGS_CHALLENGE_TYPES.SET_SAVINGS_CHELLENGE, data)


export const updateSavingsChallange = data =>
    createAction('savings/UPDATE_SAVINGS_CHALLENGE', data)