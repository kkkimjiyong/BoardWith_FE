import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { commentsApi } from "../../instance";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
  user: {},
};
//댓글가져오기
export const __getComments = createAsyncThunk(
  "GET_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await commentsApi.getComments(payload);
      //const { data } = await commentsApi.getComments(payload);
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
        alert("댓글 내용을 입력해주세요");
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
      console.log("payload", payload);
      const data = await commentsApi.delComments(payload);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      if (error.response.status === 401) {
        alert("로그인이 필요합니다.");
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//수정
export const __editComment = createAsyncThunk(
  "EDIT_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const data = await commentsApi.editComments(payload);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      if (error.response.status === 412) {
        alert("수정할 내용을 입력해주세요");
      }
      console.log("edit에러1", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
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

    //댓글달기
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
      console.log("action.payload", action.payload);
      //console.log(state.comments);
      const payloadelete = state.comments.comments.filter(
        (comment) => comment._id === action.payload
      );
      state.comments.comments.splice(payloadelete, 1);
      // state.comments.comments.splice(action.payload.data, 1);
      // for (let i = 0; i < state.comments.comments.length; i++) {
      //   if (state.comments.comments._id === action.payload) {
      //     state.comments.comments.splice(action.payload.data);
      //   } else {
      //     alert("오류");
      //   }
      // }
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
      //console.log("action", action);
      state.isLoading = false;
      // state.comments.comments = action.payload.comments;
      console.log("오는데이터 : ", action.payload.data);

      const commentList = state.comments.comments.map((iter) =>
        // comment._id === action.payload.data._id
        //   ? { comment: action.payload.data.comment }
        //   : comment
        iter._id === action.payload.data._id
          ? (iter.comment = action.payload.data.comment)
          : iter
      );
      console.log("어캐바꼈니 : ", commentList);
      //commentList[0].comment = action.payload.data.comment;
      //state.comments.comments = [...state.comments.comments, commentList[0]];
    },
    [__editComment.pending]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("edit에러", state.error);
    },
  },
});

export const { addUserData } = CommentsSlice.actions;
export default CommentsSlice.reducer;
