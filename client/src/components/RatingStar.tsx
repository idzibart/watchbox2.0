import { SyntheticEvent, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";
import { MovieRatingProps } from "../lib/types";
import { Rating } from "@mui/material";

const RatingStar = ({ imdbID, ...movie }: MovieRatingProps) => {
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Genre: genre,
    Country: country,
  } = movie;
  const [value, setValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRating = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest.get(`/rate/movie/${imdbID}`);
        setValue(response.data?.rate || null);
      } catch (error) {
        console.error("Error fetching rating", error);
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
      await apiRequest.post("/rate/movie", {
        imdbID,
        rate: newValue,
        title: title || "Unknown",
        year: year || "Unknown",
        poster: poster || "N/A",
        runtime: runtime || "N/A",
        genre: genre || "N/A",
        country: country || "N/A",
      });
    } catch (error) {
      console.error("Error saving rating", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Rating
          name="simple-controlled"
          value={value}
          max={10}
          onChange={handleRatingChange}
        />
      )}
    </>
  );
};

export default RatingStar;
