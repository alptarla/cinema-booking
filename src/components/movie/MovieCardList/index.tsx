import { Movie as IMovie } from "@services/movie-service";
import { FC } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard";

type MovieCardListProps = {
  movies: IMovie[];
};

const MovieCardList: FC<MovieCardListProps> = ({ movies }) => {
  if (!movies.length) {
    return <Alert variant="warning">There are no movies this category!</Alert>;
  }

  return (
    <Row
      className="g-3"
      gutter={2}
    >
      {movies.map((movie) => (
        <Col
          key={movie.id}
          as={Link}
          to={`/movie/${movie.id}`}
          lg={3}
          md={4}
          xs={6}
        >
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieCardList;
