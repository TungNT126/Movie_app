import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import MovieCard from "../../component/MovieCard/MovieCard";
import { usePopularMovieList } from "../../services/api/movie";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const { data, isLoading, isError } = usePopularMovieList(page);
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages || 0;

  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => firstVisiblePage + index,
  );

  function goToPage(targetPage: number) {
    navigate(`/home?page=${targetPage}`);
  }

  return (
    // <div className="pb-16">
    //   <section style={{ maxWidth: 950, margin: "0 auto" }}>
    //     <div>
    //       <h1 className="text-primary-txt text-3xl font-thin pt-4">
    //         Welcome back,{" "}
    //         <span className="font-medium underline decoration-1 underline-offset-4 cursor-pointer">
    //           {currentUser?.username ?? "Movie Lover"}
    //         </span>
    //         . Let's review some movie today...{" "}
    //       </h1>
    //     </div>

    //     {isLoading && (
    //       <div className="mt-12 text-center text-primary-txt text-xl">
    //         Loading popular movies...
    //       </div>
    //     )}

    //     {isError && (
    //       <div className="mt-12 text-center text-red-400 text-lg">
    //         Failed to load popular movies. Please check your network or API
    //         token.
    //       </div>
    //     )}

    //     {!isLoading && !isError && (
    //       <div className="mt-8">
    //         {movies.length > 0 ? (
    //           <div className="grid grid-cols-4 gap-x-5">
    //             {movies.map((movie) => (
    //               <MovieCard key={movie.id} movie={movie} />
    //             ))}
    //           </div>
    //         ) : (
    //           <div className="mt-12 flex w-full items-center justify-center">
    //             <h2 className="text-xl text-primary-txt">No movies found...</h2>
    //           </div>
    //         )}
    //       </div>
    //     )}
    //     {!isLoading && !isError && totalPages > 1 && (
    //       <nav
    //         className="mt-8 flex flex-wrap items-center justify-center gap-2"
    //         aria-label="Popular movies pages"
    //       >
    //         <button
    //           type="button"
    //           onClick={() => goToPage(page - 1)}
    //           disabled={page <= 1}
    //           className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:bg-primary-txt/10 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
    //         >
    //           Previous
    //         </button>
    //         {firstVisiblePage > 1 && (
    //           <>
    //             <button
    //               type="button"
    //               onClick={() => goToPage(1)}
    //               className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:cursor-pointer hover:bg-primary-txt/10"
    //             >
    //               1
    //             </button>
    //             {firstVisiblePage > 2 && (
    //               <span className="px-1 text-primary-txt/70" aria-hidden="true">
    //                 ...
    //               </span>
    //             )}
    //           </>
    //         )}
    //         {visiblePages.map((visiblePage) => (
    //           <button
    //             key={visiblePage}
    //             type="button"
    //             onClick={() => goToPage(visiblePage)}
    //             aria-current={visiblePage === page ? "page" : undefined}
    //             className={`rounded border px-3 py-2 transition-colors ${
    //               visiblePage === page
    //                 ? "border-primary-txt bg-primary-txt text-bg-primary hover:cursor-pointer"
    //                 : "border-primary-txt/30 text-primary-txt hover:bg-primary-txt/10 hover:cursor-pointer"
    //             }`}
    //           >
    //             {visiblePage}
    //           </button>
    //         ))}
    //         {visiblePages[visiblePages.length - 1] < totalPages && (
    //           <>
    //             {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
    //               <span className="px-1 text-primary-txt/70" aria-hidden="true">
    //                 ...
    //               </span>
    //             )}
    //             <button
    //               type="button"
    //               onClick={() => goToPage(totalPages)}
    //               className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:bg-primary-txt/10 hover:cursor-pointer"
    //             >
    //               {totalPages}
    //             </button>
    //           </>
    //         )}
    //         <button
    //           type="button"
    //           onClick={() => goToPage(page + 1)}
    //           disabled={page >= totalPages}
    //           className="rounded border border-primary-txt/30 px-3 py-2 text-primary-txt transition-colors hover:bg-primary-txt/10 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
    //         >
    //           Next
    //         </button>
    //       </nav>
    //     )}
    //   </section>
    // </div>
    <>
      <div className="" style={{ width: 950, margin: "0 auto" }}>
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
          <Link to="/films" className="opacity-50 hover:opacity-100 font-light">
            MORE
          </Link>
        </div>
        <div>
          {!isLoading && !isError && (
            <div className="mt-8">
              {movies.length > 0 ? (
                <div className="flex flex-row gap-x-5 overflow-scroll scrollbar-none">
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
