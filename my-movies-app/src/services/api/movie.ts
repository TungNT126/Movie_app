import { useQuery } from "@tanstack/react-query";
import { FetchMovieById, FetchPopularMovie } from "../queries";

export function usePopularMovieList(page: number) {
    return useQuery({
        queryKey: ['popular_movie', page],
        queryFn: () => FetchPopularMovie(page),
        staleTime: Infinity
    });
}

export function useMovieDetail(id: string) {
    return useQuery({
        queryKey: ['movie_detail', id],
        queryFn: () => FetchMovieById(id),
        enabled: Boolean(id),
        staleTime: Infinity
    })
} 