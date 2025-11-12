import "./style.css";

fetch("https://omdbapi.com/?apikey=416ed51a&s=batman")
  .then((response) => response.json())
  .then((data: OmdbResponse) => {
    console.log(data);
  });

type Movie = {
  Title: string;
  Poster: string;
  imdbID: string;
};

type OmdbResponse = {
  Search: Movie[];
};

const createHTML = (movies: Movie[]) => {
  const moviesSection = document.getElementById("movies");


  if (moviesSection) {
    moviesSection.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h2");

    img.src = movie.Poster;
    img.alt = movie.Title;
    title.innerHTML = movie.Title;

    movieContainer.addEventListener("click", async () => {
      const movieDetails = await getMovieById(movie.imdbID);
      console.log(movieDetails);
    });

    imgContainer.appendChild(img);
    movieContainer.appendChild(title);
    movieContainer.appendChild(imgContainer);
    moviesSection?.appendChild(movieContainer);

  });
};

const BASE_URL = "https://omdbapi.com/?apikey=416ed51a&";

const getMovies =async (searchText:string) => {
  const response = await get<OmdbResponse>(`${BASE_URL}s=${searchText}`);
  return response.Search;
};

export const getMovieById = async (id: string) => {
  return await get<Movie>(`${BASE_URL}i=${id}`);
};

export const get = async <T>(url: string) => {
  const response = await fetch(url);
  const data: T = await response.json();

  return data;
};


const form = document.getElementById("form");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const theInput = document.getElementById("searchText");

   let searchText = "";
  if (theInput) {
    searchText = (theInput as HTMLInputElement).value;
  }

  const movies = await getMovies(searchText);
  createHTML(movies);

  if (theInput) {
    searchText = (theInput as HTMLInputElement).value;
  }
});