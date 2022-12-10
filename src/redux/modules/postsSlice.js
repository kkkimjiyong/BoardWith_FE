import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postsApi } from "../../instance";

const initialState = {
  data: [],
  distance: [],
  isLoading: false,
  error: null,
  post: {},
  user: {},
};
//게시글 불러오기
export const acyncGetPosts = createAsyncThunk(
  "posts/getPosts",
  async (thunkAPI) => {
    try {
      const data = await postsApi.getPosts();
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//게시글 생성하기
export const acyncCreatePosts = createAsyncThunk(
  "posts/createPosts",
  async (inputs, thunkAPI) => {
    console.log("inputs1", inputs);
    try {
      console.log("inputs2", inputs);
      const data = await postsApi.creatPost(inputs);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//게시글 수정하기
export const acyncUpdatePosts = createAsyncThunk(
  "posts/updatePosts",
  async (payload, thunkAPI) => {
    try {
      const data = await postsApi.updatePost(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//게시글 삭제하기
export const acyncDeletePosts = createAsyncThunk(
  "posts/deletePosts",
  async (payload, thunkAPI) => {
    try {
      const data = await postsApi.deletePost(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  //? 김지용이 쓰는 중.
  reducers: {
    // addDistance: (state, action) => {
    //   state.distance.push(action.payload);
    // },
    addUserData: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: {
    //게시글 불러오기
    [acyncGetPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [acyncGetPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [acyncGetPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //게시글 생성하기
    [acyncCreatePosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [acyncCreatePosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //게시글 수정하기
    [acyncUpdatePosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [acyncUpdatePosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //게시글 삭제하기
    [acyncDeletePosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.findAllPost = action.payload;
    },
    [acyncDeletePosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addDistance, addUserData } = PostsSlice.actions;
export default PostsSlice.reducer;
