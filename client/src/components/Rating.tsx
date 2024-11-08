import Rating from "@mui/material/Rating";
import { SyntheticEvent, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";

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
        console.error("Błąd podczas pobierania oceny:", error);
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
      console.error("Błąd podczas zapisywania oceny:", error);
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

export default MovieRating;
