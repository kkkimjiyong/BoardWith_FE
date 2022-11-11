import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "../../instance";

//게시글 id로 받아오기
export const __getPostslById = createAsyncThunk(
  "GET_POSTS_BY_ID",
  async (payload, thunkApi) => {
    //console.log("페이로드", payload);
    try {
      const { data } = await postApi.getDetailId(payload);
      //console.log("데이터", data);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      console.log("에러", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

//게시글 삭제
export const __delPosts = createAsyncThunk(
  "DELETE_POSTS",
  async (payload, thunkApi) => {
    //console.log(payload);
    try {
      const { data } = await postApi.delDetail(payload);
      console.log(data);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: {
    //게시글 id로 받아오기
    [__getPostslById.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPostslById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__getPostslById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //게시글 삭제
    [__delPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [__delPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__delPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default detailSlice.reducer;
