import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');
const input = document.querySelector('.inp');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const perPage = 15;

form.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  
  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
      position: 'topRight'
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  
  try {
    showLoader();
    hideLoadMoreButton();
    clearGallery();
    
    const { hits, total } = await getImagesByQuery(currentQuery, currentPage, perPage);
    
    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images found. Please try another query!',
        position: 'topRight'
      });
      return;
    }
    
    totalHits = total;
    createGallery(hits);
    
    if (hits.length < totalHits) {
      showLoadMoreButton();
    }
    
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      window.galleryItemHeight = galleryItem.getBoundingClientRect().height;
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight'
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage += 1;
  
  try {
    showLoader();
    hideLoadMoreButton();
    
    const { hits } = await getImagesByQuery(currentQuery, currentPage, perPage);
    createGallery(hits);
    
    if (window.galleryItemHeight) {
      window.scrollBy({
        top: window.galleryItemHeight * 2,
        behavior: 'smooth'
      });
    }
    
    if (currentPage >= Math.ceil(totalHits / perPage)) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight'
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
      position: 'topRight'
    });
  } finally {
    hideLoader();
  }
}