//Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODAwOGNjYjkyNGI4MTZkNzY3MmYxMjZlNDVmNjk4ZiIsIm5iZiI6MTczNzQ4NzY2NS43MzcsInN1YiI6IjY3OGZmNTMxOTQxOGJjZmJhZGYwOTQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._-d5w35tS_4Eepooa7-UKkUIqVCugJ7oE0vFG3n4oPw
const API_KEY = "18008ccb924b816d7672f126e45f698f"; // Replace with your own API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";
const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODAwOGNjYjkyNGI4MTZkNzY3MmYxMjZlNDVmNjk4ZiIsIm5iZiI6MTczNzQ4NzY2NS43MzcsInN1YiI6IjY3OGZmNTMxOTQxOGJjZmJhZGYwOTQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._-d5w35tS_4Eepooa7-UKkUIqVCugJ7oE0vFG3n4oPw' // Replace with your actual API key
  }
};
let page=1;
let totalpage=48859;
// Function to fetch currently playing movies
async function fetchNowPlayingMovies(page) {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1;`
  const response = await fetch(url, options);
  const data = await response.json();

  return data.results;
}
async function fetchPopularMovies(page) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1;`
  const response = await fetch(url, options);
  const data = await response.json();

  return data.results;
}
async function fetchTopRatedMovies(page) {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1;`
  const response = await fetch(url, options);
  const data = await response.json();

  return data.results;
}
async function fetchUpcomingMovies(page) {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1;`
  const response = await fetch(url, options);
  const data = await response.json();
  return data.results;
}
/*async function next(){
  if(page<totalpage){
    page++;
    await fetchNowPlayingMovies(page)
  }
}
async function prev(){
  if(page>1){
    page--;
    await fetchNowPlayingMovies(page);
  }
}*/
 //`https://api.themoviedb.org/3/movie/${movie.id}`
 //'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODAwOGNjYjkyNGI4MTZkNzY3MmYxMjZlNDVmNjk4ZiIsIm5iZiI6MTczNzQ4NzY2NS43MzcsInN1YiI6IjY3OGZmNTMxOTQxOGJjZmJhZGYwOTQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._-d5w35tS_4Eepooa7-UKkUIqVCugJ7oE0vFG3n4oPw'

