import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSearchTerm } from "../../services/api/movie";
import { TMDB_IMAGE_URL } from "../../env";

function SearchList() {
  const params = useParams();
  const value = params.searchField || "";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const { data, isLoading, isError } = useSearchTerm(value, page);

  const results = data?.results ?? [];
  const totalPages = data?.total_pages || 0;

  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => firstVisiblePage + index,
  );

  function goToPage(targetPage: number) {
    navigate(`/search/${value}?page=${targetPage}`);
  }

  return (
    <>
      <div
        style={{
          width: 950,
          margin: "0 auto",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="py-2 border-b text-left">
          <span>{`SHOWING MATCHES FOR "${value.toUpperCase()}"`}</span>
        </div>
        {isLoading && <span>Loading...</span>}
        {!isLoading && !isError && (
          <div>
            {results.map((result) => (
              <ul className="text-left">
                <li key={result.id} className="py-6 border-b">
                  {result.media_type === "person" ? (
                    <div className="flex flex-row mr-10">
                      <img
                        src={`${TMDB_IMAGE_URL}${result.profile_path}`}
                        alt=""
                        className="w-19 h-27"
                      />
                      <div className="flex flex-col">
                        <h2>{result.name}</h2>
                        <span>{`Major department ${result.known_for_department}`}</span>
                        <span>{`Star of ${result.known_for.length}...`}</span>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={`/movie?id=${result.id}`}
                      className="flex flex-row"
                    >
                      <img
                        src={`${TMDB_IMAGE_URL}${result.poster_path}`}
                        alt=""
                        className="w-19 h-27 mr-10"
                      />
                      <div className="flex flex-col">
                        <div className="flex flex-row gap-4">
                          <h1>{result.title || result.name}</h1>
                          <span>
                            {(result.release_date?.split("-")[0] ?? "") ||
                              (result.first_air_date?.split("-")[0] ?? "")}
                          </span>
                        </div>
                        <span>
                          Original title:{" "}
                          {result.original_name || result.original_title}
                        </span>
                        <span>Type: {result.media_type}</span>
                      </div>
                    </Link>
                  )}
                </li>
              </ul>
            ))}
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
                  <span className="px-1 text-primary-txt/70" aria-hidden="true">
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
                  <span className="px-1 text-primary-txt/70" aria-hidden="true">
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
    </>
  );
}

export default SearchList;
