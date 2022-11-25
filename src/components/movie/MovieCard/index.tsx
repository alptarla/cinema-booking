import { getSmallImageUrl } from "@helpers/index";
import { Movie as IMovie } from "@services/movie-service";
import { Badge, Card, Stack } from "react-bootstrap";

import { FC } from "react";

type MovieCardProps = {
  movie: IMovie;
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const imageSrc = getSmallImageUrl(movie.poster_path);

  return (
    <Card>
      <Card.Img src={imageSrc} />
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
};

export default MovieCard;
