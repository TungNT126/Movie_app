import type { Movie } from "../models/Movie";
import { apiClient } from "./apiClient";
import { type MoviePage } from "../models/Movie";

export async function FetchPopularMovie(page: number): Promise<MoviePage> {
  return apiClient<MoviePage>(`movie/popular?page=${page}`);
}

export async function FetchMovieById(id: string): Promise<Movie> {
  return apiClient<Movie>(`/movie/${id}`);
}