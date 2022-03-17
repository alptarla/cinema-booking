import { useEffect } from "react";
import { Alert, Badge, Card, ListGroup, Stack } from "react-bootstrap";
import { ImTicket } from "react-icons/im";
import { Link, useParams } from "react-router-dom";
import { getWideImageUrl } from "../helpers";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMovieDetail } from "../store/slices/movie-slice";

function MovieDetailPage() {
  const {
    status,
    error,
    movieDetail: movie,
  } = useAppSelector((state) => state.movie);
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovieDetail({ id: parseInt(params.id!) }));
  }, [dispatch, params.id]);

  const listData = [
    {
      key: "Adult:",
      value: movie?.adult ? "Yes" : "No",
    },
    {
      key: "Spoken Language:",
      value: movie?.spoken_languages.map((lang) => lang.name).join(""),
    },
    {
      key: "Release date:",
      value: movie?.release_date,
    },
    {
      key: "Original title:",
      value: movie?.original_title,
    },
    {
      key: "Homepage:",
      value: movie?.homepage,
    },
  ];

  if (status === "loading") return <div>loading...</div>;
  if (status === "error") return <div>{error}</div>;
  if (!movie) return <Alert variant="warning">Movie is not found!</Alert>;

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <Card
        style={{ maxWidth: 1100 }}
        className="bg-dark border-0 mx-auto"
      >
        <Card.Img
          className="opacity-25"
          src={getWideImageUrl(movie?.backdrop_path)}
        />
        <Card.ImgOverlay>
          <Card.Body
            as={Stack}
            className="h-100 text-white position-relative"
          >
            <Badge
              pill
              className="bg-warning text-dark position-absolute top-0 end-0"
            >
              {movie.vote_average}
            </Badge>
            <Card.Title>{movie.title}</Card.Title>
            <div className="text-truncate-container">
              <p>{movie.overview}</p>
            </div>
            <ListGroup
              variant="flush"
              className="d-none d-md-block"
            >
              {listData.map((item) => (
                <ListGroup.Item
                  className="bg-transparent text-white border-0 py-1 px-0"
                  key={item.key}
                >
                  <b className="me-1">{item.key}</b>
                  <span>{item.value}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Stack
              direction="horizontal"
              className="mt-auto"
            >
              <Stack
                direction="horizontal"
                className="flex-wrap"
              >
                {movie.genres.map((genre) => (
                  <Badge
                    className="m-1 bg-warning text-dark"
                    key={genre.id}
                  >
                    {genre.name}
                  </Badge>
                ))}
              </Stack>
              <Link
                className="btn btn-success btn-sm ms-auto"
                to={`/seat-selection/${movie.id}`}
              >
                <Stack
                  direction="horizontal"
                  className="text-nowrap"
                >
                  <span className="me-1">Get Ticket</span>
                  <ImTicket size={18} />
                </Stack>
              </Link>
            </Stack>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
      {/* Only mobile devices */}
      <ListGroup className="d-md-none w-100 mt-3">
        {listData.map((item) => (
          <ListGroup.Item
            variant="warning"
            key={item.key}
          >
            <b className="me-1">{item.key}</b>
            <span>{item.value}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default MovieDetailPage;
