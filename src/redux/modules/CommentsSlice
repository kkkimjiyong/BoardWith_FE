import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { commentsApi } from "../../instance";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const __getComments = createAsyncThunk(
  "GET_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await commentsApi.getComments(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postComments = createAsyncThunk(
  "POST_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      await commentsApi.postComments(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//삭제
export const __deleteComment = createAsyncThunk(
  "DEL_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      await commentsApi.delComments(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editComment = createAsyncThunk(
  "EDIT_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      axios.patch(`${process.env.REACT_APP_COMMENTS}/${payload.commentId}`, {
        commentBody: payload.input,
      });

      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
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
    },
    [__getComments.pending]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = [...state.comments, action.payload];
    },
    [__postComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //댓글 삭제
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(state.comments);
      const tpayloadet = state.comments.filter(
        (comment) => comment.id === action.payload
      );
      state.comments.splice(tpayloadet, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 댓글 수정
    [__editComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__editComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      const commentList = state.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? { ...comment, commentBody: action.payload.input }
          : comment
      );
      state.comments = commentList;
    },
    [__editComment.pending]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = CommentsSlice.actions;
export default CommentsSlice.reducer;
