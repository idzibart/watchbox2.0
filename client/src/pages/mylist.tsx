import RatedMovieList from "../components/MovieWatchBar";
import StatsPanel from "../components/StatsPanel";
import ToWatchMovieList from "../components/MovieWatchBar";

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
