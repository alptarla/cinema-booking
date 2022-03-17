import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Genre } from "../../services/genre-service";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getGenres } from "../../store/slices/genre-slice";
import { Filters, updateFilters } from "../../store/slices/movie-slice";
import GenreList from "../GenreList";
import { GenreListLoader } from "../loaders";
import SearchBar from "../SearchBar";

const DEFAULT_FILTERS = {
  search: "",
  genres: [],
};

function MovieFilter() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const { genres, status } = useAppSelector((state) => state.genre);
  const { filters: storeFilters } = useAppSelector((state) => state.movie);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    // ** not dispatch changes to store, if filters same to filters into store
    if (JSON.stringify(filters) === JSON.stringify(storeFilters)) {
      return;
    }
    dispatch(updateFilters(filters));
  }, [filters, dispatch, storeFilters]);

  const handleSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
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

  const clearFilters = () => {
    dispatch(updateFilters(DEFAULT_FILTERS));
    setFilters(DEFAULT_FILTERS);
  };

  const isClearButtonDisabled =
    JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTERS);

  return (
    <Stack className="border rounded p-3 mb-3 bg-light shadow-sm position-relative">
      <Button
        size="sm"
        variant="warning"
        className="position-absolute top-0 end-0 m-2"
        onClick={clearFilters}
        disabled={isClearButtonDisabled}
      >
        Clear filters
      </Button>
      <SearchBar
        searchValue={filters.search}
        onSearch={handleSearch}
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
