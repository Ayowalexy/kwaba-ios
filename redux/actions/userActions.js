import * as types from './types';
import apiUrl from '../../services/api';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLoginState = (loginData) => {
  return {
    type: types.LOGIN,
    payload: loginData,
  };
};

const saveLoginToStorage = async (data) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
  } catch (error) {}
};

export const login = (loginInput) => {
  const {email, password} = loginInput;

  return async (dispatch) => {
    try {
      if (email.trim().length == 0 || password == '') {
        return Alert.alert(
          'Validation Error',
          'Username and Password cannot be empty',
        );
      }

      const response = await axios.post(
        apiUrl + '/api/v1/user/login',
        loginInput,
        {headers: {'Content-Type': 'application/json'}},
      );

      if (response.status === 200) {
        saveLoginToStorage({
          ...response.data.authData,
          username: response.data.authData.user.firstname,
        });
        dispatch(
          setLoginState({
            ...response.data.authData,
            username: response.data.authData.user.firstname,
          }),
        );
        Alert.alert('LOGIN SUCCESSFUL', 'You have logged in');
      } else {
        Alert.alert('Login Failed', 'Username or Password is incorrect');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Some error occurred, please retry');
    }
  };
};
