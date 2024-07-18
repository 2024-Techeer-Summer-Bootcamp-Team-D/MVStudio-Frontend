/* eslint-disable no-undef */
import axios from 'axios';
import { getCookie, removeCookie } from '../util/cookies';

const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`;
const reIssuedToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/reissue`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // CORS 요청 시 쿠키를 포함
    });
    if (response.data.data.access_token) {
      setCookie('accessToken', response.data.data.access_token);
    }
    return response.data;
  } catch (error) {
    removeCookie('accessToken');
  }
};

export const jsonAxios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터를 추가하여 모든 요청에 최신 토큰을 포함시킵니다.
jsonAxios.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken'); // 요청 직전에 액세스 토큰을 쿠키에서 가져옵니다.
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error),
);

jsonAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      alert('로그인이 필요합니다.');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  },
);

export const formAxios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
