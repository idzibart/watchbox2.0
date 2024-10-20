import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Movie, MovieDetail } from "../lib/types";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";
import { CiSearch } from "react-icons/ci";

const SearchBar: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
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
  const handleMovieClick = async (imdbID: string) => {
    try {
      const response = await apiRequest.get<MovieDetail>(
        `/omdb/movie/${imdbID}`,
      );
      setSelectedMovie(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response.data.message);
      setSelectedMovie(null);
    }
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
      {isDropdownVisible &&
        movies.length > 0 &&
        ReactDOM.createPortal(
          <div style={dropdownStyles} className="bg-black/50 backdrop-blur-md">
            <ul className="overflow-y-scroll rounded-b-md border border-t-0 border-slate-500/50 bg-inherit backdrop-blur-md">
              {movies.map((movie) => (
                <li
                  key={movie.imdbID}
                  onClick={() => handleMovieClick(movie.imdbID)}
                  className="flex cursor-pointer justify-start gap-2 border border-slate-500/50 text-start text-sm transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-400/30"
                >
                  <div className="flex w-1/3 lg:w-1/6">
                    <img src={movie.Poster} alt={`${movie.Poster} poster`} />
                  </div>
                  <div className="py-1 text-xs">
                    <h4>{movie.Title}</h4>
                    <p>{movie.Type}</p> {movie.imdbID}
                    {movie.Year}
                  </div>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
      {/*ERROR*/}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default SearchBar;
