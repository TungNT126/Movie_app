import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import FetchMovieById from "../../services/FetchMovieById";
import { useState } from "react";
import type { Review } from "../../models/Review";
import type { User } from "../../models/User";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { type RootState } from "../../redux/store";

const btnClass =
  "h-10 w-[100px] cursor-pointer rounded-lg bg-[rgb(0,119,255)] text-white hover:bg-[rgb(0,119,255)]/80 hover:text-white/80";

function Details() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const existingReview = currentUser?.movieReviews?.find(
    (review: Review) => review.movieId === id,
  );

  const [reviewText, setReviewText] = useState("");

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => FetchMovieById(id!),
    enabled: !!id,
    retry: false,
  });

  if (isLoading) return <p className="text-white">Loading...</p>;

  if (isError)
    return <p className="text-white">Error loading movie's details</p>;

  function handleAddReview() {
    if (!currentUser) {
      return;
    } else {
      if (!reviewText.trim()) {
        alert("Please write something before submitting");
      } else {
        const newReview: Review = {
          movieId: id,
          content: reviewText,
          createdAt: Date.now(),
        };

        const updatedCurrentUser: User = {
          ...currentUser,
          movieReviews: [...currentUser.movieReviews, newReview],
        };

        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        const updatedUserList = existingUsers.map((user: User) => {
          if (user.username === currentUser?.username) {
            return updatedCurrentUser;
          }
          return user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUserList));
        localStorage.setItem(
          "current_user",
          JSON.stringify(updatedCurrentUser),
        );

        dispatch(login(updatedCurrentUser));

        setReviewText("");
        alert("Add review successful");
      }
    }
  }

  return (
    <>
      <div className="flex flex-row justify-around">
        <div>
          <h1>{movie?.Title}</h1>
          <img src={movie?.Poster} alt={movie?.Title} />
          <p>Year: {movie?.Year}</p>
          <p>Type: {movie?.Type}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="review">Review</label>
          {!currentUser ? (
            <span>Please login to write review</span>
          ) : existingReview ? (
            <span>{existingReview.content}</span>
          ) : (
            <>
              <textarea
                id="review"
                className="h-[400px] w-full"
                name="review"
                placeholder="write review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <button
                type="button"
                className={btnClass}
                onClick={handleAddReview}
              >
                Add Review
              </button>
              <div>
                <span>Đánh giá của bạn:</span>
              </div>
            </>
          )}
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
    </>
  );
}

export default Details;
