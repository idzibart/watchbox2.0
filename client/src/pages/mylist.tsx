import RatedMovieList from "../components/RatedMovieList";
import WatchlistMovieList from "../components/WatchlistMovieList";
import MovieStats from "../components/MovieStats";

const MyListPage = () => {
  return (
    <div className="container mx-auto  p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <RatedMovieList />
        <WatchlistMovieList />
        <MovieStats />
      </div>
    </div>
  );
};

export default MyListPage;
