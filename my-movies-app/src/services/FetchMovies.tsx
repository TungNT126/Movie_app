import type { Movie } from "../models/Movie";

const API_URL = "https://www.omdbapi.com/?apikey=9a70465b";

async function FetchMovies(
  value: string | undefined,
  page: number | undefined,
): Promise<Movie[]> {
  // fetch data func
  const res = await fetch(`${API_URL}&s=${value}&page=${page}`);
  const data = await res.json();

  // vsmov API returns { status, items, pagination }; OMDb-style uses Search
  const list = data.items ?? data.Search;
  return Array.isArray(list) ? list : [];
}

export default FetchMovies;
