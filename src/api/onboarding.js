import axios from 'axios';

export const getOnboarding = async (page, size) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/music-videos/cover-images?&page=${page}&size=${size}`,
    );

    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
