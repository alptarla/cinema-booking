import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import MovieListLoader from "../../components/loaders/MovieListLoader";
import MovieCardList from "../../components/movie/MovieCardList";
import MovieFilter from "../../components/movie/MovieFilter";
import { Movie } from "../../services/movie-service";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getMovies, setMovies } from "../../store/slices/movie-slice";

const searchByKeyword = (movies: Movie[], keyword: string) => {
  const searchRegex = new RegExp(keyword, "i");
  return movies.filter((movie) => {
    return movie.title.match(searchRegex);
  });
};

const Home = () => {
  const { status, error, movies, filters } = useAppSelector(
    (state) => state.movie
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies({ genres: filters.genres }))
      .unwrap()
      .then((data) => {
        const newMovies = searchByKeyword(data, filters.search);
        dispatch(setMovies(newMovies));
      });
  }, [dispatch, filters]);

  return (
    <div className="h-100">
      <MovieFilter />
      {status === "loading" ? (
        <MovieListLoader />
      ) : status === "error" ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <MovieCardList movies={movies} />
      )}
    </div>
  );
};

export default Home;
