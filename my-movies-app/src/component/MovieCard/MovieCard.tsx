import { Link } from "react-router-dom";
import type { Movie } from "../../models/Movie";
import { TMDB_IMAGE_URL } from "../../env";

function MovieCard({ movie }: { movie: Movie }) {
  if (!movie) return null;

  const { id, title, poster_path, backdrop_path, release_date } = movie;
  const imagePath = poster_path || backdrop_path;
  const imageUrl = imagePath
    ? `${TMDB_IMAGE_URL}${imagePath}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <Link to={`/movie/${id}`}>
      <div className="group relative m-4 h-[440px] w-[280px] overflow-hidden rounded-xl border-none shadow-[0_13px_10px_-7px_rgba(0,0,0,0.3)] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0,1)] hover:scale-105 hover:shadow-[0_30px_18px_-8px_rgba(0,0,0,0.5)] max-[400px]:m-2 max-[400px]:w-full">
        <div className="absolute top-0 z-10 w-full p-4 text-primary-txt opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-b from-black/80 to-transparent">
          <p className="font-semibold text-sm line-clamp-2">{title}</p>
        </div>
        <div className="h-full w-full transition-opacity group-hover:opacity-40">
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt={title}
            loading="lazy"
          />
        </div>
        <div className="absolute right-0 bottom-0 left-0 bg-[#343739]/90 backdrop-blur-xs p-4 pt-3 pb-4 transition-colors group-hover:bg-transparent">
          <span className="font-raleway text-[12px] font-medium tracking-[2px] text-[#f0f0f0]/80 uppercase">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </span>
          <h3 className="mt-1 font-roboto text-primary-txt font-medium text-base truncate">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
