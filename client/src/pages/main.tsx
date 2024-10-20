import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { MovieDetail } from "../lib/types";

const MoviePage = () => {
  const { imdbID } = useParams(); // Pobiera imdbID z adresu
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await apiRequest.get(`/omdb/movie/${imdbID}`);
        setMovie(response.data);
      } catch (err: any) {
        setError(err.response.data.message);
      }
    };

    if (imdbID) {
      fetchMovie();
    }
  }, [imdbID]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.Title}</h1>
          <p>{movie.Plot}</p>
          {/* Wyświetl inne szczegóły filmu */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MoviePage;
