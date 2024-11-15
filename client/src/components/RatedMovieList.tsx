import { useEffect, useState } from "react";
import { Rating } from "../lib/types";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { Star, Time } from "./Icons";

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
    <div className="h-fit space-y-2 rounded-lg p-2 border border-slate-500/50 bg-cyan-800/30">
      <h2 className="text-lg font-bold">Rated Movies</h2>
      <p className="text-sm text-slate-400">
        Total rated movies: {ratedMovies.length}
      </p>

      {ratedMovies.length > 0 ? (
        <ul className="space-y-2">
          {ratedMovies.map((rating) => (
            <li
              key={rating.id}
              className="flex cursor-pointer justify-between rounded-md bg-cyan-800/50 p-1 hover:bg-cyan-800"
              onClick={() => {
                handleMovieClick(rating.movieId);
              }}
            >
              <div className="w-1/4 flex-col">
                <img
                  src={rating.poster}
                  alt={rating.title}
                  className="h-24 w-16 rounded object-cover"
                />

                <span className="flex items-center gap-1 text-lg font-bold">
                  <Star />
                  {rating.rate}
                </span>
              </div>
              <div className="flex flex-col justify-between p-1 text-right">
                <div className="flex flex-col justify-between gap-1">
                  <span className="font-semibold">
                    {rating.title} ({rating.year})
                  </span>
                  <span className="text-sm text-slate-400">{rating.genre}</span>
                  <span className="text-sm text-slate-400">
                    {rating.country}
                  </span>
                  <span className="flex justify-end">
                    <Time /> {rating.runtime}
                  </span>
                </div>
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
