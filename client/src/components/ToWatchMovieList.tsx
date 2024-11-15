import { useEffect, useState } from "react";
import { Watchlist } from "../lib/types";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const WatchlistMovieList = () => {
  const [watchlistMovies, setWatchlistMovies] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        const response = await apiRequest.get("/watchlist/movies", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setWatchlistMovies(response.data);
      } catch (error) {
        console.error("Error fetching watchlist movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistMovies();
  }, []);

  if (loading) return <Spinner />;

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className="space-y-4 rounded-lg bg-slate-700 p-4 text-slate-200">
      <h2 className="text-lg font-bold">Watchlist Movies</h2>
      <p className="text-sm text-slate-400">
        Total watchlist movies: {watchlistMovies.length}
      </p>

      {watchlistMovies.length > 0 ? (
        <ul className="space-y-2">
          {watchlistMovies.map((movie) => (
            <li
              key={movie.id}
              className="flex cursor-pointer justify-between rounded-md bg-slate-800 p-2 hover:bg-slate-600"
              onClick={() => handleMovieClick(movie.movieId)}
            >
              <div className="flex gap-4">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-24 w-16 rounded object-cover"
                />
                <div className="flex flex-col justify-between">
                  <span className="font-semibold">
                    {movie.title} ({movie.year})
                  </span>
                  <span className="text-sm text-slate-400">{movie.genre}</span>
                  <span className="text-sm text-slate-400">
                    {movie.country}
                  </span>
                  <span>Runtime: {movie.runtime}</span>
                </div>
              </div>
              <div className="flex flex-col justify-between text-right">
                <span className="text-xs text-slate-400">
                  Added on: {new Date(movie.createdAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies in your watchlist yet.</p>
      )}
    </div>
  );
};

export default WatchlistMovieList;
