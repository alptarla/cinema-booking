import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { MovieListLoader } from "../components/loaders";
import MovieFilter from "../components/movie/MovieFilter";
import MovieList from "../components/movie/MovieList";
import { Movie } from "../services/movie-service";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMovies, setMovies } from "../store/slices/movie-slice";

function HomePage() {
  const {
    status: movieStatus,
    error: movieError,
    movies,
    filters,
  } = useAppSelector((state) => state.movie);

  const dispatch = useAppDispatch();

  const searchByKeyword = (movies: Movie[], keyword: string) => {
    const searchRegex = new RegExp(keyword, "i");
    return movies.filter((movie) => {
      return movie.title.match(searchRegex);
    });
  };

  useEffect(() => {
    dispatch(getMovies({ genres: filters.genres }))
      .unwrap()
      .then((moviesData) => {
        // ** client side searching
        const newMovies = searchByKeyword(moviesData, filters.search);
        dispatch(setMovies(newMovies));
      });
  }, [dispatch, filters]);

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
