import { jsonAxios } from './axios.config';

export const getViewData = async (username) => {
  try {
    const response = await jsonAxios.get(`/charts/${username}/daily`);
    return response.data;
  } catch (error) {
    console.error('get countries error:', error);
  }
};

export const getAgesData = async (username) => {
  try {
    const response = await jsonAxios.get(`/charts/${username}/ages`);
    return response.data;
  } catch (error) {
    console.error('get countries error:', error);
  }
};

export const getGenderData = async (username) => {
  try {
    const response = await jsonAxios.get(`/charts/${username}/genders`);
    return response.data;
  } catch (error) {
    console.error('get countries error:', error);
  }
};

export const getCountriesData = async (username) => {
  try {
    const response = await jsonAxios.get(`/charts/${username}/countries`);
    return response.data;
  } catch (error) {
    console.error('get countries error:', error);
  }
};
