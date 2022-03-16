import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import MovieService, { Movie } from "./../../services/movie-service";
import { Status } from "./../index";

export type Filter = {
  search: string;
  isAvailable: boolean;
};
interface State {
  movies: Movie[];
  filter: Filter;
  status: Status;
  error: string | null;
}

const getMovies = createAsyncThunk("movie/getMovies", () => {
  return MovieService.getMovies();
});

const initialState: State = {
  movies: [],
  filter: {
    search: "",
    isAvailable: false,
  },
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setFilter(state, { payload }: PayloadAction<Filter>) {
      state.filter = payload;
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
  },
});

export default movieSlice.reducer;
export { getMovies };
export const { setFilter } = movieSlice.actions;
