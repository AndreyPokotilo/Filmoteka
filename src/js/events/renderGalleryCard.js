import { serviceApi } from '../services/service-api';

export function renderCardWithGenres(movie) {
  const { id, poster, title, genres, release, vote_average } = movie;
  const posterUrl = poster
    ? poster
    : 'https://dummyimage.com/395x574/000/fff.jpg&text=no+poster';

  const genresToShow = genres.slice(0, 2);
  if (genres.length > 2) {
    genresToShow.push('Others');
  }
  const year = release ? release : null;

  // let year = '';
  // if (typeof release !== 'undefined' && release.length > 4) {
  //   year = release.slice(0, 4);
  // }
  return `<li class="gallery__item">
             <a class="gallery__link" href="#">
              <img class="gallery__image" data-id="${id}" src="${posterUrl}" alt="${title} movie poster" loading="lazy">
             <div class="info">
              <h3 class="info__item">${title}</h3>
               <div class="info-detail">
                <p class="info-detail__item">${genresToShow.join(', ')}</p>
  <p class="info-detail__item">${year}<span class="info-detail__rating">&#9733;</span><span class="film-rating">${vote_average?.toFixed(
    1
  )}</span></p>
               </div>
             </div>
            </a>
           </li>`;
}

serviceApi
  .getListMovies('week')
  .then(res => renderListMovies(res.listMovies))
  .catch(error => console.log(error));

export function renderListMovies(list) {
  const movieCards = list.map(movie => renderCardWithGenres(movie));
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = movieCards.join('');
}

// export function renderMoviesCard(movies) {
//   const movieCards = movies.map(
//     ({ id, genres, poster, release, title, vote_average }) => {
//       const posterUrl = `${poster}`;
//       return `<li class="gallery__item">
//            <a class="gallery__link" href="#">
//             <img class="gallery__image" data-id="${id}" src="${posterUrl}" alt="${title} movie poster" loading="lazy">
//            <div class="info">
//             <h3 class="info__item">${title}</h3>
//              <div class="info-detail">
//               <p class="info-detail__item">${genres.join(', ')}</p>
//                <p class="info-detail__item">${release} <span class="film-rating">${vote_average?.toFixed(
//         1
//       )}</span></p>
//              </div>
//            </div>
//           </a>
//          </li>`;
//     }
//   );

//   const gallery = document.querySelector('.gallery');
//   gallery.innerHTML = movieCards.join('');
// }

// export async function renderMoviesCard() {
//   try {
//     const { listMovies } = await serviceApi.getListMovies('week');
//     const movieCards = listMovies.map(
//       ({ id, genres, poster, release, title, vote_average }) => {
//         return `<li class="gallery__item">
//          <a class="gallery__link" href="#">
//           <img class="gallery__image" data-id="${id}" src="${poster}" alt="${title} movie poster" loading="lazy">
//          <div class="info">
//           <h3 class="info__item">${title}</h3>
//            <div class="info-detail">
//             <p class="info-detail__item">${genres.join(', ')}</p>
//              <p class="info-detail__item">${release} <span class="film-rating">${vote_average?.toFixed(
//           1
//         )}</span></p>
//            </div>
//          </div>
//         </a>
//        </li>`;
//       }
//     );

//     const gallery = document.querySelector('.gallery');
//     gallery.innerHTML = movieCards.join('');
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// renderMoviesCard();

// Функция для получения списка жанров по id
// async function getGenresByIds(genreIds) {
//   const keyGenres = JSON.parse(localStorage.getItem('genres'));
//   // Используем метод map для преобразования каждого id жанра в жанр из localStorage
//   const genres = genreIds.map(id => keyGenres[id]).filter(genre => genre);
//   return genres || [];
// }
