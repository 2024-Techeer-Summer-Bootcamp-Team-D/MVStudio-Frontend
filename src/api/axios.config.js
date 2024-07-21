/* eslint-disable no-undef */
import axios from 'axios';
import { getCookie, setCookie } from '@/utils/cookies';

const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`;

export const reissueToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/members/refresh`,
      {},
      {
        withCredentials: true,
      },
    );
    return response.data.access_token;
  } catch (error) {
    console.error('이게 안되면 안되는건데:', error);
  }
};

export const jsonAxios = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

jsonAxios.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `${token}`; // Bearer 접두사를 사용하지 않을 때
      // config.headers.Authorization = `Bearer ${token}`; // Bearer 접두사를 사용할 때
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

jsonAxios.interceptors.response.use(
  (response) => {
    // 응답이 성공적일 때는 그대로 응답을 반환합니다.
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      console.error('토큰 재발급 시작:', error);
      originalRequest._retry = true;
      try {
        const newAccessToken = await reissueToken();
        if (newAccessToken === undefined) {
          console.error('토큰 재발급 실패:', error);
          return Promise.reject(error);
        }
        setCookie('accessToken', newAccessToken); // 새로운 액세스 토큰을 쿠키에 저장합니다.
        jsonAxios.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return jsonAxios(originalRequest); // 원래 요청을 새로운 토큰으로 재시도합니다.
      } catch (reissueError) {
        // 토큰 재발급 실패 시, 추가적인 오류 처리를 할 수 있습니다.
        console.error('Token reissue failed:', reissueError);
        return Promise.reject(reissueError);
      }
    }
    // 다른 오류는 그대로 반환합니다.
    return Promise.reject(error);
  },
);

export const formAxios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

formAxios.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    console.log('token:', token);
    if (token) {
      config.headers.Authorization = `${token}`; // Bearer 접두사를 사용하지 않을 때
      // config.headers.Authorization = `Bearer ${token}`; // Bearer 접두사를 사용할 때
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

formAxios.interceptors.response.use(
  (response) => {
    // 응답이 성공적일 때는 그대로 응답을 반환합니다.
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await reissueToken();
        setCookie('accessToken', newAccessToken); // 새로운 액세스 토큰을 쿠키에 저장합니다.
        formAxios.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return formAxios(originalRequest); // 원래 요청을 새로운 토큰으로 재시도합니다.
      } catch (reissueError) {
        // 토큰 재발급 실패 시, 추가적인 오류 처리를 할 수 있습니다.
        console.error('Token reissue failed:', reissueError);
        return Promise.reject(reissueError);
      }
    }
    // 다른 오류는 그대로 반환합니다.
    return Promise.reject(error);
  },
);
