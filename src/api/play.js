import { jsonAxios } from './axios.config';

export const getPlay = async (mv_id) => {
  try {
    const response = await jsonAxios.get(`/music-videos/${mv_id}`);

    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const postHistory = async (mv_id) => {
  try {
    const url = `/music-videos/histories/create/${mv_id}`;
    const response = await jsonAxios.post(url);

    return response.data;
  } catch (error) {
    if (error.response?.data?.history_id) {
      return error.response.data;
    }
    throw error;
  }
};

export const patchHistoryUpdate = async (history_id, watchedSeconds) => {
  try {
    const response = await jsonAxios.patch(
      `/music-videos/histories/update/${history_id}`,
      { current_play_time: watchedSeconds },
    );
    return response.data;
  } catch (error) {
    console.error('patchHistoryUpdate error:', error);
    throw error;
  }
};

export const postYoutubeUpload = async (mv_id) => {
  try {
    const response = await jsonAxios.post(`/oauth/youtube/${mv_id}`);
    return response.data;
  } catch (error) {
    console.error('patchHistoryUpdate error:', error);
    throw error;
  }
};
