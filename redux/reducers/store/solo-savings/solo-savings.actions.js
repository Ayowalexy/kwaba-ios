import { createAction } from "../../createActions";
import { SOLO_SAVINGS_TYPES } from "./solo-savings.types";




export const setAllSoloSavings = (data) =>
    createAction('', data)

export const setAllBuddySavings = (data) =>
    createAction(SOLO_SAVINGS_TYPES.ALL_BUDDY_SAVINGS, data)

export const setAllSavingsChallenge = data =>
    createAction(SOLO_SAVINGS_TYPES.ALL_SAVINGS_CHALLENGE, data)

export const setSavingsStats = (data) =>
    createAction(SOLO_SAVINGS_TYPES.TOTAL_SAVINGS, data)


export const setSoloSavings = data =>
    createAction(SOLO_SAVINGS_TYPES.SET_SOLO_SAVINGS, data)

export const allSoloSavings = data =>
    createAction(SOLO_SAVINGS_TYPES.ALL_SOLO_SAVINGS, data)

export const updateSavings = data =>
    createAction(SOLO_SAVINGS_TYPES.UPDATE_SAVINGS, data)