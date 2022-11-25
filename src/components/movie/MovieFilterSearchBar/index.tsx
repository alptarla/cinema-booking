import { ChangeEvent, FC } from "react";
import { FormControl } from "react-bootstrap";

type MovieFilterSearchBarProps = {
  onSearch: (search: string) => void;
  searchValue: string;
};

const MovieFilterSearchBar: FC<MovieFilterSearchBarProps> = ({
  onSearch,
  searchValue = "",
}) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-3 w-50 mx-auto">
      <FormControl
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search movies..."
      />
    </div>
  );
};

export default MovieFilterSearchBar;
