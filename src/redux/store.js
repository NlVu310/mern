import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/userSlide"
import productReducer from "./slides/productSlice";

//đây là rootReducer dùng để cấu hình các middleware khác
export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer
    },
})