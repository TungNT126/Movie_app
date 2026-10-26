import { useNavigate, useSearchParams } from "react-router-dom";
import { usePopularMovieList } from "../../services/api/movie";
import MovieCard from "../../component/MovieCard/MovieCard";

function PopularFilmPage() {
  const [searchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const navigate = useNavigate();

  const { data, isLoading, isError } = usePopularMovieList(page);

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages || 0;

  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => firstVisiblePage + index,
  );

  function goToPage(targetPage: number) {
    navigate(`/films/popular?page=${targetPage}`);
  }

  return (
    <>
      <div style={{ width: 950, margin: "0 auto", padding: "64px 0px" }}>
        <div className="pb-3 border-b border-b-white flex flex-row justify-between">
          <span>POPULAR THIS WEEK</span>
          <span
            className="relative text-primary-txt/80 hover:text-primary-txt no-underline cursor-pointer pr-2"
            onClick={() => navigate("/films/top-rated")}
          >
            {">> Top rated <<"}
          </span>
        </div>
        <div>
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
                <div className="grid grid-cols-4 gap-x-5">
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
          {!isLoading && !isError && totalPages > 1 && (
            <nav
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
              aria-label="Popular movies pages"
            >
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:bg-primary-txt/10 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              {firstVisiblePage > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goToPage(1)}
                    className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:cursor-pointer hover:bg-primary-txt/10"
                  >
                    1
                  </button>
                  {firstVisiblePage > 2 && (
                    <span
                      className="px-1 text-primary-txt/70"
                      aria-hidden="true"
                    >
                      ...
                    </span>
                  )}
                </>
              )}
              {visiblePages.map((visiblePage) => (
                <button
                  key={visiblePage}
                  type="button"
                  onClick={() => goToPage(visiblePage)}
                  aria-current={visiblePage === page ? "page" : undefined}
                  className={`rounded border px-3 py-2 transition-colors ${
                    visiblePage === page
                      ? "border-primary-txt bg-primary-txt text-bg-primary hover:cursor-pointer"
                      : "border-primary-txt/30 text-primary-txt hover:bg-primary-txt/10 hover:cursor-pointer"
                  }`}
                >
                  {visiblePage}
                </button>
              ))}
              {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                  {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                    <span
                      className="px-1 text-primary-txt/70"
                      aria-hidden="true"
                    >
                      ...
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => goToPage(totalPages)}
                    className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:bg-primary-txt/10 hover:cursor-pointer"
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:bg-primary-txt/10 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}

export default PopularFilmPage;
