import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { MovieDetail } from "../lib/types";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Calendar, Link, Star, Time } from "../components/Icons";
import WatchlistButton from "../components/WatchlistButton";
import RatingStar from "../components/RatingStar";

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
                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                  {/* SECTION 1 */}
                  <div className="section-container grid grid-cols-2 gap-4 lg:gap-6">
                    <div className="flex flex-col">
                      <span className="section-title">year</span>
                      <p className="content-text">
                        <Calendar />
                        {movie.Year}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="section-title">runtime</span>
                      <p className="content-text">
                        <Time />
                        {movie.Runtime}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="section-title">imdb</span>
                      <p className="content-text">
                        <Star />
                        {movie.imdbRating}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="section-title">metascore</span>
                      <p className="content-text">
                        <Star />
                        {movie.Metascore}
                      </p>
                    </div>
                  </div>

                  {/* SECTION 2 */}
                  <div className="section-container grid gap-4 lg:gap-6">
                    <div className="flex flex-col">
                      <span className="section-title">your rating</span>
                      <div className="flex items-center justify-center lg:scale-110">
                        {currentUser && imdbID ? (
                          <RatingStar {...movie} imdbID={imdbID!} />
                        ) : (
                          <>Login to rate</>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="section-title">watchlist</span>
                      <div className="flex items-center justify-center">
                        {imdbID && (
                          <WatchlistButton {...movie} imdbID={imdbID!} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3 */}
                <div className="section-container grid w-full grid-cols-2 gap-4">
                  <div className="grid gap-y-4">
                    <div className="flex flex-col">
                      <span className="section-title">director</span>
                      <p className="content-text">{movie.Director}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="section-title">actors</span>
                      <p className="content-text">{movie.Actors}</p>
                    </div>
                  </div>
                  <div className="grid gap-y-4">
                    <div className="flex flex-col">
                      <span className="section-title">genre</span>
                      <p className="content-text">
                        {movie.Genre.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="section-title">country</span>
                      <p className="content-text">{movie.Country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col p-4 lg:p-6">
            <span className="section-title">description</span>
            <p className="flex flex-col p-1 text-xl">{movie.Plot}</p>
          </div>
          <div className="flex flex-col p-4 lg:p-6">
            <span className="section-title">awards</span>
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
            <Link />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MoviePage;
