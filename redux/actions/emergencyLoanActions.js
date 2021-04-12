import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrl from '../../services/api';

  export const emergencyLoanTypes = {
    SET_EMERGENCY_LOAN: 'SET_EMERGENCY_LOAN',
    GET_EMERGENCY_LOAN: 'GET_EMERGENCY_LOAN'
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };
  
  export const applyForEmergencyLoan = (emergencyLoanData) => {
    return {
      type: emergencyLoanTypes.SET_EMERGENCY_LOAN,
      payload: emergencyLoanData,
    };
  };
  
  export const emergencyLoan = (dataInputs) => {
    return (dispatch) => {
      dispatch(applyForEmergencyLoan(dataInputs));
    };
  };


  
  export const setEmergencyLoanData = (data) => {
    return {
      type: emergencyLoanTypes.GET_EMERGENCY_LOAN,
      payload: data,
    };
  };
  
  export const getEmergencyLoanDetails = (data) => {
    return async (dispatch) => {
      const token = await getToken();
      // console.log('token', token);
      const url = apiUrl + '/api/v1/emergency_loan/one';
      try {
        const response = await axios.get(url, data, {
          headers: {'Content-Type': 'application/json', Authorization: token},
        });
        console.log(response);
        dispatch(setEmergencyLoanData(response.data.data));
        return response.data.data;
      } catch (error) {
        return error.message;
      }
    };
  };

  export const sendEmergencyLoanDetails = (data) => {
    return async (dispatch) => {
      const token = await getToken();
      console.log('token', token);
      const url = apiUrl + '/api/v1/emergency_loan/apply';
      console.log(url)
      console.log(JSON.stringify(data))
      try {
        const response = await axios.post(url, JSON.stringify(data), {
          headers: {'Content-Type': 'application/json', Authorization: token},
        });
        console.log(response);
        dispatch(setEmergencyLoanData(response.data.data));
        return response.data.data;
      } catch (error) {
        // return error.message;
        console.log(error.response.data)
      }
    };
  };
  
