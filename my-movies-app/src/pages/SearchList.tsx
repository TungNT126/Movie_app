import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import FetchMovies from "../services/FetchMovies";
import MovieCard from "../component/MovieCard/MovieCard";

function SearchList() {
  // Lấy value từ URL
  const { value } = useParams();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [searchValue, setSearchValue] = useState(value || "");
  const [preValue, setPreValue] = useState(value);

  const navigate = useNavigate();

  // So sánh value trên URL và value hiện tại
  if (value !== preValue) {
    setPreValue(value);
    setSearchValue(value || "");
  }

  // useQuery to fetch data
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", value, page],
    queryFn: () => FetchMovies(value, page),
    enabled: !!value,
  });

  // Điều hướng tới URL với searchValue
  function handleSearch() {
    if (searchValue.trim() !== "") {
      navigate(`/search/${searchValue}`);
    }
  }

  return (
    <div>
      <div className="search">
        <label htmlFor="">Search</label>
        <input
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
          onClick={() => {
            handleSearch();
          }}
        >
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20230626112934/search.png"
            alt="search icon"
          />
        </button>
      </div>
      {isLoading && <h2 className="loading">Loading...</h2>}
      <div>
        {!isLoading && movies.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <div key={movie.imdbID}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found...</h2>
          </div>
        )}
      </div>
      <div className="page-btn">
        <button
          type="button"
          className="btn"
          onClick={() => {
            navigate(`/search/${value}?page=${page - 1}`);
          }}
          disabled={page === 1}
        >
          Back◀️
        </button>
        <button
          type="button"
          className="btn"
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
