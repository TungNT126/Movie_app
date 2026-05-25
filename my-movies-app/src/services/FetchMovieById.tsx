import type { Movie } from "../models/Movie";

const API_URL = "https://www.omdbapi.com/?apikey=9a70465b";

async function FetchMovieById(id: string): Promise<Movie> {
  const res = await fetch(`${API_URL}&i=${id}`);
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}
export default FetchMovieById;
