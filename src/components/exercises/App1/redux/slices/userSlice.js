import { createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        log_in: (state, action) => {
            state = action.payload.user;
        },
        log_out: (state, action) => {
            return null;
        },
        get_user: (state, action) => {
            state = action.payload.user;
        }
    }
});

export const { log_in, log_out, get_user } = userSlice.actions;

export default userSlice.reducer;