import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logInThunk = createAsyncThunk(
  "loggedInUser/logInThunk",
  async () => {
    const response = await fetch("login", { method: "POST" }).then((response) =>
      response.json()
    );
    return response;
  }
);
export const logOutThunk = createAsyncThunk(
  "loggedInUser/logOutThunk",
  async () => {
    const response = await fetch("logout", { method: "POST" }).then(
      (response) => response.json()
    );
    return response;
  }
);
export const logUserInThunk = createAsyncThunk(
  "loggedInUser/logInUserThunk",
  async () => {
    const response = await fetch("getlogin-User").then((response) =>
      response.json()
    );
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    loggedInUser: null,
  },
  reducers: {
    get_user: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(logInThunk.fulfilled, (state, action) => {
      state.loggedInUser = action.payload.user;
    });
    builder.addCase(logInThunk.rejected, (state, action) => {
      console.log("extra reducers rejected", action);
    });
    builder.addCase(logOutThunk.fulfilled, (state, action) => {
      state.loggedInUser = null;
    });
    builder.addCase(logOutThunk.rejected, (state, action) => {
      console.log("extra reducers rejected", action);
    });
    builder.addCase(logUserInThunk.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.loggedInUser = action.payload.user;
      } else {
        state.loggedInUser = null;
      }
    });
    builder.addCase(logUserInThunk.rejected, (state, action) => {
      console.log("extra reducers rejected", action);
    });
  },
});

export const { log_in, log_out, get_user } = userSlice.actions;

export default userSlice.reducer;
