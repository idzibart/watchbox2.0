import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { MovieDetail } from "../lib/types";

const MoviePage = () => {
  const { imdbID } = useParams();
  console.log("imdbID:", imdbID);
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
        <div className="flex flex-col">
          <div className="flex w-full gap-2 lg:gap-6">
            <div className="flex w-1/3">
              <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="object-contain"
              />
            </div>
            <div className="ml-2 flex w-2/3 flex-col">
              <h1 className="mb-4 p-2 text-2xl lg:text-3xl">{movie.Title}</h1>
              <div className="flex h-full flex-col gap-y-4">
                <div className="grid w-full grid-cols-2 gap-4">
                  {/* SECTION 1 */}
                  <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-800 px-3 py-2 lg:gap-6 lg:px-5 lg:py-3">
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
                        year
                      </span>
                      <p className="flex items-center gap-1 p-1 text-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-stone-400 size-6"
                        >
                          <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                          <path
                            fillRule="evenodd"
                            d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {movie.Year}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
                        runtime
                      </span>
                      <p className="flex items-center gap-1 p-1 text-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 text-sky-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {movie.Runtime}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
                        imdbRating
                      </span>
                      <p className="flex items-center gap-1 p-1 text-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 text-yellow-500"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        {movie.imdbRating}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
                        metascore
                      </span>
                      <p className="flex items-center gap-1 p-1 text-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 text-green-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {movie.Metascore}
                      </p>
                    </div>
                  </div>

                  {/* SECTION 2 */}
                  <div className="grid gap-4 rounded-lg bg-slate-800 px-3 py-2 lg:gap-6 lg:px-5 lg:py-3">
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
                        director
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {movie.Director}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
                        director
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {movie.Director}
                      </p>
                    </div>
                  </div>
                </div>
                {/* SECTION 3 */}
                <div className="grid w-full grid-cols-2 gap-4 rounded-lg bg-slate-800">
                  <div className="grid gap-y-4 px-3 py-2 lg:px-5 lg:py-3">
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
                        director
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {movie.Director}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
                        actors
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {movie.Actors}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-y-4 px-3 py-2 lg:px-5 lg:py-3">
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
                        genre
                      </span>
                      <p className="flex flex-col p-1 text-lg">
                        {movie.Genre.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="-mb-1 -ml-1 text-xs font-normal uppercase text-cyan-400">
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

          <div>
            <p>{movie.Plot}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MoviePage;
