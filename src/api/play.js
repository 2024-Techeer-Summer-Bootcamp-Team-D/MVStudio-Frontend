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

export const postHistory = async (mv_id) => {
  try {
    const url = `/music-videos/histories/create/${mv_id}`;
    const response = await jsonAxios.post(url);

    // 응답 본문 출력
    console.log('Response data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error code:', error.response?.status);
    console.error('Error message:', error.message);
    console.error('Error response data:', error.response?.data);

    if (error.response?.data?.history_id) {
      return { history_id: error.response.data.history_id };
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
    console.log('redirect url :', response);
    return response.data;
  } catch (error) {
    console.error('patchHistoryUpdate error:', error);
    throw error;
  }
};
