import { Col, Row } from "react-bootstrap";
import { Movie as IMovie } from "../services/movie-service";
import Movie from "./Movie";

interface Props {
  movies: IMovie[];
}

function MovieList({ movies }: Props) {
  return (
    <Row>
      {movies.map((movie) => (
        <Col
          lg={3}
          md={4}
          xs={6}
          key={movie.id}
          className="p-2"
        >
          <Movie movie={movie} />
        </Col>
      ))}
    </Row>
  );
}

export default MovieList;
