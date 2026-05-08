import { Routes, Route } from "react-router-dom";

import Details from "../pages/Details/Details";
import About from "../pages/About";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import SearchList from "../pages/SearchList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="search/:value" element={<SearchList />} />
        <Route path="about" element={<About />} />
        <Route path=":type/:id" element={<Details />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
