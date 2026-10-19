import { useQuery } from "@tanstack/react-query";
import { FetchPopularMovie } from "../queries";

export function usePopularMovieList() {
    return useQuery({
        queryKey: ['popular_movie'],
        queryFn: () => FetchPopularMovie(),
    });
}