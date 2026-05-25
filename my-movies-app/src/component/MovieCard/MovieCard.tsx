import { Link } from "react-router-dom";
import type { Movie } from "../../models/Movie";

function MovieCard({ movie }: { movie: Movie }) {
  if (!movie) return null;

  const { title, poster_url, type } = movie;
  return (
    <Link to={`/${movie.type}/${movie.title}`}>
      <div className="group relative m-6 h-[460px] w-[310px] overflow-hidden rounded-xl border-none shadow-[0_13px_10px_-7px_rgba(0,0,0,0.1)] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0,1)] hover:scale-105 hover:shadow-[0_30px_18px_-8px_rgba(0,0,0,0.1)] max-[400px]:m-4 max-[400px]:w-full">
        <div className="absolute top-0 w-full p-4 text-movie-accent opacity-0 transition-opacity group-hover:opacity-100">
          <p>{title}</p>
        </div>
        <div className="h-full w-full transition-opacity group-hover:opacity-30">
          <img
            className="h-full w-full object-cover"
            src={
              poster_url !== "N/A"
                ? poster_url
                : "https://via.placeholder.com/400"
            }
            alt={type}
          />
        </div>
        <div className="absolute right-0 bottom-0 left-0 bg-[#343739] p-4 pt-4 pb-6 transition-colors group-hover:bg-transparent">
          <span className="font-raleway text-[13px] font-medium tracking-[2px] text-[#f0f0f0] uppercase">
            {type}
          </span>
          <h3 className="mt-1.5 font-roboto text-movie-accent">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
