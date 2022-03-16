import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import genreSlice from "./slices/genre-slice";
import movieSlice from "./slices/movie-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    movie: movieSlice,
    genre: genreSlice,
  },
});

export type Status = "idle" | "loading" | "error";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
