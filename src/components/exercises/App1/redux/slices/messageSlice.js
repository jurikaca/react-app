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
  async (messageId) => {
    const response = await fetch(`message/${messageId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
    return {
      response,
      request: messageId,
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
          (message) => message.id !== action.payload.request
        );
      })

      .addCase(deleteMessageThunk.rejected, (state, action) => {
        console.log("extra reducers rejected", action);
      });
  },
});

export const { sendMessage } = messageSlice.actions;

export default messageSlice.reducer;
