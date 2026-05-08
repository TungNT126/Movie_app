import { Outlet } from "react-router-dom";
import Header from "../component/Header/Header";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainLayout;
