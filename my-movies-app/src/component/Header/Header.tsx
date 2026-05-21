import { Link } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import RegisterForm from "../Modal/RegisterForm";

const btnClass =
  "h-10 w-[100px] cursor-pointer rounded-lg bg-[rgb(0,119,255)] text-white hover:bg-[rgb(0,119,255)]/80 hover:text-white/80";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <nav className="mb-8 flex w-full justify-between pt-4">
      <h1 className="w-fit text-5xl tracking-[0.9px] text-movie-accent max-[400px]:text-4xl">
        Movies Center
      </h1>

      <div className="flex w-[40%] justify-around items-center">
        <Link
          className="text-movie-accent no-underline hover:text-movie-accent/50"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-movie-accent no-underline hover:text-movie-accent/50"
          to="/about"
        >
          About
        </Link>
      </div>

      {currentUser ? (
        <>
          <div>{currentUser.username}</div>
          <div>
            <button
              type="button"
              className={btnClass}
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="flex">
          <button
            className={`mx-2 my-auto ${btnClass}`}
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsSignIn(true);
            }}
          >
            Sign in
          </button>
          <button
            className={`mx-2 my-auto ${btnClass}`}
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsSignIn(false);
            }}
          >
            Sign up
          </button>
        </div>
      )}

      <RegisterForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isSignIn={isSignIn}
      />
    </nav>
  );
}

export default Header;
