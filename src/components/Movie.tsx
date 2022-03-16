import { Badge, Card, Stack } from "react-bootstrap";
import { getSmallImageUrl } from "../helpers";
import { Movie as IMovie } from "../services/movie-service";

interface Props {
  movie: IMovie;
}

function Movie({ movie }: Props) {
  return (
    <Card>
      <Card.Img src={getSmallImageUrl(movie.poster_path)} />
      <Card.Body>
        <Card.Title
          className="text-truncate"
          title={movie.title}
        >
          {movie.title}
        </Card.Title>
        <Stack direction="horizontal">
          <Badge className="bg-secondary">{movie.release_date}</Badge>
          <Badge className="ms-auto bg-warning">{movie.vote_average}</Badge>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default Movie;
