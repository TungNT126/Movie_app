type Movie = {
  Title: string;
  Poster: string;
  Type: string;
  imdbID: string;
  Year: number;
};

const API_URL = "https://www.omdbapi.com?&apikey=ee050ccd";

async function FetchMovieById(id: string): Promise<Movie> {
  const res = await fetch(`${API_URL}&i=${id}`);
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}
export default FetchMovieById;
