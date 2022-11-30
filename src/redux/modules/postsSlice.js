import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postsApi } from "../../instance";

const initialState = {
  data: [],
  distance: [],
  isLoading: false,
  error: null,
  post: {},
  isHost: false,
};
const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addDistance: (state, action) => {
      state.distance.push(action.payload);
    },
    isHost: (state, action) => {
      // if(state.isHost===false){
      //   state.isHost===true;
      // }
    },
  },
  extraReducers: {},
});

export const { addDistance } = PostsSlice.actions;
export default PostsSlice.reducer;
