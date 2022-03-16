import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getGenres } from "../../store/slices/genre-slice";
import GenreList from "../GenreList";
import { GenreListLoader } from "../loaders";
import SearchBar from "../SearchBar";

function MovieFilter() {
  const { genres, status } = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <Stack className="border rounded p-3 mb-3 bg-light shadow-sm">
      <SearchBar />
      {status === "loading" ? (
        <GenreListLoader />
      ) : (
        <GenreList genres={genres} />
      )}
    </Stack>
  );
}

export default MovieFilter;
