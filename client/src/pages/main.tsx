import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { MovieDetail } from "../lib/types";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { WatchList, MovieRating } from "../components/Lists";
import { Calendar, Star, Time } from "../components/Icons";

const MoviePage = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

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
        <div className="flex flex-col">
          <div className="flex w-full gap-2 lg:gap-6">
            <div className="flex w-1/3 rounded-lg transition-all duration-300">
              <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="w-full rounded-lg border border-slate-500/50 object-contain"
              />
            </div>

            {/* MOVIE INFO */}
            <div className="ml-2 flex w-2/3 flex-col">
              <h1 className="mb-4 p-2 text-2xl lg:text-3xl">{movie.Title}</h1>
              <div className="flex h-full flex-col gap-y-4">
                <div className="grid w-full grid-cols-2 gap-4">
                  {/* SECTION 1 */}
                  <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-500/50 bg-cyan-800/30 px-3 py-2 lg:gap-6 lg:px-5 lg:py-3">
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        year
                      </span>
                      <p className="flex items-center gap-1 p-1 text-lg">
                        <Calendar />
                        {movie.Year}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        runtime
                      </span>
                      <p className="flex items-center gap-1 p-1 text-lg">
                        <Time />

                        {movie.Runtime}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        imdb
                      </span>
                      <p className="flex items-center gap-1 p-1 text-lg">
                        <Star />

                        {movie.imdbRating}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        metascore
                      </span>
                      <p className="flex items-center gap-1 p-1 text-lg">
                        <Star />

                        {movie.Metascore}
                      </p>
                    </div>
                  </div>

                  {/* SECTION 2 */}
                  <div className="grid gap-4 rounded-lg border border-slate-500/50 bg-cyan-800/30 px-3 py-2 lg:gap-6 lg:px-5 lg:py-3">
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        your rating
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {currentUser && imdbID ? (
                          <MovieRating imdbID={imdbID} />
                        ) : (
                          <>Login to rate</>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        watchlist
                      </span>
                      {imdbID && <WatchList imdbID={imdbID} />}
                    </div>
                  </div>
                </div>
                {/* SECTION 3 */}
                <div className="grid w-full grid-cols-2 gap-4 rounded-lg border border-slate-500/50 bg-cyan-800/30">
                  <div className="grid gap-y-4 px-3 py-2 lg:px-5 lg:py-3">
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        director
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {movie.Director}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        actors
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {movie.Actors}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-y-4 px-3 py-2 lg:px-5 lg:py-3">
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        genre
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {movie.Genre.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
                        country
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {movie.Country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col p-4 lg:p-6">
            <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
              description
            </span>
            <p className="flex flex-col p-1 text-xl">{movie.Plot}</p>
          </div>
          <div className="flex flex-col p-4 lg:p-6">
            <span className="-ml-1 mb-1 text-xs font-normal uppercase text-cyan-500">
              awards
            </span>
            <p className="flex flex-col p-1 text-xl">{movie.Awards}</p>
          </div>
          <div className="flex items-center gap-2 p-4 text-slate-400 hover:text-cyan-500 lg:p-6">
            <a
              href={`https://www.imdb.com/title/${imdbID}`}
              rel="noreferrer"
              target="_blank"
              className="underline"
            >
              check on IMDb
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MoviePage;
