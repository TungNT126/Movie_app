import { useQuery } from "@tanstack/react-query";
import { FetchMovieById, FetchPopularMovie } from "../queries";

export function usePopularMovieList() {
    return useQuery({
        queryKey: ['popular_movie'],
        queryFn: () => FetchPopularMovie(),
    });
}

export function useMovieDetail(id: string) {
    return useQuery({
        queryKey: ['movie_detail', id],
        queryFn: () => FetchMovieById(id),
        enabled: Boolean(id),
    })
} 