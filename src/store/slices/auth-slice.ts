import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import StorageService from "../../services/storage-service";
import AuthService, { User } from "./../../services/auth-service";

type State = {
  user: User | null;
  status: "idle" | "loading" | "error";
  error: string | null;
};

const signIn = createAsyncThunk(
  "auth/signIn",
  ({ email, password }: { email: string; password: string }) => {
    return AuthService.signIn(email, password);
  }
);

const signUp = createAsyncThunk(
  "auth/signUp",
  ({ email, password }: { email: string; password: string }) => {
    return AuthService.signUp(email, password);
  }
);

const signOut = createAsyncThunk("auth/signOut", () => {
  return AuthService.signOut();
});

const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  ({ email }: { email: string }) => {
    return AuthService.resetPassword(email);
  }
);

const confirmPassword = createAsyncThunk(
  "auth/confirmPassword",
  ({ code, password }: { code: string; password: string }) => {
    return AuthService.confirmPassword(code, password);
  }
);

const initialState: State = {
  user: StorageService.get<User>("user") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;

      if (!action.payload) {
        StorageService.remove("user");
        return;
      }

      StorageService.set("user", action.payload);
    },
    resetError(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "idle";
      state.error = null;
      StorageService.set("user", payload);
    });
    builder.addCase(signUp.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signUp.rejected, (state, { error }) => {
      state.status = "error";
      state.error = error.message || "Something went wrong";
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "idle";
      state.error = null;
      StorageService.set("user", payload);
    });
    builder.addCase(signIn.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signIn.rejected, (state, { error }) => {
      state.status = "error";
      state.error = error.message || "Something went wrong";
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      StorageService.remove("user");
    });
  },
});

export default authSlice.reducer;
export { signIn, signUp, signOut, resetPassword, confirmPassword };
export const { setUser, resetError } = authSlice.actions;
