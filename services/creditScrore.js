import axios from 'axios';
import urls from './routes';

export const purchase = async (data) => {
  try {
    const response = await axios.post(
      urls.creditScore.PURCHASE,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const fetch = async (data) => {

  console.log('cobble', data)
  try {
    const response = await axios.post(
      urls.creditScore.FETCH,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};
