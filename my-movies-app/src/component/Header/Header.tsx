import { Link } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import RegisterForm from "../Modal/RegisterForm";
// import { AuthContext } from "../../contexts/AuthContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const dispatch = useDispatch();

  // const authContext = useContext(AuthContext);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <nav className="head">
      <h1 className="head-title">Movies Center</h1>

      <div className="head-navigate">
        <Link className="head-navigate_item" to="/">
          Home
        </Link>
        <Link className="head-navigate_item" to="/about">
          About
        </Link>
      </div>

      {currentUser ? (
        <>
          <div>{currentUser.username}</div>
          <div className="head-btn">
            <button
              type="button"
              className="btn"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="head-btn">
          <button
            className="head-login btn"
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsSignIn(true);
            }}
          >
            Sign in
          </button>
          <button
            className="head-login btn"
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
