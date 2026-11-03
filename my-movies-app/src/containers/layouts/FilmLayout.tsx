import LayoutShell from "./shared/LayoutShell";
import PopularFilmPage from "../pages/PopularFilmPage";
import { Route, Routes } from "react-router-dom";
import TopRatedFilmPage from "../pages/TopRatedFilmPage";
import { Suspense } from "react";
import Loading from "./shared/Loading";
import MovieGenrePage from "../pages/MovieGenrePage";

function FilmLayout() {
  return (
    <>
      <LayoutShell>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="popular" element={<PopularFilmPage />} />
            <Route path="top-rated" element={<TopRatedFilmPage />} />
            <Route path="genres/*" element={<MovieGenrePage />} />
          </Routes>
        </Suspense>
      </LayoutShell>
    </>
  );
}

export default FilmLayout;
