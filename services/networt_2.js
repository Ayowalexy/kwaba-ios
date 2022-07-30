import apiUrl from './api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import urls from './routes';


const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
};



const getAllUserSolosavings = async () => {
    const token = await getToken();
    try {
        const response = await axios.get(urls.savings.GET_ALL_USER_SAVINGS, {
            headers: { 'Content-Type': 'application/json', Authorization: token },
        });
        return response.data.data?.reverse();
    } catch (error) {
        return error.message;
    }
};


const getAllUserBuddySavings = async () => {
    const token = await getToken();
    const url = apiUrl + '/api/v1/savings/buddy';
    try {
        const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json', Authorization: token },
        });
        return response.data.data.all_buddy_savings;
    } catch (error) {
        return error;
    }
};


const getAllUserSavingsStats = async () => {
    const token = await getToken();
    const url = urls.savings.GET_TOTAL_USER_SAVINGS_AMOUNT;
    try {
        const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json', Authorization: token },
        });
        return response.data.data;
    } catch (error) {
        return error.message;
    }
}

export {
    getAllUserSolosavings,
    getAllUserSavingsStats,
    getAllUserBuddySavings
}