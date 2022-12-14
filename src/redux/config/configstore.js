import { configureStore } from "@reduxjs/toolkit";
import comments from "../modules/CommentsSlice";

const store = configureStore({
  reducer: {
    comments: comments,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
