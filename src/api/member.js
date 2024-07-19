import { jsonAxios, formAxios } from './axios.config';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`;

export const postLogin = async (username, password) => {
  console.log('baseurl:', BASE_URL);
  try {
    const response = await axios.post(`${BASE_URL}/members/login`, {
      username,
      password,
    });
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const postRegister = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/members/sign-up`, {
      username,
      email,
      password,
    });
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getCountries = async () => {
  try {
    const response = await jsonAxios.get('/members/countries');
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('get countries error:', error);
  }
};

export const getMemberInfo = async (username) => {
  try {
    const response = await jsonAxios.get(`/members/details/${username}`);
    console.log('겟멤버:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const patchMemberInfo = async (
  username,
  nickname,
  comment,
  country,
  birthday,
  profileImageFile,
  email,
) => {
  const formData = new FormData();

  // 이미지 파일 추가
  if (profileImageFile) {
    formData.append('profile_image', profileImageFile);
  }

  // JSON 데이터 추가
  const jsonData = {
    email,
    username,
    nickname,
    comment,
    country,
    birthday,
  };
  formData.append('json_data', JSON.stringify(jsonData));

  try {
    const response = await formAxios.patch(`/members/details/${username}`, {
      nickname: formData.nickname,
      comment: formData.comment,
      country: formData.country,
      birthday: formData.birthday,
      profile_image: formData.profileImageFile,
      email: formData.email,
    });
    return response.data;
  } catch (error) {
    console.error('Error patching member info:', error);
    throw error;
  }
};
