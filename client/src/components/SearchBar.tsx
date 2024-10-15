import React, { useState, useEffect, useRef } from "react";
import { Movie, MovieDetail } from "../lib/types";
import apiRequest from "../lib/apiRequest";

const SearchBar: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debouncedTitle, setDebouncedTitle] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement>(null);

  //MOVIES SEARCH DEBUNCING
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [title]);

  //MOVIES FETCHNIG
  useEffect(() => {
    const searchMovies = async () => {
      if (debouncedTitle) {
        try {
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

  //MOVIE HANDLE
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

  //DROPDOWN VISIBILITY
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
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsDropdownVisible(true)}
        placeholder="Wprowadź tytuł filmu..."
        className="w-3/4 border-b-2 p-2 outline-none focus:border-b-cyan-600 focus:transition-all focus:duration-1000 focus:ease-out"
      />

      {/*DROPDOWN LIST*/}
      {isDropdownVisible && movies.length > 0 && (
        <div className="absolute flex w-full justify-center">
          <ul className="z-10 w-3/4 overflow-y-auto border-gray-300 bg-white">
            {movies.map((movie) => (
              <li
                key={movie.imdbID}
                onClick={() => handleMovieClick(movie.imdbID)}
                className="flex cursor-pointer justify-start p-2 text-start text-sm hover:bg-gray-200"
              >
                {movie.Title} ({movie.Year})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/*ERROR*/}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default SearchBar;
