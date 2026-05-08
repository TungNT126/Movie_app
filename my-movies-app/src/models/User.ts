import type { Review } from "./Review";

export interface User {
    id: string,
    username: string,
    email: string,
    password: string,
    movieReviews: Review[];
}