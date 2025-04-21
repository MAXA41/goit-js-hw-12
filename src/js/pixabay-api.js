import axios from 'axios';
import iziToast from 'izitoast';
import { createGallery, hideLoader } from './render-functions';

const API_KEY = '49830885-3c4fb55cab3b8487f16091a9c';
// axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query, page) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });
  const total = response.data.totalHits;
  const pictures = response.data.hits;
  return { pictures, total };
};
