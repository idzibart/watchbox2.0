import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";
import { Time, Star, Eye } from "./Icons";
import { Rating, Watchlist } from "../lib/types";

const MovieStats = () => {
  const [ratedMovies, setRatedMovies] = useState<Rating[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ratedResponse, watchlistResponse] = await Promise.all([
          apiRequest.get<Rating[]>("/rate/movies", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          apiRequest.get<Watchlist[]>("/watchlist/movies", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);
        setRatedMovies(ratedResponse.data);
        setWatchlistMovies(watchlistResponse.data);
      } catch (error) {
        console.error("Error fetching movie data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />;

  const totalRatedMovies = ratedMovies.length;
  const totalWatchlistMovies = watchlistMovies.length;

  // AVERAGE RATING
  const validRatings = ratedMovies.filter(
    (movie) => typeof movie.rate === "number",
  );
  const averageRating =
    validRatings.reduce((sum, movie) => sum + movie.rate, 0) /
      validRatings.length || 0;

  // TOTAL WATCH TIME
  const totalRuntimeMinutes = ratedMovies.reduce((sum, movie) => {
    const runtime = movie.runtime
      ? parseInt(movie.runtime.split(" ")[0], 10)
      : 0;
    return !isNaN(runtime) ? sum + runtime : sum;
  }, 0);
  const totalRuntimeHours = Math.floor(totalRuntimeMinutes / 60);
  const totalRuntimeRemainingMinutes = totalRuntimeMinutes % 60;

  // MOST RATED GENRE
  const genreCount: Record<string, number> = ratedMovies.reduce<
    Record<string, number>
  >((acc, movie) => {
    const genres = movie.genre?.split(", ") || [];
    genres.forEach((genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
    });
    return acc;
  }, {});
  const mostRatedGenre =
    Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="h-fit space-y-4 rounded-lg border border-slate-500/50 bg-cyan-800/30 p-2">
      <h2 className="text-lg font-bold">Movie Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* TOTAL RATED MOVIE */}
        <div className="flex items-center gap-2">
          <Star />
          <p className="text-sm font-thin">
            Rated Movies:{" "}
            <span className="font-semibold text-yellow-400">
              {totalRatedMovies}
            </span>
          </p>
        </div>

        {/* TOTAL WATCHLIST MOVIE */}
        <div className="flex items-center gap-2">
          <Eye />
          <p className="text-sm font-thin">
            Watchlist Movies:{" "}
            <span className="font-semibold text-blue-400">
              {totalWatchlistMovies}
            </span>
          </p>
        </div>

        {/* Średnia ocen */}
        <div className="flex items-center gap-2">
          <Star />
          <p className="text-sm font-thin">
            Average Rating:{" "}
            <span className="font-semibold text-green-400">
              {averageRating.toFixed(1)} / 10
            </span>
          </p>
        </div>

        {/* Łączny czas oglądania */}
        <div className="flex items-center gap-2">
          <Time />
          <p className="text-sm font-thin">
            Total Watch Time:{" "}
            <span className="font-semibold text-purple-400">
              {totalRuntimeHours}h {totalRuntimeRemainingMinutes}m
            </span>
          </p>
        </div>

        {/* Najczęściej oceniany gatunek */}
        <div className="flex items-center gap-2">
          <Eye />
          <p className="text-sm font-thin">
            Most Rated Genre:{" "}
            <span className="font-semibold text-red-400">{mostRatedGenre}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieStats;
