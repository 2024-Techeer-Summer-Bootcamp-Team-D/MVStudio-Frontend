import { jsonAxios } from './axios.config';

export const deleteVideo = async (id) => {
  try {
    const response = await jsonAxios.delete(`/music-videos/${id}`);
    return response;
  } catch (error) {
    console.error('errorcode:', error);
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

export const getHistory = async (page, size) => {
  try {
    const response = await jsonAxios.get(
      `/music-videos/histories?page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error(`error code:`, error);
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

export const getList = async (page, size, sort, username) => {
  try {
    const params = new URLSearchParams({
      page: page,
      size: size,
    });

    if (sort) {
      params.append('sort', sort);
    } else if (username) {
      params.append('username', username);
    }

    const response = await jsonAxios.get(`/music-videos?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getStyles = async () => {
  try {
    const response = await jsonAxios.get('/music-videos/styles');
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getTask = async (taskId) => {
  try {
    const response = await jsonAxios.get(`/music-videos/status/${taskId}`);
    return response;
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

    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
    throw error; // 에러를 상위 호출로 다시 던지기
  }
};

export const youtubeLogin = async (id) => {
  try {
    const response = await jsonAxios.get(`/oauth/youtube/${id}`);
    return response;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const youtubeUpload = async (id, title, description, privacyStatus) => {
  try {
    const response = await jsonAxios.post(`/oauth/youtube/uploads/${id}`, {
      title: title,
      description: description,
      tags: '',
      privacyStatus: privacyStatus,
    });

    return response;
  } catch (error) {
    console.error('errorcode:', error);
  }
};
