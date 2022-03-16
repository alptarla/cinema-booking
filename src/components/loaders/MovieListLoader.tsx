import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const SKELETON_COUNT = 5;

function MovieListLoader() {
  return (
    <Row>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <Col
          key={index}
          lg={3}
          md={4}
          xs={6}
          className="p-2"
        >
          <Skeleton height={400} />
        </Col>
      ))}
    </Row>
  );
}
export default MovieListLoader;
