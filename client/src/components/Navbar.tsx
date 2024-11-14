import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import apiRequest from "../lib/apiRequest";
import { setUser } from "../store/userSlice";

const Navbar = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      dispatch(setUser(null));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="mt-4 flex w-full items-center justify-between rounded-md border border-slate-500/50 bg-black/30 p-4 text-center text-sm shadow-[0_0_30px_-20px] shadow-black backdrop-blur-md lg:text-base">
      {/* LEFT */}
      <div className="md:flex  hidden md:w-1/4 justify-start md:visible lg:ml-6">
        <Link to="/">
          <span className="cursor-pointer hover:text-slate-300">WATCHBOX</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="flex md:w-2/4 w-3/5 items-center justify-center">
        <SearchBar />
      </div>

      {/* RIGHT */}
      <div className="flex md:w-1/4 items-center justify-end gap-3 md:gap-10 lg:mr-6">
        {currentUser ? (
          <>
            <a href="/mylist" className="">
              <span className="cursor-pointer transition-all hover:text-slate-300">
                My lists
              </span>
            </a>
            <div className="group relative">
              <div className="transition-allhover:bg-cyan-800 cursor-pointer rounded-md bg-cyan-500 px-4 py-2">
                Hi, {currentUser.username}!
              </div>

              <div className="absolute top-0 hidden w-full flex-col rounded-md bg-cyan-500 p-2 shadow-lg group-hover:flex">
                <a
                  href="/"
                  className="block px-4 py-2 transition-all hover:text-slate-300"
                >
                  Edit
                </a>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 transition-all hover:text-slate-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <a href="/login" className="">
              <span className="cursor-pointer transition-all hover:text-slate-300">
                Log in
              </span>
            </a>
            <a href="/register" className="">
              <span className="cursor-pointer rounded-md bg-cyan-500 px-4 py-2 transition-all hover:bg-cyan-800">
                Sign in
              </span>
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
