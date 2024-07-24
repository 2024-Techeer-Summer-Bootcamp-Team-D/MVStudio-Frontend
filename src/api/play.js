import { jsonAxios } from './axios.config';

export const getPlay = async (mv_id) => {
  try {
    const response = await jsonAxios.get(`/music-videos/${mv_id}`);

    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};
