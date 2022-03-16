import { useEffect } from "react";
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
  return <div>{JSON.stringify(movies)}</div>;
}

export default HomePage;
