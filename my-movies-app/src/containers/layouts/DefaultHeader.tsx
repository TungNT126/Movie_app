import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import SearchIcon from "../../assets/icon/search.svg";
import CancelIcon from "../../assets/icon/cancel.svg";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import RegisterForm from "../../component/Modal/RegisterForm";
import SearchForm from "../../component/SearchForm/SearchForm";
import LoginForm from "../../component/Modal/LoginForm";
import FindMovie from "../../component/Modal/FindMovie";

const ChevronDownIcon = ({
  size = 12,
  color = "#99aabb",
  className = "",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={(size * 11) / 18} // Giữ đúng tỉ lệ 18:11
      viewBox="611 775 18 11"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M620.0812 786 611.0012 776.91 612.9112 775 620.0812 782.17 627.0912 775.17 629.0012 777.08z" />
    </svg>
  );
};

function DefaultHeader() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenSubNav, setIsOpenSubNav] = useState(false);
  const [isOpenLogMovie, setIsOpenLogMovie] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(50 / 12);

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <nav
      className={`flex w-full justify-between items-center pt-4 ${path === "/login" || path === "/movie" ? "absolute" : ""} pb-4`}
    >
      <section
        style={{
          width: 950,
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1
          className="w-fit text-3xl tracking-[0.9px] text-primary-txt max-[400px]:text-4xl cursor-pointer text-nowrap"
          onClick={() => navigate("/home")}
        >
          Movies Center
        </h1>

        {currentUser ? (
          <div className="flex flex-row justify-between items-center gap-4">
            <div
              className="relative w"
              onMouseEnter={() => setIsOpenSubNav(true)}
              onMouseLeave={() => setIsOpenSubNav(false)}
            >
              <div className="flex flex-row items-center px-2 py-1 rounded-xs cursor-pointer">
                <span className="text-primary-txt/80 hover:text-primary-txt no-underline cursor-pointer pr-2">
                  {currentUser.username}
                </span>
                <div>
                  <ChevronDownIcon />
                </div>
              </div>

              {isOpenSubNav && (
                <>
                  <div className="absolute h-3 w-full"></div>
                  <ul className="absolute top-full left-0 mt-1 bg-modal-text rounded shadow-xl/30 min-w-30 z-50">
                    <li className="text-bg-primary hover:text-white px-3 py-1.5 hover:bg-modal-bg hover:cursor-pointer rounded-t text-left">
                      Profile
                    </li>
                    <li
                      className="text-bg-primary hover:text-white border-t border-amber-200/30 px-3 py-1.5 hover:bg-red-500 hover:cursor-pointer rounded-b text-left"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </li>
                  </ul>
                </>
              )}
            </div>
            <div>
              <NavLink
                className="text-primary-txt/80 no-underline hover:text-primary-txt"
                to="/films/popular"
              >
                FILMS
              </NavLink>
            </div>
            <div>
              <NavLink
                className="text-primary-txt/80 hover:text-primary-txt"
                to="/watchlist"
              >
                WATCHLIST
              </NavLink>
            </div>
            <div>
              <NavLink
                className="text-primary-txt/80 no-underline hover:text-primary-txt"
                to="/about"
              >
                ABOUT
              </NavLink>
            </div>
            <div className="cursor-pointer">
              {isOpenSearch === true ? (
                <div className="flex flex-row items-center gap-2">
                  <img
                    className="w-4.5 h-4"
                    src={CancelIcon}
                    alt="cancel-icon"
                    onClick={() => setIsOpenSearch(false)}
                  />
                  <SearchForm />
                </div>
              ) : (
                <div className="flex flex-row items-center gap-2">
                  <img
                    className="w-4.5 h-4"
                    src={SearchIcon}
                    alt="search-icon"
                    onClick={() => setIsOpenSearch(true)}
                  />
                  <div>
                    <Button
                      className="bg-primary-btn font-bold py-1 pl-1.5 pr-4 text-nowrap rounded-md text-white hover:opacity-80 cursor-pointer"
                      onClick={() => setIsOpenLogMovie(true)}
                    >
                      + LOG
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : isLogin ? (
          <LoginForm isOpen={isLogin} onClose={() => setIsLogin(false)} />
        ) : (
          <div className="flex flex-row justify-between items-center gap-4">
            <div>
              <span
                className="text-primary-txt/80 cursor-pointer hover:text-primary-txt"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </span>
            </div>
            <div>
              <span
                className="text-primary-txt/80 cursor-pointer hover:text-primary-txt"
                onClick={() => setIsRegister(true)}
              >
                Create Account
              </span>
            </div>
            <div>
              <NavLink
                className="text-primary-txt/80 cursor-pointer hover:text-primary-txt"
                to="/about"
              >
                About
              </NavLink>
            </div>
            <div>
              <SearchForm />
            </div>
          </div>
        )}

        <RegisterForm
          isOpen={isRegister}
          onClose={() => setIsRegister(false)}
        />
        {isOpenLogMovie && (
          <FindMovie
            isOpen={isOpenLogMovie}
            onClose={() => setIsOpenLogMovie(false)}
          />
        )}
      </section>
    </nav>
  );
}

export default DefaultHeader;
