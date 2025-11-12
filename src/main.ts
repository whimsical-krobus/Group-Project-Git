import './style.css'

fetch("https://omdbapi.com/?apikey=416ed51a&s=batman")
  .then((response) => response.json())
  .then((data: OmdbResponse) => {
    console.log(data);
    
    
  })

type Movie = {
  Poster: string;
  Title: string;
  Year: string;
}

type OmdbResponse = {
  Search: Movie[];
  totalResults: string;

};

const createHtml = (movies: Movie[]) => {
  const movieSection = document.getElementById("movies-section");

  if(movieSection) {
    movieSection.innerHTML = "";
  }
  movies.forEach((movie,) => {

    const movieContainer = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h1");
    
    img.src = movie.Poster;
    img.alt = movie.Title;
    title.innerHTML = movie.Title;

    movieContainer.className = "movie";
    imgContainer.className = "image-container";

    imgContainer.appendChild(img);
    movieContainer.appendChild(title);
    movieContainer.appendChild(imgContainer);

    movieSection?.appendChild(movieContainer);

    createHtml(movies);
  })
}