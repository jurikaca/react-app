import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../../../../services/api";
import "babel-polyfill";

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () =>{
    const response = await api.get('list-messages.php');
    return response.messages;
})

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        status: 'idle',
        data: [],
    },
    reducers: {
        sendMessage: (state, action) => {
            state.data.push(action.payload);
        },
        deleteMessage: (state, action) => {
            state.data = state.data.filter((message) => message.id !== action.payload);
        }
    },
    extraReducers(builder){
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
});

export const { sendMessage, deleteMessage } = messageSlice.actions;

export default messageSlice.reducer;