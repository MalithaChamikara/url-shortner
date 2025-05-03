import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./urlSlice";

// Create a Redux store with the URL slice reducer
const store = configureStore({
    reducer: {
        urls: urlReducer,
    },
})

export default store;
