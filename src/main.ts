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

