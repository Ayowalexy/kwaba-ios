import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

// GET BILLS SERVICES
export const setBillServices = (data) => {
  return {
    type: types.GET_BILLS_SERVICES,
    payload: data,
  };
};

export const getBillServices = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + '/api/v1/get_bills_services';
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      dispatch(setBillServices(response.data.data));
      // console.log('Redux Bills Res: ', response.data);
      // return response.data.userBanks;
    } catch (error) {
      return error;
    }
  };
};

// SET BILLS CATEGORY
export const setBillsCategory = (data) => {
  return {
    type: types.GET_BILLS_CATEGORY,
    payload: data,
  };
};

export const getBillsCategory = (serviceID) => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + `/api/v1/get_bills_category/${serviceID}`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'applictaion/json', Authorization: token},
      });
      dispatch(setBillsCategory(response.data.data));
      //   console.log('Category: ', response.data);
    } catch (error) {
      return error;
    }
  };
};

// SET AIRTiME BILLS TRANSACTION
export const setAirtimeBillTrans = (data) => {
  return {
    type: types.GET_AIRTIME_BILL_TRANS,
    payload: data,
  };
};

export const getAirtimeBillTrans = () => {
  return async (dispatch) => {
    const token = await getToken();
    const url = apiUrl + `/api/v1/get_airtime_bills_trans`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'applictaion/json', Authorization: token},
      });
      dispatch(setAirtimeBillTrans(response.data.data));
      // console.log('Airtime Bills Trans: ', response.data.data);
    } catch (error) {
      return error;
    }
  };
};
