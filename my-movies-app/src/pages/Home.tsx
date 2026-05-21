import { useState } from "react";
import { useNavigate } from "react-router-dom";

const searchBarClass =
  "my-16 mb-8 flex w-full items-center justify-center gap-2 rounded-[3rem] bg-[#1f2123] px-7 py-6 shadow-[5px_5px_7px_#1c1d1f,-5px_-5px_7px_#222527] max-[600px]:px-7 max-[600px]:py-4";

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [page] = useState(1);
  const navigate = useNavigate();

  function handleSearch() {
    if (searchValue.trim() !== "") {
      navigate(`/search/${searchValue}?page=${page}`);
    }
  }

  return (
    <div className="w-full">
      <div className={searchBarClass}>
        <label htmlFor="home-search">Search</label>
        <input
          id="home-search"
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
    </div>
  );
}

export default Home;
