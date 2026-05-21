import { Outlet } from "react-router-dom";
import Header from "../component/Header/Header";

function MainLayout() {
  return (
    <div className="flex flex-col items-center justify-center md:px-16 px-8">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
