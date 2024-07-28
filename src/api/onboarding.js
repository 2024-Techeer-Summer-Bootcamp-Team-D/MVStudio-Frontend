import { jsonAxios } from './axios.config';

export const getOnboarding = async (page, size) => {
  try {
    const response = await jsonAxios.get(
      `/music-videos/cover-images?&page=${page}&size=${size}`,
    );

    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
