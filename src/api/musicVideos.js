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
      `/music-videos/histories-list/${member_id}/?page=${page}&size=${size}`,
    );
    console.log('기록 :', response.data);
    return response.data;
  } catch (error) {
    console.error(`error code:`, error);
  }
};
