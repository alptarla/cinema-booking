import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SalonService, { Salon } from "../../services/salon-service";
import { Status } from "./../index";

interface State {
  salons: Salon[];
  status: Status;
  error: string | null;
}

const getSalons = createAsyncThunk("salons/getSalons", () => {
  return SalonService.getSalons();
});

const initialState: State = {
  salons: [],
  status: "idle",
  error: null,
};

const salonSlice = createSlice({
  name: "salon",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSalons.fulfilled, (state, { payload }) => {
      state.salons = payload;
      state.status = "idle";
      state.error = null;
    });
    builder.addCase(getSalons.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSalons.rejected, (state, { error }) => {
      state.status = "error";
      state.error = error.message || "Something went wrong";
    });
  },
});

export default salonSlice.reducer;
export { getSalons };
