import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GenreService from "../../services/genre-service";
import { Genre } from "./../../services/movie-service";
import { Status } from "./../index";

interface State {
  genres: Genre[];
  status: Status;
  error: string | null;
}

const getGenres = createAsyncThunk("genre/getGenres", () => {
  return GenreService.getGenres();
});

const initialState: State = {
  genres: [],
  status: "idle",
  error: null,
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getGenres.fulfilled, (state, { payload }) => {
      state.genres = payload;
      state.status = "idle";
      state.error = null;
    });
    builder.addCase(getGenres.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getGenres.rejected, (state, { error }) => {
      state.status = "error";
      state.error = error.message || "Something went wrong";
    });
  },
});

export default genreSlice.reducer;
export { getGenres };
