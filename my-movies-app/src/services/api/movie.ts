import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { FetchAnything, FetchMovieById, FetchPopularMovie, FetchTopRatedMovie } from "../queries";

export function usePopularMovieList(page: number) {
    return useQuery({
        queryKey: ['popular_movie', page],
        queryFn: () => FetchPopularMovie(page),
        placeholderData: keepPreviousData,
        staleTime: 5*60*1000
    });
}

export function useTopRatedMovieList(page: number) {
    return useQuery({
        queryKey: ['top_rated_movie', page],
        queryFn: () => FetchTopRatedMovie(page),
        placeholderData: keepPreviousData,
        staleTime: 5*60*1000
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

export function useSearchTerm(value: string, page?: number) {
    return useQuery({
        queryKey: ['search_value', value, page],
        queryFn: () => FetchAnything(value, page)
    })
}