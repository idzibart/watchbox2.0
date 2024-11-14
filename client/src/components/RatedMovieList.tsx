// RatedMovieList.tsx
import React, { useEffect, useState } from "react";
import { Rating } from "../lib/types";
import apiRequest from "../lib/apiRequest";
import Spinner from "./Spinner";

const RatedMovieList: React.FC = () => {
  const [ratedMovies, setRatedMovies] = useState<Rating[]>([]); // Type the state as an array of Rating objects
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className="space-y-4 rounded-lg bg-slate-700 p-4 text-slate-200">
      <h2 className="text-lg font-bold">Rated Movies</h2>
      {ratedMovies.length > 0 ? (
        <ul className="space-y-2">
          {ratedMovies.map((rating) => (
            <li
              key={rating.id}
              className="flex justify-between rounded-md bg-slate-800 p-2"
            >
              <span>{rating.movieId}</span>{" "}
              {/* This could be replaced with movie title if available */}
              <span>Rating: {rating.rate} / 10</span>
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
