import type { Movie } from "./Movie";

export type Person = {
    id: number,
    name: string,
    original_name: string,
    media_type: "person" | "movie" | "tv",
    gender: number,
    known_for_department: string,
    profile_path: string,
    known_for: Movie[]
}

export type SearchResultModel = {
    results: (Person & Movie)[];
    page: number;
    total_pages: number;
    total_results: number;
}


