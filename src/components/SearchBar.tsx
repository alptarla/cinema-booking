import { ChangeEvent } from "react";
import { Form, Stack } from "react-bootstrap";

interface Props {
  onSearch: (search: string) => void;
  onAvailableSelected: (isAvailable: boolean) => void;
  searchValue: string;
  isAvailableValue?: boolean;
}

function SearchBar({
  onSearch,
  onAvailableSelected,
  searchValue,
  isAvailableValue,
}: Props) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleAvailableChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAvailableSelected(e.target.checked);
  };

  return (
    <Stack className="gap-2 mb-3 w-50 mx-auto">
      <Form.Control
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search movies..."
      />
      <Form.Check
        checked={isAvailableValue}
        onChange={handleAvailableChange}
        label="Show available movies"
      />
    </Stack>
  );
}

export default SearchBar;
