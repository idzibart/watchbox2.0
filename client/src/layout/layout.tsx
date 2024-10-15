import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="ml-auto mr-auto flex h-screen max-w-[1366px] flex-col px-5 md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
      <div>
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
