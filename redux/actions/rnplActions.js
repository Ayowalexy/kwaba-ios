import * as types from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setSteps = (data) => {
  console.log('The State: ', data);
  return {
    type: types.RNPL_STEPS,
    payload: data,
  };
};

// export const getSteps = () => {
//     return async(dispatch) => {
//         await AsyncStorage.setItem();
//     }
// }
