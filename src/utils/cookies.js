import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 쿠키 저장
export const setCookie = (key, value) => {
  cookies.set(key, value, { path: '/' });
};

// 쿠키 가져오기
export const getCookie = (key) => {
  return cookies.get(key);
};

// 쿠키 삭제
export const removeCookie = (key) => {
  cookies.remove(key);
};
