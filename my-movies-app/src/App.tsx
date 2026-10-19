import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePageLayout from "./containers/layouts/HomePageLayout";
import AppContainer from "./utils/AppContainer";
import "./assets/css/index.css";

// import AuthProvider from "./component/AuthProvider";
import { useSelector } from "react-redux";
import AboutLayout from "./containers/layouts/AboutLayout";
import MovieDetailsLayout from "./containers/layouts/MovieDetailsLayout";
import FilmLayout from "./containers/layouts/FilmLayout";
import WatchlistLayout from "./containers/layouts/WatchlistLayout";
import { type RootState } from "./redux/store";
import LoginLayout from "./containers/layouts/LoginLayout";

function App() {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route
            index
            element={
              currentUser ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="login" element={<LoginLayout />} />
          <Route path="home" element={<HomePageLayout />} />
          {/* <Route path="search/:value" element={<SearchList />} /> */}
          <Route path="about" element={<AboutLayout />} />
          <Route path="films" element={<FilmLayout />} />
          <Route path="watchlist" element={<WatchlistLayout />} />
          <Route path="movie" element={<MovieDetailsLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
