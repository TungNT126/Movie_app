import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import FetchMovieById from "../../services/FetchMovieById";
import "./Details.css";
import { useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import type { Review } from "../../models/Review";
import type { User } from "../../models/User";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { type RootState } from "../../redux/store";

function Details() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  // const authContext = useContext(AuthContext);

  // const currentUser = authContext?.currentUser;
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

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error loading movie's details</p>;

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
      <div className="review">
        <div className="review-movie">
          <h1>{movie?.Title}</h1>
          <img src={movie?.Poster} alt={movie?.Title} />
          <p>Year: {movie?.Year}</p>
          <p>Type: {movie?.Type}</p>
        </div>
        <div className="review-textbox">
          <label htmlFor="review">Review</label>
          {!currentUser ? (
            <span>Please login to write review</span>
          ) : existingReview ? (
            <span>{existingReview.content}</span>
          ) : (
            <>
              <textarea
                name="review"
                placeholder="write review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
              <button type="button" className="btn" onClick={handleAddReview}>
                Add Review
              </button>
              <div className="rating-container">
                <span className="rating-label">Đánh giá của bạn:</span>
              </div>
            </>
          )}
        </div>
      </div>
      <button
        className="btn"
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
