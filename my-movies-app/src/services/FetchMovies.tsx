type Movie = {
  Title: string;
  Poster: string;
  Type: string;
  imdbID: string;
  Year: number;
};

const API_URL = "https://www.omdbapi.com/?apikey=ee050ccd";

async function FetchMovies(
  value: string | undefined,
  page: number | undefined,
): Promise<Movie[]> {
  // fetch data func
  const res = await fetch(`${API_URL}&s=${value}&page=${page}`);
  const data = await res.json();

  return data.Search || [];
}

export default FetchMovies;
