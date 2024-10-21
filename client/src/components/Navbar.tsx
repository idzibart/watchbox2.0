import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="mt-4 flex w-full items-center justify-between rounded-md border border-slate-500/50 bg-black/30 p-4 text-center text-sm shadow-[0_0_30px_-20px] shadow-black backdrop-blur-md lg:text-base">
      <div className="flex w-1/4 justify-start lg:ml-6">
        <Link to="/">
          <span className="cursor-pointer hover:text-slate-300">WATCHBOX</span>
        </Link>
      </div>
      <div className="flex w-2/4 items-center justify-center">
        <SearchBar />
      </div>
      <div className="flex w-1/4 items-center justify-end gap-3 md:gap-10 lg:mr-6">
        <a href="/" className="">
          <span className="duration-2 00 cursor-pointer transition-all hover:text-slate-300">
            Sign in
          </span>
        </a>
        <span className="cursor-pointer rounded-lg bg-cyan-400 p-2 px-4 text-slate-900 transition-all duration-200 hover:bg-cyan-600 hover:text-slate-200">
          Sign in
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
