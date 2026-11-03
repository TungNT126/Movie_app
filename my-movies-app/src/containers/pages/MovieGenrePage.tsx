import { useNavigate, useSearchParams } from "react-router-dom";
import { useGenreList, useMovieFilter } from "../../services/api/movie";
import MovieCard from "../../component/MovieCard/MovieCard";
import { useState } from "react";
import { IconDropDown } from "../../utils/constant";

function MovieGenrePage() {
  const [searchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get("page"));
  const [genreSelected, setGenreSelected] = useState<number>(12);
  const [selectedGenreName, setSelectedGenreName] = useState("All genres");
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const navigate = useNavigate();

  const { data: genreList } = useGenreList();

  const { data, isLoading, isError } = useMovieFilter(genreSelected, page);

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages || 0;

  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => firstVisiblePage + index,
  );

  function goToPage(value: number, targetPage: number) {
    navigate(`/films/genres/${value}?page=${targetPage}`);
  }

  console.log(genreSelected);

  return (
    <>
      <div style={{ width: 950, margin: "0 auto", padding: "64px 0px" }}>
        <div>
          <span>BROWSE BY:</span>
          <div className="relative ml-5 inline-block">
            <button
              type="button"
              className="rounded min-w-20 p-2 text-left text-primary-txt outline-none cursor-pointer"
              aria-haspopup="listbox"
              aria-expanded={isGenreMenuOpen}
              onClick={() => setIsGenreMenuOpen((isOpen) => !isOpen)}
            >
              {selectedGenreName}
            </button>
            <IconDropDown className="inline" />
            {isGenreMenuOpen && (
              <div
                className="absolute z-100 h-100 overflow-y-auto rounded scrollbar-thin scrollbar-thumb-bg-primary scrollbar-track-bg-list"
                role="listbox"
                aria-label="Movie genres"
                style={{
                  boxShadow: "2px 5px 5px 0 rgb(0, 0, 0)",
                }}
              >
                <button
                  type="button"
                  className={`h-10 w-full px-3 text-left text-primary-txt hover:bg-primary-btn cursor-pointer ${selectedGenreName === "All genres" ? "bg-primary-btn" : "bg-bg-list"}`}
                  role="option"
                  aria-selected={selectedGenreName === "All genres"}
                  onClick={() => {
                    setIsGenreMenuOpen(false);
                    navigate("/films/popular");
                  }}
                >
                  All genres
                </button>
                {genreList?.map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    className={`h-10 w-full px-3 text-left text-primary-txt text-nowrap hover:bg-primary-btn cursor-pointer ${selectedGenreName === genre.name ? "bg-primary-btn" : "bg-bg-list"}`}
                    role="option"
                    aria-selected={selectedGenreName === genre.name}
                    onClick={() => {
                      setGenreSelected(genre.id);
                      setSelectedGenreName(genre.name);
                      setIsGenreMenuOpen(false);
                      navigate(`/films/genres/${genre.name}?page=1`);
                    }}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          {isLoading && (
            <div className="mt-12 text-center text-primary-txt text-xl">
              Loading movies...
            </div>
          )}

          {isError && (
            <div className="mt-12 text-center text-red-400 text-lg">
              Failed to load movies. Please check your network or API token.
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
                onClick={() => goToPage(genreSelected, page - 1)}
                disabled={page <= 1}
                className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:bg-primary-txt/10 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              {firstVisiblePage > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goToPage(genreSelected, 1)}
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
                  onClick={() => goToPage(genreSelected, visiblePage)}
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
                    onClick={() => goToPage(genreSelected, totalPages)}
                    className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:bg-primary-txt/10 hover:cursor-pointer"
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => goToPage(genreSelected, page + 1)}
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

export default MovieGenrePage;
