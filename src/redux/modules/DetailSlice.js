import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "../../instance";

//게시글 id로 받아오기
export const __getDetailId = createAsyncThunk(
  "GET_DETAIL",
  async (payload, thunkApi) => {
    //console.log("페이로드", payload);
    try {
      const { data } = await postApi.getDetailId(payload);
      console.log("데이터", data);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      console.log("에러", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
//게시글 수정
export const __editDetail = createAsyncThunk(
  "EDIT_DETAIL",
  async (payload, thunkApi) => {
    //console.log(payload);
    try {
      const data = await postApi.editDetail(payload);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
//게시글 삭제
export const __delDetail = createAsyncThunk(
  "EDIT_DETAIL",
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
    [__getDetailId.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetailId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__getDetailId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //게시글 수정
    [__editDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__editDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__editDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //게시글 삭제
    [__delDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__delDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__delDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default detailSlice.reducer;
