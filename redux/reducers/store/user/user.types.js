import { getAllUserSolosavings } from "../../../../services/networt_2"
import { createAction } from "../../createActions"
import { setAllSoloSavings } from "../solo-savings/solo-savings.actions"
import { getAllUserSavingsStats } from "../../../../services/networt_2"
import { setSavingsStats } from "../solo-savings/solo-savings.actions"
import { getAllUserBuddySavings } from "../../../../services/networt_2"
import { setAllBuddySavings } from "../solo-savings/solo-savings.actions"
import { setAllSavingsChallenge } from "../solo-savings/solo-savings.actions"
import { allSoloSavings } from "../solo-savings/solo-savings.actions"
import { allBuddySavings } from "../buddy-savings/buddy-savings.actions"
import { getAllUserSavingsChallenge } from "../savings-challenge/savings-challenge.action"
import { setWalletbalance } from "../wallet/wallet.actions"
import { setEmergencyLoans } from "../emergency-loan/emergency-loans.action"

export const USER_LOGIN_ACTIONS = {
    LOGIN_ACTIONS: 'user/LOGIN_ACTIONS'
}

export const setCurrentUser = data =>
    createAction(USER_LOGIN_ACTIONS.LOGIN_ACTIONS, data)

export const setCurrentUserUserActionAsync = () => {
    return async (dispatch) => {
        try {
            const response = await getAllUserSolosavings()
            const stats = await getAllUserSavingsStats()
            const buddy = await getAllUserBuddySavings()
            const savingsChallenge = response.filter(
                element => element.savings_type == 'savings_challenge'
            )

            console.log('All data', stats)
            // dispatch(setAllBuddySavings(buddy))
            dispatch(setSavingsStats(stats))
            // dispatch(setAllSoloSavings(response))
            // dispatch(setAllSavingsChallenge(savingsChallenge))

            dispatch(setEmergencyLoans(stats?.emergency_loan_amount_to_repay || 0))
            dispatch(allSoloSavings(response))
            dispatch(allBuddySavings(buddy))
            dispatch(setWalletbalance(stats?.wallet_available_balance))
            dispatch(getAllUserSavingsChallenge(savingsChallenge))
        } catch (e) {
            console.log(e)
        }
    }
}
