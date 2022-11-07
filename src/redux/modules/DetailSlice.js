import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "../../instance";

export const __getDetail = createAsyncThunk(
  "GET_DETAIL",
  async (payload, thunkApi) => {
    //console.log(payload);
    try {
      const { data } = await postApi.getDetailId(payload);
      console.log(data);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const __editDetail = createAsyncThunk(
  "EDIT_DETAIL",
  async (payload, thunkApi) => {
    //console.log(payload);
    try {
      const { data } = await postApi.editDetail(payload);
      console.log(data);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

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
    [__getDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__getDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__editDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__editDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__delDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__delDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__delDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default detailSlice.reducer;
