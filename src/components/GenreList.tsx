import classNames from "classnames";
import { Badge, Stack } from "react-bootstrap";
import { Genre } from "../services/genre-service";

interface Props {
  genres: Genre[];
  onSelectGenre: (genre: Genre) => void;
  selectedGenres: Genre[];
}

function GenreList({ genres, onSelectGenre, selectedGenres }: Props) {
  const selectGenre = (genre: Genre) => {
    return () => {
      onSelectGenre(genre);
    };
  };

  const isGenreSelected = (id: string) => {
    return selectedGenres.some((genre) => genre.id === id);
  };

  const getBadgeClassNames = (id: string) => {
    return classNames("m-1 text-white", [
      isGenreSelected(id) ? "bg-success" : "bg-secondary",
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
          onClick={selectGenre(genre)}
        >
          {genre.name}
        </Badge>
      ))}
    </Stack>
  );
}
export default GenreList;
