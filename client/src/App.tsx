import React, { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

interface MovieDetail {
  Title: string;
  Year: string;
  Director: string;
  Plot: string;
  Poster: string;
}

const MovieSearch: React.FC = () => {
  const [title, setTitle] = useState<string>(""); // Pole wyszukiwania
  const [movies, setMovies] = useState<Movie[]>([]); // Lista filmów, domyślnie pusta tablica
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null); // Szczegóły filmu
  const [error, setError] = useState<string | null>(null); // Obsługa błędów
  const [debouncedTitle, setDebouncedTitle] = useState<string>(""); // Przechowuje tytuł po debouncingu

  // Debouncing - aktualizacja debouncedTitle z opóźnieniem
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500); // Opóźnienie 500ms

    return () => {
      clearTimeout(timer); // Wyczyszczenie poprzedniego timera
    };
  }, [title]); // Uruchamia się, gdy title się zmienia

  // Funkcja do wyszukiwania filmów z debouncedTitle
  useEffect(() => {
    const searchMovies = async () => {
      if (debouncedTitle) {
        try {
          const response = await axios.get(
            `http://localhost:2137/api/omdb/search?title=${debouncedTitle}`
          );

          if (response.data && Array.isArray(response.data)) {
            setMovies(response.data); // Zapisz filmy, jeśli są poprawne
          } else if (response.data.Search && Array.isArray(response.data.Search)) {
            setMovies(response.data.Search); // Jeśli dane są w formacie OMDB
          } else {
            setMovies([]); // Jeśli nie ma filmów, ustaw pustą tablicę
          }

          setError(null); // Reset błędu
        } catch (err) {
          setError("Nie udało się pobrać filmów.");
          setMovies([]); // W przypadku błędu, ustaw pustą listę
        }
      } else {
        setMovies([]); // Resetuje listę, jeśli input jest pusty
      }
    };

    searchMovies();
  }, [debouncedTitle]); // Uruchamia się po aktualizacji debouncedTitle

  // Funkcja do pobrania szczegółów wybranego filmu
  const handleMovieClick = async (imdbID: string) => {
    try {
      const response = await axios.get<MovieDetail>(
        `http://localhost:2137/api/omdb/movie/${imdbID}`
      );
      setSelectedMovie(response.data);
      setError(null); // Reset błędu
    } catch (err) {
      setError("Nie udało się pobrać szczegółów filmu.");
      setSelectedMovie(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Search</h1>

      {/* Input do wyszukiwania */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Zmienia tylko tytuł
        placeholder="Wprowadź tytuł filmu..."
        className="border p-2 w-full mb-4"
      />

      {/* Obsługa błędów */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Lista filmów */}
      <ul className="list-disc pl-5">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => handleMovieClick(movie.imdbID)} // Kliknięcie w film
              className="cursor-pointer hover:text-blue-500"
            >
              {movie.Title} ({movie.Year})
            </li>
          ))
        ) : (
          <p className="text-gray-500">Brak wyników do wyświetlenia</p>
        )}
      </ul>

      {/* Szczegóły wybranego filmu */}
      {selectedMovie && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">{selectedMovie.Title}</h2>
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Director:</strong> {selectedMovie.Director}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <img
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
