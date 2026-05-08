import { Link } from "react-router-dom";

type Movie = {
  Title: string;
  Poster: string;
  Type: string;
  imdbID: string;
};

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  if (!movie) return null;

  const { Title, Poster, Type } = movie;
  return (
    <>
      <Link to={`/${movie.Type}/${movie.imdbID}`}>
        <div className="movie">
          <div>
            <p>{Title}</p>
          </div>
          <div>
            <img
              src={
                Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"
              }
              alt={Title}
            />
          </div>
          <div>
            <span>{Type}</span>
            <h3>{Title}</h3>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MovieCard;
