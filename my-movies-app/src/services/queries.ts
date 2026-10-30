import type { Movie } from "../models/Movie";
import { apiClient } from "./apiClient";
import { type MoviePage } from "../models/Movie";
import type { SearchResultModel } from "../models/Search";
import type { Genre } from "../models/Genre";

export async function FetchPopularMovie(page: number): Promise<MoviePage> {
  return apiClient<MoviePage>(`movie/popular?page=${page}`);
}

export async function FetchTopRatedMovie(page: number): Promise<MoviePage> {
  return apiClient<MoviePage>(`movie/top_rated?page=${page}`)
}

export async function FetchMovieById(id: string): Promise<Movie> {
  return apiClient<Movie>(`/movie/${id}`);
}

export async function FetchAnything(value: string, page?: number): Promise<SearchResultModel> {
  return apiClient<SearchResultModel>(`search/multi?query=${value}&page=${page}`)
}

export async function FetchMovieByTitle(value: string): Promise<MoviePage> {
  return apiClient<MoviePage>(`/search/movie?query=${value}`)
}

export async function FetchMovieGenres(): Promise<Genre[]> {
  const response = await apiClient<{ genres: Genre[] }>(`/genre/movie/list`);
  return response.genres;
}