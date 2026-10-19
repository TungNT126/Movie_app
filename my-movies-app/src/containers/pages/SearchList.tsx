import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import MovieCard from "../../component/MovieCard/MovieCard";
import { usePopularMovieList } from "../../services/api/movie";

const searchBarClass =
  "my-16 mb-8 flex w-full items-center justify-center gap-2 rounded-[3rem] bg-[#1f2123] px-7 py-6 shadow-[5px_5px_7px_#1c1d1f,-5px_-5px_7px_#222527] max-[600px]:px-7 max-[600px]:py-4";

const btnClass =
  "h-10 w-[100px] cursor-pointer rounded-lg bg-[rgb(0,119,255)] text-white hover:bg-[rgb(0,119,255)]/80 hover:text-white/80";

function SearchList() {
  const { value } = useParams();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [searchValue, setSearchValue] = useState(value || "");
  const [preValue, setPreValue] = useState(value);

  const navigate = useNavigate();

  if (value !== preValue) {
    setPreValue(value);
    setSearchValue(value || "");
  }

  const { data: movies = [], isLoading } = usePopularMovieList();

  function handleSearch() {
    if (searchValue.trim() !== "") {
      navigate(`/search/${searchValue}`);
    }
  }

  return (
    <div className="w-full">
      <div className={searchBarClass}>
        <label htmlFor="search-list-input">Search</label>
        <input
          id="search-list-input"
          className="min-w-0 flex-1 rounded border-none bg-white px-1.5 py-1.5 font-raleway text-base font-medium text-[#898989] outline-none"
          type="text"
          placeholder="Enter movie title"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          type="button"
          className="h-[35px] w-[35px] shrink-0 cursor-pointer rounded-[10px]"
          onClick={() => {
            handleSearch();
          }}
        >
          <img
            className="relative top-px -right-0.5 w-6 max-[600px]:h-5 max-[600px]:w-5"
            src="https://media.geeksforgeeks.org/wp-content/uploads/20230626112934/search.png"
            alt="search icon"
          />
        </button>
      </div>
      {isLoading && <h2 className="text-white">Loading...</h2>}
      <div>
        {!isLoading && movies.length > 0 ? (
          <div className="mt-12 flex w-full flex-wrap items-center justify-center max-[400px]:mt-8">
            {movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex w-full items-center justify-center">
            <h2 className="font-raleway text-xl text-primary-txt">
              No movies found...
            </h2>
          </div>
        )}
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          className={btnClass}
          onClick={() => {
            navigate(`/search/${value}?page=${page - 1}`);
          }}
          disabled={page === 1}
        >
          Back◀️
        </button>
        <button
          type="button"
          className={btnClass}
          onClick={() => {
            navigate(`/search/${value}?page=${page + 1}`);
          }}
        >
          Next▶️
        </button>
      </div>
    </div>
  );
}

export default SearchList;
