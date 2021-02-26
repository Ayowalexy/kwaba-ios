import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setSoloSaving = (savingsData) => {
  return {
    type: types.SOLO_SAVING,
    payload: savingsData,
  };
};

export const soloSaving = (savingInputs) => {
  return (dispatch) => {
    dispatch(setSoloSaving(savingInputs));
  };
};
