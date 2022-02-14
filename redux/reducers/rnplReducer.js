import AsyncStorage from '@react-native-async-storage/async-storage';
import * as types from '../actions/types';

export const initalState = [
  {
    title: 'Credit score',
    status: 'complete',
    id: 1,
  },
  {
    title: 'Applications',
    status: 'start',
    id: 2,
  },
  {
    title: 'Documents upload',
    status: 'locked',
    id: 3,
  },
  {
    title: 'Offer approval breakdown',
    status: 'locked',
    id: 4,
  },
  {
    title: 'Property details',
    status: 'locked',
    id: 5,
  },
  {
    title: 'Address verification',
    status: 'locked',
    id: 6,
  },
  {
    title: 'Direct debit',
    status: 'locked',
    id: 7,
  },
  {
    title: 'Disbursement',
    status: 'locked',
    id: 8,
  },
];

export const stepsReducer = async (state = [], action) => {
  //   console.log('The action: ', action);
  switch (action.type) {
    case types.RNPL_STEPS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
