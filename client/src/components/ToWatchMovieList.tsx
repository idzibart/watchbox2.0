// WatchlistMovieList.tsx
import { useEffect, useState } from "react";
import { Watchlist } from "../lib/types";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";

const WatchlistMovieList: React.FC = () => {
  const [watchlistMovies, setWatchlistMovies] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className="space-y-4 rounded-lg bg-slate-700 p-4 text-slate-200">
      <h2 className="text-lg font-bold">Watchlist Movies</h2>
      {watchlistMovies.length > 0 ? (
        <ul className="space-y-2">
          {watchlistMovies.map((movie) => (
            <li
              key={movie.id}
              className="flex justify-between rounded-md bg-slate-800 p-2"
            >
              <span>{movie.movieId}</span>
              <span>
                Added on: {new Date(movie.createdAt).toLocaleDateString()}
              </span>
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
