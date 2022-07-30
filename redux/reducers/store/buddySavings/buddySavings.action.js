import { createAction } from '../../createActions';
import { BUDDY_SAVINGS_TYPE } from './buddySavings.type';

export const createABuddySavingsActions = data =>
    createAction(BUDDY_SAVINGS_TYPE.CREATE_NEW_BUDDY_SAVINGS, data)

