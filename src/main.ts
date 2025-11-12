import "./style.css";

fetch("https://omdbapi.com/?apikey=416ed51a&s=batman")
  .then((response) => response.json())
  .then((data: OmdbResponse) => {
    console.log(data);
  });

type Movie = {
  Poster: string;
  Title: string;
  Year: string;
};

type OmdbResponse = {
  Search: Movie[];
  totalResults: string;
};

function createHtml(movies: Movie[]) {
  const movieSection = document.getElementById("movies");

  if (movieSection) {
    movieSection.innerHTML = "";
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
}

const form = document.getElementById("form");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  let searchMovie = "";

  const theInput = document.getElementById("searchText");

  if (theInput) {
    searchMovie = (theInput as HTMLInputElement).value;
  }
});
