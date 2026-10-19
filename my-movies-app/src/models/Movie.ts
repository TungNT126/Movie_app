export type Movie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  overview?: string;
  vote_average?: number;
};
