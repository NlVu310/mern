import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/userSlide"
import productReducer from "./slides/productSlice";
import orderReducer from "./slides/orderSlide";

//đây là rootReducer dùng để cấu hình các middleware khác
export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: orderReducer
    },
})