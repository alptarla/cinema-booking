import { ChangeEvent, useState } from "react";
import { Form, Stack } from "react-bootstrap";

interface Props {
  onSearch: (search: string) => void;
  onAvailableSelected: (isAvailable: boolean) => void;
}

function SearchBar({ onSearch, onAvailableSelected }: Props) {
  const [search, setSearch] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleAvailableChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(e.target.checked);
    onAvailableSelected(e.target.checked);
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
