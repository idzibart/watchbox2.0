import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { Eye, Plus } from "./Icons";
import Spinner from "./Spinner";
import { WatchlistProps } from "../lib/types";

const WatchList = ({
  imdbID,
  title,
  year,
  poster,
  runtime,
  genre,
  country,
}: WatchlistProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkWatchlist = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest.get(`/watchlist/movie/${imdbID}`);
        setIsInWatchlist(response.data.isInWatchlist);
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
      if (isInWatchlist) {
        // Remove from watchlist
        await apiRequest.delete(`/watchlist/movie/${imdbID}`);
        setIsInWatchlist(false);
      } else {
        // Add to watchlist
        await apiRequest.post("/watchlist/movie", {
          imdbID,
          title,
          year,
          poster,
          runtime,
          genre,
          country,
        });
        setIsInWatchlist(true);
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
        isInWatchlist
          ? "bg-slate-600 shadow-inner shadow-black hover:bg-cyan-800"
          : "bg-cyan-500 shadow-xl hover:bg-cyan-800"
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : isInWatchlist ? (
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

export default WatchList;
