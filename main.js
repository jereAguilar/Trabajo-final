// Config
const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=b85e0dbfb366f146c7663ff668809e60`
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Make a request to API
function searchMovies(query) {
  let lang = '';
  let adult= '';
  let idioma = document.getElementById("idioma").value;
  if (idioma == "Español") {
    lang = '&language=es-ES';
  }
  let exp = document.getElementById("contenidoAdulto").value;
  if (exp == "on") {
    adult = '&include_adult=true';
  }
  return fetch(API_ENDPOINT + '&query=' + query + lang + adult)
    .then(response => response.json())
}


// Handle the submit form action
// Make a request to API and render results
function submitForm() {

  let borrar = document.getElementById("movies-list");
  borrar.parentNode.removeChild(borrar);

  let reacer = document.getElementById("movies");

  reacer.innerHTML = '<div id="movies-list"></div>';

  // Get query value
  const query = document.getElementById("query").value;

  // Execute API request
  searchMovies(query)
    .then((data) => {

      // Process results from API
      if (data && data.results) {

        // Iterate list of movies and render each of them
        data.results.forEach((movie) => {
          renderMovie(movie.original_title, movie.overview, movie.release_date, movie.vote_average,movie.poster_path)
        })
      }
    })
    .catch((err) => {
      console.error(err)
    })
}



// Render a movie in the page
function renderMovie(title, overview, release_date, vote_average, poster_path) {
  const moviesDiv = document.getElementById("movies-list");
  const html = `
    <div class="movie-box">
      <div class="details">
        <div class="title">${title}</div>
        <div class="overview">${overview}</div>
        <div class="estreno"><p>Date: ${release_date}</p></div>
        <div class="puntuacion"><p>RATING: ${vote_average}</p></div>
        <div><img class="img" src="${IMG_URL+poster_path}"></img></div>
      </div>
    </div>
  `;

  moviesDiv.insertAdjacentHTML("afterend", html);
  
}