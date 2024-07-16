import { jsonAxios } from './axios.config';

export const getList = async (page, size, sort = null, member_id = null) => {
  try {
    // URLSearchParams 객체에 전달된 매개변수 추가
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('size', size);
    if (sort) params.append('sort', sort);
    if (member_id) params.append('member_id', member_id);

    // 최종 URL 생성
    const url = `http://127.0.0.1:8000/api/v1/music-videos/?${params.toString()}`;

    // 요청 전 최종 URL 확인
    console.log('Final URL:', url);

    // GET 요청
    const response = await jsonAxios.get(url);
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
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

export const PostVideos = async (
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
