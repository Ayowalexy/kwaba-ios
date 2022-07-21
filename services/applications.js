import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import urls from './routes';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export const newApplication = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.post(
      urls.applications.NEW_APPLICATION,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    console.log("response", response)
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const uploadBankStatement = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.post(
      urls.applications.UPLOAD_BANK_STATEMENT,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const acceptOffer = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.put(
      urls.applications.ACCEPT_OFFER,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getCurrentApplication = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(
      urls.applications.GET_CURRENT_APPLICATION,
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadDocuments = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.post(
      urls.applications.UPLOAD_DOCUMENTS,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getDocuments = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(urls.applications.GET_DOCUMENTS, {
      headers: {'Content-Type': 'applictaion/json', Authorization: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteApplicationDocument = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.delete(
      urls.applications.DELETE_APPLICATION_DOCUMENT,
      {
        headers: {'Content-Type': 'application', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addLandloardAndPropertyDetails = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.post(
      urls.applications.ADD_LANDLORD_AND_PROPERTY_DETAILS,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const rejectOffer = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.put(
      urls.applications.REJECT_OFFER,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addRefereeDetails = async (data) => {
  const token = await getToken();
  try {
    const resposnse = await axios.put(
      urls.applications.ADD_REFEREE_DETAILS,
      JOSN.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return resposnse;
  } catch (error) {
    return error;
  }
};

export const updateRemitaDetails = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.put(
      urls.applications.UPDATE_REMITA_DETAILS,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const linkCustomersBankAccount = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.put(
      urls.applications.LINK_CUSTOMERS_BANK_ACCOUNT,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const initializeOkraDirectDebit = async (data) => {
  const token = await getToken();
  try {
    const response = await axios.post(
      urls.applications.INITIALIZE_OKRA_DIRECT_DEBIT,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const verifyRepayment = async () => {
  const token = await getToken();
  try {
    const response = await axios.put(
      urls.applications.VERIFY_REPAYMENT,
      JSON.stringify(data),
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};