// Function to fetch movies based on search query
async function fetchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`;
  const response = await fetch(url, options);
  const dataa= await response.json();
  console.log(dataa);
  return dataa.results;
}
async function fetchMovieTrailer(movieId) {
  const url = `${BASE_URL}/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const videos = data.results;

  // Find YouTube trailer
  const trailer = videos.find(video => video.site === "YouTube" && video.type === "Trailer");
  return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&fs=1` : null; 
}
async function openModal(movieId) {
  const trailerUrl = await fetchMovieTrailer(movieId);

  if (trailerUrl) {

      const modal = document.getElementById("trailerModal");
      const trailerFrame = document.getElementById("trailerFrame");

      document.getElementById("trailerModal").style.display = "flex"; 
      trailerFrame.src = trailerUrl; 
      if(modal.requestFullscreen){
        modal.requestFullscreen();
      } else if (modal.mozRequestFullScreen) { // For Firefox
        modal.mozRequestFullScreen();
      } else if (modal.webkitRequestFullscreen) { // For Chrome, Safari, Opera
        modal.webkitRequestFullscreen();
      } else if (modal.msRequestFullscreen) { // For IE/Edge
        modal.msRequestFullscreen();
      }
  } else {
      alert("No trailer available.");
  }
}

function closeModal() {
  const modal = document.getElementById("trailerModal");
  const trailerFrame = document.getElementById("trailerFrame");
console.log(modal)
  modal.style.display = "none"; // Hide modal
  trailerFrame.src = ""; 
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // For Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // For Chrome, Safari, Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // For IE/Edge
    document.msExitFullscreen();
  }
}
async function displayMovies(movies) {
  var card = document.getElementById("card");
  card.innerHTML = ''; 


  if (movies.length === 0) {
      card.innerHTML = '<p>No movies available.</p>';
      return;

  }

  for(const movie of movies) {
      const id=movie?.id 
      const title = movie?.title || 'No title available';
      var image = movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '';
      var image1 = movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : '';
      const rates = movie?.vote_average || 'No ratings';
      const hasImages = movies.some(movie => movie?.backdrop_path);
      var overview = movie?.overview ? movie.overview.replace(/'/g, "&#39;").replace(/"/g, "&quot;") : 'No overview available';
      var target= await fetchMovieTrailer(id);
   //else {
        //card.style.display = "flex"; 
    //}
      // Append movie card to the container
      card.innerHTML += `
          <div class="movie-card">

            <a href="javascript:void(0) " class="link" onclick='openModal(${id})'><img class='images' src="${image || 'fallback.jpg'}" alt="${title} it's image is NOT FOUND"/></a>
              <i class="fa-solid fa-play fa-2xl fa-fade" style="color:rgba(253, 4, 4, 0.69);"></i>
              <a href="https://www.themoviedb.org/movie/${id}"  class="link" 
            target="_blank" rel="noopener noreferrer"><h3>${title}</h3></a>
              <p >
              <pre style="margin-left: -110px">
              ⭐ 
              ${rates}
              </pre>
              </p>

          </div>
      `;
  };
}
async function displayQueryMovies(movies) {
  var card = document.getElementById("card");
  var card2 = document.getElementById("card2");
  var card3 = document.getElementById("card3");
  var card4 = document.getElementById("card4");
  var header=document.querySelector('#header')
  var header1=document.querySelector('#header1')
  var header2=document.querySelector('#header2')
  var header3=document.querySelector('#header3')
  header.style.display='none';
  header1.style.display='none';
  header2.style.display='none';
  header3.style.display='none';
  card.innerHTML = ''; 
  card2.innerHTML = ''; 
  card3.innerHTML = ''; 
  card4.innerHTML = '';  

  if (movies.length === 0) {
      card.innerHTML = '<p>No movies available.</p>';
      return;

  }

  for(const movie of movies) {
      const id=movie?.id ;
      const title = movie?.title || 'No title available';
      var image = movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '';
      var image1 = movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : '';
      const rates = movie?.vote_average || 'No ratings';
      const hasImages = movies.some(movie => movie?.backdrop_path);
      var overview = movie?.overview ? movie.overview.replace(/'/g, "&#39;").replace(/"/g, "&quot;") : 'No overview available';
      const trailerUrl = await fetchMovieTrailer(id);
   //else {
        //card.style.display = "flex"; 
    //}
      // Append movie card to the container
      card.innerHTML += `
          <div class="movie-card">

            <a href="javascript:void(0) " class="link" ><img onclick='openModal(${id})' class='images' src="${image || 'fallback.jpg'}" alt="${title} it's image is NOT FOUND"/></a>
              <i class="fa-solid fa-play fa-2xl fa-fade" style="color:rgba(253, 4, 4, 0.69);"></i>
            <a href="https://www.themoviedb.org/movie/${id}"  class="link" 
            target="_blank" rel="noopener noreferrer"><h3>${title}</h3></a>
              <p >
              <pre style="margin-left: -110px">
              ⭐ 
              ${rates}
              </pre>
              </p>
          </div>
      `;
  };
}
async function displayUpcomingMovies(movies) {
  var card4 = document.getElementById("card4");
  //card.innerHTML = ''; 

  if (movies.length === 0) {
      card4.innerHTML = '<p>No movies available.</p>';
      return;

  }

  for(const movie of movies) {
      const id=movie?.id 
      const title = movie?.title || 'No title available';
      var image = movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '';
      var image1 = movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : '';
      const rates = movie?.vote_average || 'No ratings';
      const hasImages = movies.some(movie => movie?.backdrop_path);
      var overview = movie?.overview ? movie.overview.replace(/'/g, "&#39;").replace(/"/g, "&quot;") : 'No overview available';
      var target= await fetchMovieTrailer(id);
   //else {
        //card.style.display = "flex"; 
    //}
      // Append movie card to the container
      card4.innerHTML += `
          <div class="movie-card">

            <a href="javascript:void(0) " class="link" onclick='openModal(${id})'><img class='images' src="${image || 'fallback.jpg'}" alt="${title} it's image is NOT FOUND"/></a>
              <i class="fa-solid fa-play fa-2xl fa-fade" style="color:rgba(253, 4, 4, 0.69);"></i>
                          <a href="https://www.themoviedb.org/movie/${id}" class="link" 
            target="_blank" rel="noopener noreferrer"><h3>${title}</h3></a>
              <p >
              <pre style="margin-left: -110px">
              ⭐ 
              ${rates}
              </pre>
              </p>

          </div>
      `;
  };
}
async function fetchMoviesByGenre(genreId) {
  const url = `${BASE_URL}/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data)
  return data.results;
}
async function fetchGenres() {
  const url = `${BASE_URL}/genre/movie/list?language=en-US`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data.genres;
}

