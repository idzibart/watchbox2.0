import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="ml-auto mr-auto flex h-screen max-w-[1366px] flex-col gap-8 px-8 sm:px-12 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
      <div>
        <Navbar />
      </div>
      <div className="h-[calc(100vh-140px)] rounded-md border border-slate-500/50 bg-black/30 p-6 backdrop-blur-md">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;