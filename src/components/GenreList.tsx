import { Badge, Stack } from "react-bootstrap";
import { Genre } from "../services/genre-service";

interface Props {
  genres: Genre[];
}

function GenreList({ genres }: Props) {
  return (
    <Stack
      direction="horizontal"
      className="flex-wrap"
    >
      {genres.map((genre) => (
        <Badge
          key={genre.id}
          className="bg-secondary text-white m-1"
        >
          {genre.name}
        </Badge>
      ))}
    </Stack>
  );
}
export default GenreList;
