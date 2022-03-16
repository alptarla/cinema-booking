import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre } from "../../services/genre-service";
import MovieService, { Movie } from "./../../services/movie-service";
import { Status } from "./../index";

export type Filters = {
  search: string;
  isAvailable: boolean;
  genres: Genre[];
};
interface State {
  movies: Movie[];
  filters: Filters;
  status: Status;
  error: string | null;
}

const getMovies = createAsyncThunk("movie/getMovies", () => {
  return MovieService.getMovies();
});

const initialState: State = {
  movies: [],
  filters: {
    search: "",
    isAvailable: false,
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
export const { updateFilters } = movieSlice.actions;
