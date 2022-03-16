import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { Genre } from "../../services/genre-service";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getGenres } from "../../store/slices/genre-slice";
import { Filters, updateFilters } from "../../store/slices/movie-slice";
import GenreList from "../GenreList";
import { GenreListLoader } from "../loaders";
import SearchBar from "../SearchBar";

function MovieFilter() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    isAvailable: false,
    genres: [],
  });

  const { genres, status } = useAppSelector((state) => state.genre);
  const { filters: storeFilters } = useAppSelector((state) => state.movie);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleAvailable = (isAvailable: boolean) => {
    setFilters((prev) => ({ ...prev, isAvailable }));
  };

  const handleGenre = (genre: Genre) => {
    const isAlreadySelected = filters.genres.some((selected) => {
      return selected.id === genre.id;
    });

    if (!isAlreadySelected) {
      setFilters((prev) => ({ ...prev, genres: [...prev.genres, genre] }));
      return;
    }

    setFilters((prev) => {
      const newFilters = { ...prev };
      newFilters.genres = newFilters.genres.filter((selected) => {
        return selected.id !== genre.id;
      });
      return { ...newFilters };
    });
  };

  useEffect(() => {
    // ** not dispatch changes to store, if filters same to filters into store
    if (JSON.stringify(filters) === JSON.stringify(storeFilters)) {
      return;
    }
    dispatch(updateFilters(filters));
  }, [filters, dispatch, storeFilters]);

  return (
    <Stack className="border rounded p-3 mb-3 bg-light shadow-sm">
      <SearchBar
        onSearch={handleSearch}
        onAvailableSelected={handleAvailable}
      />
      {status === "loading" ? (
        <GenreListLoader />
      ) : (
        <GenreList
          genres={genres}
          onSelectGenre={handleGenre}
          selectedGenres={filters.genres}
        />
      )}
    </Stack>
  );
}

export default MovieFilter;
