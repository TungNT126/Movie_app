import MovieDetails from "../pages/MovieDetails";
import LayoutShell from "./shared/LayoutShell";
import Loading from "./shared/Loading";
import { Suspense } from "react";

function MovieDetailsLayout() {
  return (
    <LayoutShell>
      <Suspense fallback={<Loading />}>
        <MovieDetails />
      </Suspense>
    </LayoutShell>
  );
}

export default MovieDetailsLayout;
