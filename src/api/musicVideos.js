import { jsonAxios } from './axios.config';

export const getList = async (page, size, sort = null, member_id = null) => {
  try {
    const response = await jsonAxios.get(
      `/music-videos/?page=${page}&size=${size}` +
        (sort ? `&sort=${sort}` : '') +
        (member_id ? `&member_id=${member_id}` : ''),
    );
    console.log('겟리스트:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getHistory = async (member_id, page, size) => {
  try {
    const response = await jsonAxios.get(
      `/music-videos/histories-list/${member_id}?page=${page}&size=${size}`,
    );
    console.log('기록 :', response.data);
    return response.data;
  } catch (error) {
    console.error(`error code:`, error);
  }
};
export const getGenre = async () => {
  try {
    const response = await jsonAxios.get('/music-videos/genres/');
    console.log('response:', response.data.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getInstruments = async () => {
  try {
    const response = await jsonAxios.get('/music-videos/instruments/');
    console.log('response:', response.data.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const postLyrics = async (subject, genres, language, vocal) => {
  try {
    const response = await jsonAxios.post('/music-videos/lyrics/', {
      subject: subject,
      genres: genres,
      language: language,
      vocal: vocal,
    });
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const postVideos = async (
  member_id,
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
      member_id: member_id,
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
