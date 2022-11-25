import classNames from "classnames";
import { FC } from "react";
import { Badge, Stack } from "react-bootstrap";
import { Genre } from "../../../services/genre-service";

type MovieFilterGenreListProps = {
  genres: Genre[];
  onSelectGenre: (genre: Genre) => void;
  selectedGenres: Genre[];
};

const MovieFilterGenreList: FC<MovieFilterGenreListProps> = ({
  genres,
  onSelectGenre,
  selectedGenres,
}) => {
  const handleSelectGenre = (genre: Genre) => {
    return () => onSelectGenre(genre);
  };

  const getBadgeClassNames = (id: string) => {
    const isGenreSelected = selectedGenres.some((genre) => genre.id === id);
    return classNames("m-1 text-white", [
      isGenreSelected ? "bg-success" : "bg-secondary",
    ]);
  };

  return (
    <Stack
      direction="horizontal"
      className="flex-wrap"
    >
      {genres.map((genre) => (
        <Badge
          key={genre.id}
          role="button"
          className={getBadgeClassNames(genre.id)}
          onClick={handleSelectGenre(genre)}
        >
          {genre.name}
        </Badge>
      ))}
    </Stack>
  );
};

export default MovieFilterGenreList;
