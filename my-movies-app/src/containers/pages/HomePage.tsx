import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import MovieCard from "../../component/MovieCard/MovieCard";
import { usePopularMovieList } from "../../services/api/movie";
import { Link, useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const { data, isLoading, isError } = usePopularMovieList(page);
  const movies = data?.results ?? [];

  return (
    <>
      <div className="py-16" style={{ width: 950, margin: "0 auto" }}>
        <div className="mb-10">
          <h1 className="text-primary-txt text-3xl font-thin pt-4">
            Welcome back,{" "}
            <span className="font-medium underline decoration-1 underline-offset-4 cursor-pointer">
              {currentUser?.username ?? "Movie Lover"}
            </span>
            . Let's review some movie today...{" "}
          </h1>
        </div>
        <div className="pb-3 border-b border-b-white flex flex-row justify-between">
          <span>POPULAR THIS WEEK</span>
          <Link
            to="/films/popular?page=1"
            className="opacity-50 hover:opacity-100 font-light"
          >
            MORE
          </Link>
        </div>
        <div>
          {!isLoading && !isError && (
            <div className="mt-8">
              {movies && movies.length > 0 ? (
                <div className="flex flex-row gap-x-5 overflow-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-bg-primary">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="mt-12 flex w-full items-center justify-center">
                  <h2 className="text-xl text-primary-txt">
                    No movies found...
                  </h2>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
