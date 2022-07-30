import { BUDDY_SAVINS_NEW_TYPES  } from "./buddy-savings.types"
import { createAction } from "../../createActions"

export const setBuddySavings = data =>
    createAction(BUDDY_SAVINS_NEW_TYPES.SET_BUDDY_SAVINGS, data)

export const allBuddySavings = data =>
    createAction(BUDDY_SAVINS_NEW_TYPES.ALL_BUDDY_SAVINGS, data)

export const updateBuddy = data =>
    createAction(BUDDY_SAVINS_NEW_TYPES.UPDATE_BUDDY, data)