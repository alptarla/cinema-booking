import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import SalonService, { Salon } from "../../services/salon-service";
import StorageService from "../../services/storage-service";
import { Status } from "./../index";

export type Seat = {
  key: string;
  value: number;
};

interface State {
  salons: Salon[];
  reservedSeats: { [key: number | string]: Seat[] };
  status: Status;
  error: string | null;
}

const getSalons = createAsyncThunk("salons/getSalons", () => {
  return SalonService.getSalons();
});

const initialState: State = {
  salons: [],
  reservedSeats: StorageService.get("reservedSeats") || {},
  status: "idle",
  error: null,
};

const salonSlice = createSlice({
  name: "salon",
  initialState,
  reducers: {
    saveSeats(
      state,
      action: PayloadAction<{ salonId: string; seats: Seat[] }>
    ) {
      const { salonId, seats } = action.payload;

      let reserved = state.reservedSeats[salonId];
      if (reserved) {
        reserved.push(...seats);
      } else {
        reserved = seats;
      }

      state.reservedSeats[salonId] = reserved;
      StorageService.set("reservedSeats", state.reservedSeats);
    },
  },
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
export const { saveSeats } = salonSlice.actions;
