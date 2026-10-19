import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import MovieCard from "../../component/MovieCard/MovieCard";
import { usePopularMovieList } from "../../services/api/movie";

function HomePage() {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const { data: movies = [], isLoading, isError } = usePopularMovieList();

  return (
    <div className="pb-16">
      <section style={{ maxWidth: 950, margin: "0 auto" }}>
        <div>
          <h1 className="text-primary-txt text-3xl font-thin pt-4">
            Welcome back,{" "}
            <span className="font-medium underline decoration-1 underline-offset-4 cursor-pointer">
              {currentUser?.username ?? "Movie Lover"}
            </span>
            . Let's review some movie today...{" "}
          </h1>
        </div>

        {isLoading && (
          <div className="mt-12 text-center text-primary-txt text-xl">
            Loading popular movies...
          </div>
        )}

        {isError && (
          <div className="mt-12 text-center text-red-400 text-lg">
            Failed to load popular movies. Please check your network or API
            token.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="mt-8">
            {movies.length > 0 ? (
              <div className="grid grid-cols-3">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="mt-12 flex w-full items-center justify-center">
                <h2 className="text-xl text-primary-txt">No movies found...</h2>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
