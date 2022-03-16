import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieService, { Movie } from "./../../services/movie-service";
import { Status } from "./../index";

interface State {
  movies: Movie[];
  status: Status;
  error: string | null;
}

const getMovies = createAsyncThunk("movie/getMovies", () => {
  return MovieService.getMovies();
});

const initialState: State = {
  movies: [],
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
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
