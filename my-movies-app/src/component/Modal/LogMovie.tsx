import { createPortal } from "react-dom";
import HeartFull from "../../assets/icon/heart-full.svg";
import HeartTouched from "../../assets/icon/heart-touched.svg";
import { useState } from "react";
import type { Movie } from "../../models/Movie";
import { TMDB_IMAGE_URL } from "../../env";
import { DatePicker, Rate } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

type LogMovieProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Movie;
};

export const StarIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 34 30"
    width="20"
    height="20"
    style={{ marginRight: 4, ...style }}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M32.1594,11.4821 L21.2115,11.4821 L17.9431,1.6761 C17.6484,0.7746 16.3514,0.7746 16.0567,1.6761 L12.7901,11.4821 L1.8421,11.4821 C1.0331,11.538 0.6328,12.9255 1.4118,13.4789 L10.0985,19.6801 L6.7805,29.7178 C6.4815,30.6193 7.53,31.3656 8.309,30.8079 L16.9999,24.6067 L25.6909,30.8079 C26.4698,31.3656 27.5183,30.6193 27.2193,29.7178 L23.9013,19.6801 L32.588,13.4789 C33.367,12.9255 32.9673,11.538 32.1594,11.4821 Z"
    />
  </svg>
);
function LogMovie({ isOpen, onClose, data }: LogMovieProps) {
  const [value, setValue] = useState<number>(3);
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      formDate: dayjs(),
      formReview: "",
      formRating: 0,
      formLiked: false,
    },
  });

  const disabledDate = (today: Dayjs) => {
    return today && today.isAfter(dayjs(), "day");
  };

  if (!isOpen) return;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onSubmit={handleSubmit(() => true)}
    >
      <div>
        <form className="rounded-lg bg-modal-bg w-200">
          <div className="flex flex-row justify-between items-center text-white text-2xl py-4 px-5 border-b border-b-bg-primary">
            <div>
              <span className="font-bold">I watched...</span>
            </div>
            <span
              className="cursor-pointer opacity-70 hover:opacity-100"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              x
            </span>
          </div>
          <div className="p-5">
            <div className="p-5">
              <div className="flex flex-row gap-10">
                <div>
                  <img
                    className="w-38.75 h-57.5 border border-white"
                    src={`${TMDB_IMAGE_URL}${data.poster_path}`}
                    style={{
                      boxShadow: "3px 3px 10px 0 rgb(0, 0, 0)",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div>
                    <span
                      className="text-white text-3xl mr-2 font-semibold cursor-pointer hover:text-blue-400"
                      onClick={() => {
                        navigate(`/movie?id=${data.id}`);
                        onClose();
                      }}
                    >
                      {data.title}
                    </span>
                    <span className="opacity-70 font-light">
                      {data.release_date.split("-")[0]}
                    </span>
                  </div>
                  <div>
                    <span>Watched on</span>
                    <Controller
                      name="formDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          style={{
                            backgroundColor: "#334455",
                            color: "var(--color-primary-text)",
                            outlineStyle: "none",
                            borderStyle: "none",
                            marginLeft: 8,
                            padding: "4px 6px",
                            fontWeight: "normal",
                          }}
                          defaultValue={dayjs()}
                          disabledDate={disabledDate}
                          format="DD MMM YYYY"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="formReview"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="bg-modal-input w-full resize-none rounded-xs text-black outline-none px-1.5 py-2 text-sm focus:bg-white"
                          placeholder="Add a review..."
                          rows={6}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 justify-end mt-3">
                <div className="flex flex-col">
                  <span>Rating</span>
                  <Controller
                    name="formRating"
                    control={control}
                    render={({ field }) => (
                      <Rate
                        {...field}
                        allowHalf
                        defaultValue={0}
                        value={value}
                        onChange={setValue}
                        character={() => <StarIcon />}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <span>Like</span>
                  <Controller
                    name="formLiked"
                    control={control}
                    render={({ field }) =>
                      field.value === true ? (
                        <img
                          className="cursor-pointer"
                          onClick={() => field.onChange(false)}
                          src={HeartFull}
                          alt="Liked"
                        />
                      ) : (
                        <img
                          className="cursor-pointer opacity-60 hover:opacity-100"
                          onClick={() => field.onChange(true)}
                          src={HeartTouched}
                          alt="Not Liked"
                        />
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 py-3 flex justify-end bg-bg-secondary">
            <button
              type="submit"
              className="text-white bg-primary-btn rounded-3xl py-2 px-4 cursor-pointer hover:opacity-85"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}

export default LogMovie;
