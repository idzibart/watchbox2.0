import Rating from "@mui/material/Rating";
import { SyntheticEvent, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";
import { MovieRatingProps } from "../lib/types";

const MovieRating = ({
  imdbID,
  title,
  year,
  poster,
  runtime,
  genre,
  country,
}: MovieRatingProps) => {
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
        title,
        year,
        poster,
        runtime,
        genre,
        country,
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
          name="movie-rating"
          value={value}
          max={10}
          onChange={handleRatingChange}
        />
      )}
    </>
  );
};

export default MovieRating;
