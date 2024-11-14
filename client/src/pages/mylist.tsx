import RatedMovieList from "../components/RatedMovieList";
import StatsPanel from "../components/StatsPanel";
import ToWatchMovieList from "../components/ToWatchMovieList";

const MyListPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <RatedMovieList />
        <ToWatchMovieList />
        <StatsPanel />
      </div>
    </div>
  );
};

export default MyListPage;
