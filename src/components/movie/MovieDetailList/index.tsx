import { MovieDetail } from "@services/movie-service";
import { FC } from "react";
import { ListGroup } from "react-bootstrap";

type MovieDetailListProps = {
  movieDetail: MovieDetail;
};

const MovieDetailList: FC<MovieDetailListProps> = ({ movieDetail }) => {
  const listData = [
    {
      key: "Adult:",
      value: movieDetail?.adult ? "Yes" : "No",
    },
    {
      key: "Spoken Language:",
      value: movieDetail?.spoken_languages.map((lang) => lang.name).join(", "),
    },
    {
      key: "Release date:",
      value: movieDetail?.release_date,
    },
    {
      key: "Original title:",
      value: movieDetail?.original_title,
    },
    {
      key: "Homepage:",
      value: movieDetail?.homepage,
    },
  ];

  return (
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
  );
};

export default MovieDetailList;
