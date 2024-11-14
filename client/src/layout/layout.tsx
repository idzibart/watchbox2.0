import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Layout = () => {
  return (
    <div className="ml-auto mr-auto flex h-screen max-w-[1366px] flex-col gap-8 px-8 sm:px-12 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
      <div className="z-10">
        <Navbar />
      </div>
      <div className="h-[calc(100vh-140px)] overflow-auto rounded-md border border-slate-500/50 bg-black/30 p-6 shadow-[0_0_30px_-20px] shadow-black backdrop-blur-md">
        <Outlet />
      </div>
    </div>
  );
};

const RequireAuth = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (!currentUser) return <Navigate to="/login" />;
  else
    return (
      <div className="ml-auto mr-auto flex h-screen max-w-[1366px] flex-col gap-8 px-8 sm:px-12 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
        <div className="z-10">
          <Navbar />
        </div>
        <div className="h-[calc(100vh-140px)] overflow-auto rounded-md border border-slate-500/50 bg-black/30 p-6 shadow-[0_0_30px_-20px] shadow-black backdrop-blur-md">
          <Outlet />
        </div>
      </div>
    );
};

export { Layout, RequireAuth };
