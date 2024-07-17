import { jsonAxios } from '../axios.config';

export const GetPlay = async () => {
  try {
    const response = await jsonAxios.get();

    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};
