import MovieDetailLoader from "@components/loaders/MovieDetailLoader";
import MovieDetailList from "@components/movie/MovieDetailList";
import { getWideImageUrl } from "@helpers/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getMovieDetail } from "@store/slices/movie-slice";
import { useEffect } from "react";
import { Alert, Badge, Card, Stack } from "react-bootstrap";
import { ImTicket } from "react-icons/im";
import { Link, useParams } from "react-router-dom";

const MovieDetail = () => {
  const { status, error, movieDetail } = useAppSelector((state) => state.movie);

  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovieDetail({ id: parseInt(params.id!) }));
  }, [dispatch, params.id]);

  return (
    <>
      {status === "loading" ? (
        <MovieDetailLoader />
      ) : status === "error" ? (
        <Alert variant="danger">{error}</Alert>
      ) : !movieDetail ? (
        <Alert variant="warning">Movie is not found!</Alert>
      ) : (
        <div className="h-100 d-flex flex-column align-items-center justify-content-center">
          <Card className="bg-dark border-0 page-container">
            <Card.Img
              className="opacity-25"
              src={getWideImageUrl(movieDetail.backdrop_path)}
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
                  {movieDetail.vote_average}
                </Badge>
                <Card.Title>{movieDetail.title}</Card.Title>
                <div className="text-truncate-container">
                  <p>{movieDetail.overview}</p>
                </div>
                <MovieDetailList movieDetail={movieDetail} />
                <Stack
                  direction="horizontal"
                  className="mt-auto"
                >
                  <Stack
                    direction="horizontal"
                    className="flex-wrap"
                  >
                    {movieDetail.genres.map((genre) => (
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
                    to={`/seat-selection/${movieDetail.id}`}
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
        </div>
      )}
    </>
  );
};

export default MovieDetail;
