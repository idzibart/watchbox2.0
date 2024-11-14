import Rating from "@mui/material/Rating";
import { SyntheticEvent, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { Eye, Plus } from "./Icons";
import Spinner from "./Spinner";

interface MovieRatingProps {
  imdbID: string;
}

const MovieRating = ({ imdbID }: MovieRatingProps) => {
  const [value, setValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRating = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest.get(`/rate/movie/${imdbID}`);
        setValue(response.data?.rate || null);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
    } finally {
    }
  };

  return (
    <Rating
      name="movie-rating"
      value={value}
      max={10}
      onChange={handleRatingChange}
    />
  );
};

interface WatchlistProps {
  imdbID: string;
}

const WatchList = ({ imdbID }: WatchlistProps) => {
  const [isInWatchlist, setIsOnWatchlist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //CHECKING IF IS
  useEffect(() => {
    const checkWatchlist = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest.get(`/watchlist/movie/${imdbID}`);
        setIsOnWatchlist(response.data.isOnWatchlist);
      } catch (error) {
        console.error(error);
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
          : "shadow-blacks bg-cyan-500 shadow-xl hover:bg-cyan-800"
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : isInWatchlist ? (
        <>
          already on Watchlist
          <Eye />
        </>
      ) : (
        <>
          add to Watchlist
          <Plus />
        </>
      )}
    </button>
  );
};

export { MovieRating, WatchList };
