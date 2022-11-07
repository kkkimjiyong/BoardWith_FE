import { configureStore } from "@reduxjs/toolkit";
import posts from "../modules/postsSlice";
// import logger from "redux-logger";

// 내가 만든 리듀서를 넣어준다
const store = configureStore({
  reducer: { posts },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  //   devTools: process.env.NODE_ENV !== "production",
});

export default store;
