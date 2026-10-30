import { useNavigate, useSearchParams } from "react-router-dom";
import { useMovieDetail } from "../../services/api/movie";
import { TMDB_IMAGE_URL } from "../../env";
import { useState } from "react";
import LogMovie from "../../component/Modal/LogMovie";

const btnClass =
  "h-10 w-[100px] cursor-pointer rounded-lg bg-[rgb(0,119,255)] text-white hover:bg-[rgb(0,119,255)]/80 hover:text-white/80";

function MovieDetails() {
  const [isLog, setIsLog] = useState(false);
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("id");
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useMovieDetail(movieId ?? "");

  if (!movieId) return <p className="text-white">Movie ID is missing.</p>;

  if (isLoading) return <p className="text-white">Loading...</p>;

  const yearReleased = data?.release_date.split("-")[0];

  if (isError)
    return (
      <p className="text-white">
        Error loading movie details:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );

  return (
    <>
      <div
        style={{
          margin: "0 auto",
          backgroundImage: `url(${TMDB_IMAGE_URL}${data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          objectFit: "cover",
          width: "1200px",
          height: "500px",
          boxShadow:
            "inset 80px 80px 60px -20px var(--color-bg-secondary), inset -80px -80px 60px -20px var(--color-bg-secondary)",
        }}
      />
      <div style={{ width: 950, margin: "0 auto", position: "relative" }}>
        <div className="flex flex-row justify-between gap-10">
          <div>
            <img
              className="rounded-lg object-cover border"
              src={
                data?.poster_path
                  ? `${TMDB_IMAGE_URL}${data.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt={data?.title ?? "Movie poster"}
              style={{
                height: 345,
                boxShadow: "10px 10px 60px 0 rgb(0, 0, 0)",
              }}
            />
          </div>
          <div>
            <div className="flex flex-row flex-wrap items-end gap-4 mb-10">
              <span className="text-3xl font-bold text-white text-left">
                {data?.title}
              </span>
              <div>
                <span className="font-extralight mr-2">{yearReleased}</span>
                <span className="font-extralight">{data?.runtime} mins</span>
              </div>
            </div>
            <div
              className="flex flex-col text-left items-start"
              style={{ width: 390 }}
            >
              <span className="mb-2.5 font-light opacity-80">{`${data?.tagline?.toUpperCase()}`}</span>
              <p className="opacity-80">{data?.overview}</p>
            </div>
            <div className="flex justify-start mt-5">
              <button
                className="bg-primary-btn text-white rounded-sm py-1 px-4 cursor-pointer hover:opacity-70"
                onClick={() => setIsLog(true)}
              >
                + Log
              </button>
            </div>
          </div>
        </div>
        <button
          className={btnClass}
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
      </div>
      {isLog && data && (
        <LogMovie isOpen={isLog} onClose={() => setIsLog(false)} data={data} />
      )}
    </>
  );
}

export default MovieDetails;
