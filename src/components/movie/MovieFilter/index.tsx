import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import GenreListLoader from "../../../components/loaders/GenreListLoader";
import { Genre } from "../../../services/genre-service";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getGenres } from "../../../store/slices/genre-slice";
import { Filters, updateFilters } from "../../../store/slices/movie-slice";
import MovieFilterGenreList from "../MovieFilterGenreList";
import MovieFilterSearchBar from "../MovieFilterSearchBar";

const DEFAULT_FILTERS = {
  search: "",
  genres: [],
};

const MovieFilter = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const { genres, status } = useAppSelector((state) => state.genre);
  const { filters: storeFilters } = useAppSelector((state) => state.movie);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(storeFilters)) {
      dispatch(updateFilters(filters));
    }
  }, [filters, dispatch, storeFilters]);

  const handleSearch = (search: string) => {
    setFilters((prevState) => ({ ...prevState, search }));
  };

  const handleSelectGenre = (genre: Genre) => {
    const isAlreadySelected = filters.genres.some((selected) => {
      return selected.id === genre.id;
    });

    if (!isAlreadySelected) {
      setFilters((prevState) => ({
        ...prevState,
        genres: [...prevState.genres, genre],
      }));
      return;
    }

    setFilters((prevState) => {
      const prevStateClone = { ...prevState };
      prevStateClone.genres = prevStateClone.genres.filter((selected) => {
        return selected.id !== genre.id;
      });
      return { ...prevStateClone };
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
      <MovieFilterSearchBar
        searchValue={filters.search}
        onSearch={handleSearch}
      />
      {status === "loading" ? (
        <GenreListLoader />
      ) : (
        <MovieFilterGenreList
          genres={genres}
          onSelectGenre={handleSelectGenre}
          selectedGenres={filters.genres}
        />
      )}
    </Stack>
  );
};

export default MovieFilter;
