import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import "babel-polyfill";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const response = await fetch("list-messages.php").then((response) =>
      response.json()
    );
    return response.messages;
  }
);

export const deleteMessageThunk = createAsyncThunk(
  "messages/deleteMessages",
  async (data) => {
    const response = await fetch("delete-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    return {
      response,
      request: data,
    };
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    status: "idle",
    data: [],
  },
  reducers: {
    sendMessage: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (message) => message.id !== action.payload.request.id
        );
      })

      .addCase(deleteMessageThunk.rejected, (state, action) => {
        console.log("extra reducers rejected", action);
      });
  },
});

export const { sendMessage } = messageSlice.actions;

export default messageSlice.reducer;
