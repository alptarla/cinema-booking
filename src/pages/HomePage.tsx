import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import MovieList from "../components/MovieList";
import PageLoader from "../components/PageLoader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMovies } from "../store/slices/movie-slice";

function HomePage() {
  const { status, error, movies } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (status === "loading") return <PageLoader />;
  if (status === "error") return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="h-100">
      {/* Search and availability option */}
      {/* Genres for filtering */}
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
