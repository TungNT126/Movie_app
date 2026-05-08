import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
}

export default Home;
