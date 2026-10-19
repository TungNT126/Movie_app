import type { Movie } from "../models/Movie";
import { apiClient } from "./apiClient";

export async function FetchPopularMovie(): Promise<Movie[]> {
  const data = await apiClient<{ results: Movie[] }>("/movie/popular");
  return data.results ?? [];
}