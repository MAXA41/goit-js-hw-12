import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
    <ul class="gallery-info">
      <li class="info-item">
        <h3 class="title">Likes</h3>
        <p class="info">${likes}</p>
      </li>
      <li class="info-item">
        <h3 class="title">Views</h3>
        <p class="info">${views}</p>
      </li>
      <li class="info-item">
        <h3 class="title">Comments</h3>
        <p class="info">${comments}</p>
      </li>
      <li class="info-item">
        <h3 class="title">Downloads</h3>
        <p class="info">${downloads}</p>
      </li>
    </ul>
  </a>
</li>
`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  //   const link = document
  //     .querySelector('.gallery-link')
  //     .addEventListener('click', event => event.preventDefault());

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('visible');
}

export function hideLoader() {
  loader.classList.remove('visible');
}

export function showLoadMoreButton() {
  loadMore.classList.add('btn-visible');
}

export function hideLoadMoreButton() {
  loadMore.classList.remove('btn-visible');
}

//     ----------------------  lightbox

// let lightbox = null;

// export function initLightbox() {
//   lightbox = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//   });
// }

// export function refreshLightbox() {
//   if (lightbox) lightbox.refresh();
// }
