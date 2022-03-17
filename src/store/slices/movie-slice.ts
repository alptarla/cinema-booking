import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre } from "../../services/genre-service";
import MovieService, {
  Movie,
  MovieDetail,
} from "./../../services/movie-service";
import { Status } from "./../index";

export type Filters = {
  search: string;
  genres: Genre[];
};
interface State {
  movies: Movie[];
  movieDetail: MovieDetail | null;
  filters: Filters;
  status: Status;
  error: string | null;
}

const getMovies = createAsyncThunk(
  "movie/getMovies",
  ({ genres }: { genres: Genre[] }) => {
    return MovieService.getMovies(genres);
  }
);

const getMovieDetail = createAsyncThunk(
  "movie/getMovieDetail",
  ({ id }: { id: number }) => {
    return MovieService.getMovieDetail(id);
  }
);

const initialState: State = {
  movies: [],
  movieDetail: null,
  filters: {
    search: "",
    genres: [],
  },
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    updateFilters(state, { payload }: PayloadAction<Filters>) {
      state.filters = payload;
    },
    setMovies(state, { payload }: PayloadAction<Movie[]>) {
      state.movies = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.movies = payload;
      state.status = "idle";
      state.error = null;
    });
    builder.addCase(getMovies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getMovies.rejected, (state, { error }) => {
      state.status = "error";
      state.error = error.message || "Something went wrong";
    });
    builder.addCase(getMovieDetail.fulfilled, (state, { payload }) => {
      state.movieDetail = payload;
      state.status = "idle";
      state.error = null;
    });
    builder.addCase(getMovieDetail.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getMovieDetail.rejected, (state, { error }) => {
      state.status = "error";
      state.error = error.message || "Something went wrong";
    });
  },
});

export default movieSlice.reducer;
export { getMovies, getMovieDetail };
export const { updateFilters, setMovies } = movieSlice.actions;
