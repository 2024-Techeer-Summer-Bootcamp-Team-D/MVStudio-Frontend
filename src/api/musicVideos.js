import { jsonAxios } from './axios.config';

export const getList = async (page, size, sort, username) => {
  try {
    const response = await jsonAxios.get(
      `/music-videos?page=${page}&size=${size}`,
      sort ? `&sort=${sort}` : `&username=${username}`,
    );
    // console.log('겟리스트:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getHistory = async (username, page, size) => {
  try {
    const response = await jsonAxios.get(
      `/music-videos/histories-list/${username}?page=${page}&size=${size}`,
    );
    console.log('기록 :', response.data);
    return response.data;
  } catch (error) {
    console.error(`error code:`, error);
  }
};
export const getGenre = async () => {
  try {
    const response = await jsonAxios.get('/music-videos/genres');

    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getInstruments = async () => {
  try {
    const response = await jsonAxios.get('/music-videos/instruments');
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const postLyrics = async (subject, genres, language, vocal) => {
  try {
    const response = await jsonAxios.post('/music-videos/lyrics', {
      subject: subject,
      genres: genres,
      language: language,
      vocal: vocal,
    });

    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const postVideos = async (
  subject,
  genres_ids,
  instruments_ids,
  style_id,
  tempo,
  language,
  vocal,
  lyrics,
  lyrics_eng,
) => {
  try {
    // 전달된 파라미터 로그로 확인
    console.log('Post Video Params:', {
      subject,
      genres_ids,
      instruments_ids,
      style_id,
      tempo,
      language,
      vocal,
      lyrics,
      lyrics_eng,
    });

    const response = await jsonAxios.post('/music-videos', {
      subject,
      genres_ids,
      instruments_ids,
      style_id,
      tempo,
      language,
      vocal,
      lyrics,
      lyrics_eng,
    });

    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
    throw error; // 에러를 상위 호출로 다시 던지기
  }
};

export const getTask = async (taskId) => {
  try {
    const response = await jsonAxios.get(`/music-videos/status/${taskId}`);
    console.log('보낸아이디:', taskId, '받은 응답:', response);
    return response;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getStyles = async () => {
  try {
    const response = await jsonAxios.get('/music-videos/styles');
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};
