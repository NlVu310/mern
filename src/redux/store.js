import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";
import userReducer from "./slides/userSlide"

//đây là rootReducer dùng để cấu hình các middleware khác
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    },
})