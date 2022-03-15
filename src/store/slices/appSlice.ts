import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  appName: string;
}

const initialState: InitialState = {
  appName: "Cinema Booking",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
