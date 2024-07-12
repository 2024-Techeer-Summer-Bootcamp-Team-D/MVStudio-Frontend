/* eslint-disable no-undef */
import axios from 'axios';

export const jsonAxios = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const formAxios = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
