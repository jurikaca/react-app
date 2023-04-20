import { configureStore } from '@reduxjs/toolkit';
import messageReducer from "./redux/slices/messageSlice";
import userReducer from "./redux/slices/userSlice";
import counterReducer from "./redux/slices/counterSlice";
import contactReducer from "./redux/slices/contactSlice";

export default configureStore({
    reducer: {
        message: messageReducer,
        user: userReducer,
        counter: counterReducer,
        contacts: contactReducer
    }
});