// Event listener for genre selection
document.getElementById("genreSelect").addEventListener("change", async (event) => {
  const genreId = event.target.value;
  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = ''; // Clear previous movies

  if (genreId) {
    try {
      const movies = await fetchMoviesByGenre(genreId);
      displayQueryMovies(movies); 
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      moviesContainer.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
    }
  }
});
async function displayGenres() {
  const genresContainer = document.getElementById("genreSelect");
  genresContainer.innerHTML = '<option value="">GENRES</option>'; // Clear existing options

  try {
    const genres = await fetchGenres(); // Fetch genres

    if (genres.length === 0) {
      genresContainer.innerHTML += '<option>No genres available</option>';
      return;
    }

    // Loop through each genre and create an option element
    genres.forEach(genre => {
      genresContainer.innerHTML += `<option value="${genre.id}">${genre.name}</option>`;
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    genresContainer.innerHTML += '<option>Error fetching genres</option>';
  }
}
async function displayTopRatedMovies(movies) {
  var card3 = document.getElementById("card3");
  //card.innerHTML = ''; 

  if (movies.length === 0) {
      card3.innerHTML = '<p>No movies available.</p>';
      return;

  }

  for(const movie of movies) {
      const id=movie?.id 
      const title = movie?.title || 'No title available';
      var image = movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '';
      var image1 = movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : '';
      const rates = movie?.vote_average || 'No ratings';
      const hasImages = movies.some(movie => movie?.backdrop_path);
      var overview = movie?.overview ? movie.overview.replace(/'/g, "&#39;").replace(/"/g, "&quot;") : 'No overview available';
      var target= await fetchMovieTrailer(id);
   //else {
        //card.style.display = "flex"; 
    //}
      // Append movie card to the container
      card3.innerHTML += `
          <div class="movie-card">

            <a href="javascript:void(0) "onclick='openModal(${id})'><img class='images' src="${image || 'fallback.jpg'}" alt="${title} it's image is NOT FOUND"/></a>
              <i class="fa-solid fa-play fa-2xl fa-fade" style="color:rgba(253, 4, 4, 0.69);"></i>
              <a href="https://www.themoviedb.org/movie/${id}"  class="link" 
            target="_blank" rel="noopener noreferrer"><h3>${title}</h3></a>
              <p >
              <pre style="margin-left: -110px">
              ⭐ 
              ${rates}
              </pre>
              </p>

          </div>
      `;
  };
}
async function displayPopularMovies(movies) {
  var card2 = document.getElementById("card2");
  //card.innerHTML = ''; 

  if (movies.length === 0) {
      card2.innerHTML = '<p>No movies available.</p>';
      return;

  }

  for(const movie of movies) {
      const id=movie?.id 
      const title = movie?.title || 'No title available';
      var image = movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '';
      var image1 = movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : '';
      const rates = movie?.vote_average || 'No ratings';
      const hasImages = movies.some(movie => movie?.backdrop_path);
      var overview = movie?.overview ? movie.overview.replace(/'/g, "&#39;").replace(/"/g, "&quot;") : 'No overview available';
      var target= await fetchMovieTrailer(id);
   //else {
        //card.style.display = "flex"; 
    //}
      // Append movie card to the container
      card2.innerHTML += `
          <div class="movie-card">

            <a href="javascript:void(0) " class="link" onclick='openModal(${id})'><img class='images' src="${image || 'fallback.jpg'}" alt="${title} it's image is NOT FOUND"/></a>
              <i class="fa-solid fa-play fa-2xl fa-fade" style="color:rgba(253, 4, 4, 0.69);"></i>
                          <a href="https://www.themoviedb.org/movie/${id}"  class="link" 
            target="_blank" rel="noopener noreferrer"><h3>${title}</h3></a>
              <p >
              <pre style="margin-left: -110px">
              ⭐ 
              ${rates}
              </pre>
              </p>

          </div>
      `;
  };
}
  /*var container=document.getElementById("image_container")
  container.innerHTML='';
  container.innerHTML=`
  <img src="${image1}" alt="Not Found"/>
  <div>
  <img src="${image}" alt="Not Found"/>
  <p>${overview}</p>
  </div>
  `
  console.log(`updating : ` ,overview, image,image1)*/

async function handleSearch() {
  const query = document.getElementById('query').value.trim();
  if (query) {
      try {
          const movies = await fetchMovies(query)
          displayQueryMovies(movies);
      } catch (err) {
          console.error('Error fetching data:', err);
          document.getElementById("card").innerHTML = '<p>Error fetching movies. Please try again later.</p>';
      }
  } else {
      fetchNowPlayingMovies()
          .then(displayMovies)
          .catch(err => {
              console.error('Error fetching data:', err);
              document.getElementById("card").innerHTML = '<p>Error fetching movies. Please try again later.</p>';
          });
  }
}

window.onload = async () => {
  await fetchNowPlayingMovies().then(displayMovies);
  await fetchPopularMovies().then(displayPopularMovies);
  await fetchTopRatedMovies().then(displayTopRatedMovies);
  await fetchUpcomingMovies().then(displayUpcomingMovies);
  await displayGenres()
  setTimeout(function () {
      document.getElementById("loader").style.display = "none";
      document.getElementById("content").style.display = "block";
  }, 3000); // Simulating loading time
};


document.getElementById("query").addEventListener("keydown", (event)=>{
  if(event.key==="Enter"){
    handleSearch();
  }
});
