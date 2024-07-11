/* eslint-disable no-undef */
import axios from 'axios';

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});
