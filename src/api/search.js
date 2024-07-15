import { jsonAxios } from './axios.config';

export const getsearch = async (page, size, keyword) => {
  try {
    const response = await jsonAxios.get('/music-videos/searches/', {
      params: {
        page,
        size,
        keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
