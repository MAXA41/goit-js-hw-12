// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
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

const inp = document.querySelector('.inp');

const form = document.querySelector('.form');
const loadMore = document.querySelector('.load-btn');

let queryVal = '';
let page = 1;
let totalPages;
let card;
let cardSize;

const submit = form.addEventListener('submit', async event => {
  event.preventDefault();
  queryVal = inp.value.trim();
  page = 1;
  if (queryVal === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Search field cannot be empty.',
      position: 'topRight',
    });
    clearGallery();
    hideLoadMoreButton();
    form.reset();
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { pictures, total } = await getImagesByQuery(queryVal, page);

    if (pictures.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(pictures);
    totalPages = Math.ceil(total / 15);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'Oops',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    }

    card = document.querySelector('.gallery-item');
    cardSize = card.getBoundingClientRect();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `${error}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});

//   if (totalPages === page || total <= 15) {

//     hideLoadMoreButton();
//     return;
//   }

// .finally(() => {

// });

const loadBtn = loadMore.addEventListener('click', async () => {
  if (page >= totalPages) {
    iziToast.info({
      title: 'Oops',
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
    });
    hideLoadMoreButton();
    return;
  }

  page += 1;
  showLoader();

  try {
    const { pictures } = await getImagesByQuery();
    createGallery(pictures);

    // ----------- scroll
    window.scrollBy({
      top: cardSize.height * 2,
      behavior: 'smooth',
    });

    if (page >= totalPages) {
      iziToast.info({
        title: 'Info',
        message: `You've reached the end of search results.`,
        position: 'topRight',
      });
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `${error}`,
      position: 'topRight',
    });
    console.log(error);
  } finally {
    hideLoader();
  }
});
