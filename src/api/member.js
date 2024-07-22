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
  try {
    const response = await axios.post(
      `${BASE_URL}/members/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true, // 쿠키를 주고받기 위해 이 옵션을 추가합니다.
      },
    );
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
    return response.data;
  } catch (error) {
    console.error('get countries error:', error);
  }
};

export const getMemberInfo = async (id) => {
  try {
    const response = await jsonAxios.get(`/members/${id}`);
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
  gender,
) => {
  const formData = new FormData();

  // patch 요청을 보낼 때, 변경된 정보만 보내기 위해 조건문을 사용
  if (email) {
    formData.append('email', email);
  }
  if (nickname) {
    formData.append('nickname', nickname);
  }
  if (comment) {
    formData.append('comment', comment);
  }
  if (country) {
    formData.append('country', country);
  }
  if (birthday) {
    formData.append('birthday', birthday);
  }
  if (gender) {
    formData.append('sex', gender);
  }
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
