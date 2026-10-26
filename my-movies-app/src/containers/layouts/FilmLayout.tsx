import LayoutShell from "./shared/LayoutShell";
import PopularFilmPage from "../pages/PopularFilmPage";
import { Route, Routes } from "react-router-dom";
import TopRatedFilmPage from "../pages/TopRatedFilmPage";

function FilmLayout() {
  return (
    <>
      <LayoutShell>
        <Routes>
          <Route path="popular" element={<PopularFilmPage />} />
          <Route path="top-rated" element={<TopRatedFilmPage />} />
        </Routes>
      </LayoutShell>
    </>
  );
}

export default FilmLayout;
