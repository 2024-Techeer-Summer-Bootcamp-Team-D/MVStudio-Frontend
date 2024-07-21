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
    const response = await jsonAxios.post('/music-videos', {
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

export const getTask = async (id) => {
  try {
    const response = await jsonAxios.get(`/music-videos/status/${id}`);
    console.log('보낸아이디:', id, '받은 응답:', response);
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

export const getVideoList = async (
  page,
  size,
  sort = null,
  member_id = null,
) => {
  try {
    const queryParams = new URLSearchParams({
      page: page,
      size: size,
      sort: sort,
      member_id: member_id,
    }).toString();

    const response = await axios.get(`/api/music-videos?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video list:', error);
    throw error;
  }
};
