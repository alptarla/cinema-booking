import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getGenres } from "../../store/slices/genre-slice";
import { Filter, setFilter } from "../../store/slices/movie-slice";
import GenreList from "../GenreList";
import { GenreListLoader } from "../loaders";
import SearchBar from "../SearchBar";

function MovieFilter() {
  const { genres, status } = useAppSelector((state) => state.genre);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const updateFilter = (filter: Filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <Stack className="border rounded p-3 mb-3 bg-light shadow-sm">
      <SearchBar onFilter={updateFilter} />
      {status === "loading" ? (
        <GenreListLoader />
      ) : (
        <GenreList genres={genres} />
      )}
    </Stack>
  );
}

export default MovieFilter;
