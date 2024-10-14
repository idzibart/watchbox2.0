import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 text-center">
      <div className="flex w-1/5 justify-start">left</div>
      <div className="w-3/5">
        <SearchBar />
      </div>
      <div className="flex w-1/5 justify-end gap-3">
        <a href="/" className="">
          Sign in
        </a>
        <a href="/" className="">
          Sign up
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
