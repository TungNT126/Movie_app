import { createPortal } from "react-dom";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMovieDetail,
  useSearchMovieByTitle,
} from "../../services/api/movie";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LogMovie from "./LogMovie";
import { type Movie } from "../../models/Movie";

const schema = z.object({
  formValue: z.string(),
});

type FormInput = z.infer<typeof schema>;

type FindMovieProps = {
  isOpen: boolean;
  onClose: () => void;
};

function FindMovie({ isOpen, onClose }: FindMovieProps) {
  const [debounceQuery, setDebounceQuery] = useState("");
  const [isOpenLog, setIsOpenLog] = useState(false);
  const [searchParams] = useSearchParams();
  const [pickedMovie, setPickedMovie] = useState<Movie>();

  const movieId = searchParams.get("id") || "";

  const { data: movie } = useMovieDetail(movieId);

  const { control } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      formValue: "",
    },
  });

  const watchedTitle = useWatch({
    control,
    name: "formValue",
  });

  // Debounce Search - chờ 800ms trc khi gọi api
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(watchedTitle || "");
    }, 800);

    return () => clearTimeout(timer);
  }, [watchedTitle]);

  const { data } = useSearchMovieByTitle(debounceQuery);

  const searchResults = data?.results;

  if (!isOpen) return;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form className="rounded-lg bg-modal-bg w-200">
          <div className="flex flex-row justify-between items-center text-white text-2xl py-4 px-5 border-b border-b-bg-primary">
            <span>Add to your films...</span>
            <span
              className="cursor-pointer opacity-70 hover:opacity-100"
              onClick={onClose}
            >
              x
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-5">
            <div className="py-5">
              <div className="flex flex-col justify-start">
                <Controller
                  name="formValue"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="h-10 w-112.5 bg-modal-input text-black p-2.5 rounded-t-[3px] outline-none focus:bg-white relative"
                      type="text"
                      placeholder="Search for movies..."
                      {...field}
                    />
                  )}
                />
              </div>
              {searchResults && (
                <div
                  className="w-112.5 max-h-45 text-primary-txt rounded-[3px]  bg-bg-list overflow-auto z-10 absolute"
                  style={{
                    boxShadow: "0 4px 5px 0 rgb(0, 0, 0)",
                  }}
                >
                  <ul>
                    {searchResults.map((movie) => (
                      <li
                        key={movie.id}
                        className="hover:bg-primary-btn cursor-pointer "
                        style={{ padding: "5px 8px 5px 10px" }}
                        onClick={() => {
                          // onClose();
                          setIsOpenLog(true);
                          setPickedMovie(movie);
                        }}
                      >
                        <div>
                          <span>{movie.title}</span>
                          <span className="pl-2 text-xs font-light">
                            {`(${movie.release_date && movie.release_date.split("-")[0]}, ${movie.original_title && movie.original_title})`}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}{" "}
              {movieId !== "" && (
                <div
                  className="text-primary-txt text-sm mt-4 cursor-default"
                  onClick={() => {
                    setIsOpenLog(true);
                    setPickedMovie(movie);
                  }}
                >
                  <span className="font-light opacity-70">Or add </span>
                  <span className="bg-[#334455] text-white py-1 px-1.5 rounded-sm hover:text-blue-400">
                    <span>{`${movie?.title}`}</span>
                    <span className="opacity-50 text-xs font-light pl-1">{`${movie?.release_date.split("-")[0]}`}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      {isOpenLog && pickedMovie && (
        <LogMovie
          isOpen={isOpenLog}
          onClose={() => setIsOpenLog(false)}
          data={pickedMovie}
        />
      )}
    </div>,
    document.body,
  );
}

export default FindMovie;
