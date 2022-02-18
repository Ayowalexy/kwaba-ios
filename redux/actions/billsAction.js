import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import urls from '../../services/routes';

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
    // const url = apiUrl + '/api/v1/get_bills_services';
    const url = urls.bills.GET_BILLS_SERVICES;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      console.log('The Res: ', response.data);
      dispatch(setBillServices(response.data.data));
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

// SET AIRTIME
export const setAirtime = (data) => {
  return {
    type: types.GET_AIRTIME,
    payload: data,
  };
};

// Get AIRTIME
export const getAirtime = () => {
  return async (dispatch) => {
    const token = await getToken();
    // const url = apiUrl + `/api/v1/get_bills_category/airtime`;
    const url = `${urls.bills.GET_BILLS_CATEGORY}/airtime`;
    try {
      const response = await axios.get(url, {
        headers: {'Content-Type': 'applictaion/json', Authorization: token},
      });
      dispatch(setAirtime(response.data.data));
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
    // const url = apiUrl + `/api/v1/get_airtime_bills_trans`;
    const url = urls.bills.GET_AIRTIME_BILLS;
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
