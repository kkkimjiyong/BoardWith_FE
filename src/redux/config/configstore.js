import { configureStore } from "@reduxjs/toolkit";
import detail from "../modules/DetailSlice";
const store = configureStore({
  reducer: {
    detail: detail,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
