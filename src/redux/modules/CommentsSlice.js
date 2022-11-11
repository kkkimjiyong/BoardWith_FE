import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { commentsApi } from "../../instance";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};
//댓글가져오기
export const __getComments = createAsyncThunk(
  "GET_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await commentsApi.getComments(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//댓글달기
export const __postComments = createAsyncThunk(
  "POST_COMMENTS",
  async (payload, thunkAPI) => {
    //console.log("페이로드", payload);
    try {
      const data = await commentsApi.postComments(payload);
      //console.log("페이로드", payload);
      //console.log("페이로드", payload.comment);
      //console.log("data", data.data.createComment);
      return thunkAPI.fulfillWithValue(data.data.createComment);
    } catch (error) {
      if (error.response.status === 412) {
        alert("댓글 내용을 입력해주세요😌");
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//삭제
export const __deleteComment = createAsyncThunk(
  "DEL_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      //console.log("payload", payload);
      const data = await commentsApi.delComments(payload);
      //console.log("data", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//수정
export const __editComment = createAsyncThunk(
  "EDIT_COMMENTS",
  async (payload, thunkAPI) => {
    const data = await commentsApi.editComments(payload);
    console.log(data);
    return thunkAPI.fulfillWithValue(payload);
    try {
      console.log("payload", payload);
      const data = await commentsApi.editComments(payload);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("edit에러1", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [__getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      //console.log("state1", state.comments);
      //console.log("state2", state.comments.comments);
    },
    [__getComments.pending]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("get에러", state.error);
    },
    [__postComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log("action.payload", action.payload);
      // console.log("state", state);
      // console.log("state.comments", state.comments.comments);
      state.comments.comments = [...state.comments.comments, action.payload];
      //state.comments = action.payload;
    },
    [__postComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("post에러", state.error);
    },

    //댓글 삭제
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      //console.log(state.comments);
      const payloadelete = state.comments.comments.filter(
        (comment) => comment._id === action.payload
      );
      state.comments.comments.splice(payloadelete, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("delete에러", state.error);
    },

    // 댓글 수정
    [__editComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__editComment.fulfilled]: (state, action) => {
      console.log("하이하이");
      console.log("리듀서", action.payload);
      state.isLoading = false;
      state.comments = action.payload;
      // console.log("state", state);
      // console.log("state.comments", state.comments.comments);
      // const commentList = state.comments.comments.map((comment) =>
      //   comment._id === action.payload.commentId
      //     ? { ...comment, commentBody: action.payload.input }
      //     : comment
      // );
      // state.comments.comments = commentList;
    },
    [__editComment.pending]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("edit에러", state.error);
    },
  },
});

export const {} = CommentsSlice.actions;
export default CommentsSlice.reducer;
