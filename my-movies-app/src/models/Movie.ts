export type Movie = {
  id: number;
  original_title: string;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average?: number;
  runtime: number;
  tagline: string;
  reviewed: boolean;
  genres: {
    id: string;
    name: string;
  }
};
