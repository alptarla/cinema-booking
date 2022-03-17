import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMovieDetail } from "../store/slices/movie-slice";

function MovieDetailPage() {
  const { status, error, movieDetail } = useAppSelector((state) => state.movie);
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovieDetail({ id: parseInt(params.id!) }));
  }, [dispatch, params.id]);

  if (status === "loading") return <div>loading...</div>;
  if (status === "error") return <div>{error}</div>;

  return <div>{JSON.stringify(movieDetail)}</div>;
}

export default MovieDetailPage;
