import { useEffect, useState } from "react";
import { Rating } from "../lib/types";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const RatedMovieList = () => {
  const [ratedMovies, setRatedMovies] = useState<Rating[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        const response = await apiRequest.get("/rate/movies", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRatedMovies(response.data);
      } catch (error) {
        console.error("Error fetching rated movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatedMovies();
  }, []);

  if (loading) return <Spinner />;

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className="space-y-4 rounded-lg bg-slate-700 p-4 text-slate-200">
      <h2 className="text-lg font-bold">Rated Movies</h2>
      <p className="text-sm text-slate-400">
        Total rated movies: {ratedMovies.length}
      </p>

      {ratedMovies.length > 0 ? (
        <ul className="space-y-2">
          {ratedMovies.map((rating) => (
            <li
              key={rating.id}
              className="flex cursor-pointer justify-between rounded-md bg-slate-800 p-2 hover:bg-slate-600"
              onClick={() => {
                handleMovieClick(rating.movieId);
              }}
            >
              <div className="flex gap-4">
                <img
                  src={rating.poster}
                  alt={rating.title}
                  className="h-24 w-16 rounded object-cover"
                />
                <div className="flex flex-col justify-between">
                  <span className="font-semibold">
                    {rating.title} ({rating.year})
                  </span>
                  <span className="text-sm text-slate-400">{rating.genre}</span>
                  <span className="text-sm text-slate-400">
                    {rating.country}
                  </span>
                  <span>Runtime: {rating.runtime}</span>
                </div>
              </div>
              <div className="flex flex-col justify-between text-right">
                <span className="text-lg font-bold">
                  Rating: {rating.rate} / 10
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rated movies yet.</p>
      )}
    </div>
  );
};

export default RatedMovieList;
