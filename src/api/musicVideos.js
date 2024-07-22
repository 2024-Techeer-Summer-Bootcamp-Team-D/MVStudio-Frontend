import { jsonAxios } from './axios.config';

export const getList = async (page, size, sort = null, username = null) => {
  try {
    const response = await jsonAxios.get(
      `/music-videos?page=${page}&size=${size}` +
        (sort ? `&sort=${sort}` : '') +
        (username ? `&username=${username}` : ''),
    );
    console.log('겟리스트:', response.data);
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
  username,
  subject,
  genres_ids,
  instruments_ids,
  tempo,
  language,
  vocal,
  lyrics,
) => {
  try {
    const response = await jsonAxios.post('/music-videos/', {
      username: username,
      subject: subject,
      genres_ids: genres_ids,
      instruments_ids: instruments_ids,
      tempo: tempo,
      language: language,
      vocal: vocal,
      lyrics: lyrics,
    });
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
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
