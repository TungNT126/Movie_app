export type Movie = {
  id: number;
  original_title: string;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  first_air_date: string;
  overview: string;
  vote_average?: number;
  runtime: number;
  tagline: string;
  reviewed: boolean;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  genres: {
    id: string;
    name: string;
  };
};

export type MoviePage = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};
