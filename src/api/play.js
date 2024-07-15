import { jsonAxios } from './axios.config';

export const getplay = async (mv_id) => {
  try {
    const response = await jsonAxios.post(`/music-videos/{mv_id}?$mv_id=3`);
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};
