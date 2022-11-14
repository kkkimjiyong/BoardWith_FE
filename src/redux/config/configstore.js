import { configureStore } from "@reduxjs/toolkit";
import detail from "../modules/DetailPostsSlice";
import comments from "../modules/CommentsSlice";
import posts from "../modules/postsSlice";

const store = configureStore({
  reducer: {
    posts,
    detail: detail,
    comments: comments,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
