import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Movie as IMovie } from "../../services/movie-service";
import Movie from "./Movie";

interface Props {
  movies: IMovie[];
}

function MovieList({ movies }: Props) {
  return (
    <Row
      className="g-3"
      gutter={2}
    >
      {movies.map((movie) => (
        <Col
          as={Link}
          to={`/movie/${movie.id}`}
          lg={3}
          md={4}
          xs={6}
          key={movie.id}
        >
          <Movie movie={movie} />
        </Col>
      ))}
    </Row>
  );
}

export default MovieList;
