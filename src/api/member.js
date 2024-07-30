import { jsonAxios, formAxios } from './axios.config';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`;

export const getUsername = async () => {
  try {
    const response = await jsonAxios.get('/members');
    if (response.data.username === undefined) {
      return {
        username: '이거때문ㅇ',
        credits: 0,
      };
    }
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
    return error.response.data;
  }
};

export const postRegister = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/members/sign-up`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
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
  gender,
  youtubeUrl,
  instagramUrl,
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
    formData.append('country_id', country);
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
  if (youtubeUrl) {
    formData.append('youtube_account', youtubeUrl);
  }
  if (instagramUrl) {
    formData.append('instagram_account', instagramUrl);
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

// 로그아웃 요청을 보내는 함수
export const postLogout = async () => {
  try {
    const response = await jsonAxios.post('/members/logout');
    return response.data;
  } catch (error) {
    return new Error('Logout failed');
  }
};

export const kakaoPayment = async (credits, price) => {
  try {
    const response = await jsonAxios.post('/members/payments', {
      credits,
      price,
    });
    return response.data;
  } catch (error) {
    throw new Error('Payment failed');
  }
};
