import Rating from "@mui/material/Rating";
import { SyntheticEvent, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { Eye, Plus } from "./Icons";

interface MovieRatingProps {
  imdbID: string;
}

const MovieRating = ({ imdbID }: MovieRatingProps) => {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await apiRequest.get(`/rate/movie/${imdbID}`);
        setValue(response.data?.rate || null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRating();
  }, [imdbID]);

  const handleRatingChange = async (
    event: SyntheticEvent,
    newValue: number | null,
  ) => {
    setValue(newValue);
    try {
      await apiRequest.post("/rate/movie", { imdbID, rate: newValue });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Rating
      name="movie-rating"
      size="large"
      value={value}
      onChange={handleRatingChange}
    />
  );
};

interface WatchlistProps {
  imdbID: string;
}

const WatchList = ({ imdbID }: WatchlistProps) => {
  const [isInWatchlist, setIsOnWatchlist] = useState<boolean>(false);

  //CHECKING IF IS
  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const response = await apiRequest.get(`/watchlist/movie/${imdbID}`);
        setIsOnWatchlist(response.data.isOnWatchlist);
      } catch (error) {
        console.error(error);
      }
    };

    checkWatchlist();
  }, [imdbID]);

  const handleWatchlistToggle = async () => {
    try {
      if (isInWatchlist) {
        // DELETE
        await apiRequest.delete(`/watchlist/movie/${imdbID}`);
        setIsOnWatchlist(false);
      } else {
        // ADD
        await apiRequest.post("/watchlist/movie", { imdbID });
        setIsOnWatchlist(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleWatchlistToggle}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-500 px-3 py-2 text-xl transition-all duration-200 hover:scale-105 hover:bg-cyan-800 hover:text-slate-200 ${
        isInWatchlist
          ? "bg-yellow-500 hover:bg-cyan-800"
          : "bg-cyan-500 hover:bg-cyan-800"
      }`}
    >
      {isInWatchlist ? (
        <>
          Added to Watchlist
          <Eye />
        </>
      ) : (
        <>
          Want to Watch
          <Plus />
        </>
      )}
    </button>
  );
};

export { MovieRating, WatchList };
