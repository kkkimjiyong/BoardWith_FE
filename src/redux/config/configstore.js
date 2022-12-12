import { configureStore } from "@reduxjs/toolkit";
import detail from "../../Test/DetailPostsSlice";
import comments from "../modules/CommentsSlice";

const store = configureStore({
  reducer: {
    detail: detail,
    comments: comments,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
