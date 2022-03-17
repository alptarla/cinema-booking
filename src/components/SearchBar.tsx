import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  onSearch: (search: string) => void;
  searchValue: string;
}

function SearchBar({ onSearch, searchValue }: Props) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-3 w-50 mx-auto">
      <Form.Control
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search movies..."
      />
    </div>
  );
}

export default SearchBar;
