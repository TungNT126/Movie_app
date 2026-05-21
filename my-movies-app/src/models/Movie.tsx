export type Movie = {
  tmdb: {
    type: string;
    id: string;
    season: number | null;
    vote_average: Float32List;
    vote_count: number;
  };
  imdb: {
    id: string;
  };
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  origin_name: string;
  slug: string;
  poster_url: string;
  thumb_url: string;
  year: number;
};
