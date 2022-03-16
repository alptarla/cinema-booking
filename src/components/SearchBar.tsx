import { ChangeEvent, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { Filter } from "../store/slices/movie-slice";

interface Props {
  onFilter: (filter: Filter) => void;
}

function SearchBar({ onFilter }: Props) {
  const [search, setSearch] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilter({ search: e.target.value, isAvailable });
  };

  const handleAvailableChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(e.target.checked);
    onFilter({ search, isAvailable: e.target.checked });
  };

  return (
    <Stack className="gap-2 mb-3 w-50 mx-auto">
      <Form.Control
        value={search}
        onChange={handleSearchChange}
        placeholder="Search movies..."
      />
      <Form.Check
        checked={isAvailable}
        onChange={handleAvailableChange}
        label="Show available movies"
      />
    </Stack>
  );
}

export default SearchBar;
