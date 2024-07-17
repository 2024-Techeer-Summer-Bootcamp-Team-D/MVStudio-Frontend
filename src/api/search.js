import { jsonAxios } from './axios.config';

export const getsearch = async (page, size, keyword) => {
  try {
    const response = await jsonAxios.get(
      `/music-videos/searches?mv_name=${keyword}&page=${page}&size=${size}`,
    );

    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
