import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sellerReducer from "./sellerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
  },
});

export default store;
