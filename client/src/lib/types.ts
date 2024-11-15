export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Director: string;
  Plot: string;
  Poster: string;
  Awards: string;
  Runtime: string;
  Genre: string;
  Actors: string;
  Language: string;
  Country: string;
  Metascore: string;
  imdbRating: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Rating {
  id: string;
  userId: string;
  movieId: string;
  title: string;
  year: string;
  poster?: string;
  runtime?: string;
  genre?: string;
  country?: string;
  rate: number;
  createdAt: string;
}

export interface Watchlist {
  id: string;
  userId: string;
  movieId: string; //imdbID
  title: string;
  year: string;
  poster?: string;
  runtime?: string;
  genre?: string;
  country?: string;
  createdAt: string;
}

export interface WatchlistProps extends MovieDetail {
  imdbID: string;
}

export interface MovieRatingProps extends MovieDetail {
  imdbID: string;
  rate?: number;
}
