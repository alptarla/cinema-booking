import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { MovieListLoader } from "../components/loaders";
import MovieFilter from "../components/movie/MovieFilter";
import MovieList from "../components/movie/MovieList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMovies } from "../store/slices/movie-slice";

function HomePage() {
  const {
    status: movieStatus,
    error: movieError,
    movies,
  } = useAppSelector((state) => state.movie);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const renderMovieListContent = () => {
    if (movieStatus === "loading") {
      return <MovieListLoader />;
    } else if (movieStatus === "error") {
      return <Alert variant="danger">{movieError}</Alert>;
    } else {
      return <MovieList movies={movies} />;
    }
  };

  return (
    <div className="h-100">
      <MovieFilter />
      {renderMovieListContent()}
    </div>
  );
}

export default HomePage;
