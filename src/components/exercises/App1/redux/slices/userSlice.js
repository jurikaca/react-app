import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "regenerator-runtime/runtime";

export const logInThunk = createAsyncThunk(
  "loggedInUser/logInThunk",
  async (data) => {
    const response = await fetch("login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    return response;
  }
);
export const profileThunk = createAsyncThunk(
  "loggedInUser/profileThunk",
  async (data) => {
    const response = await fetch(`profile/${data.profileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = {
      status: response.status,
      ok: response.ok,
    };

    return { responseData, request: data };
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
    logInError: false,
    username: "",
    password: "",
    submitedData: "",
  },
  reducers: {
    get_user: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(logInThunk.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.loggedInUser = action.payload.user;
        state.username = action.payload.user.username;
        state.password = action.payload.user.password;
      } else {
        state.logInError = true;
        console.log("User log in Error.");
      }
    });
    builder.addCase(logInThunk.rejected, (state, action) => {
      console.log("extra reducers rejected", action);
    });
    builder.addCase(logOutThunk.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.loggedInUser = null;
      }
    });
    builder.addCase(logOutThunk.rejected, (state, action) => {
      console.log("extra reducers rejected", action);
    });
    builder.addCase(profileThunk.fulfilled, (state, action) => {
      state.submitedData = action.payload.request;
    });
    builder.addCase(profileThunk.rejected, (state, action) => {
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
