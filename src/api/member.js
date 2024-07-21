import { jsonAxios, formAxios } from './axios.config';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`;

export const getUsername = async () => {
  try {
    const response = await jsonAxios.get('/members');
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

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
  profile_image,
  email,
) => {
  const formData = new FormData();

  formData.append('email', email);
  formData.append('nickname', nickname);
  formData.append('comment', comment);
  formData.append('country', country);
  formData.append('birthday', birthday);

  // 이미지 파일이 있을 경우 추가
  if (profile_image) {
    formData.append('profile_image', profile_image);
  }

  try {
    const response = await formAxios.patch(
      `/members/details/${username}`,
      formData,
    );
    return response.data;
  } catch (error) {
    console.error('Error patching member info:', error);
    throw error;
  }
};
