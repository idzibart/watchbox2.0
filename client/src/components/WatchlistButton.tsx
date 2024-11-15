import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { Eye, Plus } from "./Icons";
import Spinner from "./Spinner";
import { WatchlistProps } from "../lib/types";

const WatchlistButton = ({ imdbID, ...movie }: WatchlistProps) => {
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Genre: genre,
    Country: country,
  } = movie;
  const [isOnWatchlist, setisOnWatchlist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkWatchlist = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest.get(`/watchlist/movie/${imdbID}`);
        setisOnWatchlist(response.data.isOnWatchlist);
      } catch (error) {
        console.error("Error checking watchlist", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkWatchlist();
  }, [imdbID]);

  const handleWatchlistToggle = async () => {
    setIsLoading(true);
    try {
      if (isOnWatchlist) {
        await apiRequest.delete(`/watchlist/movie/${imdbID}`);
        setisOnWatchlist(false);
      } else {
        await apiRequest.post("/watchlist/movie", {
          imdbID,
          title: title || "Unknown",
          year: year || "Unknown",
          poster: poster || "N/A",
          runtime: runtime || "N/A",
          genre: genre || "N/A",
          country: country || "N/A",
        });
        setisOnWatchlist(true);
      }
    } catch (error) {
      console.error("Error updating watchlist", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleWatchlistToggle}
      className={`flex w-4/5 cursor-pointer items-center justify-center gap-2 rounded-lg p-2 transition-all duration-200 hover:text-slate-200 ${
        isOnWatchlist
          ? "bg-slate-600 shadow-inner shadow-black hover:bg-cyan-800"
          : "bg-cyan-500 shadow-xl hover:bg-cyan-800"
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : isOnWatchlist ? (
        <>
          Already on Watchlist
          <Eye />
        </>
      ) : (
        <>
          Add to Watchlist
          <Plus />
        </>
      )}
    </button>
  );
};

export default WatchlistButton;
