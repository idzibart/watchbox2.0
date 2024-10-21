import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Movie } from "../lib/types";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [debouncedTitle, setDebouncedTitle] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  });

  const navigate = useNavigate();

  const searchRef = useRef<HTMLDivElement>(null);

  // MOVIES SEARCH DEBOUNCING
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [title]);

  // MOVIES FETCHING
  useEffect(() => {
    const searchMovies = async () => {
      if (debouncedTitle) {
        try {
          setIsLoading(true);
          const response = await apiRequest.get(
            `/omdb/search?title=${debouncedTitle}`,
          );

          if (response.data && Array.isArray(response.data)) {
            setMovies(response.data);
          } else if (
            response.data.Search &&
            Array.isArray(response.data.Search)
          ) {
            setMovies(response.data.Search);
          } else {
            setMovies([]);
          }
          setIsLoading(false);
          setError(null);
        } catch (err: any) {
          setError(err.response.data.message);
          setMovies([]);
        }
      } else {
        setMovies([]);
      }
    };

    searchMovies();
  }, [debouncedTitle]);

  // MOVIE HANDLE
  const handleMovieClick = (imdbID: string) => {
    console.log("Navigating to /movie/" + imdbID);
    navigate(`/movie/${imdbID}`);
    setIsDropdownVisible(false);
  };

  // DROPDOWN POSITIONING AND VISIBILITY
  useEffect(() => {
    const updateDropdownPosition = () => {
      if (isDropdownVisible && searchRef.current) {
        const rect = searchRef.current.getBoundingClientRect();
        setDropdownStyles({
          position: "absolute",
          top: `${rect.bottom}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          zIndex: 50,
        });
      }
    };

    updateDropdownPosition();

    window.addEventListener("resize", updateDropdownPosition);

    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [isDropdownVisible]);

  // DROPDOWN VISIBILITY
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-3/4" ref={searchRef}>
      <div className="flex w-full items-center rounded-lg border border-slate-500/50 bg-transparent p-2 px-2 focus-within:border-cyan-400 focus-within:transition-all focus-within:duration-1000 focus-within:ease-out">
        <CiSearch size={20} color="rgb(34 211 238)" />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          placeholder="Search"
          className="ml-2 w-full bg-transparent outline-none"
        />
        {isLoading && (
          <div className="ml-auto">
            <Spinner />
          </div>
        )}
      </div>
      {/*DROPDOWN LIST*/}
      <div
        className={`absolute z-50 w-full shadow-lg ${
          isDropdownVisible && movies.length > 0 ? "visible" : "invisible"
        }`}
        style={{
          visibility:
            isDropdownVisible && movies.length > 0 ? "visible" : "hidden",
        }}
      >
        <ul className="overflow-y-auto rounded-lg border-slate-500/50 bg-inherit backdrop-blur-md">
          {movies.map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => handleMovieClick(movie.imdbID)}
              className="flex cursor-pointer gap-2 rounded-lg border border-slate-500/50 bg-black/90 text-start text-sm transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-900"
            >
              <div className="flex w-1/4 rounded-lg lg:w-[12%]">
                <img
                  src={movie.Poster}
                  className="rounded-lg"
                  alt={`${movie.Poster} poster`}
                />
              </div>
              <div className="flex w-full flex-col py-1">
                <h4 className="text-base lg:text-lg">{movie.Title}</h4>
                <p className="text-xs font-bold text-slate-400">{movie.Year}</p>
                <p className="font-semiboldbold mr-2 text-end text-xs text-cyan-500 lg:text-sm">
                  {movie.Type}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/*ERROR*/}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default SearchBar;
