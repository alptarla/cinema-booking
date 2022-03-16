import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Movie from "../components/Movie";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMovies } from "../store/slices/movie-slice";

function HomePage() {
  const { status, error, movies } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (status === "error") return <p>{error}</p>;
  if (status === "loading") return <p>loading...</p>;

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

export default HomePage;
